/* eslint-disable @typescript-eslint/no-require-imports */
require('./load-typescript.cjs');
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { validateContact } = require('../src/lib/contact-policy.ts');
const { contactConfiguration, createContactService, makeChallenge, validChallenge, providerPayload } = require('../src/lib/contact-service.ts');
const clock = 1791712800000;
const env = { CONTACT_DELIVERY_ENABLED:'true', CONTACT_PROVIDER:'brevo', CONTACT_SENDER_VERIFIED:'true', CONTACT_TRUSTED_PROXY_VERIFIED:'true', CONTACT_ORIGIN:'https://portfolio.example.invalid', CONTACT_FROM_EMAIL:'verified@example.invalid', CONTACT_BREVO_API_KEY:'test-only-provider', CONTACT_REDIS_REST_URL:'https://test-only.upstash.io', CONTACT_REDIS_REST_TOKEN:'test-only-limiter', CONTACT_ABUSE_SECRET:'test-only-secret-with-at-least-32-characters', CONTACT_TRUSTED_IP_HEADER:'x-nf-client-connection-ip' };
const config = contactConfiguration(env, true);
const data = { name:'  QA Example  ', email:'qa@example.invalid', subject:'Project inquiry', message:'Hello & <sample>\nSecond line.', category:'Collaboration' };
function request(body, headers={}) {
  return new Request(config.origin+'/api/contact', { method:'POST', headers:{ origin:config.origin, 'content-type':'application/json', 'x-nf-client-connection-ip':'192.0.2.1', ...headers }, body: typeof body === 'string' ? body : JSON.stringify(body) });
}
function harness({ count=1, ttl=600, claimed='OK', providerStatus=201, providerBody={messageId:'test-only-id'}, failLimiter=false, failProvider=false }={}) {
  const calls=[]; const claims=new Set();
  const mockedFetch=async (url, options) => {
    calls.push({url,options});
    if (url===config.redisUrl) {
      if(failLimiter) throw new Error('test-only internal provider error');
      const command=JSON.parse(options.body);
      if(command[0]==='EVAL') return Response.json({result:[count,ttl]});
      if(command[0]==='SET') { const key=command[1]; const result=claims.has(key)?null:claimed; claims.add(key); return Response.json({result}); }
      throw new Error('Unexpected limiter command');
    }
    assert.equal(url,'https://api.brevo.com/v3/smtp/email');
    if(failProvider) throw new Error('test-only sensitive provider error');
    return Response.json(providerBody,{status:providerStatus});
  };
  return { calls, service:createContactService(config,mockedFetch,()=>clock) };
}
const body = () => ({...data,website:'',token:makeChallenge(config,clock-1500)});
test('configuration stays closed without every required approval and server credential', () => {
  assert.equal(contactConfiguration(env),null);
  for(const key of Object.keys(env)) assert.equal(contactConfiguration({...env,[key]:''},true),null,key);
  for(const [key,value] of [['CONTACT_DELIVERY_ENABLED','false'],['CONTACT_PROVIDER','smtp'],['CONTACT_SENDER_VERIFIED','false'],['CONTACT_TRUSTED_PROXY_VERIFIED','false'],['CONTACT_ABUSE_SECRET','short'],['CONTACT_ORIGIN','http://example.invalid'],['CONTACT_ORIGIN',config.origin+'/path'],['CONTACT_REDIS_REST_URL','https://evil.example.invalid'],['CONTACT_REDIS_REST_URL','https://test-only.upstash.io?redirect=https://evil.invalid'],['CONTACT_TRUSTED_IP_HEADER','x-forwarded-for'],['CONTACT_FROM_EMAIL','Sender <qa@example.invalid>']]) assert.equal(contactConfiguration({...env,[key]:value},true),null,key);
  assert.ok(config);
});
test('validation preserves international text and multiline messages', () => {
  const result=validateContact({...data,name:' Jose\u0301 ',message:'Grüße 🖤\nHello'});
  assert.equal(result.ok,true);assert.equal(result.data.name,'José');assert.equal(result.data.message,'Grüße 🖤\nHello');
});
test('validation rejects missing, malformed, overlong and injected values', () => {
  for(const value of [null,[],{}, {...data,email:'invalid'}, {...data,name:'A\r\nB'}, {...data,subject:'A\nB'}, {...data,message:'a'.repeat(4001)}, {...data,message:'a\u0000b'}, {...data,category:'Fake'}, {...data,email:{}}, {...data,subject:' '}]) assert.equal(validateContact(value).ok,false);
});
test('challenge enforces signature, delay, expiry and rejects forged timestamps', () => {
  assert.equal(validChallenge(config,makeChallenge(config,clock-1500),clock),true);
  for(const token of [makeChallenge(config,clock),makeChallenge(config,clock-600001),makeChallenge(config,clock+1500),makeChallenge(config,clock-1500).slice(0,-1)+'z','forged',null]) assert.equal(validChallenge(config,token,clock),false);
});
test('disabled API neither reads private input nor calls a provider',async()=>{
  const service=createContactService(null,async()=>{throw new Error('Must not call a provider')});
  const r=await service.submit(request({...data,message:'private content'}));assert.equal(r.status,503);assert.deepEqual(await r.json(),{code:'unavailable'});
  assert.equal((await service.challenge(new Request(config.origin+'/api/contact'))).status,503);
});
test('strict origin and JSON checks fail before any provider call',async()=>{
  for(const [headers,status] of [[{origin:'https://evil.invalid'},403],[{origin:''},403],[{'content-type':'text/plain'},415],[{'x-nf-client-connection-ip':'forged, 192.0.2.1'},503],[{'x-nf-client-connection-ip':''},503]]) {
    const h=harness();assert.equal((await h.service.submit(request(body(),headers))).status,status);assert.equal(h.calls.length,0);
  }
});
test('challenge shares an atomic rate limit and stores no raw IP',async()=>{
  const h=harness();const r=await h.service.challenge(new Request(config.origin+'/api/contact',{headers:{'x-nf-client-connection-ip':'192.0.2.1'}}));
  assert.equal(r.status,200);assert.equal(r.headers.get('cache-control'),'no-store');
  assert.equal(validChallenge(config,(await r.json()).token,clock+1500),true);
  const command=JSON.parse(h.calls[0].options.body);assert.equal(command[0],'EVAL');assert.match(command[1],/EXPIRE/);assert.ok(!JSON.stringify(command).includes('192.0.2.1'));
});
test('exceeded shared rate limits return retry information without reading or sending',async()=>{
  for(const [method,count] of [['submit',6],['challenge',21]]) {
    const h=harness({count,ttl:400});const r=await h.service[method](request(body()));assert.equal(r.status,429);assert.equal(r.headers.get('retry-after'),'400');assert.equal(h.calls.length,1);
  }
});
test('limiter failure closes delivery and hides internal errors',async()=>{
  const h=harness({failLimiter:true});const r=await h.service.submit(request(body()));assert.equal(r.status,503);assert.equal(h.calls.length,1);assert.deepEqual(await r.json(),{code:'unavailable'});
});
test('invalid challenge and honeypot cannot reach the email provider',async()=>{
  for(const bad of [{...body(),website:'spam'}, {...body(),token:'forged'}]) {
    const h=harness();assert.equal((await h.service.submit(request(bad))).status,400);assert.equal(h.calls.length,1);
  }
});
test('server validates before claiming or sending and gives field errors',async()=>{
  const h=harness();const r=await h.service.submit(request({...body(),email:'bad'}));assert.equal(r.status,422);assert.ok((await r.json()).errors.email);assert.equal(h.calls.length,1);
});
test('malformed JSON and oversized streaming bodies are bounded',async()=>{
  for(const bad of ['{', JSON.stringify({...body(),message:'a'.repeat(25000)})]) {
    const h=harness();assert.equal((await h.service.submit(request(bad))).status,400);assert.equal(h.calls.length,1);
  }
});
test('delivery uses a verified sender, fixed recipient and visitor reply-to',async()=>{
  const h=harness();const r=await h.service.submit(request({...body(),to:'evil@example.invalid',sender:'evil@example.invalid'}));assert.equal(r.status,202);assert.equal(h.calls.length,3);
  const send=h.calls[2];const payload=JSON.parse(send.options.body);assert.equal(payload.sender.email,config.sender);assert.equal(payload.to[0].email,'mngmt@synapedia.com');assert.equal(payload.replyTo.email,data.email);assert.equal(payload.replyTo.name,'QA Example');assert.ok(payload.textContent.includes('<sample>'));assert.equal(payload.htmlContent,undefined);assert.equal(send.options.redirect,'error');assert.equal(send.options.headers['api-key'],config.apiKey);
  assert.ok(!JSON.stringify(payload).includes(config.apiKey));assert.ok(!JSON.stringify(payload).includes(config.secret));assert.deepEqual(await r.json(),{code:'accepted'});
});
test('atomic nonce claims prevent a replay from sending a second email',async()=>{
  const h=harness();const payload=body();assert.equal((await h.service.submit(request(payload))).status,202);assert.equal((await h.service.submit(request(payload))).status,409);assert.equal(h.calls.filter(c=>c.url.includes('brevo.com')).length,1);
  const command=JSON.parse(h.calls[1].options.body);assert.deepEqual(command.slice(2),['claimed','NX','EX','600']);assert.ok(!JSON.stringify(command).includes(data.email));
});
test('provider failure, missing receipt and thrown errors never report success or retry',async()=>{
  for(const options of [{providerStatus:500},{providerBody:{}},{failProvider:true}]) {
    const h=harness(options);const payload=body();const r=await h.service.submit(request(payload));assert.ok([502,503].includes(r.status));assert.ok(!JSON.stringify(await r.json()).includes('sensitive'));assert.equal(h.calls.filter(c=>c.url.includes('brevo.com')).length,1);assert.equal((await h.service.submit(request(payload))).status,409);
  }
});
test('provider payload is plain text and the sender cannot be overridden by visitor input',()=>{
  const payload=providerPayload(config,{...data,sender:'evil',to:'evil'},'test-only-token');assert.equal(payload.sender.email,config.sender);assert.equal(payload.to[0].email,'mngmt@synapedia.com');assert.equal(payload.htmlContent,undefined);
});

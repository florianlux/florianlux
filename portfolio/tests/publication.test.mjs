import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { checkPublication, releaseBlockers } from '../scripts/check-public-release.mjs';
import { startArguments } from '../scripts/start-portfolio.mjs';
const evidence=JSON.parse(readFileSync(new URL('../src/app/release-evidence.json',import.meta.url),'utf8'));
test('current public release is blocked; default local preview is allowed',()=>{
  assert.doesNotThrow(()=>checkPublication('preview'));assert.throws(()=>checkPublication('public'),error=>error.message.includes('PUBLIC RELEASE BLOCKED')&&error.message.includes('impressumDraftMarkers')&&error.message.includes('datenschutzDraftMarkers'));assert.throws(()=>checkPublication('invalid'),/Unknown/);
  assert.ok(releaseBlockers(evidence).includes('operatorAddressConfirmed'));assert.ok(releaseBlockers(evidence).includes('managementMailboxVerified'));
});
test('missing release evidence and removed checks remain closed',()=>{
  assert.ok(releaseBlockers({}).length>=20);assert.ok(releaseBlockers({...evidence,checks:{}}).includes('ownerPublicReleaseApproved'));assert.ok(releaseBlockers({...evidence,operator:{address:'TBD'}}).includes('operatorAddress'));
});
test('preview always binds to loopback, including repeated or encoded hostname attempts',()=>{
  assert.deepEqual(startArguments(['--port','3037']),['start','--hostname','127.0.0.1','--port','3037']);
  assert.deepEqual(startArguments(['-H','127.0.0.1']),['start','-H','127.0.0.1']);
  for(const args of [['--hostname','0.0.0.0'],['--hostname','127.0.0.1','--hostname','0.0.0.0'],['--hostname=0.0.0.0'],['-H=0.0.0.0'],['-H0.0.0.0'],['--hostname'],['-H','--port','3037']]) assert.throws(()=>startArguments(args));
  assert.deepEqual(startArguments([],true),['start','--hostname','0.0.0.0']);
});

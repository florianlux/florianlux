import { readFileSync, readdirSync, mkdirSync, writeFileSync } from "node:fs";
import { join, dirname, relative, resolve } from "node:path";
import { createHash } from "node:crypto";
const root=resolve('.');
function walk(dir){return readdirSync(dir,{withFileTypes:true}).flatMap(item=>item.isDirectory()?walk(join(dir,item.name)):[join(dir,item.name)]);}
const files=['src','scripts','tests','brand','public'].flatMap(dir=>walk(dir)).filter(file=>/\.(?:ts|tsx|js|cjs|mjs|json|html|svg|md)$/.test(file));
files.push('package.json','next.config.ts','.env.example');
const patterns={privateKey:/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/g,githubToken:/gh[pousr]_[A-Za-z0-9]{30,}/g,googleApiKey:/AIza[A-Za-z0-9_-]{30,}/g,apiKey:/(?<![A-Za-z0-9])sk-(?:live-)?[A-Za-z0-9_-]{24,}/g};
const findings=[],reviewedFalsePositives=[];
for(const file of files){
 const source=readFileSync(file,'utf8');
 const images=[...source.matchAll(/data:image\/[^;]+;base64,[A-Za-z0-9+/=]+/g)].filter(match=>{const bytes=Buffer.from(match[0].split(',')[1],'base64');return bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]))||bytes.subarray(0,3).equals(Buffer.from([255,216,255]));});
 for(const [kind,pattern] of Object.entries(patterns))for(const match of source.matchAll(pattern)){
  const item={file:relative(root,resolve(file)),kind,line:source.slice(0,match.index).split('\n').length};
  if(images.some(image=>match.index>=image.index&&match.index<image.index+image[0].length))reviewedFalsePositives.push({...item,reason:'Inside a decoded raster image data URI, not a credential literal.'});else findings.push(item);
 }
}
const client=walk('.next/static').filter(file=>file.endsWith('.js'));
const privateNames=['CONTACT_BREVO_API_KEY','CONTACT_REDIS_REST_TOKEN','CONTACT_ABUSE_SECRET','api.brevo.com/v3/smtp/email'];
const clientFindings=client.flatMap(file=>privateNames.filter(key=>readFileSync(file,'utf8').includes(key)).map(marker=>({file,marker})));
const actualEnvironmentFiles=readdirSync('.').filter(file=>file.startsWith('.env')&&file!=='.env.example');
const portraitHash=createHash('sha256').update(readFileSync('public/identity/florian-supplied-portrait.png')).digest('hex');
const expectedPortrait='e276009253975036e7bea07c08565b3e9fddb6564523c4a2b32c8b213ccc24bf';
const report={sourceFilesChecked:files.length,clientChunksChecked:client.length,secretPatternFindings:findings,reviewedFalsePositives,serverBoundaryMarkersInClient:clientFindings,actualEnvironmentFiles,portraitHash,portraitMatchesSupplied:portraitHash===expectedPortrait,limits:'Local pattern scan and server/client-boundary check; not a comprehensive secret-scanner or host/CI audit. Values are never printed.'};
const output=resolve(process.argv[2]||'output/security-report.json');mkdirSync(dirname(output),{recursive:true});writeFileSync(output,JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({sourceFiles:files.length,clientChunks:client.length,findings:findings.length+clientFindings.length,reviewedImageCandidates:reviewedFalsePositives.length,portraitUnchanged:report.portraitMatchesSupplied,actualEnvironmentFiles:actualEnvironmentFiles.length},null,2));
if(findings.length||clientFindings.length||actualEnvironmentFiles.length||!report.portraitMatchesSupplied)process.exitCode=1;

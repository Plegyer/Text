import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync,statSync} from 'node:fs';
import {join,relative} from 'node:path';
import {execFileSync} from 'node:child_process';

const manifest=JSON.parse(readFileSync('content/chat3-content-ownership-collision-v1.fixture.json','utf8'));

function fnv1a(s:string){
 let h=0x811c9dc5;
 for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,0x01000193)>>>0;}
 return h.toString(16).padStart(8,'0');
}
function canonical(v:any):string{
 if(Array.isArray(v))return '['+v.map(canonical).join(',')+']';
 if(v&&typeof v==='object')return '{'+Object.keys(v).sort().map(k=>JSON.stringify(k)+':'+canonical(v[k])).join(',')+'}';
 return JSON.stringify(v);
}
function hashObject(path:string){
 return execFileSync('git',['hash-object',path],{encoding:'utf8'}).trim();
}
function walk(dir:string):string[]{
 const out:string[]=[];
 for(const name of readdirSync(dir)){
  const path=join(dir,name);
  if(statSync(path).isDirectory())out.push(...walk(path)); else out.push(path.replaceAll('\\','/'));
 }
 return out;
}

test('protected runtime, School and Foreman-owned files retain exact baseline blobs',()=>{
 for(const [path,sha] of Object.entries(manifest.protectedFileBlobShas)){
  assert.equal(hashObject(path),sha,'protected file changed: '+path);
 }
 assert.equal(manifest.assertions.schoolOwnershipUntouched,true);
 assert.equal(manifest.assertions.saveSchemaUntouched,true);
 assert.equal(manifest.assertions.gameplayRngUntouched,true);
 assert.equal(manifest.assertions.foremanCanonUntouched,true);
 assert.equal(manifest.assertions.sharedRuntimeArchitectureUntouched,true);
});

test('Chat 2 presentation assets retain exact aggregate identity',()=>{
 const dir=manifest.presentationAssets.directory;
 const entries=walk(dir).sort().map(path=>path+':'+hashObject(path));
 assert.equal(entries.length,manifest.presentationAssets.fileCount);
 assert.equal(fnv1a(entries.join('\n')),manifest.presentationAssets.aggregateFNV1a32);
 assert.equal(manifest.assertions.mediaSourceOwnershipUntouched,true);
});

test('localization changes are limited to the exact Forest result/return keys',()=>{
 const strings=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
 for(const [key,value] of Object.entries(manifest.localization.expectedMutableValues)){
  assert.deepEqual(strings[key],value,'unexpected value for '+key);
 }
 const mutable=new Set(manifest.localization.mutableKeys);
 const unchanged=Object.fromEntries(Object.entries(strings).filter(([key])=>!mutable.has(key)));
 const fingerprint=fnv1a(Object.keys(unchanged).sort().map(key=>key+'='+canonical(unchanged[key])).join('\n'));
 assert.equal(Object.keys(unchanged).length,manifest.localization.baselineUnchangedKeyCount);
 assert.equal(fingerprint,manifest.localization.baselineUnchangedFNV1a32);
});

test('Forest result refresh changes presentation copy only, not result mechanics',()=>{
 const pack=JSON.parse(readFileSync(manifest.forestResultPack.path,'utf8'));
 const fields=new Set(manifest.forestResultPack.presentationFieldsAllowedToDiffer);
 const redact=(value:any):any=>{
  if(Array.isArray(value))return value.map(redact);
  if(value&&typeof value==='object')return Object.fromEntries(
   Object.entries(value).filter(([key])=>!fields.has(key)).map(([key,item])=>[key,redact(item)])
  );
  return value;
 };
 assert.equal(fnv1a(canonical(redact(pack))),manifest.forestResultPack.baselineMechanicsFNV1a32);
 assert.deepEqual(pack.events.map((event:any)=>event.id),manifest.forestResultPack.requiredEventIds);
 assert.deepEqual(pack.events.map((event:any)=>event.reactionTriggers[0]?.result),manifest.forestResultPack.requiredActivityResultIds);
 for(const event of pack.events){
  assert.deepEqual(event.conditions,[]);
  assert.equal(event.variants.length,1);
  assert.equal(event.variants[0].id,'default');
  assert.equal(event.choices.length,1);
  assert.equal(event.choices[0].id,'return');
  assert.deepEqual(event.choices[0].effects,[]);
 }
});

import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {
 ALLOWED_EXTENSIONS,MAX_BYTES,fileExtension,parseManifest,validateEvent,validateFiles,planPublication,
 encodeFile,encodeVideoPart,MEDIA_PART_BYTES,SINGLE_BLOB_BYTES,isMediaValue,toBase64Text,decodeContent,OWNER_REPO,BRANCH,MANIFEST_PATH
} from '../media-manager-web/core.js';
const root=file=>new URL('../'+file,import.meta.url);
const slotData=JSON.parse(await readFile(root('content/media-manager-slots.json'),'utf8')).events;
const f=(name,size=4)=>({name,size});
test('web manager lists eight canonically authored media slots',async()=>{
 assert.equal(slotData.length,8);
 for(const entry of slotData)validateEvent(entry);
 assert.deepEqual(slotData.filter(x=>!x.connected).map(x=>x.key),['undeadFarmNightLearning']);
 assert.equal(OWNER_REPO,'Plegyer/Text');
 assert.equal(BRANCH,'suslik-2/portable-canonical-20261015');
 assert.equal(MANIFEST_PATH,'suslik-2/content/media-manager.published.js');
 const html=await readFile(root('media-manager-web/index.html'),'utf8');
 assert.match(html,/<script defer src="\.\/app-bundle\.js\?v=20261017-video-parts"/);
 assert.match(html,/Опубликовать в GitHub/);
 assert.doesNotMatch(html,/<video|<img|<audio/i);
 const app=await readFile(root('media-manager-web/app.js'),'utf8');
 assert.match(app,/api\('PATCH','git\/refs\/heads\/'.*force:false/);
 assert.match(app,/getHead\(token\)/);
 assert.match(app,/planPublication\(/);
 assert.doesNotMatch(app,/localStorage|sessionStorage|document\.cookie|innerHTML/);
});
test('web uploader validates files without opening or rendering their visual content',()=>{
 const slot=slotData.find(x=>x.key==='goblinDefeat');
 assert.equal(slot.maxFiles,4);
 assert.equal(fileExtension('scene.WEBP'),'webp');
 assert.ok(ALLOWED_EXTENSIONS.has('mp4'));
 assert.ok(ALLOWED_EXTENSIONS.has('png'));
 assert.ok(!ALLOWED_EXTENSIONS.has('mp3'));
 assert.throws(()=>validateFiles([f('bad.mp3')],slot),/формат/);
 assert.throws(()=>validateFiles([],slot),/хотя бы один/);
 assert.throws(()=>validateFiles([f('empty.png',0)],slot),/больше 0/);
 assert.throws(()=>validateFiles(Array(5).fill(f('ok.png')),slot),/Недостаточно мест/);
 assert.throws(()=>validateFiles([f('huge.mp4',MAX_BYTES+1)],slot),/95 МБ/);
 assert.doesNotThrow(()=>validateFiles([f('one.gif'),f('two.mp4')],slot));
});
test('publication changes only one scene and preserves every existing media file',()=>{
 const event=slotData.find(x=>x.id==='goblin-defeat');
 const saved={
  farGoblinPermission:['assets/user-media/manager/goblin-permission/slot-01.png'],
  goblinDefeat:['assets/user-media/manager/goblin-defeat/slot-01.gif','assets/user-media/manager/goblin-defeat/slot-02.webp'],
  nightTraining:['assets/user-media/manager/dwarf-night-training/slot-01.png']
 };
 const id='11111111-1111-4111-8111-111111111111';
 const p=planPublication(saved,event,[f('new.png'),f('new.MP4')],id);
 assert.deepEqual(p.nextPaths,[
  ...saved.goblinDefeat,
  'assets/user-media/manager/goblin-defeat/'+id+'/slot-01.png',
  'assets/user-media/manager/goblin-defeat/'+id+'/slot-02.mp4'
 ]);
 assert.deepEqual(p.deletions,[]);
 assert.notDeepEqual(planPublication(saved,event,[f('new.png')]).nextPaths,p.nextPaths);
 assert.equal(p.mediaEntries.length,2);
 const parsed=parseManifest(p.manifest);
 assert.deepEqual(parsed.farGoblinPermission,saved.farGoblinPermission);
 assert.deepEqual(parsed.nightTraining,saved.nightTraining);
 assert.deepEqual(parsed.goblinDefeat,p.nextPaths);
 assert.deepEqual(saved.goblinDefeat,[
  'assets/user-media/manager/goblin-defeat/slot-01.gif',
  'assets/user-media/manager/goblin-defeat/slot-02.webp'
 ]);
});
test('UTF8 manifest and binary bytes preserve the exact uploaded file',async()=>{
 const original=new Uint8Array(24576*2+11);
 for(let i=0;i<original.length;i++)original[i]=i%256;
 const file={arrayBuffer:async()=>original.buffer};
 const result=await encodeFile(file);
 assert.deepEqual(Buffer.from(result,'base64'),Buffer.from(original));
 const manifest='window.SUSLIK2_PUBLISHED_MEDIA = {"goblinDefeat":["проба.webp"]};\n';
 assert.equal(decodeContent(toBase64Text(manifest)),manifest);
 assert.deepEqual(parseManifest(manifest).goblinDefeat,['проба.webp']);
 assert.throws(()=>parseManifest('alert(1)'),/незнакомый/);
});

test('static browser page ships its own catalogue and standalone publisher',async()=>{
 const bundle=await readFile(root('media-manager-web/app-bundle.js'),'utf8');
 const local=JSON.parse(await readFile(root('media-manager-web/slots.json'),'utf8'));
 assert.deepEqual(local.events,slotData);
 assert.match(bundle,/async function start/);
 assert.ok(bundle.includes("fetch('./slots.json'"));
 assert.ok(!bundle.includes("from './core.js'"));
 assert.match(bundle,/function planPublication/);
 assert.match(bundle,/git\/refs\/heads/);
});



test('CSP permits the same-origin catalogue and GitHub API, and bundle matches sources',async()=>{
 const html=await readFile(root('media-manager-web/index.html'),'utf8');
 const policy=html.match(/http-equiv="Content-Security-Policy" content="([^"]+)"/)[1];
 const directives=Object.fromEntries(policy.split(';').map(x=>x.trim().split(/\s+/)).filter(x=>x[0]).map(([key,...values])=>[key,values]));
 assert.deepEqual(directives['connect-src'],["'self'",'https://api.github.com']);
 assert.deepEqual(directives['script-src'],["'self'"]);
 assert.deepEqual(directives['default-src'],["'none'"]);
 const core=await readFile(root('media-manager-web/core.js'),'utf8');
 const app=await readFile(root('media-manager-web/app.js'),'utf8');
 const expected='/* Generated by tools/build-web-media-manager.mjs. */\n'+core.replace(/^export /gm,'')+'\n'+app.replace(/^import .*;\r?\n/,'');
 assert.equal(await readFile(root('media-manager-web/app-bundle.js'),'utf8'),expected);
});

test('append publishes two new videos after three existing videos, preserving all old paths',()=>{
 const event=slotData.find(e=>e.key==='farGoblinPermission');
 const existing=[
  'assets/user-media/manager/goblin-permission/old/slot-01.mp4',
  'assets/user-media/manager/goblin-permission/old/slot-02.mp4',
  'assets/user-media/manager/goblin-permission/old/slot-03.mp4'
 ];
 const saved={farGoblinPermission:existing,goblinDefeat:['assets/another.png']};
 const id='11111111-1111-4111-8111-111111111111';
 const added=planPublication(saved,event,[f('four.mp4'),f('five.mp4')],id,'append');
 assert.equal(added.nextPaths.length,5);
 assert.deepEqual(added.nextPaths.slice(0,3),existing);
 assert.equal(added.addedPaths.length,2);
 assert.deepEqual(parseManifest(added.manifest).goblinDefeat,saved.goblinDefeat);
 assert.throws(()=>planPublication(saved,event,[f('4.mp4'),f('5.mp4'),f('6.mp4')],id,'append'),/Недостаточно мест/);
 assert.throws(()=>validateFiles([f('6.mp4')],event,{existingCount:5,mode:'append'}),/Недостаточно мест/);
 const replacement=planPublication(saved,event,[f('only.mp4')],id,'replace');
 assert.equal(replacement.nextPaths.length,1);
 assert.deepEqual(saved.farGoblinPermission,existing);
});

test('large MP4 is represented as safe small fragments and counts as exactly one scene slot',async()=>{
 const slot=slotData.find(x=>x.key==='farGoblinPermission');
 const old=[
  'assets/user-media/manager/goblin-permission/old/slot-01.mp4',
  'assets/user-media/manager/goblin-permission/old/slot-02.mp4',
  'assets/user-media/manager/goblin-permission/old/slot-03.mp4'
 ];
 const original=new Uint8Array(SINGLE_BLOB_BYTES+19);
 for(let i=0;i<original.length;i++)original[i]=i%251;
 const file={
  name:'sample.mp4',size:original.byteLength,
  slice:(start,end)=>({arrayBuffer:async()=>original.slice(start,end).buffer}),
  arrayBuffer:async()=>original.buffer
 };
 const published={farGoblinPermission:old,goblinDefeat:['assets/untouched.png']};
 const id='11111111-1111-4111-8111-111111111111';
 const planned=planPublication(published,slot,[file],id,'append');
 assert.equal(planned.nextPaths.length,4);
 assert.deepEqual(planned.nextPaths.slice(0,3),old);
 assert.equal(planned.mediaEntries.length,Math.ceil(file.size/MEDIA_PART_BYTES));
 assert.equal(planned.addedPaths.length,1);
 const desc=planned.addedPaths[0];
 assert.equal(desc.type,'chunked-mp4');
 assert.equal(desc.parts.length,planned.mediaEntries.length);
 assert.ok(isMediaValue(desc));
 assert.deepEqual(parseManifest(planned.manifest).farGoblinPermission,planned.nextPaths);
 const reconstructed=[];
 for(const entry of planned.mediaEntries){
  const source=await encodeVideoPart(entry.file,entry.partIndex,entry.partPath);
  assert.ok(!source.includes(file.name));
  const window={};
  const {runInNewContext}=await import('node:vm');
  runInNewContext(source,{window,Object});
  const bytes=Buffer.from(window.SUSLIK2_MEDIA_PARTS[entry.partPath],'base64');
  assert.ok(bytes.length<=MEDIA_PART_BYTES);
  reconstructed.push(bytes);
 }
 assert.deepEqual(Buffer.concat(reconstructed),Buffer.from(original));
});

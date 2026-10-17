import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {
 ALLOWED_EXTENSIONS,MAX_BYTES,fileExtension,parseManifest,validateEvent,validateFiles,planPublication,
 encodeFile,toBase64Text,decodeContent,OWNER_REPO,BRANCH,MANIFEST_PATH
} from '../media-manager-web/core.mjs';
const root=file=>new URL('../'+file,import.meta.url);
const slotData=JSON.parse(await readFile(root('content/media-manager-slots.json'),'utf8')).events;
const f=(name,size=4)=>({name,size});
test('web manager lists seven canonically authored media slots',async()=>{
 assert.equal(slotData.length,7);
 for(const entry of slotData)validateEvent(entry);
 assert.deepEqual(slotData.filter(x=>!x.connected).map(x=>x.key),['undeadFarmNightLearning']);
 assert.equal(OWNER_REPO,'Plegyer/Text');
 assert.equal(BRANCH,'suslik-2/portable-canonical-20261015');
 assert.equal(MANIFEST_PATH,'suslik-2/content/media-manager.published.js');
 const html=await readFile(root('media-manager-web/index.html'),'utf8');
 assert.match(html,/type="module" src="\.\/app\.js"/);
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
 assert.throws(()=>validateFiles(Array(5).fill(f('ok.png')),slot),/максимум/);
 assert.throws(()=>validateFiles([f('huge.mp4',MAX_BYTES+1)],slot),/95 МБ/);
 assert.doesNotThrow(()=>validateFiles([f('one.gif'),f('two.mp4')],slot));
});
test('publication changes only one scene, preserves other scene paths and removes stale extensions',()=>{
 const event=slotData.find(x=>x.id==='goblin-defeat');
 const saved={
  farGoblinPermission:['assets/user-media/manager/goblin-permission/slot-01.png'],
  goblinDefeat:['assets/user-media/manager/goblin-defeat/slot-01.gif','assets/user-media/manager/goblin-defeat/slot-02.webp'],
  nightTraining:['assets/user-media/manager/dwarf-night-training/slot-01.png']
 };
 const p=planPublication(saved,event,[f('new.png'),f('new.MP4')]);
 assert.deepEqual(p.nextPaths,[
  'assets/user-media/manager/goblin-defeat/slot-01.png',
  'assets/user-media/manager/goblin-defeat/slot-02.mp4'
 ]);
 assert.deepEqual(p.deletions,[
  'suslik-2/assets/user-media/manager/goblin-defeat/slot-01.gif',
  'suslik-2/assets/user-media/manager/goblin-defeat/slot-02.webp'
 ]);
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

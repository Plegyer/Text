import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFile} from 'node:fs/promises';
import {planPublication,encodeVideoPart,MEDIA_PART_BYTES} from '../media-manager-web/core.js';

test('offline game reconstructs chunked MP4 using local script fragments without changing any bytes',async()=>{
 const source=await readFile(new URL('../offline.js',import.meta.url),'utf8');
 const start=source.indexOf('async function loadChunkedVideo(');
 const end=source.indexOf('function media(',start);
 assert.ok(start!==-1&&end>start,'missing chunked playback support');
 const loaderSource=source.slice(start,end);
 const raw=new Uint8Array(MEDIA_PART_BYTES*4+73);
 for(let i=0;i<raw.length;i++)raw[i]=(i*37)%256;
 const input={name:'sample.mp4',size:raw.length,slice:(start,end)=>({
  arrayBuffer:async()=>raw.slice(start,end).buffer
 })};
 const event={id:'goblin-permission',key:'farGoblinPermission',maxFiles:5};
 const pub=planPublication({},event,[input],'11111111-1111-4111-8111-111111111111','append');
 const description=pub.addedPaths[0];
 assert.equal(description.type,'chunked-mp4');
 assert.equal(description.parts.length,5);
 const scripts=new Map();
 for(const entry of pub.mediaEntries)scripts.set(entry.partPath,
  await encodeVideoPart(entry.file,entry.partIndex,entry.partPath));
 let recorded=null;
 const doc={
  createElement(type){assert.equal(type,'script');return {
   src:'',async:false,onload:null,onerror:null,remove(){}
  };},
  head:{appendChild(script){
   queueMicrotask(()=>{
    const src=scripts.get(script.src);
    if(!src)return script.onerror();
    vm.runInContext(src,context);
    script.onload();
   });
  }}
 };
 const context=vm.createContext({
  window:{},document:doc,atob,Uint8Array,Blob,
  URL:{createObjectURL(blob){recorded=blob;return 'blob:sample-mp4';},revokeObjectURL(){}}
 });
 const loader=vm.runInContext(loaderSource+';loadChunkedVideo',context);
 const video={isConnected:true,src:'',_suslikObjectUrl:null};
 await loader(description,video);
 assert.equal(video.src,'blob:sample-mp4');
 assert.equal(video._suslikObjectUrl,'blob:sample-mp4');
 assert.deepEqual(Buffer.from(await recorded.arrayBuffer()),Buffer.from(raw));
 assert.equal(Object.keys(context.window.SUSLIK2_MEDIA_PARTS).length,0);
});
test('offline chunked MP4 paths are never passed to img.src and blob URLs are revoked',async()=>{
 const source=await readFile(new URL('../offline.js',import.meta.url),'utf8');
 const ui=await readFile(new URL('../gameplay-ui.js',import.meta.url),'utf8');
 assert.match(source,/path\.type==='chunked-mp4'/);
 assert.match(source,/URL\.revokeObjectURL\(video\._suslikObjectUrl\)/);
 assert.match(source,/const image=media\(visualSource,/);
 assert.match(ui,/const image=media\(lustFile\|\|artDef\.image,/);
});

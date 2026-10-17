import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFile} from 'node:fs/promises';
import {webcrypto} from 'node:crypto';

const bundle=await readFile(new URL('../media-manager-web/app-bundle.js',import.meta.url),'utf8');
const catalogue=JSON.parse(await readFile(new URL('../content/media-manager-slots.json',import.meta.url),'utf8'));
const head='a'.repeat(40),commit='b'.repeat(40),blob='c'.repeat(40),tree='d'.repeat(40);
const branch='suslik-2/portable-canonical-20261015';
class Element{
 constructor(){
  this.value='';this.children=[];this.listeners={};this.disabled=false;this.textContent='';
  this.classNames=new Set();
  this.classList={add:x=>this.classNames.add(x),remove:x=>this.classNames.delete(x)};
  this.files=[];
 }
 contains(target){return this===target;}
 append(...items){this.children.push(...items);}
 replaceChildren(...items){this.children=items;}
 setAttribute(){}
 addEventListener(name,fn){this.listeners[name]=fn;}
}
async function fixture({offline=false,race=false,deny=false,accept=true}={}){
 const nodes=new Map();
 const $=id=>{if(!nodes.has(id))nodes.set(id,new Element());return nodes.get(id);};
 const requests=[],confirmations=[];
 const saved={goblinDefeat:['assets/existing.gif'],nightTraining:['assets/training.png']};
 let headReads=0;
 const context=vm.createContext({
  document:{getElementById:$,createElement:()=>new Element(),addEventListener:()=>{}},
  crypto:webcrypto,TextEncoder,TextDecoder,Uint8Array,btoa,atob,
  confirm:message=>{confirmations.push(message);return accept;},
  fetch:async(url,options={})=>{
   const method=options.method||'GET';
   requests.push({url,method,body:options.body&&JSON.parse(options.body),headers:options.headers});
   const response=(data,status=200)=>({ok:status===200,status,json:async()=>data});
   if(url==='./slots.json')return response(catalogue);
   assert.ok(url.startsWith('https://api.github.com/repos/Plegyer/Text/'));
   if(!options.headers.Authorization){if(offline)throw Error('offline');return response({content:btoa('window.SUSLIK2_PUBLISHED_MEDIA = {};')});}
   if(deny)return response({},403);
   if(url.includes('/git/ref/heads/')){headReads++;return response({object:{sha:race&&headReads===3?commit:head}});}
   if(url.includes('/contents/'))return response({content:btoa('window.SUSLIK2_PUBLISHED_MEDIA = '+JSON.stringify(saved)+';')});
   if(url.endsWith('/git/blobs'))return response({sha:blob});
   if(url.endsWith('/git/commits/'+head))return response({tree:{sha:tree}});
   if(url.endsWith('/git/trees'))return response({sha:tree});
   if(url.endsWith('/git/commits'))return response({sha:commit});
   if(method==='PATCH')return response({object:{sha:commit}});
   throw Error('Unexpected request: '+url);
  }
 });
 vm.runInContext(bundle,context);
 await new Promise(resolve=>setImmediate(resolve));
 return {$,requests,confirmations,saved,context};
}
async function prepare(f){
 f.$('event').value='goblin-defeat';f.$('event').listeners.change();
 f.$('file-input').files=[{name:'picture.png',size:3,arrayBuffer:async()=>new Uint8Array([1,2,3]).buffer}];
 f.$('file-input').listeners.change();
 f.$('token').value='TEST_ONLY_NOT_A_CREDENTIAL';f.$('token').listeners.input();
}
test('all seven slots stay selectable when anonymous GitHub access fails',async()=>{
 const f=await fixture({offline:true});
 assert.equal(f.$('event').children.length,8);
 assert.equal(f.$('event').disabled,false);
 await prepare(f);
 assert.match(f.$('published').textContent,/перед публикацией/);
 assert.equal(f.$('publish').disabled,false);
});
test('publish confirms fresh state and commits only new media and one manifest to canonical branch',async()=>{
 const f=await fixture();await prepare(f);await f.$('publish').listeners.click();
 assert.equal(f.confirmations.length,0);
 const writes=f.requests.filter(r=>r.method!=='GET');
 assert.deepEqual(writes.map(r=>r.method),['POST','POST','POST','POST','PATCH']);
 assert.equal(writes[0].body.encoding,'base64');assert.equal(writes[0].body.content,'AQID');
 const manifest=Buffer.from(writes[1].body.content,'base64').toString('utf8');
 assert.ok(manifest.includes(f.saved.nightTraining[0]));
 const entries=writes[2].body.tree;
 assert.equal(entries.length,2);assert.ok(entries.every(e=>e.sha===blob));
 assert.match(entries[0].path,/^suslik-2\/assets\/user-media\/manager\/goblin-defeat\/[a-f0-9-]{36}\/slot-01.png$/);
 assert.equal(entries[1].path,'suslik-2/content/media-manager.published.js');
 assert.equal(writes[2].body.base_tree,tree);assert.deepEqual(writes[3].body.parents,[head]);
 assert.equal(writes[4].url,'https://api.github.com/repos/Plegyer/Text/git/refs/heads/'+branch);
 assert.deepEqual(writes[4].body,{sha:commit,force:false});
 assert.equal(f.$('token').value,'TEST_ONLY_NOT_A_CREDENTIAL');assert.match(f.$('status').textContent,/Добавлено/);
});
test('cancelling replacement uploads nothing',async()=>{
 const f=await fixture({accept:false});await prepare(f);
 f.$('publication-mode').value='replace';f.$('publication-mode').listeners.change();
 await f.$('publish').listeners.click();
 assert.equal(f.requests.filter(r=>r.method!=='GET').length,0);
 assert.match(f.$('status').textContent,/отменена/);
});
test('concurrent head change prevents updating branch',async()=>{
 const f=await fixture({race:true});await prepare(f);await f.$('publish').listeners.click();
 assert.equal(f.requests.filter(r=>r.method==='PATCH').length,0);
 assert.match(f.$('status').textContent,/Другой разработчик/);
});
test('permission rejection preserves selected files and never uploads',async()=>{
 const f=await fixture({deny:true});await prepare(f);await f.$('publish').listeners.click();
 assert.equal(f.requests.filter(r=>r.method!=='GET').length,0);
 assert.match(f.$('status').textContent,/не разрешил/);
 assert.equal(f.$('file-list').children.length,1);
 assert.equal(f.$('publish').disabled,false);
});

test('add mode retains old media paths and the token across consecutive uploads',async()=>{
 const f=await fixture();await prepare(f);await f.$('publish').listeners.click();
 const writes=f.requests.filter(r=>r.method!=='GET');
 const manifest=Buffer.from(writes[1].body.content,'base64').toString('utf8');
 assert.ok(manifest.includes('assets/existing.gif'));
 assert.ok(manifest.includes('assets/training.png'));
 assert.equal(f.$('published').textContent.includes('2 файлов'),true);
 assert.equal(f.$('token').value,'TEST_ONLY_NOT_A_CREDENTIAL');
 f.$('event').value='ogre-captive';f.$('event').listeners.change();
 assert.equal(f.$('token').value,'TEST_ONLY_NOT_A_CREDENTIAL');
 f.$('clear-token').listeners.click();
 assert.equal(f.$('token').value,'');
});
test('dragging new images into the drop area reuses file validations and capacity',async()=>{
 const f=await fixture();
 f.$('event').value='goblin-permission';f.$('event').listeners.change();
 const drop=f.$('drop-zone');
 let prevented=false;
 drop.listeners.dragover({preventDefault:()=>{prevented=true;},dataTransfer:{dropEffect:'none'}});
 assert.equal(prevented,true);
 assert.equal(drop.classNames.has('drag-over'),true);
 const one={name:'clip.mp4',size:3,arrayBuffer:async()=>new Uint8Array([1,2,3]).buffer};
 drop.listeners.drop({preventDefault:()=>{},dataTransfer:{files:[one]}});
 assert.equal(f.$('file-list').children.length,1);
 assert.equal(drop.classNames.has('drag-over'),false);
 drop.listeners.drop({preventDefault:()=>{},dataTransfer:{files:[{name:'music.mp3',size:3}]}});
 assert.equal(f.$('file-list').children.length,1);
 assert.match(f.$('status').textContent,/Неподдерживаемый/);
});

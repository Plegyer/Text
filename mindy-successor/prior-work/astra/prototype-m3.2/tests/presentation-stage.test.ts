import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir} from 'node:fs/promises';
import {loadCatalog} from '../src/core/content.ts';
import {applyPresentation,emptyPresentation,presentationSlots,resolvePresentation} from '../src/core/presentation.ts';

async function realCatalog(){
  const definitions=JSON.parse(await readFile('content/definitions.json','utf8'));
  const files=(await readdir('content/packs')).filter(file=>file.endsWith('.json')).sort();
  const packs=await Promise.all(files.map(async file=>JSON.parse(await readFile('content/packs/'+file,'utf8'))));
  return loadCatalog(definitions,packs);
}

const gif='data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
const png='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=';

test('presentation resolver exposes stable semantic slots',async()=>{
  const catalog=await realCatalog();
  const ids=presentationSlots(catalog).map(slot=>slot.id);
  assert.ok(ids.includes('location/town/default'));
  assert.ok(ids.some(id=>id.startsWith('job/lumber/shift/')));
});

test('GIF is primary while animation-off resolves static fallback',async()=>{
  const catalog=await realCatalog();
  const patch=emptyPresentation();
  patch.slots={
    'location/town/default':{
      primary:{kind:'gif',src:gif,alt:'Animated town'},
      static:{kind:'image',src:png,alt:'Static town'}
    }
  };
  const animated=resolvePresentation(catalog,patch,'location/town/default',{animationsEnabled:true});
  const reduced=resolvePresentation(catalog,patch,'location/town/default',{animationsEnabled:false});
  assert.equal(animated.candidates[0]?.kind,'gif');
  assert.equal(animated.candidates[0]?.source,'override-primary');
  assert.equal(reduced.candidates[0]?.kind,'image');
  assert.equal(reduced.candidates[0]?.source,'override-static');
  assert.ok(reduced.candidates.every(candidate=>candidate.kind==='image'));
});

test('fallback cycles are rejected before activation',async()=>{
  const catalog=await realCatalog();
  const ids=presentationSlots(catalog).map(slot=>slot.id);
  const second=ids.find(id=>id!=='location/town/default');
  assert.ok(second);
  const patch=emptyPresentation();
  patch.slots={
    'location/town/default':{fallbackId:second},
    [second]:{fallbackId:'location/town/default'}
  };
  assert.throws(()=>applyPresentation(catalog,patch),/Цикл presentation fallback/);
});

test('unknown or media-less presentation remains non-fatal',async()=>{
  const catalog=await realCatalog();
  const resolved=resolvePresentation(catalog,emptyPresentation(),'unknown/scene');
  assert.equal(resolved.requestedId,'unknown/scene');
  assert.ok(resolved.diagnostics.length>0);
  assert.ok(Array.isArray(resolved.candidates));
});

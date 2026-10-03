import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

import {
  applyPresentation,
  presentationIdForEnding,
  presentationSlots,
  resolvePresentation
} from '../src/core/presentation.ts';
import {catalog,started} from './helpers.ts';

const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));
const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const animationManifest=JSON.parse(readFileSync('content/presentation-drafts/project-owned-animation-source-manifest-v4.json','utf8'));
const appSource=readFileSync('src/ui/app.ts','utf8');
const styleSource=readFileSync('src/ui/style.css','utf8');

function assertLocalizedStatic(id:string){
  const slot=presentation.slots?.[id];
  assert.ok(slot?.static,id+' static');
  assert.ok(existsSync(slot.static.src),slot.static.src);
  assert.ok(slot.static.altKey,id+' altKey');
  const captionKey=slot.static.altKey.replace(/\.alt$/,'.caption');
  for(const key of [slot.static.altKey,captionKey]){
    assert.ok(localization[key]?.ru?.trim(),key+' ru');
    assert.ok(localization[key]?.en?.trim(),key+' en');
  }
}

test('C2-217/C2-218/C2-227 shipped voluntary Prostitute presentation remains exactly six static-safe surfaces',()=>{
  const action=catalog.definitions.actions.find(item=>item.id==='prostitute.shift');
  const career=catalog.definitions.careers?.find(item=>item.id==='prostitute');
  assert.ok(action);
  assert.ok(career);
  assert.equal(action.cost.energy,1);
  assert.deepEqual(career.stages,['new-independent-worker']);
  assert.deepEqual(
    catalog.definitions.endings.filter(ending=>ending.id.includes('prostitute')).map(ending=>ending.id),
    ['ending.prostitute.hard-work']
  );

  const ids=[
    'job/prostitute/result/default',
    'job/prostitute/shift/spring/default',
    'job/prostitute/shift/summer/default',
    'job/prostitute/shift/autumn/default',
    'job/prostitute/shift/winter/default',
    'ending/prostitute/hard-work'
  ];
  const known=presentationSlots(catalog).map(slot=>slot.id).filter(id=>
    id.startsWith('job/prostitute/')||id.startsWith('ending/prostitute/')
  );
  assert.deepEqual([...new Set(known)].sort(),[...ids].sort());

  const checked=applyPresentation(catalog,presentation);
  const save=started();
  const before=JSON.stringify(save);
  for(const id of ids){
    assertLocalizedStatic(id);
    const a=resolvePresentation(checked,presentation,id,{animationsEnabled:false,occurrenceKey:'prostitute-c2-227'});
    const b=resolvePresentation(checked,presentation,id,{animationsEnabled:false,occurrenceKey:'prostitute-c2-227'});
    assert.equal(a.textOnly,false,id);
    assert.equal(a.selected?.source,'override-static',id);
    assert.equal(a.selected?.src,b.selected?.src,id+' deterministic');
  }
  assert.equal(JSON.stringify(save),before);
  assert.equal(presentationIdForEnding('ending.prostitute.hard-work'),'ending/prostitute/hard-work');
});

test('C2-219..226 future Prostitute semantic families remain unbound on the shipped runtime',()=>{
  const known=presentationSlots(catalog).map(slot=>slot.id);
  assert.equal(known.some(id=>id.startsWith('relationship/prostitute')),false);
  assert.equal(known.some(id=>id.startsWith('night/prostitute')),false);
  assert.equal(known.some(id=>id.startsWith('activity/prostitute')),false);
  assert.equal(known.some(id=>id.startsWith('palace/')&&id.includes('prostitute')),false);

  for(const id of [
    'ending/prostitute/independent-house',
    'ending/prostitute/elite-clientele',
    'ending/prostitute/network-protection'
  ])assert.equal(known.includes(id),false,id);
});

test('C2-227 Prostitute prep has no production adult motion binding and preserves fallback/focus infrastructure',()=>{
  const sequences=(animationManifest.sequences??[]).filter((item:any)=>
    String(item.presentationId??'').includes('prostitute')||
    String(item.id??'').includes('prostitute')||
    String(item.presentationId??'').includes('adult')||
    String(item.id??'').includes('adult')
  );
  assert.deepEqual(sequences,[]);

  assert.match(styleSource,/button:focus-visible/);
  assert.match(appSource,/#close'\)\?\.focus\(\)/);
  assert.match(appSource,/node\.onerror=\(\)=>\{mediaIndex\+\+;render\(\);\}/);

  const resultId='job/prostitute/result/default';
  const staticSrc=presentation.slots[resultId].static.src;
  const synthetic:any={version:1,texts:{},media:{},slots:{
    [resultId]:{
      primary:{kind:'gif',src:'assets/presentation/missing-prostitute-c2-227.gif',alt:'Optional professional animation.'},
      static:{kind:'image',src:staticSrc,alt:'Required professional static fallback.'}
    }
  }};
  const checked=applyPresentation(catalog,synthetic);
  const resolved=resolvePresentation(checked,synthetic,resultId,{animationsEnabled:true,occurrenceKey:'prostitute-c2-227-missing'});
  assert.equal(resolved.candidates[0]?.src,'assets/presentation/missing-prostitute-c2-227.gif');
  assert.equal(resolved.candidates[1]?.source,'override-static');
  assert.equal(resolved.candidates[1]?.src,staticSrc);
});

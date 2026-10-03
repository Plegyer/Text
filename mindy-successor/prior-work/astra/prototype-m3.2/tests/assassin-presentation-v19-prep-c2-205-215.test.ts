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

test('C2-205/C2-206/C2-215 shipped Assassin presentation remains exactly six static-safe semantic surfaces',()=>{
  const action=catalog.definitions.actions.find(item=>item.id==='assassin.shift');
  const career=catalog.definitions.careers?.find(item=>item.id==='assassin');
  assert.ok(action);
  assert.ok(career);
  assert.equal(action.cost.energy,1);
  assert.deepEqual(career.stages,['runner']);
  assert.deepEqual(
    catalog.definitions.endings.filter(ending=>ending.id.includes('assassin')).map(ending=>ending.id),
    ['ending.assassin.hard-work']
  );

  const ids=[
    'job/assassin/result/default',
    'job/assassin/shift/spring/default',
    'job/assassin/shift/summer/default',
    'job/assassin/shift/autumn/default',
    'job/assassin/shift/winter/default',
    'ending/assassin/hard-work'
  ];
  const known=presentationSlots(catalog).map(slot=>slot.id).filter(id=>id.startsWith('job/assassin/')||id.startsWith('ending/assassin/'));
  assert.deepEqual([...new Set(known)].sort(),[...ids].sort());

  const checked=applyPresentation(catalog,presentation);
  const save=started();
  const before=JSON.stringify(save);
  for(const id of ids){
    assertLocalizedStatic(id);
    const a=resolvePresentation(checked,presentation,id,{animationsEnabled:false,occurrenceKey:'assassin-c2-215'});
    const b=resolvePresentation(checked,presentation,id,{animationsEnabled:false,occurrenceKey:'assassin-c2-215'});
    assert.equal(a.textOnly,false,id);
    assert.equal(a.selected?.source,'override-static',id);
    assert.equal(a.selected?.src,b.selected?.src,id+' deterministic');
  }
  assert.equal(JSON.stringify(save),before);
  assert.equal(presentationIdForEnding('ending.assassin.hard-work'),'ending/assassin/hard-work');
});

test('C2-207..214 future Assassin semantic families remain unbound on the shipped runtime',()=>{
  const known=presentationSlots(catalog).map(slot=>slot.id);
  assert.equal(known.some(id=>id.startsWith('relationship/assassin')),false);
  assert.equal(known.some(id=>id.startsWith('activity/assassin')),false);
  assert.equal(known.some(id=>id.startsWith('palace/')&&id.includes('assassin')),false);

  for(const ending of [
    'ending/assassin/ghost',
    'ending/assassin/handler-takeover',
    'ending/assassin/turncoat'
  ])assert.equal(known.includes(ending),false,ending);
});

test('C2-215 Assassin prep has no fabricated motion binding and preserves fallback/focus infrastructure',()=>{
  const sequences=(animationManifest.sequences??[]).filter((item:any)=>
    String(item.presentationId??'').includes('assassin')||
    String(item.id??'').includes('assassin')
  );
  assert.deepEqual(sequences,[]);

  assert.match(styleSource,/button:focus-visible/);
  assert.match(appSource,/#close'\)\?\.focus\(\)/);
  assert.match(appSource,/node\.onerror=\(\)=>\{mediaIndex\+\+;render\(\);\}/);

  const resultId='job/assassin/result/default';
  const staticSrc=presentation.slots[resultId].static.src;
  const synthetic:any={version:1,texts:{},media:{},slots:{
    [resultId]:{
      primary:{kind:'gif',src:'assets/presentation/missing-assassin-c2-215.gif',alt:'Optional Assassin animation.'},
      static:{kind:'image',src:staticSrc,alt:'Required Assassin static fallback.'}
    }
  }};
  const checked=applyPresentation(catalog,synthetic);
  const resolved=resolvePresentation(checked,synthetic,resultId,{animationsEnabled:true,occurrenceKey:'assassin-c2-215-missing'});
  assert.equal(resolved.candidates[0]?.src,'assets/presentation/missing-assassin-c2-215.gif');
  assert.equal(resolved.candidates[1]?.source,'override-static');
  assert.equal(resolved.candidates[1]?.src,staticSrc);
});

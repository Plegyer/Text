import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

import {applyPresentation,resolvePresentation} from '../src/core/presentation.ts';
import {catalog} from './helpers.ts';

const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));
const starterCareers=['satyr-maid','undead-farm'];
const seasons=['spring','summer','autumn','winter'];
const hardWorkCareers=['lumber','satyr-maid','undead-farm','tavern','hunter','guard','merchant','artist-geisha','assassin','prostitute'];
const starterSlots=starterCareers.flatMap(career=>[
 ...seasons.map(season=>`job/${career}/shift/${season}/default`),
 `job/${career}/result/default`
]);

test('C2-118 production starter pools have valid local GIFs and animation-off static fallbacks',()=>{
 const checked=applyPresentation(catalog,presentation);
 for(const id of starterSlots){
  const slot=presentation.slots?.[id];
  assert.ok(slot?.pool,id+' pool');
  assert.equal(slot.pool.candidates.length,3,id+' candidate count');
  assert.ok(slot.static,id+' static');
  for(const candidate of slot.pool.candidates){
   assert.ok(existsSync(candidate.src),id+' '+candidate.src);
   const signature=readFileSync(candidate.src).subarray(0,6).toString('ascii');
   assert.match(signature,/^GIF8[79]a$/,candidate.src+' GIF signature');
  }
  assert.ok(existsSync(slot.static.src),id+' static source');
  const on=resolvePresentation(checked,presentation,id,{animationsEnabled:true,occurrenceKey:'c2-118'});
  const off=resolvePresentation(checked,presentation,id,{animationsEnabled:false,occurrenceKey:'c2-118'});
  assert.equal(on.selected?.source,'override-pool',id+' animated source');
  assert.equal(on.candidates.filter(candidate=>candidate.source==='override-pool').length,3,id+' animated pool count');
  assert.ok(on.candidates.some(candidate=>candidate.source==='override-static'&&candidate.src===slot.static.src),id+' animated fallback candidate');
  assert.equal(off.selected?.source,'override-static',id+' animation-off source');
  assert.equal(off.selected?.src,slot.static.src,id+' animation-off exact static');
  assert.equal(off.textOnly,false,id+' animation-off textOnly');
 }
});

test('C2-118 missing starter animation sources still leave exact project-owned static candidates',()=>{
 for(const id of starterSlots){
  const source=presentation.slots[id].static.src;
  const patch={
   version:1 as const,
   texts:{},
   media:{},
   slots:{
    [id]:{
     pool:{
      version:1,
      ordering:'ordered' as const,
      selectionPolicy:'unweighted' as const,
      candidates:[
       {key:'missing-a',kind:'gif' as const,src:'assets/presentation/missing-c2-118-a.gif',alt:'Missing optional candidate A.'},
       {key:'missing-b',kind:'gif' as const,src:'assets/presentation/missing-c2-118-b.gif',alt:'Missing optional candidate B.'},
       {key:'missing-c',kind:'gif' as const,src:'assets/presentation/missing-c2-118-c.gif',alt:'Missing optional candidate C.'}
      ]
     },
     static:{kind:'image' as const,src:source,alt:'Required project-owned static fallback.'}
    }
   }
  };
  const checked=applyPresentation(catalog,patch);
  const resolved=resolvePresentation(checked,patch,id,{animationsEnabled:true,occurrenceKey:'c2-118-missing'});
  const fallbackIndex=resolved.candidates.findIndex(candidate=>candidate.source==='override-static'&&candidate.src===source);
  assert.equal(resolved.candidates.slice(0,fallbackIndex).filter(candidate=>candidate.source==='override-pool').length,3,id+' missing candidates precede fallback');
  assert.ok(fallbackIndex>=3,id+' fallback reachable after media errors');
  assert.ok(existsSync(source),id+' fallback exists');
  const off=resolvePresentation(checked,patch,id,{animationsEnabled:false,occurrenceKey:'c2-118-missing'});
  assert.equal(off.selected?.src,source,id+' animation-off bypasses missing GIFs');
 }
});

test('C2-118 all ten Hard Work identities remain safe static-only surfaces',()=>{
 const checked=applyPresentation(catalog,presentation);
 for(const career of hardWorkCareers){
  const id=`ending/${career}/hard-work`;
  const slot=presentation.slots?.[id];
  assert.ok(slot?.static,id);
  assert.ok(existsSync(slot.static.src),id+' static');
  for(const animationsEnabled of [true,false]){
   const resolved=resolvePresentation(checked,presentation,id,{animationsEnabled,occurrenceKey:'c2-118-hard-work'});
   assert.equal(resolved.selected?.src,slot.static.src,id+' selected');
   assert.equal(resolved.selected?.kind,'image',id+' kind');
   assert.equal(resolved.textOnly,false,id+' textOnly');
  }
 }
});

import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';

import {applyPresentation,presentationSlots,resolvePresentation} from '../src/core/presentation.ts';
import {catalog} from './helpers.ts';

const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));
const buildSource=readFileSync('scripts/build.mjs','utf8');
const careers=['lumber','satyr-maid','undead-farm','tavern','hunter','guard','merchant','artist-geisha','assassin','prostitute'];
const seasons=['spring','summer','autumn','winter'];
const hardWorkIds=careers.map(career=>`ending/${career}/hard-work`);
const starterIds=['satyr-maid','undead-farm'].flatMap(career=>[
 ...seasons.map(season=>`job/${career}/shift/${season}/default`),
 `job/${career}/result/default`
]);
const requiredProductionIds=[...hardWorkIds,...starterIds];

function collectPresentationIds(value:any,out:string[]=[]):string[]{
 if(Array.isArray(value)){for(const item of value)collectPresentationIds(item,out);return out;}
 if(!value||typeof value!=='object')return out;
 for(const [key,child] of Object.entries(value)){
  if(key==='presentationId'&&typeof child==='string')out.push(child);
  collectPresentationIds(child,out);
 }
 return out;
}

test('C2-119 shipped build consumes production presentation.json and not presentation-drafts',()=>{
 assert.match(buildSource,/content\/presentation\.json/);
 assert.doesNotMatch(buildSource,/presentation-drafts/);
 const draftFiles=readdirSync('content/presentation-drafts').filter(name=>name.endsWith('.json'));
 assert.ok(draftFiles.length>0,'expected preparation manifests to exist for boundary proof');
 let referenced=0;
 for(const file of draftFiles){
  const raw=JSON.parse(readFileSync('content/presentation-drafts/'+file,'utf8'));
  referenced+=collectPresentationIds(raw).length;
 }
 assert.ok(referenced>0,'preparation manifests contain semantic references but are not build inputs');
});

test('C2-119 new Hard Work and starter-pool coverage is live only through exact production slots',()=>{
 const registry=new Set(presentationSlots(catalog).map(slot=>slot.id));
 const production=new Set(Object.keys(presentation.slots??{}));
 const checked=applyPresentation(catalog,presentation);
 assert.equal(requiredProductionIds.length,20);
 for(const id of requiredProductionIds){
  assert.ok(registry.has(id),id+' registry');
  assert.ok(production.has(id),id+' production presentation');
  const resolved=resolvePresentation(checked,presentation,id,{animationsEnabled:true,occurrenceKey:'c2-119-live'});
  assert.equal(resolved.requestedId,id,id+' requested');
  assert.equal(resolved.selected?.slotId,id,id+' exact selected slot');
  assert.equal(resolved.textOnly,false,id+' textOnly');
  assert.deepEqual(resolved.diagnostics,[],id+' diagnostics');
 }
});

test('C2-119 starter pools and full-roster Hard Work are production data, not draft-manifest substitutes',()=>{
 for(const id of starterIds){
  const slot=presentation.slots[id];
  assert.equal(slot.pool?.candidates.length,3,id+' production pool');
  assert.ok(slot.static,id+' production static');
 }
 for(const id of hardWorkIds){
  const slot=presentation.slots[id];
  assert.ok(slot.static,id+' production static');
  assert.equal(slot.primary,undefined,id+' no preparation-only primary');
 }
});

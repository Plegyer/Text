import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

import {dispatch} from '../src/core/engine.ts';
import {
  applyPresentation,
  presentationIdForEnding,
  presentationIdForEvent,
  presentationIdForUndeadFarmCareerEvent,
  presentationIdForUndeadFarmRelationshipEvent,
  presentationIdForUndeadFarmResource,
  presentationIdForUndeadFarmStage,
  presentationSlots,
  resolvePresentation,
  UNDEAD_FARM_ACTIVITY_EVENT_IDS,
  UNDEAD_FARM_CAREER_EVENT_IDS,
  UNDEAD_FARM_CRISIS_EVENT_IDS,
  UNDEAD_FARM_ENDING_IDS,
  UNDEAD_FARM_NIGHT_EVENT_IDS,
  UNDEAD_FARM_PRESENTATION_STAGES,
  UNDEAD_FARM_PRODUCTION_EVENT_IDS,
  UNDEAD_FARM_RELATIONSHIP_EVENT_IDS,
  UNDEAD_FARM_RESOURCE_IDS,
  UNDEAD_FARM_SCHOOL_EVENT_IDS
} from '../src/core/presentation.ts';
import {catalog,started} from './helpers.ts';

const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));
const app=readFileSync('src/ui/app.ts','utf8');

const careerEventIds=[
  ...UNDEAD_FARM_CAREER_EVENT_IDS,
  ...UNDEAD_FARM_PRODUCTION_EVENT_IDS,
  ...UNDEAD_FARM_NIGHT_EVENT_IDS,
  ...UNDEAD_FARM_SCHOOL_EVENT_IDS,
  ...UNDEAD_FARM_ACTIVITY_EVENT_IDS,
  ...UNDEAD_FARM_CRISIS_EVENT_IDS
];

test('C2-143 every published Undead Farm override is backed by a real frozen-runtime identity',()=>{
  const knownSlots=new Set(presentationSlots(catalog).map(slot=>slot.id));
  const backed=new Set<string>();

  const action=catalog.definitions.actions.find(item=>item.id==='undead-farm.shift');
  assert.ok(action,'live undead-farm.shift');
  backed.add('job/undead-farm/result/default');
  for(const season of ['spring','summer','autumn','winter']){
    assert.ok(action.scenes?.some(scene=>scene.id===`${season}.default`),season+' default scene');
    backed.add(`job/undead-farm/shift/${season}/default`);
  }
  // Stage5 Golden adds eight non-default seasonal identities from real frozen action scenes.
  for(const scene of action.scenes??[]){
    const id=`job/undead-farm/shift/${scene.id.split('.').join('/')}/default`;
    assert.ok(knownSlots.has(id),id+' must be a real catalog action scene');
    backed.add(id);
  }

  const career=catalog.definitions.careers?.find(item=>item.id==='undead-farm');
  assert.ok(career,'live undead-farm career');
  for(const stage of UNDEAD_FARM_PRESENTATION_STAGES){
    assert.ok(career.stages.includes(stage),stage+' live stage');
    backed.add(presentationIdForUndeadFarmStage(stage));
  }

  for(const eventId of careerEventIds){
    const event=catalog.events.find(item=>item.id===eventId);
    assert.ok(event,eventId+' live event');
    assert.equal(event.sourceDomain,'undead-farm',eventId+' source domain');
    const id=presentationIdForEvent(catalog,eventId,'default');
    assert.equal(id,presentationIdForUndeadFarmCareerEvent(eventId),eventId+' exact career presentation mapping');
    backed.add(id);
  }

  for(const eventId of UNDEAD_FARM_RELATIONSHIP_EVENT_IDS){
    const event=catalog.events.find(item=>item.id===eventId);
    assert.ok(event,eventId+' live relationship event');
    assert.equal(event.sourceDomain,'undead-farm.keeper',eventId+' source domain');
    const id=presentationIdForEvent(catalog,eventId,'default');
    assert.equal(id,presentationIdForUndeadFarmRelationshipEvent(eventId),eventId+' exact relationship presentation mapping');
    backed.add(id);
  }

  const runtimeText=JSON.stringify({
    action,
    events:catalog.events.filter(event=>event.id.startsWith('undead-farm.'))
  });
  for(const itemId of UNDEAD_FARM_RESOURCE_IDS){
    assert.ok(runtimeText.includes(`"${itemId}"`),itemId+' live runtime item identity');
    backed.add(presentationIdForUndeadFarmResource(itemId));
  }

  for(const endingId of UNDEAD_FARM_ENDING_IDS){
    assert.ok(catalog.definitions.endings.some(ending=>ending.id===endingId),endingId+' live ending');
    backed.add(presentationIdForEnding(endingId));
  }

  const published=Object.keys(presentation.slots??{}).filter(id=>id.includes('undead-farm'));
  assert.ok(published.length>=40,'expanded Undead presentation surface');
  for(const id of published){
    assert.ok(backed.has(id),id+' must be backed by frozen runtime');
    assert.ok(knownSlots.has(id),id+' live registry slot');
    assert.ok(presentation.slots[id]?.static,id+' static fallback');
    assert.ok(existsSync(presentation.slots[id].static.src),presentation.slots[id].static.src);
  }
});

test('C2-143 a real first Undead Farm shift writes the exact live event presentation ID',()=>{
  let state=started();
  state.run.dayState.energyCurrent=Math.max(state.run.dayState.energyCurrent,1);
  state=dispatch(state,{type:'action',id:'undead-farm.shift'},catalog);
  assert.equal(state.run.pending?.eventId,'undead-farm.career.first-shift');
  assert.equal(state.run.pending?.variantId,'default');

  const expected=presentationIdForEvent(catalog,'undead-farm.career.first-shift','default');
  assert.equal(expected,'job/undead-farm/event/undead-farm-career-first-shift/default');
  assert.equal(state.run.pending?.presentationId,expected);
  assert.ok(presentation.slots[expected]?.static,expected+' production override');
});

test('C2-143 animation-off is static-safe for every published Undead Farm override',()=>{
  const checked=applyPresentation(catalog,presentation);
  for(const [id,slot] of Object.entries<any>(presentation.slots??{}).filter(([id])=>id.includes('undead-farm'))){
    const resolved=resolvePresentation(checked,presentation,id,{animationsEnabled:false,occurrenceKey:'c2-143-off'});
    assert.equal(resolved.textOnly,false,id);
    assert.equal(resolved.selected?.source,'override-static',id);
    assert.equal(resolved.selected?.src,slot.static.src,id);
  }
});

test('C2-143 missing Undead GIF candidates leave exact static fallback reachable',()=>{
  const broken=JSON.parse(JSON.stringify(presentation));
  const pooled=Object.entries<any>(broken.slots??{}).filter(([id,slot])=>id.includes('undead-farm')&&slot.pool);
  assert.ok(pooled.length>=5,'season/result Undead pools');
  for(const [id,slot] of pooled){
    slot.pool.candidates=slot.pool.candidates.map((candidate:any,index:number)=>({
      ...candidate,
      src:`assets/presentation/missing-undead-c2-143-${index}.gif`
    }));
  }
  const checked=applyPresentation(catalog,broken);
  for(const [id,slot] of pooled){
    const resolved=resolvePresentation(checked,broken,id,{animationsEnabled:true,occurrenceKey:'c2-143-missing'});
    const fallback=resolved.candidates.find(candidate=>candidate.source==='override-static');
    assert.ok(fallback,id+' static fallback candidate');
    assert.equal(fallback?.src,slot.static.src,id+' exact fallback src');
    assert.ok(existsSync(slot.static.src),id+' fallback exists');
  }
  assert.match(app,/node\.onerror=\(\)=>\{mediaIndex\+\+;render\(\);\}/);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {dispatch} from '../src/core/engine.ts';
import {
  presentationIdForEnding,
  presentationIdForEvent,
  presentationIdForSatyrMaidCareerEvent,
  presentationIdForSatyrMaidRelationshipEvent,
  presentationIdForSatyrMaidStage,
  presentationSlots,
  resolvePresentation,
  SATYR_MAID_CAREER_EVENT_IDS,
  SATYR_MAID_COMPLEX_ENDING_IDS,
  SATYR_MAID_CRISIS_EVENT_IDS,
  SATYR_MAID_PRESENTATION_STAGES,
  SATYR_MAID_RELATIONSHIP_EVENT_IDS,
  SATYR_MAID_SCHOOL_EVENT_IDS
} from '../src/core/presentation.ts';
import {catalog,started} from './helpers.ts';

const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));

test('C2-131 live production catalog owns every Satyr presentation identity',()=>{
  const known=new Set(presentationSlots(catalog).map(slot=>slot.id));

  const careerEvents=[
    ...SATYR_MAID_CAREER_EVENT_IDS,
    ...SATYR_MAID_SCHOOL_EVENT_IDS,
    ...SATYR_MAID_CRISIS_EVENT_IDS
  ];
  for(const eventId of careerEvents){
    const event=catalog.events.find(item=>item.id===eventId);
    assert.ok(event,eventId+' production event');
    assert.equal(event.sourceDomain,'satyr-maid',eventId+' source domain');
    assert.ok(event.variants.some(variant=>variant.id==='default'),eventId+' default variant');
    const presentationId=presentationIdForEvent(catalog,eventId,'default');
    assert.equal(presentationId,presentationIdForSatyrMaidCareerEvent(eventId),eventId+' exact mapping');
    assert.ok(known.has(presentationId),presentationId+' live slot');
    assert.ok(presentation.slots?.[presentationId]?.static,presentationId+' production override');
  }

  for(const eventId of SATYR_MAID_RELATIONSHIP_EVENT_IDS){
    const event=catalog.events.find(item=>item.id===eventId);
    assert.ok(event,eventId+' production relationship event');
    assert.equal(event.sourceDomain,'satyr-maid.recurring-guest',eventId+' source domain');
    const presentationId=presentationIdForEvent(catalog,eventId,'default');
    assert.equal(presentationId,presentationIdForSatyrMaidRelationshipEvent(eventId),eventId+' exact mapping');
    assert.ok(known.has(presentationId),presentationId+' live slot');
    assert.ok(presentation.slots?.[presentationId]?.static,presentationId+' production override');
  }

  const career=catalog.definitions.careers.find(item=>item.id==='satyr-maid');
  assert.ok(career,'satyr-maid production career');
  for(const stage of SATYR_MAID_PRESENTATION_STAGES){
    assert.ok(career.stages.includes(stage),stage+' production stage');
    const presentationId=presentationIdForSatyrMaidStage(stage);
    assert.ok(known.has(presentationId),presentationId+' stage slot');
    assert.ok(presentation.slots?.[presentationId]?.static,presentationId+' stage override');
  }

  for(const endingId of SATYR_MAID_COMPLEX_ENDING_IDS){
    assert.ok(catalog.definitions.endings.some(ending=>ending.id===endingId),endingId+' production ending');
    const presentationId=presentationIdForEnding(endingId);
    assert.ok(known.has(presentationId),presentationId+' live ending slot');
    assert.ok(presentation.slots?.[presentationId]?.static,presentationId+' ending override');
  }
});

test('C2-131 a real Satyr shift writes the exact production event presentationId into pending state',()=>{
  let state=started();
  state.run.dayState.energyCurrent=Math.max(state.run.dayState.energyCurrent,1);
  state=dispatch(state,{type:'action',id:'satyr-maid.shift'},catalog);

  assert.equal(state.run.pending?.eventId,'satyr-maid.career.first-shift');
  assert.equal(state.run.pending?.variantId,'default');
  const expected=presentationIdForEvent(catalog,'satyr-maid.career.first-shift','default');
  assert.equal(state.run.pending?.presentationId,expected);
  assert.equal(expected,'job/satyr-maid/event/satyr-maid-career-first-shift/default');

  const resolved=resolvePresentation(catalog,presentation,expected,{
    animationsEnabled:false,
    occurrenceKey:'c2-131-production-pending'
  });
  assert.equal(resolved.textOnly,false);
  assert.equal(resolved.selected?.source,'override-static');
  assert.equal(resolved.selected?.src,presentation.slots[expected].static.src);
});

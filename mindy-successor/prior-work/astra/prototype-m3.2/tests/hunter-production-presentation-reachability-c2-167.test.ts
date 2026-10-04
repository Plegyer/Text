import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

import {availableActivityActions,dispatch,eligible} from '../src/core/engine.ts';
import {
  applyPresentation,
  presentationIdForActivityRoute,
  presentationIdForEnding,
  presentationIdForEvent,
  presentationIdForHunterItem,
  presentationIdForHunterRelationshipStage,
  presentationIdForHunterStage,
  presentationIdForHunterState,
  presentationSlots,
  resolvePresentation,
  HUNTER_CAREER_EVENT_IDS,
  HUNTER_CLUE_EVENT_IDS,
  HUNTER_EXPEDITION_OUTCOMES,
  HUNTER_EXPEDITION_ROUTES,
  HUNTER_ITEM_EVENT_IDS,
  HUNTER_ITEM_IDS,
  HUNTER_PRESENTATION_STAGES,
  HUNTER_RELATIONSHIP_EVENT_IDS,
  HUNTER_RELATIONSHIP_STAGES,
  HUNTER_ROUTE_EVENT_IDS,
  HUNTER_SCHOOL_EVENT_IDS,
  HUNTER_STATUS_IDS
} from '../src/core/presentation.ts';
import {catalog,started} from './helpers.ts';
import type {Save} from '../src/core/schema.ts';

const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));
const appSource=readFileSync('src/ui/app.ts','utf8');
const presentationSource=readFileSync('src/core/presentation.ts','utf8');

function settlePending(state:Save){
  let s=state,guard=0;
  while(s.run.pending){
    if(++guard>100)throw new Error('pending loop: '+s.run.pending.eventId);
    const event=catalog.events.find(item=>item.id===s.run.pending!.eventId);
    assert.ok(event,s.run.pending.eventId);
    const preferred:Record<string,string>={
      'hunter.career.first-shift':'continue',
      'hunter.career.recognized-hunter':'continue',
      'hunter.career.expedition-qualified':'record',
      'hunter.relationship.intro':'professional',
      'hunter.relationship.trust':'continue',
      'hunter.relationship.conflict-open':'open',
      'hunter.relationship.conflict-resolve':'decline',
      'hunter.relationship.companion':'decline'
    };
    const wanted=preferred[event.id];
    const choice=(wanted?event.choices.find(item=>item.id===wanted&&eligible(item.conditions,s,catalog)):undefined)
      ??event.choices.find(item=>eligible(item.conditions,s,catalog));
    assert.ok(choice,event.id);
    s=dispatch(s,{type:'choice',id:choice.id},catalog);
  }
  return s;
}

test('C2-167 every published Hunter event override comes from a real frozen production event',()=>{
  const liveEventIds=[
    ...HUNTER_CAREER_EVENT_IDS,
    ...HUNTER_RELATIONSHIP_EVENT_IDS,
    ...HUNTER_CLUE_EVENT_IDS,
    ...HUNTER_ITEM_EVENT_IDS,
    ...HUNTER_ROUTE_EVENT_IDS,
    ...HUNTER_SCHOOL_EVENT_IDS
  ];
  assert.equal(new Set(liveEventIds).size,liveEventIds.length);

  const known=new Set(presentationSlots(catalog).map(slot=>slot.id));
  const expectedPresentationIds=new Set<string>();
  for(const eventId of liveEventIds){
    const event=catalog.events.find(item=>item.id===eventId);
    assert.ok(event,eventId+' live event');
    assert.equal(event.sourceDomain,'hunter',eventId+' source domain');
    assert.ok(event.variants.some(variant=>variant.id==='default'),eventId+' default variant');
    const id=presentationIdForEvent(catalog,eventId,'default');
    expectedPresentationIds.add(id);
    assert.ok(known.has(id),id+' live registry slot');
    assert.ok(presentation.slots?.[id]?.static,id+' override');
  }

  const publishedEventOverrides=Object.keys(presentation.slots??{}).filter(id=>id.startsWith('job/hunter/event/'));
  assert.equal(publishedEventOverrides.length,expectedPresentationIds.size);
  for(const id of publishedEventOverrides)assert.ok(expectedPresentationIds.has(id),id+' catalog-backed');

  assert.equal(catalog.events.some(event=>event.id==='hunter.activity.expedition-return'),false);
  assert.equal(
    Object.keys(presentation.slots??{}).some(id=>id.includes('hunter-activity-expedition-return')),
    false,
    'contract-only return event must not be published as live'
  );
});

test('C2-167 every Hunter stage relationship item state Activity and ending override has live runtime backing',()=>{
  const known=new Set(presentationSlots(catalog).map(slot=>slot.id));
  const career=catalog.definitions.careers?.find(item=>item.id==='hunter');
  const relationship=catalog.definitions.relationships?.find(item=>item.id==='hunter.senior-guide');
  const activity=catalog.definitions.activities.find(item=>item.id==='hunter.expedition');
  assert.ok(career);
  assert.ok(relationship);
  assert.ok(activity);

  for(const stage of HUNTER_PRESENTATION_STAGES){
    assert.ok(career.stages.includes(stage),stage+' career stage');
    const id=presentationIdForHunterStage(stage);
    assert.ok(known.has(id),id);
    assert.ok(presentation.slots?.[id]?.static,id+' static');
  }
  for(const stage of HUNTER_RELATIONSHIP_STAGES){
    assert.ok(relationship.stages.includes(stage),stage+' relationship stage');
    const id=presentationIdForHunterRelationshipStage(stage);
    assert.ok(known.has(id),id);
    assert.ok(presentation.slots?.[id]?.static,id+' static');
  }

  const itemCapability:Record<string,string>={
    rope_kit:'cross_rough_route',
    field_preservation_kit:'preserve_specimen'
  };
  for(const itemId of HUNTER_ITEM_IDS){
    const item=catalog.definitions.itemDefinitions.find(item=>item.id===itemId);
    assert.ok(item,itemId);
    assert.ok(item.capabilities.includes(itemCapability[itemId]!),itemId+' capability');
    const id=presentationIdForHunterItem(itemId);
    assert.ok(known.has(id),id);
    assert.ok(presentation.slots?.[id]?.static,id+' static');
  }

  const runtimeText=JSON.stringify({
    career,
    relationship,
    events:catalog.events.filter(event=>event.sourceDomain==='hunter'),
    activities:catalog.definitions.activities.filter(item=>item.id==='hunter.expedition')
  });
  const backing:Record<string,boolean>={
    'forest-clue':runtimeText.includes('forest-clue-known'),
    'tavern-clue':runtimeText.includes('tavern-clue-known'),
    'farm-clue':runtimeText.includes('farm-clue-known'),
    'lumber-clue':runtimeText.includes('lumber-clue-known'),
    'school-field-craft':runtimeText.includes('school-field-craft-ready'),
    'master-ready':runtimeText.includes('master-route-ready'),
    'warden-ready':runtimeText.includes('warden-route-ready'),
    'legend-ready':runtimeText.includes('legend-route-ready'),
    'rare-contract-active':runtimeText.includes('rare-contract-active'),
    'refusal-respected':runtimeText.includes('refusal-respected'),
    'companion-ready':runtimeText.includes('companion-ready')
  };
  for(const stateId of HUNTER_STATUS_IDS){
    assert.equal(backing[stateId],true,stateId+' backing fact');
    const id=presentationIdForHunterState(stateId);
    assert.ok(known.has(id),id);
    assert.ok(presentation.slots?.[id]?.static,id+' static');
  }

  assert.equal(activity.entryEnergyCost,2);
  assert.ok(known.has(presentationIdForActivityRoute(catalog,'hunter.expedition',null)));
  for(const route of HUNTER_EXPEDITION_ROUTES){
    assert.ok(activity.options.some(option=>option.setRoute===route),route+' live route');
    const id=presentationIdForActivityRoute(catalog,'hunter.expedition',route);
    assert.ok(known.has(id),id);
    assert.ok(presentation.slots?.[id]?.static,id+' static');
  }
  for(const outcome of HUNTER_EXPEDITION_OUTCOMES){
    assert.ok(activity.results.some(result=>result.outcome===outcome),outcome+' live result');
    const id=`activity/expedition/return/${outcome}`;
    assert.ok(known.has(id),id);
    assert.ok(presentation.slots?.[id]?.static,id+' static');
  }

  const endingIds=['ending.hunter.hard-work','ending.hunter.master-hunter','ending.hunter.warden','ending.hunter.legend'];
  for(const endingId of endingIds){
    assert.ok(catalog.definitions.endings.some(ending=>ending.id===endingId),endingId);
    const endingPresentation=presentationIdForEnding(endingId);
    assert.ok(known.has(endingPresentation),endingPresentation);
    assert.ok(presentation.slots?.[endingPresentation]?.static,endingPresentation+' static');
  }
  assert.deepEqual(catalog.definitions.endings.filter(ending=>ending.id.includes('hunter')).map(ending=>ending.id),endingIds);
});

test('C2-167 a real Hunter shift reaches ordinary presentation and exact live milestone event presentation',()=>{
  let state=started();
  state.run.day=40;
  state.run.metrics.energy=3;

  state=dispatch(state,{type:'action',id:'hunter.shift'},catalog);

  assert.equal(state.run.lastAction?.id,'hunter.shift');
  assert.equal(state.run.lastAction?.presentationId,'job/hunter/result/default');
  assert.equal(state.run.pending?.eventId,'hunter.career.first-shift');
  assert.equal(
    state.run.pending?.presentationId,
    presentationIdForEvent(catalog,'hunter.career.first-shift','default')
  );

  const ordinary=resolvePresentation(catalog,presentation,'job/hunter/result/default',{
    animationsEnabled:false,
    occurrenceKey:'c2-167-real-shift'
  });
  assert.equal(ordinary.textOnly,false);
  assert.equal(ordinary.selected?.source,'override-static');
  assert.equal(ordinary.selected?.src,presentation.slots['job/hunter/result/default'].static.src);
});

test('C2-167 a real Hunter expedition reaches live entry route and success-return presentation identities',()=>{
  let state=started();
  state.run.day=40;
  state.run.metrics.wits=3;

  for(let i=0;i<8;i++){
    state.run.metrics.energy=3;
    state=dispatch(state,{type:'action',id:'hunter.shift'},catalog);
    state=settlePending(state);
  }
  assert.equal(state.run.progression.careers.hunter?.stage,'recognized-hunter');
  assert.ok(state.run.progression.careers.hunter?.facts.includes('expedition-qualified'));

  state.run.metrics.energy=3;
  state=dispatch(state,{type:'enterActivity',id:'hunter.expedition'},catalog);
  assert.equal(state.run.flow.activity?.activityId,'hunter.expedition');

  const entryId=presentationIdForActivityRoute(catalog,'hunter.expedition',null);
  const entry=resolvePresentation(catalog,presentation,entryId,{animationsEnabled:false,occurrenceKey:'c2-167-entry'});
  assert.equal(entry.selected?.source,'override-static');
  assert.equal(entry.selected?.src,presentation.slots[entryId].static.src);

  assert.ok(availableActivityActions(state,catalog).some(action=>action.id==='hunter.expedition.local-route'));
  state=dispatch(state,{type:'activityAction',id:'hunter.expedition.local-route'},catalog);
  assert.equal(state.run.flow.activity?.internalState.routeId,'local-route');

  const routeId=presentationIdForActivityRoute(catalog,'hunter.expedition','local-route');
  const route=resolvePresentation(catalog,presentation,routeId,{animationsEnabled:false,occurrenceKey:'c2-167-route'});
  assert.equal(route.selected?.source,'override-static');
  assert.equal(route.selected?.src,presentation.slots[routeId].static.src);

  state=dispatch(state,{type:'activityAction',id:'hunter.expedition.local-track'},catalog);
  for(let i=0;i<4&&state.run.flow.activity;i++)state=dispatch(state,{type:'activityAction',id:'advance'},catalog);
  state=settlePending(state);
  assert.equal(state.run.flow.activity,null);
  assert.ok(state.run.progression.careers.hunter?.facts.includes('expedition-returned'));

  const resultId='activity/expedition/return/success';
  const returned=resolvePresentation(catalog,presentation,resultId,{animationsEnabled:false,occurrenceKey:'c2-167-return'});
  assert.equal(returned.selected?.source,'override-static');
  assert.equal(returned.selected?.src,presentation.slots[resultId].static.src);
});

test('C2-167 Hunter School presentation has exactly one live School consumer',()=>{
  const hunterSchool=catalog.events.filter(event=>event.id.startsWith('hunter.school.'));
  assert.deepEqual(hunterSchool.map(event=>event.id),['hunter.school.field-craft']);
  assert.deepEqual([...HUNTER_SCHOOL_EVENT_IDS],['hunter.school.field-craft']);
  const id=presentationIdForEvent(catalog,'hunter.school.field-craft','default');
  assert.ok(presentation.slots?.[id]?.static,id);
});

test('C2-167 animation-off and synthetic missing-GIF fallback stay save-neutral for every Hunter override',()=>{
  const hunterSlots=Object.entries<any>(presentation.slots??{}).filter(([id])=>
    id.includes('hunter')||id.startsWith('activity/expedition/')
  );
  const save=started();
  const before=JSON.stringify(save);

  for(const [id,slot] of hunterSlots){
    const off=resolvePresentation(catalog,presentation,id,{animationsEnabled:false,occurrenceKey:'c2-167-off'});
    assert.equal(off.textOnly,false,id);
    assert.equal(off.selected?.source,'override-static',id);
    assert.equal(off.selected?.src,slot.static.src,id);

    const synthetic:any={
      version:1,
      texts:{},
      media:{},
      slots:{
        [id]:{
          primary:{
            kind:'gif',
            src:'assets/presentation/missing-hunter-c2-167.gif',
            alt:'Missing optional Hunter animation.'
          },
          static:{
            kind:'image',
            src:slot.static.src,
            alt:'Required Hunter static fallback.'
          }
        }
      }
    };
    const checked=applyPresentation(catalog,synthetic);
    const on=resolvePresentation(checked,synthetic,id,{animationsEnabled:true,occurrenceKey:'c2-167-missing'});
    assert.equal(on.candidates[0]?.src,'assets/presentation/missing-hunter-c2-167.gif',id);
    assert.equal(on.candidates[1]?.source,'override-static',id);
    assert.equal(on.candidates[1]?.src,slot.static.src,id);
    assert.ok(existsSync(slot.static.src),slot.static.src);
  }

  assert.equal(JSON.stringify(save),before,'presentation resolution must not mutate save state');
  assert.match(appSource,/node\.onerror=\(\)=>\{mediaIndex\+\+;render\(\);\}/);
  assert.doesNotMatch(presentationSource,/hunter\.activity\.expedition-return/);
});

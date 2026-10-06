import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

import {actionAvailable,calendar,dispatch,eligible} from '../src/core/engine.ts';
import {
  applyPresentation,
  presentationIdForEnding,
  presentationIdForEvent,
  presentationIdForGuardItem,
  presentationIdForGuardRelationshipStage,
  presentationIdForGuardStage,
  presentationIdForGuardState,
  presentationSlots,
  resolvePresentation,
  GUARD_ITEM_IDS,
  GUARD_PRESENTATION_STAGES,
  GUARD_RELATIONSHIP_STAGES,
  GUARD_STATUS_IDS
} from '../src/core/presentation.ts';
import {catalog,started} from './helpers.ts';
import type {Save} from '../src/core/schema.ts';

const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));
const appSource=readFileSync('src/ui/app.ts','utf8');

function settlePending(state:Save){
  let s=state,guard=0;
  while(s.run.pending){
    if(++guard>100)throw new Error('pending loop: '+s.run.pending.eventId);
    const event=catalog.events.find(item=>item.id===s.run.pending!.eventId);
    assert.ok(event,s.run.pending.eventId);
    const preferred:Record<string,string>={
      'guard.career.first-shift':'continue',
      'guard.relationship.intro':'professional'
    };
    const wanted=preferred[event.id];
    const choice=(wanted?event.choices.find(item=>item.id===wanted&&eligible(item.conditions,s,catalog)):undefined)
      ??event.choices.find(item=>eligible(item.conditions,s,catalog));
    assert.ok(choice,event.id);
    s=dispatch(s,{type:'choice',id:choice.id},catalog);
  }
  return s;
}

function finishNight(state:Save){
  let s=dispatch(state,{type:'endDay'},catalog),guard=0;
  while(s.run.flow.night||s.run.pending){
    if(++guard>100)throw new Error('night loop');
    if(s.run.pending){s=settlePending(s);continue;}
    if(s.run.flow.night?.phase==='LodgingResolution'){
      s=dispatch(s,{type:'chooseLodging',id:'lodging.street'},catalog);
      continue;
    }
    if(s.run.flow.night?.phase==='VoluntaryNightChoice'){
      s=dispatch(s,{type:'chooseNightChoice',id:'night.sleep'},catalog);
      continue;
    }
    throw new Error('night stalled at '+s.run.flow.night?.phase);
  }
  return s;
}

test('C2-180 every published Guard event override comes from one real frozen production event',()=>{
  const known=new Set(presentationSlots(catalog).map(slot=>slot.id));
  const expected=new Set<string>();
  for(const event of catalog.events.filter(event=>event.sourceDomain==='guard')){
    for(const variant of event.variants){
      const id=presentationIdForEvent(catalog,event.id,variant.id);
      expected.add(id);
      assert.ok(known.has(id),id+' live registry');
      assert.ok(presentation.slots?.[id]?.static,id+' static override');
    }
  }
  assert.equal(expected.size,29);
  const published=Object.keys(presentation.slots??{}).filter(id=>id.startsWith('job/guard/event/'));
  assert.equal(published.length,expected.size);
  for(const id of published)assert.ok(expected.has(id),id+' catalog-backed');
});

test('C2-180 every Guard stage partner item state and ending override has frozen runtime backing',()=>{
  const known=new Set(presentationSlots(catalog).map(slot=>slot.id));
  const career=catalog.definitions.careers?.find(item=>item.id==='guard');
  const relationship=catalog.definitions.relationships?.find(item=>item.id==='guard.partner');
  assert.ok(career);
  assert.ok(relationship);

  for(const stage of GUARD_PRESENTATION_STAGES){
    assert.ok(career.stages.includes(stage),stage+' career stage');
    const id=presentationIdForGuardStage(stage);
    assert.ok(known.has(id),id);
    assert.ok(presentation.slots?.[id]?.static,id+' static');
  }
  for(const stage of GUARD_RELATIONSHIP_STAGES){
    assert.ok(relationship.stages.includes(stage),stage+' relationship stage');
    const id=presentationIdForGuardRelationshipStage(stage);
    assert.ok(known.has(id),id);
    assert.ok(presentation.slots?.[id]?.static,id+' static');
  }

  const itemCapability:Record<string,string>={
    guard_badge:'official_guard_access',
    guard_sealed_pass:'guard_sealed_pass'
  };
  for(const itemId of GUARD_ITEM_IDS){
    const item=catalog.definitions.itemDefinitions.find(item=>String(item.id)===itemId);
    assert.ok(item,itemId);
    assert.ok(item.capabilities.includes(itemCapability[itemId]!),itemId+' capability');
    const id=presentationIdForGuardItem(itemId);
    assert.ok(known.has(id),id);
    assert.ok(presentation.slots?.[id]?.static,id+' static');
  }

  const runtimeText=JSON.stringify({
    career,
    relationship,
    events:catalog.events.filter(event=>event.sourceDomain==='guard')
  });
  const backing:Record<string,boolean>={
    'city-dispute-resolved':runtimeText.includes('city-dispute-resolved'),
    'crowd-pressure-resolved':runtimeText.includes('crowd-pressure-resolved'),
    'duty-report-evidence':runtimeText.includes('duty-report-evidence'),
    'cargo-pass-evidence':runtimeText.includes('cargo-pass-evidence'),
    'poverty-response-recorded':runtimeText.includes('poverty-response-recorded'),
    'tavern-evidence-known':runtimeText.includes('tavern-evidence-known'),
    'veteran-ready':runtimeText.includes('veteran-ready'),
    'officer-ready':runtimeText.includes('officer-route-ready'),
    'reform-ready':runtimeText.includes('reform-route-ready'),
    'network-ready':runtimeText.includes('network-route-ready'),
    'major-case-thread':runtimeText.includes('major-case-thread-ready'),
    'major-case-ready':runtimeText.includes('major-case-ready'),
    'crisis-resolved':runtimeText.includes('crisis-resolved'),
    'refusal-respected':runtimeText.includes('refusal-respected'),
    'partner-case-support':runtimeText.includes('partner-case-support')||runtimeText.includes('case-support-ready')
  };
  for(const stateId of GUARD_STATUS_IDS){
    assert.equal(backing[stateId],true,stateId+' backing fact');
    const id=presentationIdForGuardState(stateId);
    assert.ok(known.has(id),id);
    assert.ok(presentation.slots?.[id]?.static,id+' static');
  }

  const endingId='ending.guard.hard-work';
  assert.ok(catalog.definitions.endings.some(ending=>ending.id===endingId));
  const endingPresentation=presentationIdForEnding(endingId);
  assert.ok(known.has(endingPresentation),endingPresentation);
  assert.ok(presentation.slots?.[endingPresentation]?.static,endingPresentation+' static');
  assert.deepEqual(
    catalog.definitions.endings.filter(ending=>ending.id.includes('guard')).map(ending=>ending.id),
    [
      endingId,
      'ending.guard.officer',
      'ending.guard.reform',
      'ending.guard.network',
      'ending.guard.major-case'
    ]
  );
});

test('C2-180 a real Year-2 Guard shift reaches ordinary and exact first-milestone presentation IDs',()=>{
  let state=started();
  const action=catalog.definitions.actions.find(item=>item.id==='guard.shift');
  assert.ok(action);
  assert.equal(action.cost.energy,1);
  assert.equal(actionAvailable(action,state,catalog),false);

  while(calendar(state.run.day).year<2)state=finishNight(state);
  assert.equal(actionAvailable(action,state,catalog),true);

  state=dispatch(state,{type:'action',id:'guard.shift'},catalog);
  assert.equal(state.run.lastAction?.id,'guard.shift');
  assert.equal(state.run.lastAction?.presentationId,'job/guard/result/default');
  assert.equal(state.run.pending?.eventId,'guard.career.first-shift');
  assert.equal(
    state.run.pending?.presentationId,
    presentationIdForEvent(catalog,'guard.career.first-shift','default')
  );

  const ordinary=resolvePresentation(catalog,presentation,'job/guard/result/default',{
    animationsEnabled:false,occurrenceKey:'c2-180-real-shift'
  });
  assert.equal(ordinary.textOnly,false);
  assert.equal(ordinary.selected?.source,'override-static');
  assert.equal(ordinary.selected?.src,presentation.slots['job/guard/result/default'].static.src);

  const milestoneId=presentationIdForEvent(catalog,'guard.career.first-shift','default');
  const milestone=resolvePresentation(catalog,presentation,milestoneId,{
    animationsEnabled:false,occurrenceKey:'c2-180-first-shift'
  });
  assert.equal(milestone.selected?.source,'override-static');
  assert.equal(milestone.selected?.src,presentation.slots[milestoneId].static.src);

  state=settlePending(state);
  assert.equal(state.run.progression.careers.guard?.stage,'trusted-guard');
  assert.equal(state.run.resources.inventory.guard_badge,1);
});

test('C2-180 animation-off and missing optional motion stay static-safe and save-neutral for every Guard override',()=>{
  const guardSlots=Object.entries<any>(presentation.slots??{}).filter(([id])=>id.includes('guard'));
  const save=started();
  const before=JSON.stringify(save);

  for(const [id,slot] of guardSlots){
    const off=resolvePresentation(catalog,presentation,id,{animationsEnabled:false,occurrenceKey:'c2-180-off'});
    assert.equal(off.textOnly,false,id);
    assert.equal(off.selected?.source,'override-static',id);
    assert.equal(off.selected?.src,slot.static.src,id);
    assert.ok(existsSync(slot.static.src),slot.static.src);

    const synthetic:any={
      version:1,texts:{},media:{},
      slots:{
        [id]:{
          primary:{kind:'gif',src:'assets/presentation/missing-guard-c2-180.gif',alt:'Optional Guard animation.'},
          static:{kind:'image',src:slot.static.src,alt:'Required Guard static fallback.'}
        }
      }
    };
    const checked=applyPresentation(catalog,synthetic);
    const on=resolvePresentation(checked,synthetic,id,{animationsEnabled:true,occurrenceKey:'c2-180-missing'});
    assert.equal(on.candidates[0]?.src,'assets/presentation/missing-guard-c2-180.gif',id);
    assert.equal(on.candidates[1]?.source,'override-static',id);
    assert.equal(on.candidates[1]?.src,slot.static.src,id);
  }

  assert.equal(JSON.stringify(save),before,'presentation resolution must not mutate save state');
  assert.match(appSource,/node\.onerror=\(\)=>\{mediaIndex\+\+;render\(\);\}/);
});

test('C2-180 Guard delta preserves pre-existing non-Guard presentation consumers on the frozen runtime base',()=>{
  const known=new Set(presentationSlots(catalog).map(slot=>slot.id));
  for(const id of [
    'job/tavern/result/default',
    'relationship/tavern-recurring-traveler/default',
    'job/satyr-maid/result/default',
    'job/undead-farm/result/default',
    'activity/forest/route/default',
    'location/town/default'
  ])assert.ok(known.has(id),id+' retained consumer');

  const guardPublished=Object.keys(presentation.slots??{}).filter(id=>id.includes('guard'));
  for(const id of guardPublished){
    assert.equal(id.startsWith('job/hunter/'),false,id);
    assert.equal(id.startsWith('activity/expedition/'),false,id);
  }
});

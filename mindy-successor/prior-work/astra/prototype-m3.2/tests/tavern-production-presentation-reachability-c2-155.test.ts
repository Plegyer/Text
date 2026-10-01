import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

import {dispatch} from '../src/core/engine.ts';
import {
  applyPresentation,
  presentationIdForEnding,
  presentationIdForEvent,
  presentationIdForTavernNightChoice,
  presentationIdForTavernRelationshipRoot,
  presentationIdForTavernRelationshipStage,
  presentationIdForTavernStage,
  presentationIdForTavernState,
  presentationSlots,
  resolvePresentation,
  TAVERN_ACCESS_EVENT_IDS,
  TAVERN_ACTIVITY_EVENT_IDS,
  TAVERN_CAREER_EVENT_IDS,
  TAVERN_CRISIS_EVENT_IDS,
  TAVERN_ENDING_IDS,
  TAVERN_HOUSING_EVENT_IDS,
  TAVERN_INFORMATION_EVENT_IDS,
  TAVERN_NIGHT_CHOICE_IDS,
  TAVERN_NIGHT_EVENT_IDS,
  TAVERN_PRESENTATION_STAGES,
  TAVERN_PRESENTATION_STATE_IDS,
  TAVERN_RELATIONSHIP_EVENT_IDS,
  TAVERN_RELATIONSHIP_STAGES,
  TAVERN_SCHOOL_EVENT_IDS
} from '../src/core/presentation.ts';
import {catalog,started} from './helpers.ts';

const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));
const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const presentationSource=readFileSync('src/core/presentation.ts','utf8');
const appSource=readFileSync('src/ui/app.ts','utf8');

const careerDomainEventIds=[
  ...TAVERN_CAREER_EVENT_IDS,
  ...TAVERN_SCHOOL_EVENT_IDS,
  ...TAVERN_ACCESS_EVENT_IDS,
  ...TAVERN_HOUSING_EVENT_IDS,
  ...TAVERN_ACTIVITY_EVENT_IDS,
  ...TAVERN_CRISIS_EVENT_IDS,
  ...TAVERN_INFORMATION_EVENT_IDS,
  'tavern.house-notes.night'
];
const relationshipDomainEventIds=[
  ...TAVERN_RELATIONSHIP_EVENT_IDS,
  'tavern.recurring-traveler.night'
];
const allProductionEventIds=[...careerDomainEventIds,...relationshipDomainEventIds];

test('C2-155 every published Tavern event override is owned by the frozen production catalog',()=>{
  const known=new Set(presentationSlots(catalog).map(slot=>slot.id));
  const liveEventPresentationIds=new Set<string>();

  for(const eventId of careerDomainEventIds){
    const event=catalog.events.find(item=>item.id===eventId);
    assert.ok(event,eventId+' production event');
    assert.equal(event.sourceDomain,'tavern',eventId+' source domain');
    assert.ok(event.variants.some(variant=>variant.id==='default'),eventId+' default variant');
    const presentationId=presentationIdForEvent(catalog,eventId,'default');
    liveEventPresentationIds.add(presentationId);
    assert.ok(known.has(presentationId),presentationId+' live slot');
    assert.ok(presentation.slots?.[presentationId]?.static,presentationId+' static override');
  }

  for(const eventId of relationshipDomainEventIds){
    const event=catalog.events.find(item=>item.id===eventId);
    assert.ok(event,eventId+' production relationship event');
    assert.equal(event.sourceDomain,'tavern.recurring-traveler',eventId+' source domain');
    assert.ok(event.variants.some(variant=>variant.id==='default'),eventId+' default variant');
    const presentationId=presentationIdForEvent(catalog,eventId,'default');
    liveEventPresentationIds.add(presentationId);
    assert.ok(known.has(presentationId),presentationId+' live slot');
    assert.ok(presentation.slots?.[presentationId]?.static,presentationId+' static override');
  }

  const publishedEventOverrides=Object.keys(presentation.slots??{}).filter(id=>
    id.startsWith('job/tavern/event/')||
    id.startsWith('relationship/tavern-recurring-traveler/tavern-')
  );
  assert.equal(publishedEventOverrides.length,allProductionEventIds.length);
  for(const id of publishedEventOverrides)assert.ok(liveEventPresentationIds.has(id),id+' must be catalog-backed');

  assert.doesNotMatch(
    presentationSource,
    /for\s*\(const eventId of \[\.\.\.TAVERN_CAREER_EVENT_IDS/,
    'final registry must not reserve Tavern event IDs outside the production catalog'
  );
});

test('C2-155 stage relationship Night state item and ending surfaces all have live runtime backing',()=>{
  const known=new Set(presentationSlots(catalog).map(slot=>slot.id));
  const career=catalog.definitions.careers?.find(item=>item.id==='tavern');
  const relationship=catalog.definitions.relationships?.find(item=>item.id==='tavern.recurring-traveler');
  assert.ok(career,'tavern production career');
  assert.ok(relationship,'tavern recurring-traveler production relationship');

  for(const stage of TAVERN_PRESENTATION_STAGES){
    assert.ok(career.stages.includes(stage),stage+' production career stage');
    const id=presentationIdForTavernStage(stage);
    assert.ok(known.has(id),id+' registry');
    assert.ok(presentation.slots?.[id]?.static,id+' static');
  }

  const relationshipRoot=presentationIdForTavernRelationshipRoot();
  assert.ok(known.has(relationshipRoot),relationshipRoot);
  assert.ok(presentation.slots?.[relationshipRoot]?.static,relationshipRoot+' static');
  for(const stage of TAVERN_RELATIONSHIP_STAGES){
    assert.ok(relationship.stages.includes(stage),stage+' production relationship stage');
    const id=presentationIdForTavernRelationshipStage(stage);
    assert.ok(known.has(id),id+' registry');
    assert.ok(presentation.slots?.[id]?.static,id+' static');
  }

  for(const choiceId of TAVERN_NIGHT_CHOICE_IDS){
    assert.ok(catalog.definitions.nightChoices.some(choice=>choice.id===choiceId),choiceId+' production Night choice');
    const id=presentationIdForTavernNightChoice(choiceId);
    assert.ok(known.has(id),id+' registry');
    assert.ok(presentation.slots?.[id]?.static,id+' static');
  }

  const staffKey=catalog.definitions.itemDefinitions.find(item=>item.id==='tavern_staff_key');
  assert.ok(staffKey,'tavern_staff_key production item');
  assert.ok(staffKey.capabilities.includes('access_guest_rooms_staff'),'staff key capability');

  const runtimeText=JSON.stringify({actions:catalog.definitions.actions,events:catalog.events,careers:catalog.definitions.careers,relationships:catalog.definitions.relationships});
  const stateBacking:Record<(typeof TAVERN_PRESENTATION_STATE_IDS)[number],string>={
    'staff-room-access':'tavern_staff_key',
    'room-pressure':'room_pressure',
    'supply-pressure':'supply_pressure',
    'guest-ledger':'guest-ledger-evidence-ready',
    'traveler-rumour':'traveler-rumour-known',
    'rumour-confirmed':'rumour-confirmed',
    'information-routing':'tavern.information.rumour-route',
    'confidentiality-kept':'confidentiality-kept',
    'refusal-respected':'refusal-respected'
  };
  for(const stateId of TAVERN_PRESENTATION_STATE_IDS){
    assert.ok(runtimeText.includes(stateBacking[stateId]),stateId+' runtime backing');
    const id=presentationIdForTavernState(stateId);
    assert.ok(known.has(id),id+' registry');
    assert.ok(presentation.slots?.[id]?.static,id+' static');
  }

  for(const endingId of TAVERN_ENDING_IDS){
    assert.ok(catalog.definitions.endings.some(ending=>ending.id===endingId),endingId+' production ending');
    const id=presentationIdForEnding(endingId);
    assert.ok(known.has(id),id+' registry');
    assert.ok(presentation.slots?.[id]?.static,id+' static');
  }
});

test('C2-155 a real Tavern shift writes the exact first production event presentationId into pending state',()=>{
  let state=started();
  state.run.character.stats.charm=45;
  state.run.character.stats.sociability=35;
  state.run.dayState.energyCurrent=Math.max(state.run.dayState.energyCurrent,1);

  state=dispatch(state,{type:'action',id:'tavern.shift'},catalog);

  assert.equal(state.run.pending?.eventId,'tavern.career.first-shift');
  assert.equal(state.run.pending?.variantId,'default');
  const expected=presentationIdForEvent(catalog,'tavern.career.first-shift','default');
  assert.equal(expected,'job/tavern/event/tavern-career-first-shift/default');
  assert.equal(state.run.pending?.presentationId,expected);

  const resolved=resolvePresentation(catalog,presentation,expected,{
    animationsEnabled:false,
    occurrenceKey:'c2-155-real-shift'
  });
  assert.equal(resolved.textOnly,false);
  assert.equal(resolved.selected?.source,'override-static');
  assert.equal(resolved.selected?.src,presentation.slots[expected].static.src);
});

test('C2-155 every Tavern override has RU EN alt-caption parity and animation-off static safety',()=>{
  const checked=applyPresentation(catalog,presentation);
  const tavernSlots=Object.entries<any>(presentation.slots??{}).filter(([id])=>id.includes('tavern'));
  assert.ok(tavernSlots.length>=55,'expected complete Tavern v14 coverage');

  for(const [id,slot] of tavernSlots){
    assert.ok(slot.static,id+' static');
    assert.ok(existsSync(slot.static.src),id+' '+slot.static.src);
    assert.ok(slot.static.altKey,id+' altKey');
    const captionKey=slot.static.altKey.replace(/\.alt$/,'.caption');
    for(const key of [slot.static.altKey,captionKey]){
      assert.ok(localization[key]?.ru?.trim(),key+' ru');
      assert.ok(localization[key]?.en?.trim(),key+' en');
    }
    const off=resolvePresentation(checked,presentation,id,{
      animationsEnabled:false,
      occurrenceKey:'c2-155-animation-off'
    });
    assert.equal(off.textOnly,false,id);
    assert.equal(off.selected?.source,'override-static',id);
    assert.equal(off.selected?.src,slot.static.src,id);
  }
});

test('C2-155 synthetic missing GIFs leave the exact static fallback reachable for every Tavern override',()=>{
  const tavernSlots=Object.entries<any>(presentation.slots??{}).filter(([id])=>id.includes('tavern'));
  for(const [id,slot] of tavernSlots){
    const patch:any={
      version:1,
      texts:{},
      media:{},
      slots:{
        [id]:{
          primary:{
            kind:'gif',
            src:'assets/presentation/missing-c2-155.gif',
            alt:'Missing optional Tavern animation.'
          },
          static:{
            kind:'image',
            src:slot.static.src,
            alt:'Required Tavern static fallback.'
          }
        }
      }
    };
    const checked=applyPresentation(catalog,patch);
    const animated=resolvePresentation(checked,patch,id,{
      animationsEnabled:true,
      occurrenceKey:'c2-155-missing'
    });
    assert.equal(animated.candidates[0]?.src,'assets/presentation/missing-c2-155.gif',id+' missing GIF first');
    assert.equal(animated.candidates[1]?.source,'override-static',id+' static fallback position');
    assert.equal(animated.candidates[1]?.src,slot.static.src,id+' exact static fallback');
    assert.ok(existsSync(slot.static.src),id+' fallback exists');

    const off=resolvePresentation(checked,patch,id,{
      animationsEnabled:false,
      occurrenceKey:'c2-155-missing'
    });
    assert.equal(off.selected?.source,'override-static',id+' animation-off source');
    assert.equal(off.selected?.src,slot.static.src,id+' animation-off source path');
  }

  assert.match(appSource,/node\.onerror=\(\)=>\{mediaIndex\+\+;render\(\);\}/);
});

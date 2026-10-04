import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

import {
  applyPresentation,
  presentationIdForTavernEvent,
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
  TAVERN_NIGHT_CHOICE_IDS,
  TAVERN_PRESENTATION_STAGES,
  TAVERN_PRESENTATION_STATE_IDS,
  TAVERN_RELATIONSHIP_STAGES,
  TAVERN_SCHOOL_EVENT_IDS
} from '../src/core/presentation.ts';
import {catalog} from './helpers.ts';

const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));
const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const app=readFileSync('src/ui/app.ts','utf8');
const css=readFileSync('src/ui/style.css','utf8');

const allContractEventIds=[
  ...TAVERN_CAREER_EVENT_IDS,
  ...TAVERN_SCHOOL_EVENT_IDS,
  ...TAVERN_ACCESS_EVENT_IDS,
  ...TAVERN_HOUSING_EVENT_IDS,
  ...TAVERN_ACTIVITY_EVENT_IDS,
  ...TAVERN_CRISIS_EVENT_IDS
];

test('C2-145 Tavern v14 presentation constants match the published C1D-121 contract identities',()=>{
  assert.deepEqual([...TAVERN_PRESENTATION_STAGES],[
    'new-hand','trusted-worker','house-node','veteran-service',
    'innkeeper','information-broker','sanctuary','outcome-ready'
  ]);
  assert.deepEqual([...TAVERN_CAREER_EVENT_IDS],[
    'tavern.career.first-shift',
    'tavern.career.house-node',
    'tavern.career.veteran-service',
    'tavern.career.innkeeper',
    'tavern.career.information-broker',
    'tavern.career.sanctuary',
    'tavern.career.outcome-ready'
  ]);
  assert.deepEqual([...TAVERN_SCHOOL_EVENT_IDS],[
    'tavern.school.records',
    'tavern.school.broker',
    'tavern.school.etiquette',
    'tavern.school.arcana'
  ]);
  assert.deepEqual([...TAVERN_ACCESS_EVENT_IDS],[
    'tavern.access.staff-key',
    'tavern.access.guest-ledger'
  ]);
  assert.deepEqual([...TAVERN_HOUSING_EVENT_IDS],['tavern.housing.meal-in-kind']);
  assert.deepEqual([...TAVERN_ACTIVITY_EVENT_IDS],['tavern.activity.forest-return']);
  assert.deepEqual([...TAVERN_CRISIS_EVENT_IDS],['tavern.crisis.occupancy-supply-confidentiality']);
  assert.deepEqual([...TAVERN_NIGHT_CHOICE_IDS],[
    'tavern.night.traveler-request',
    'tavern.night.house-notes'
  ]);
  assert.deepEqual([...TAVERN_RELATIONSHIP_STAGES],[
    'introduced','trusted','night-request','request-resolved','confidentiality-resolved'
  ]);
  assert.deepEqual([...TAVERN_ENDING_IDS],[
    'ending.tavern.hard-work',
    'ending.tavern.innkeeper',
    'ending.tavern.information-broker',
    'ending.tavern.sanctuary'
  ]);
});

test('C2-147 all eight Tavern career stages have stable static presentation and Work accessibility state',()=>{
  const registry=new Set(presentationSlots(catalog).map(slot=>slot.id));
  for(const stage of TAVERN_PRESENTATION_STAGES){
    const id=presentationIdForTavernStage(stage);
    const slot=presentation.slots?.[id];
    assert.ok(registry.has(id),id);
    assert.ok(slot?.static,id+' static');
    assert.ok(existsSync(slot.static.src),slot.static.src);
    const label=`presentation.tavern.stage.${stage}.label`;
    for(const key of [label,slot.static.altKey,slot.static.altKey.replace(/\.alt$/,'.caption')]){
      assert.ok(localization[key]?.ru?.trim(),key+' ru');
      assert.ok(localization[key]?.en?.trim(),key+' en');
    }
  }
  assert.match(app,/tavernPresentationStatusHTML/);
  assert.match(app,/data-tavern-stage=/);
  assert.match(app,/presentationIdForTavernStage\(stage\)/);
});

test('C2-148 recurring traveler and Tavern Night presentation stays role-only and refusal-safe',()=>{
  const registry=new Set(presentationSlots(catalog).map(slot=>slot.id));
  const relationshipRoot=presentationIdForTavernRelationshipRoot();
  assert.ok(registry.has(relationshipRoot),relationshipRoot);
  assert.ok(presentation.slots?.[relationshipRoot]?.static,relationshipRoot+' static');
  for(const stage of TAVERN_RELATIONSHIP_STAGES){
    const id=presentationIdForTavernRelationshipStage(stage);
    const slot=presentation.slots?.[id];
    assert.ok(registry.has(id),id);
    assert.ok(slot?.static,id+' static');
    assert.ok(localization[`presentation.tavern.relationship.stage.${stage}.label`]?.ru?.trim(),stage+' ru label');
    assert.ok(localization[`presentation.tavern.relationship.stage.${stage}.label`]?.en?.trim(),stage+' en label');
  }
  for(const choiceId of TAVERN_NIGHT_CHOICE_IDS){
    const id=presentationIdForTavernNightChoice(choiceId);
    const slot=presentation.slots?.[id];
    assert.ok(registry.has(id),id);
    assert.ok(slot?.static,id+' static');
  }
  for(const stateId of ['confidentiality-kept','refusal-respected']){
    const id=presentationIdForTavernState(stateId);
    assert.ok(presentation.slots?.[id]?.static,id);
  }
  assert.match(app,/tavern\.recurring-traveler/);
  assert.match(app,/refusal-respected/);
  assert.match(app,/confidentiality-kept/);
  assert.match(app,/data-tavern-night-option=/);

  const newPresentationText=Object.entries<any>(localization)
    .filter(([key])=>key.startsWith('presentation.tavern.')||key.startsWith('presentation.static.relationship.tavern-recurring-traveler.')||key.startsWith('ui.tavern.'))
    .flatMap(([,value])=>[value.ru??'',value.en??''])
    .join('\n');
  assert.doesNotMatch(newPresentationText,/Marek|Марек/i);
});

test('C2-149 room, supply, ledger, rumour and information-routing status uses qualitative semantic surfaces',()=>{
  assert.deepEqual([...TAVERN_PRESENTATION_STATE_IDS],[
    'staff-room-access',
    'room-pressure',
    'supply-pressure',
    'guest-ledger',
    'traveler-rumour',
    'rumour-confirmed',
    'information-routing',
    'confidentiality-kept',
    'refusal-respected'
  ]);
  const registry=new Set(presentationSlots(catalog).map(slot=>slot.id));
  for(const stateId of TAVERN_PRESENTATION_STATE_IDS){
    const id=presentationIdForTavernState(stateId);
    const slot=presentation.slots?.[id];
    assert.ok(registry.has(id),id);
    assert.ok(slot?.static,id+' static');
    const label=`presentation.tavern.state.${stateId}.label`;
    assert.ok(localization[label]?.ru?.trim(),label+' ru');
    assert.ok(localization[label]?.en?.trim(),label+' en');
    const combined=`${localization[label].ru} ${localization[label].en}`;
    assert.doesNotMatch(combined,/>=|<=|\b\d+\b/);
  }
  for(const eventId of [...TAVERN_ACCESS_EVENT_IDS,...TAVERN_HOUSING_EVENT_IDS]){
    assert.ok(presentation.slots?.[presentationIdForTavernEvent(eventId)]?.static,eventId);
  }
  assert.match(app,/room_pressure/);
  assert.match(app,/supply_pressure/);
  assert.match(app,/guest-ledger-evidence-ready/);
  assert.match(app,/traveler-rumour-known/);
  assert.match(app,/information-broker-ready/);
});

test('C2-150 exact Tavern-local School hook identities have static presentation without School mechanic changes',()=>{
  for(const eventId of TAVERN_SCHOOL_EVENT_IDS){
    const id=presentationIdForTavernEvent(eventId);
    const slot=presentation.slots?.[id];
    assert.ok(slot?.static,id);
    assert.ok(localization[slot.static.altKey]?.ru?.trim(),slot.static.altKey+' ru');
    assert.ok(localization[slot.static.altKey]?.en?.trim(),slot.static.altKey+' en');
  }
});

test('C2-151 exact Forest Activity return consumer has stable static presentation',()=>{
  const eventId='tavern.activity.forest-return';
  const id=presentationIdForTavernEvent(eventId);
  const slot=presentation.slots?.[id];
  assert.ok(slot?.static,id);
  assert.ok(localization[slot.static.altKey]?.ru?.trim(),slot.static.altKey+' ru');
  assert.ok(localization[slot.static.altKey]?.en?.trim(),slot.static.altKey+' en');
});

test('C2-152 crisis surface and three existing resolution families stay presentation-only and threshold-free',()=>{
  const eventId='tavern.crisis.occupancy-supply-confidentiality';
  const id=presentationIdForTavernEvent(eventId);
  const slot=presentation.slots?.[id];
  assert.ok(slot?.static,id);
  for(const choice of ['stabilize-house','manage-information','protect-shelter']){
    const key=`ui.tavern.crisisFeedback.${choice}`;
    assert.ok(localization[key]?.ru?.trim(),key+' ru');
    assert.ok(localization[key]?.en?.trim(),key+' en');
    const combined=`${localization[key].ru} ${localization[key].en}`;
    assert.doesNotMatch(combined,/>=|<=|\b\d+\b/);
  }
  assert.match(app,/tavernPresentationFeedback/);
  assert.match(app,/tavern\.crisis\.occupancy-supply-confidentiality/);
});

test('C2-154 every new Tavern v14 surface has static RU EN alt/caption parity and animation-off safety',()=>{
  const checked=applyPresentation(catalog,presentation);
  const ids=[
    ...TAVERN_PRESENTATION_STAGES.map(presentationIdForTavernStage),
    ...allContractEventIds.map(presentationIdForTavernEvent),
    ...TAVERN_NIGHT_CHOICE_IDS.map(presentationIdForTavernNightChoice),
    presentationIdForTavernRelationshipRoot(),
    ...TAVERN_RELATIONSHIP_STAGES.map(presentationIdForTavernRelationshipStage),
    ...TAVERN_PRESENTATION_STATE_IDS.map(presentationIdForTavernState)
  ];
  assert.equal(new Set(ids).size,ids.length);

  for(const id of ids){
    const slot=presentation.slots?.[id];
    assert.ok(slot?.static,id+' static');
    assert.equal(slot.primary,undefined,id+' no fake primary');
    assert.equal(slot.pool,undefined,id+' no fake pool');
    assert.ok(existsSync(slot.static.src),slot.static.src);
    assert.ok(slot.static.altKey,id+' altKey');
    const caption=slot.static.altKey.replace(/\.alt$/,'.caption');
    for(const key of [slot.static.altKey,caption]){
      assert.ok(localization[key]?.ru?.trim(),key+' ru');
      assert.ok(localization[key]?.en?.trim(),key+' en');
    }
    const off=resolvePresentation(checked,presentation,id,{animationsEnabled:false,occurrenceKey:'c2-154'});
    assert.equal(off.textOnly,false,id);
    assert.equal(off.selected?.source,'override-static',id);
    assert.equal(off.selected?.src,slot.static.src,id);
  }

  assert.match(css,/\.tavern-career-stage\[tabindex\]:focus-visible/);
  assert.match(css,/\.tavern-relationship-stage\[tabindex\]:focus-visible/);
  assert.match(css,/\.tavern-state-chip\[tabindex\]:focus-visible/);
  assert.match(app,/ui\.tavern\.stageAria/);
  assert.match(app,/ui\.tavern\.relationshipAria/);
  assert.match(app,/ui\.tavern\.stateAria/);
  assert.match(app,/ui\.tavern\.nightChoiceAria/);
});

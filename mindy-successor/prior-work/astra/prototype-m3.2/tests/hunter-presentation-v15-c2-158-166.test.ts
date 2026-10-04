import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

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
import {catalog} from './helpers.ts';

const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));
const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const app=readFileSync('src/ui/app.ts','utf8');
const css=readFileSync('src/ui/style.css','utf8');

function assertLocalizedMedia(id:string){
  const slot=presentation.slots?.[id];
  assert.ok(slot?.static,id+' static');
  assert.ok(existsSync(slot.static.src),slot.static.src);
  assert.ok(slot.static.altKey,id+' alt key');
  const caption=slot.static.altKey.replace(/\.alt$/,'.caption');
  for(const key of [slot.static.altKey,caption]){
    assert.ok(localization[key]?.ru?.trim(),key+' ru');
    assert.ok(localization[key]?.en?.trim(),key+' en');
  }
}

test('C2-158 ordinary Hunter seasonal work remains static-only and distinct from expedition entry',()=>{
  const checked=applyPresentation(catalog,presentation);
  const action=catalog.definitions.actions.find(item=>item.id==='hunter.shift');
  const expedition=catalog.definitions.activities.find(item=>item.id==='hunter.expedition');
  assert.ok(action);
  assert.ok(expedition);
  assert.equal(action.cost.energy,1);
  assert.equal(expedition.entryEnergyCost,2);

  for(const season of ['spring','summer','autumn','winter']){
    const id=`job/hunter/shift/${season}/default`;
    const slot=presentation.slots[id];
    assertLocalizedMedia(id);
    assert.equal(slot.primary,undefined,id+' no fabricated primary');
    assert.equal(slot.pool,undefined,id+' no fabricated pool');
    const on=resolvePresentation(checked,presentation,id,{animationsEnabled:true,occurrenceKey:'c2-158'});
    const off=resolvePresentation(checked,presentation,id,{animationsEnabled:false,occurrenceKey:'c2-158'});
    assert.equal(on.selected?.src,slot.static.src,id+' animations on');
    assert.equal(off.selected?.src,slot.static.src,id+' animations off');
  }

  assert.match(app,/data-hunter-expedition-entry="true"/);
  assert.match(app,/ui\.hunter\.expeditionHelp/);
});

test('C2-159 all frozen Hunter career stages have stable static presentation and focusable Work state',()=>{
  const career=catalog.definitions.careers?.find(item=>item.id==='hunter');
  assert.ok(career);
  assert.deepEqual([...HUNTER_PRESENTATION_STAGES],career.stages);
  const known=new Set(presentationSlots(catalog).map(slot=>slot.id));

  for(const stage of HUNTER_PRESENTATION_STAGES){
    const id=presentationIdForHunterStage(stage);
    assert.ok(known.has(id),id+' registry');
    assertLocalizedMedia(id);
    const label=`presentation.hunter.stage.${stage}.label`;
    assert.ok(localization[label]?.ru?.trim(),label+' ru');
    assert.ok(localization[label]?.en?.trim(),label+' en');
  }

  assert.match(app,/data-hunter-stage=/);
  assert.match(app,/presentationIdForHunterStage\(stage\)/);
  assert.match(css,/\.hunter-career-stage\[tabindex\]:focus-visible/);
});

test('C2-160 senior-guide presentation covers live events, typed stages and refusal/cooperation choice states',()=>{
  const relationship=catalog.definitions.relationships?.find(item=>item.id==='hunter.senior-guide');
  assert.ok(relationship);
  assert.deepEqual([...HUNTER_RELATIONSHIP_STAGES],relationship.stages);

  for(const stage of HUNTER_RELATIONSHIP_STAGES){
    const id=presentationIdForHunterRelationshipStage(stage);
    assertLocalizedMedia(id);
    const label=`presentation.hunter.relationship.stage.${stage}.label`;
    assert.ok(localization[label]?.ru?.trim(),label+' ru');
    assert.ok(localization[label]?.en?.trim(),label+' en');
  }

  for(const eventId of HUNTER_RELATIONSHIP_EVENT_IDS){
    const event=catalog.events.find(item=>item.id===eventId);
    assert.ok(event,eventId);
    assert.equal(event.sourceDomain,'hunter',eventId+' source domain');
    const id=presentationIdForEvent(catalog,eventId,'default');
    assertLocalizedMedia(id);
  }

  assert.match(app,/data-hunter-relationship-event=/);
  assert.match(app,/data-hunter-choice-state=/);
  for(const state of ['cooperate','rivalry','refusal','companion-accepted','companion-refused'])assert.match(app,new RegExp(state));
});

test('C2-161 Forest Tavern Farm and Lumber clues have exact live event overrides and qualitative state surfaces',()=>{
  assert.deepEqual([...HUNTER_CLUE_EVENT_IDS],[
    'hunter.clues.forest-trail',
    'hunter.clues.lumber-truth',
    'hunter.clues.tavern-rumour',
    'hunter.clues.farm-sample'
  ]);
  for(const eventId of HUNTER_CLUE_EVENT_IDS){
    const event=catalog.events.find(item=>item.id===eventId);
    assert.ok(event,eventId);
    assertLocalizedMedia(presentationIdForEvent(catalog,eventId,'default'));
  }
  for(const stateId of ['forest-clue','lumber-clue','tavern-clue','farm-clue']){
    assert.ok((HUNTER_STATUS_IDS as readonly string[]).includes(stateId));
    assertLocalizedMedia(presentationIdForHunterState(stateId));
  }
  const hunterPublishedIds=Object.keys(presentation.slots??{}).filter(id=>id.includes('hunter')||id.startsWith('activity/expedition/'));
  assert.equal(hunterPublishedIds.some(id=>id.startsWith('job/merchant/')||id.startsWith('job/guard/')),false);
});

test('C2-162 Hunter gear and expedition route/result surfaces use only live items and Activity identities',()=>{
  const activity=catalog.definitions.activities.find(item=>item.id==='hunter.expedition');
  assert.ok(activity);
  assert.equal(activity.entryEnergyCost,2);
  assert.deepEqual(activity.results.map(result=>result.outcome),[...HUNTER_EXPEDITION_OUTCOMES]);

  const expectedItems:Record<string,string>={
    rope_kit:'cross_rough_route',
    field_preservation_kit:'preserve_specimen'
  };
  for(const itemId of HUNTER_ITEM_IDS){
    const item=catalog.definitions.itemDefinitions.find(item=>item.id===itemId);
    assert.ok(item,itemId);
    assert.ok(item.capabilities.includes(expectedItems[itemId]!),itemId+' capability');
    assertLocalizedMedia(presentationIdForHunterItem(itemId));
  }

  assertLocalizedMedia(presentationIdForActivityRoute(catalog,'hunter.expedition',null));
  for(const route of HUNTER_EXPEDITION_ROUTES){
    assert.ok(activity.options.some(option=>option.setRoute===route),route+' live route');
    assertLocalizedMedia(presentationIdForActivityRoute(catalog,'hunter.expedition',route));
  }
  for(const outcome of HUNTER_EXPEDITION_OUTCOMES){
    assert.ok(activity.results.some(result=>result.outcome===outcome),outcome+' live result');
    assertLocalizedMedia(`activity/expedition/return/${outcome}`);
  }
  for(const eventId of HUNTER_ITEM_EVENT_IDS)assertLocalizedMedia(presentationIdForEvent(catalog,eventId,'default'));

  assert.match(app,/activityEntryList\(\['lumber\.forest','hunter\.expedition'\]\)/);
  assert.match(app,/ui\.hunter\.expedition\.route\./);
});

test('C2-163 only the authorized live Hunter School consumer receives Hunter School event presentation',()=>{
  const liveHunterSchool=catalog.events.filter(event=>event.id.startsWith('hunter.school.'));
  assert.deepEqual(liveHunterSchool.map(event=>event.id),['hunter.school.field-craft']);
  assert.deepEqual([...HUNTER_SCHOOL_EVENT_IDS],['hunter.school.field-craft']);
  const id=presentationIdForEvent(catalog,'hunter.school.field-craft','default');
  assertLocalizedMedia(id);

  for(const inventedEventId of ['hunter.school.arcana','hunter.school.literacy','hunter.school.physical-training']){
    const inventedPresentationId=`job/hunter/event/${inventedEventId.replace(/[^a-z0-9_-]+/g,'-')}/default`;
    assert.equal(presentation.slots?.[inventedPresentationId],undefined,inventedEventId+' must not have a presentation slot');
  }
});

test('C2-164 late Hunter route presentation stays distinct from exact D41 ending cards',()=>{
  for(const eventId of HUNTER_ROUTE_EVENT_IDS){
    const event=catalog.events.find(item=>item.id===eventId);
    assert.ok(event,eventId);
    assertLocalizedMedia(presentationIdForEvent(catalog,eventId,'default'));
  }
  for(const stateId of ['master-ready','warden-ready','legend-ready','rare-contract-active']){
    assertLocalizedMedia(presentationIdForHunterState(stateId));
  }

  const hunterEndings=catalog.definitions.endings.filter(ending=>ending.id.includes('hunter'));
  assert.deepEqual(hunterEndings.map(ending=>ending.id),[
    'ending.hunter.hard-work','ending.hunter.master-hunter','ending.hunter.warden','ending.hunter.legend'
  ]);
  for(const ending of hunterEndings){
    const id=presentationIdForEnding(ending.id);
    assertLocalizedMedia(id);
    assert.ok(presentation.slots[id]?.static,id+' static');
  }
});

test('C2-165 Hunter Hard Work remains localized alongside D41 advanced ending surfaces',()=>{
  const endingId='ending.hunter.hard-work';
  assert.ok(catalog.definitions.endings.some(ending=>ending.id===endingId));
  const id=presentationIdForEnding(endingId);
  assert.equal(id,'ending/hunter/hard-work');
  assertLocalizedMedia(id);
  for(const key of [`ending.${endingId}.title`,`ending.${endingId}.description`]){
    assert.ok(localization[key]?.ru?.trim(),key+' ru');
    assert.ok(localization[key]?.en?.trim(),key+' en');
  }
});

test('C2-166 all Hunter v15 surfaces have RU EN alt-caption parity and animation-off static safety',()=>{
  const checked=applyPresentation(catalog,presentation);
  const hunterSlots=Object.entries<any>(presentation.slots??{}).filter(([id])=>id.includes('hunter')||id.startsWith('activity/expedition/'));
  assert.ok(hunterSlots.length>=55,'complete Hunter v15 surface count');

  for(const [id,slot] of hunterSlots){
    assert.ok(slot.static,id+' static');
    assert.ok(existsSync(slot.static.src),id+' '+slot.static.src);
    assert.ok(slot.static.altKey,id+' altKey');
    const caption=slot.static.altKey.replace(/\.alt$/,'.caption');
    for(const key of [slot.static.altKey,caption]){
      assert.ok(localization[key]?.ru?.trim(),key+' ru');
      assert.ok(localization[key]?.en?.trim(),key+' en');
    }
    const off=resolvePresentation(checked,presentation,id,{animationsEnabled:false,occurrenceKey:'c2-166'});
    assert.equal(off.textOnly,false,id);
    assert.equal(off.selected?.source,'override-static',id);
    assert.equal(off.selected?.src,slot.static.src,id);
  }

  assert.match(css,/\.hunter-career-stage\[tabindex\]:focus-visible/);
  assert.match(css,/\.hunter-relationship-stage\[tabindex\]:focus-visible/);
  assert.match(css,/\.hunter-item-chip\[tabindex\]:focus-visible/);
  assert.match(css,/\.hunter-state-chip\[tabindex\]:focus-visible/);
});

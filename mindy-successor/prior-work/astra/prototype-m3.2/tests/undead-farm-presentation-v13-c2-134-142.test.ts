import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

import {
  applyPresentation,
  presentationIdForEnding,
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
import {catalog} from './helpers.ts';

const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));
const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const app=readFileSync('src/ui/app.ts','utf8');
const css=readFileSync('src/ui/style.css','utf8');

test('C2-134 seasonal Undead Farm shift surfaces keep three project-owned GIF candidates plus static fallback',()=>{
  const checked=applyPresentation(catalog,presentation);
  for(const season of ['spring','summer','autumn','winter']){
    const id=`job/undead-farm/shift/${season}/default`;
    const slot=presentation.slots[id];
    assert.ok(slot?.static,id+' static');
    assert.equal(slot.pool?.candidates.length,3,id+' pool');
    assert.ok(existsSync(slot.static.src),slot.static.src);
    for(const candidate of slot.pool.candidates)assert.ok(existsSync(candidate.src),candidate.src);
    const off=resolvePresentation(checked,presentation,id,{animationsEnabled:false,occurrenceKey:'c2-134'});
    assert.equal(off.selected?.source,'override-static',id);
    assert.equal(off.selected?.src,slot.static.src,id);
  }
});

test('C2-135 all eight contract career stages have stable static presentation and RU EN labels',()=>{
  assert.equal(UNDEAD_FARM_PRESENTATION_STAGES.length,8);
  const known=new Set(presentationSlots(catalog).map(slot=>slot.id));
  for(const stage of UNDEAD_FARM_PRESENTATION_STAGES){
    const id=presentationIdForUndeadFarmStage(stage);
    const slot=presentation.slots[id];
    assert.ok(known.has(id),id);
    assert.ok(slot?.static,id+' static');
    assert.ok(existsSync(slot.static.src),slot.static.src);
    const label=`presentation.undead-farm.stage.${stage}.label`;
    for(const key of [label,slot.static.altKey,slot.static.altKey.replace(/\.alt$/,'.caption')]){
      assert.ok(localization[key]?.ru?.trim(),key+' ru');
      assert.ok(localization[key]?.en?.trim(),key+' en');
    }
  }
  assert.match(app,/presentationIdForUndeadFarmStage\(undeadFarmStage\)/);
  assert.match(app,/data-undead-farm-stage=/);
  assert.match(app,/data-stage-presentation-id=/);
});

test('C2-136 production and specimen resource feedback has stable semantic slots and accessible static fallback',()=>{
  assert.deepEqual([...UNDEAD_FARM_RESOURCE_IDS],[
    'farm_produce','farm_unstable_specimen','farm_preserved_specimen','farm_delivery_input'
  ]);
  const known=new Set(presentationSlots(catalog).map(slot=>slot.id));
  for(const itemId of UNDEAD_FARM_RESOURCE_IDS){
    const id=presentationIdForUndeadFarmResource(itemId);
    const slot=presentation.slots[id];
    assert.ok(known.has(id),id);
    assert.ok(slot?.static,id+' static');
    assert.ok(localization[slot.static.altKey]?.ru?.trim(),slot.static.altKey+' ru');
    assert.ok(localization[slot.static.altKey]?.en?.trim(),slot.static.altKey+' en');
    const caption=slot.static.altKey.replace(/\.alt$/,'.caption');
    assert.ok(localization[caption]?.ru?.trim(),caption+' ru');
    assert.ok(localization[caption]?.en?.trim(),caption+' en');
    assert.ok(localization[`item.${itemId}.label`]?.ru?.trim(),itemId+' item ru');
    assert.ok(localization[`item.${itemId}.label`]?.en?.trim(),itemId+' item en');
  }
});

test('C2-137 Farm Keeper and Night surfaces preserve role-only identity and explicit refusal presentation',()=>{
  const known=new Set(presentationSlots(catalog).map(slot=>slot.id));
  for(const eventId of UNDEAD_FARM_RELATIONSHIP_EVENT_IDS){
    const id=presentationIdForUndeadFarmRelationshipEvent(eventId);
    const slot=presentation.slots[id];
    assert.ok(known.has(id),id);
    assert.ok(slot?.static,id+' static');
    assert.ok(localization[`event.${eventId}.title`]?.ru?.trim(),eventId+' title ru');
    assert.ok(localization[`event.${eventId}.title`]?.en?.trim(),eventId+' title en');
  }
  for(const eventId of UNDEAD_FARM_NIGHT_EVENT_IDS){
    const id=presentationIdForUndeadFarmCareerEvent(eventId);
    assert.ok(known.has(id),id);
    assert.ok(presentation.slots[id]?.static,id+' static');
  }
  for(const key of [
    'event.undead-farm.keeper.trust.choice.decline-night.label',
    'event.undead-farm.keeper.request.choice.decline.label',
    'nightChoice.undead-farm.night.keeper-request.label',
    'nightChoice.undead-farm.night.process-notes.label'
  ]){
    assert.ok(localization[key]?.ru?.trim(),key+' ru');
    assert.ok(localization[key]?.en?.trim(),key+' en');
  }
  assert.match(app,/data-undead-farm-keeper-state=/);
  assert.match(app,/data-undead-farm-choice-state=/);
  assert.match(app,/data-undead-farm-night-option=/);
  assert.match(app,/night-refusal/);
  assert.match(app,/request-refusal/);
  assert.doesNotMatch(JSON.stringify(localization).toLowerCase(),/undead-farm\.keeper\.name/);
});

test('C2-138 exact School hook events keep exact production IDs and localized static presentation',()=>{
  assert.deepEqual([...UNDEAD_FARM_SCHOOL_EVENT_IDS],[
    'undead-farm.school.arcana-research',
    'undead-farm.school.management-records'
  ]);
  for(const eventId of UNDEAD_FARM_SCHOOL_EVENT_IDS){
    const id=presentationIdForUndeadFarmCareerEvent(eventId);
    const slot=presentation.slots[id];
    assert.ok(slot?.static,id);
    for(const key of [
      `event.${eventId}.title`,
      `event.${eventId}.variant.default.text`,
      `event.${eventId}.choice.apply.label`,
      `event.${eventId}.choice.apply.text`,
      slot.static.altKey,
      slot.static.altKey.replace(/\.alt$/,'.caption')
    ]){
      assert.ok(localization[key]?.ru?.trim(),key+' ru');
      assert.ok(localization[key]?.en?.trim(),key+' en');
    }
  }
});

test('C2-139 Forest Activity return seam has exact static presentation without Activity runtime changes',()=>{
  assert.deepEqual([...UNDEAD_FARM_ACTIVITY_EVENT_IDS],['undead-farm.activity.forest-return']);
  const id=presentationIdForUndeadFarmCareerEvent('undead-farm.activity.forest-return');
  const slot=presentation.slots[id];
  assert.ok(slot?.static,id);
  for(const key of [
    'event.undead-farm.activity.forest-return.title',
    'event.undead-farm.activity.forest-return.variant.default.text',
    'event.undead-farm.activity.forest-return.choice.compare.label',
    slot.static.altKey,
    slot.static.altKey.replace(/\.alt$/,'.caption')
  ]){
    assert.ok(localization[key]?.ru?.trim(),key+' ru');
    assert.ok(localization[key]?.en?.trim(),key+' en');
  }
});

test('C2-140 crisis presentation covers three systemic families and defer without hidden-value claims',()=>{
  assert.deepEqual([...UNDEAD_FARM_CRISIS_EVENT_IDS],['undead-farm.crisis.supply-labor-containment']);
  const id=presentationIdForUndeadFarmCareerEvent('undead-farm.crisis.supply-labor-containment');
  const slot=presentation.slots[id];
  assert.ok(slot?.static,id+' static');
  assert.equal(slot.pool,undefined,id+' remains static-only');
  for(const choice of ['stabilize-production','contain-and-study','trust-network','defer']){
    for(const suffix of ['label','text']){
      const key=`event.undead-farm.crisis.supply-labor-containment.choice.${choice}.${suffix}`;
      assert.ok(localization[key]?.ru?.trim(),key+' ru');
      assert.ok(localization[key]?.en?.trim(),key+' en');
    }
    const feedback=`ui.undeadFarm.crisisFeedback.${choice}`;
    assert.ok(localization[feedback]?.ru?.trim(),feedback+' ru');
    assert.ok(localization[feedback]?.en?.trim(),feedback+' en');
  }
  assert.match(app,/undeadFarmPresentationFeedback/);
  assert.match(app,/undead-farm\.crisis\.supply-labor-containment/);
});

test('C2-141 four current Undead Farm endings have distinct stable static presentation identities',()=>{
  const known=new Set(presentationSlots(catalog).map(slot=>slot.id));
  for(const endingId of UNDEAD_FARM_ENDING_IDS){
    const id=presentationIdForEnding(endingId);
    const slot=presentation.slots[id];
    assert.ok(known.has(id),id);
    assert.ok(slot?.static,id+' static');
    assert.ok(existsSync(slot.static.src),slot.static.src);
    assert.ok(localization[`ending.${endingId}.title`]?.ru?.trim(),endingId+' title ru');
    assert.ok(localization[`ending.${endingId}.title`]?.en?.trim(),endingId+' title en');
    assert.ok(localization[`ending.${endingId}.description`]?.ru?.trim(),endingId+' description ru');
    assert.ok(localization[`ending.${endingId}.description`]?.en?.trim(),endingId+' description en');
    assert.ok(localization[slot.static.altKey]?.ru?.trim(),slot.static.altKey+' ru');
    assert.ok(localization[slot.static.altKey]?.en?.trim(),slot.static.altKey+' en');
    const caption=slot.static.altKey.replace(/\.alt$/,'.caption');
    assert.ok(localization[caption]?.ru?.trim(),caption+' ru');
    assert.ok(localization[caption]?.en?.trim(),caption+' en');
  }
  assert.equal(new Set(UNDEAD_FARM_ENDING_IDS.map(presentationIdForEnding)).size,4);
});

test('C2-142 every Undead Farm static/motion alt key has RU EN parity and caption parity',()=>{
  const slots=Object.entries<any>(presentation.slots??{}).filter(([id])=>id.includes('undead-farm'));
  assert.ok(slots.length>=30);
  for(const [id,slot] of slots){
    const assets=[slot.static,...(slot.pool?.candidates??[]),slot.primary].filter(Boolean);
    for(const asset of assets){
      assert.ok(asset.altKey,id+' altKey');
      assert.ok(localization[asset.altKey]?.ru?.trim(),asset.altKey+' ru');
      assert.ok(localization[asset.altKey]?.en?.trim(),asset.altKey+' en');
      const caption=asset.altKey.replace(/\.alt$/,'.caption');
      assert.ok(localization[caption]?.ru?.trim(),caption+' ru');
      assert.ok(localization[caption]?.en?.trim(),caption+' en');
    }
  }
  assert.match(css,/\.dialogue\[tabindex\]:focus-visible/);
  assert.match(css,/\.undead-farm-stage\[tabindex\]:focus-visible/);
});

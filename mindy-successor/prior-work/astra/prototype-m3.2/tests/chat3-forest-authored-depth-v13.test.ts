import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {catalog,started} from './helpers.ts';
import {dispatch,parseSave} from '../src/core/engine.ts';
import {forestActivityNarrativeKey} from '../src/ui/forestNarrative.ts';
import type {Save} from '../src/core/schema.ts';

const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const results=JSON.parse(readFileSync('content/packs/forest-result-content-bilingual-v2.json','utf8'));
const lumberCross=JSON.parse(readFileSync('content/packs/lumber-cross-production.json','utf8'));

function reload(s:Save){return parseSave(JSON.stringify(s),catalog);}
function finishPending(s:Save){
  while(s.run.pending){
    const pending=s.run.pending;
    const e=catalog.events.find(x=>x.id===pending.eventId)!;
    const choice=e.choices.find(c=>(pending.allowedChoiceIds??[]).includes(c.id))!;
    s=dispatch(s,{type:'choice',id:choice.id},catalog);
  }
  return s;
}
function keyText(key:string,locale:'ru'|'en'){
  const value=localization[key]?.[locale];
  assert.ok(value?.trim(),key+' '+locale);
  return value as string;
}
function prepareLogging(day=0){
  let s=started();
  s.run.calendar.elapsedDays=day;
  s.run.character.stats.reason=4;
  s.run.character.stats.strength=4;
  s.run.character.stats.endurance=4;
  s.run.character.stats.dexterity=4;
  s.run.resources.inventory.field_preservation_kit=1;
  return s;
}
function successfulLogging(s:Save){
  s.run.dayState.energyCurrent=3;
  s=dispatch(s,{type:'enterActivity',id:'lumber.forest'},catalog);
  s=dispatch(s,{type:'activityAction',id:'forest.route.logging-road'},catalog);
  s=dispatch(s,{type:'activityAction',id:'forest.challenge.logging-navigation'},catalog);
  const season=['spring','summer','autumn','winter'][Math.floor((s.run.calendar.elapsedDays%40)/10)];
  const physical={
    spring:'forest.challenge.logging-spring-mud',
    summer:'forest.challenge.logging-summer-deadfall',
    autumn:'forest.challenge.logging-autumn-deadfall',
    winter:'forest.challenge.logging-winter-ruts'
  }[season]!;
  s=dispatch(s,{type:'activityAction',id:physical},catalog);
  s=dispatch(s,{type:'activityAction',id:'forest.challenge.logging-preserve-sample'},catalog);
  s=dispatch(s,{type:'activityAction',id:'advance'},catalog);
  s=dispatch(s,{type:'activityAction',id:'advance'},catalog);
  return s;
}

test('C3-133/C3-134/C3-135/C3-136 authored route and challenge pools are bilingual and use existing IDs',()=>{
  const routeKeys=Object.keys(localization).filter(k=>k.startsWith('presentation.activity.forest.route.')&&/\.v[12]\.text$/.test(k));
  const challengeKeys=Object.keys(localization).filter(k=>k.startsWith('presentation.activity.forest.challenge.')&&/\.v[12]\.text$/.test(k));
  const prepKeys=Object.keys(localization).filter(k=>k.startsWith('presentation.activity.forest.entry.prep.')&&/\.v[12]\.text$/.test(k));
  assert.equal(routeKeys.length,14);
  assert.equal(challengeKeys.length,44);
  assert.equal(prepKeys.length,8);
  for(const key of [...routeKeys,...challengeKeys,...prepKeys]){
    keyText(key,'ru');keyText(key,'en');
  }
  const activity=catalog.definitions.activities.find(x=>x.id==='lumber.forest')!;
  assert.equal(activity.options.length,22);
  assert.deepEqual(activity.options.filter(option=>/^(forest\.detour\.|forest\.tracking\.|forest\.shortcut\.)/.test(option.id)).map(option=>option.id).sort(),
    ['forest.detour.tracking-observe','forest.tracking.cross-check','forest.tracking.informed-risk','forest.tracking.complete','forest.tracking.force-conclusion','forest.tracking.abort','forest.shortcut.triangulated-line'].sort());
  assert.equal(activity.adapter,'counter.v1');
  assert.deepEqual(activity.adapterConfig,{initialEndurance:6,advanceEnduranceCost:2,successAtProgress:6,failAtEndurance:0});
});

test('C3-137/C3-138/C3-140 exact stat/capability solutions select distinct live narrative',()=>{
  let spring=prepareLogging(0);
  spring.run.resources.inventory.rope_kit=1;
  spring=dispatch(spring,{type:'enterActivity',id:'lumber.forest'},catalog);
  spring=dispatch(spring,{type:'activityAction',id:'forest.route.logging-road'},catalog);
  spring=dispatch(spring,{type:'activityAction',id:'forest.challenge.logging-spring-mud'},catalog);
  assert.match(forestActivityNarrativeKey(spring,catalog)!,/logging-spring-mud\.rope/);

  let summer=prepareLogging(10);
  summer.run.resources.inventory.reinforced_axe=1;
  summer=dispatch(summer,{type:'enterActivity',id:'lumber.forest'},catalog);
  summer=dispatch(summer,{type:'activityAction',id:'forest.route.logging-road'},catalog);
  summer=dispatch(summer,{type:'activityAction',id:'forest.challenge.logging-summer-deadfall'},catalog);
  assert.match(forestActivityNarrativeKey(summer,catalog)!,/logging-summer-deadfall\.axe/);

  let hunter=started();
  hunter.run.calendar.elapsedDays=10;
  hunter.run.progression.worldFacts.push('forest.hunter-trail-clue');
  hunter.run.character.stats.wits=4;
  hunter=dispatch(hunter,{type:'enterActivity',id:'lumber.forest'},catalog);
  hunter=dispatch(hunter,{type:'activityAction',id:'forest.route.hunter-trail'},catalog);
  hunter=dispatch(hunter,{type:'activityAction',id:'forest.challenge.hunter-navigation'},catalog);
  assert.match(forestActivityNarrativeKey(hunter,catalog)!,/hunter-navigation\.wits/);

  let boundary=started();
  boundary.run.resources.inventory.old_boundary_token=1;
  boundary.run.character.stats.magic=4;
  boundary.run.character.stats.reason=1;
  boundary=dispatch(boundary,{type:'enterActivity',id:'lumber.forest'},catalog);
  boundary=dispatch(boundary,{type:'activityAction',id:'forest.route.old-boundary'},catalog);
  assert.match(forestActivityNarrativeKey(boundary,catalog)!,/old-boundary\.token/);
  boundary=dispatch(boundary,{type:'activityAction',id:'forest.challenge.boundary-interpretation'},catalog);
  assert.match(forestActivityNarrativeKey(boundary,catalog)!,/boundary-interpretation\.magic/);

  let preserve=prepareLogging();
  preserve=dispatch(preserve,{type:'enterActivity',id:'lumber.forest'},catalog);
  preserve=dispatch(preserve,{type:'activityAction',id:'forest.route.logging-road'},catalog);
  preserve=dispatch(preserve,{type:'activityAction',id:'forest.challenge.logging-preserve-sample'},catalog);
  assert.match(forestActivityNarrativeKey(preserve,catalog)!,/logging-preserve-sample\.kit/);
});

test('C3-139 every season has visible Logging topology/result feedback without raw thresholds',()=>{
  const expected=['spring','summer','autumn','winter'];
  for(let i=0;i<4;i++){
    let s=started();
    s.run.calendar.elapsedDays=i*10;
    s.run.dayState.energyCurrent=3;
    s=dispatch(s,{type:'enterActivity',id:'lumber.forest'},catalog);
    s=dispatch(s,{type:'activityAction',id:'forest.route.logging-road'},catalog);
    const routeKey=forestActivityNarrativeKey(s,catalog)!;
    assert.match(routeKey,new RegExp('logging-road\\.'+expected[i]+'\\.v[12]\\.text$'));
    for(let n=0;n<3;n++)s=dispatch(s,{type:'activityAction',id:'advance'},catalog);
    assert.equal(s.run.pending?.eventId,'forest-result-content-v1.failure');
    assert.equal(s.run.pending?.variantId,'season-'+expected[i]);
    const ru=keyText(`event.forest-result-content-v1.failure.variant.season-${expected[i]}.text`,'ru');
    const en=keyText(`event.forest-result-content-v1.failure.variant.season-${expected[i]}.text`,'en');
    assert.doesNotMatch(ru,/>=|\b[0-9]+\b/);
    assert.doesNotMatch(en,/>=|\b[0-9]+\b/);
  }
});

test('C3-141 entry acknowledges career, School and equipment preparation through persisted facts/capabilities',()=>{
  const cases=[
    ['career',(s:Save)=>{s.run.progression.careers.lumber={stage:'accepted-hand',shifts:0,counters:{completed_shifts:1},choices:{},facts:['forest-route-surveyed']};}],
    ['school',(s:Save)=>{s.run.progression.worldFacts.push('forest.school-field-notes');}],
    ['equipment',(s:Save)=>{s.run.resources.inventory.rope_kit=1;}]
  ] as const;
  for(const [name,prepare] of cases){
    let s=started();prepare(s);s=dispatch(s,{type:'enterActivity',id:'lumber.forest'},catalog);
    const key=forestActivityNarrativeKey(s,catalog)!;
    assert.match(key,new RegExp('entry\\.prep\\.'+name+'\\.v[12]\\.text$'));
    keyText(key,'ru');keyText(key,'en');
  }
});

test('C3-142 existing Lumber return event has live preparation/equipment aftermath variants',()=>{
  const e=lumberCross.events.find((x:any)=>x.id==='lumber-cross.activity-forest-return');
  assert.ok(e);
  assert.deepEqual(new Set(e.variants.map((v:any)=>v.id)),new Set([
    'career-surveyed','school-field-notes','boundary-token','preservation-kit','reinforced-axe','rope-kit','default'
  ]));
  for(const id of e.variants.map((v:any)=>v.id).filter((id:string)=>id!=='default')){
    keyText(`event.lumber-cross.activity-forest-return.variant.${id}.text`,'ru');
    keyText(`event.lumber-cross.activity-forest-return.variant.${id}.text`,'en');
  }

  let career=prepareLogging();
  career.run.progression.careers.lumber={stage:'accepted-hand',shifts:0,counters:{completed_shifts:1},choices:{},facts:['forest-route-surveyed']};
  career=successfulLogging(career);
  assert.equal(career.run.pending?.eventId,'lumber-cross.activity-forest-return');
  assert.equal(career.run.pending?.variantId,'career-surveyed');
  const frozen=reload(career);
  assert.deepEqual(frozen.run.pending,career.run.pending);

  let school=prepareLogging();
  school.run.progression.worldFacts.push('forest.school-field-notes');
  school=successfulLogging(school);
  assert.equal(school.run.pending?.variantId,'school-field-notes');
});

test('C3-140 result events expose item-specific success/failure/alternate feedback without item consumption',()=>{
  for(const outcome of ['success','escape','failure']){
    const e=results.events.find((x:any)=>x.id===`forest-result-content-v1.${outcome}`);
    for(const id of ['equipment-rope-kit','equipment-preservation-kit','equipment-reinforced-axe','equipment-boundary-token']){
      assert.ok(e.variants.some((v:any)=>v.id===id),outcome+' '+id);
      keyText(`event.${e.id}.variant.${id}.text`,'ru');
      keyText(`event.${e.id}.variant.${id}.text`,'en');
    }
  }

  let s=started();
  s.run.resources.inventory.rope_kit=1;
  const before=structuredClone(s.run.resources.inventory);
  s=dispatch(s,{type:'enterActivity',id:'lumber.forest'},catalog);
  s=dispatch(s,{type:'activityAction',id:'forest.route.logging-road'},catalog);
  for(let i=0;i<3;i++)s=dispatch(s,{type:'activityAction',id:'advance'},catalog);
  assert.equal(s.run.pending?.eventId,'forest-result-content-v1.failure');
  assert.equal(s.run.pending?.variantId,'equipment-rope-kit');
  assert.deepEqual(s.run.resources.inventory,before);
});

test('C3-143 deterministic long-run route/challenge copy rotates while reload and mechanics stay stable',()=>{
  let s=started();
  s.run.character.stats.reason=4;
  const routeKeys=new Set<string>(),challengeKeys=new Set<string>();
  for(let i=0;i<24;i++){
    s.run.dayState.energyCurrent=3;
    s.run.calendar.elapsedDays=0;
    const money=s.run.resources.money;
    const inventory=structuredClone(s.run.resources.inventory);
    s=dispatch(s,{type:'enterActivity',id:'lumber.forest'},catalog);
    s=dispatch(s,{type:'activityAction',id:'forest.route.logging-road'},catalog);
    const routeKey=forestActivityNarrativeKey(s,catalog)!;
    routeKeys.add(routeKey);
    assert.equal(forestActivityNarrativeKey(reload(s),catalog),routeKey);

    const endurance=s.run.flow.activity!.internalState.endurance;
    s=dispatch(s,{type:'activityAction',id:'forest.challenge.logging-navigation'},catalog);
    const challengeKey=forestActivityNarrativeKey(s,catalog)!;
    challengeKeys.add(challengeKey);
    const resumed=reload(s);
    assert.equal(forestActivityNarrativeKey(resumed,catalog),challengeKey);
    assert.equal(resumed.run.flow.activity?.internalState.progress,1);
    assert.equal(resumed.run.flow.activity?.internalState.endurance,endurance);
    assert.equal(resumed.run.flow.activity?.internalState.routeId,'logging-road');
    assert.deepEqual(resumed.run.resources.inventory,inventory);
    assert.equal(resumed.run.resources.money,money);

    s=dispatch(resumed,{type:'activityAction',id:'escape'},catalog);
    const pending=structuredClone(s.run.pending);
    assert.ok(pending);
    assert.deepEqual(reload(s).run.pending,pending);
    s=finishPending(s);
  }
  assert.ok(routeKeys.size>=2,[...routeKeys].join(','));
  assert.ok(challengeKeys.size>=2,[...challengeKeys].join(','));
});

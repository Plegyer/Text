import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {
  dispatch,
  freshSave,
  palaceRunQualified,
  parseSave
} from '../src/core/engine.ts';
import {palaceNewStartQualified} from '../src/core/hardWorkMeta.ts';
import {
  PALACE_ACCESS_FACT,
  PALACE_D23_QUALIFIED_FACT,
  PALACE_TRUE_ENDING_STAT_THRESHOLD,
  markPalaceCreationQualification,
  palaceCap200Copy,
  palaceHasAccess,
  palaceTrueEndingStatsReady
} from '../src/core/palace.ts';
import {ordinaryHardWorkCareers,stats,type Save,type Stat} from '../src/core/schema.ts';
import {catalog,rawPacks} from './helpers.ts';

const all=[...ordinaryHardWorkCareers];
const nine=ordinaryHardWorkCareers.slice(0,9);
const localization=JSON.parse(readFileSync('content/localization.json','utf8'));

function allocateTen(input:Save){
  let s=input;
  for(let i=0;i<10;i++)s=dispatch(s,{type:'allocate',stat:'strength',delta:1},catalog);
  return s;
}

function select(input:Save,careers:readonly typeof ordinaryHardWorkCareers[number][]){
  let s=input;
  for(const career of careers)s=dispatch(s,{type:'setHardWorkPackageActive',career,active:true},catalog);
  return s;
}

function finish(input:Save){
  return dispatch(allocateTen(input),{type:'finishCreation'},catalog);
}

function qualifiedBeforeFinish(){
  return select(freshSave({hardWorkProgress:all}),all);
}

function factCount(s:Save,fact:string){
  return s.run.progression.worldFacts.filter(value=>value===fact).length;
}

test('Palace consumer uses the frozen shared D23 predicate rather than a second gate implementation',()=>{
  let s=freshSave({hardWorkProgress:all});
  assert.equal(palaceRunQualified(s),false);

  s=select(s,all);
  assert.equal(palaceRunQualified(s),true);
  assert.equal(
    palaceNewStartQualified({
      earnedHardWork:s.meta.hardWorkProgress,
      activePackages:s.run.creation.activeHardWorkPackages
    }),
    true
  );

  const beforeStats=structuredClone(s.run.character.stats);
  const beforeLust=s.run.character.lust;
  assert.equal(markPalaceCreationQualification(s),true);
  assert.deepEqual(s.run.character.stats,beforeStats);
  assert.equal(s.run.character.lust,beforeLust);
  assert.equal(factCount(s,PALACE_D23_QUALIFIED_FACT),1);
});

test('D23 9/10, 10/0 and 10/9 do not produce Palace invitation eligibility',()=>{
  const cases=[
    select(freshSave({hardWorkProgress:nine}),nine),
    freshSave({hardWorkProgress:all}),
    select(freshSave({hardWorkProgress:all}),nine)
  ];

  for(const candidate of cases){
    assert.equal(palaceRunQualified(candidate),false);
    const finished=finish(candidate);
    assert.equal(finished.run.progression.worldFacts.includes(PALACE_D23_QUALIFIED_FACT),false);
    assert.equal(finished.run.pending,null);
    assert.equal(palaceHasAccess(finished),false);
  }
});

test('permanent 10/10 plus active 10/10 deterministically opens the Day-1 arrival scene',()=>{
  let s=qualifiedBeforeFinish();
  assert.equal(s.run.calendar.elapsedDays,0);
  assert.equal(palaceRunQualified(s),true);

  s=finish(s);

  assert.equal(s.run.calendar.elapsedDays,0);
  assert.equal(s.run.creation.complete,true);
  assert.equal(s.run.creation.hardWorkPackagesApplied,true);
  assert.deepEqual(s.run.creation.activeHardWorkPackages,all);
  assert.equal(factCount(s,PALACE_D23_QUALIFIED_FACT),1);
  assert.equal(s.run.pending?.eventId,'palace.invitation.day1-arrival');
  assert.equal(s.run.pending?.variantId,'default');
  assert.equal(s.run.historyState.eventHistory['palace.invitation.day1-arrival']?.count,1);
  assert.equal(palaceHasAccess(s),false);
});

test('pending arrival and reveal are reload-safe and invitation history remains exactly once',()=>{
  let s=finish(qualifiedBeforeFinish());
  assert.equal(s.run.pending?.eventId,'palace.invitation.day1-arrival');

  s=parseSave(JSON.stringify(s),catalog);
  assert.equal(s.run.pending?.eventId,'palace.invitation.day1-arrival');
  assert.equal(s.run.historyState.eventHistory['palace.invitation.day1-arrival']?.count,1);

  s=dispatch(s,{type:'choice',id:'open'},catalog);
  assert.equal(s.run.pending?.eventId,'palace.invitation.reveal');
  assert.equal(s.run.historyState.eventHistory['palace.invitation.reveal']?.count,1);

  s=parseSave(JSON.stringify(s),catalog);
  assert.equal(s.run.pending?.eventId,'palace.invitation.reveal');
  assert.equal(s.run.historyState.eventHistory['palace.invitation.day1-arrival']?.count,1);
  assert.equal(s.run.historyState.eventHistory['palace.invitation.reveal']?.count,1);
  assert.equal(palaceHasAccess(s),false);
});

test('acceptance writes one run-local palace.access-granted and reload preserves it',()=>{
  let s=finish(qualifiedBeforeFinish());
  s=dispatch(s,{type:'choice',id:'open'},catalog);
  s=dispatch(s,{type:'choice',id:'accept'},catalog);

  assert.equal(s.run.pending,null);
  assert.equal(palaceHasAccess(s),true);
  assert.equal(factCount(s,PALACE_ACCESS_FACT),1);
  assert.equal(s.meta.unlocks.includes('palace'),false);

  s=parseSave(JSON.stringify(s),catalog);
  assert.equal(palaceHasAccess(s),true);
  assert.equal(factCount(s,PALACE_ACCESS_FACT),1);
  assert.equal(s.run.historyState.eventHistory['palace.invitation.day1-arrival']?.count,1);
  assert.equal(s.run.historyState.eventHistory['palace.invitation.reveal']?.count,1);
});

test('next life loses Palace access and must satisfy D23 again',()=>{
  let s=finish(qualifiedBeforeFinish());
  s=dispatch(s,{type:'choice',id:'open'},catalog);
  s=dispatch(s,{type:'choice',id:'accept'},catalog);
  assert.equal(palaceHasAccess(s),true);

  s=dispatch(s,{type:'restart'},catalog);
  assert.equal(s.run.calendar.elapsedDays,0);
  assert.deepEqual(s.run.creation.activeHardWorkPackages,[]);
  assert.equal(s.run.progression.worldFacts.includes(PALACE_D23_QUALIFIED_FACT),false);
  assert.equal(palaceHasAccess(s),false);
  assert.equal(palaceRunQualified(s),false);
  assert.deepEqual(s.meta.hardWorkProgress,all);
});

test('duplicates, Secret Debt and Palace cannot substitute for a missing ordinary career',()=>{
  const permanent=[...nine,nine[0]!,nine[0]!,'secret-debt','palace'];
  const active=[...nine,nine[0]!,nine[0]!,'secret-debt','palace'];

  assert.equal(
    palaceNewStartQualified({
      earnedHardWork:permanent,
      activePackages:active
    }),
    false
  );

  assert.equal(
    palaceNewStartQualified({
      earnedHardWork:[...all,'secret-debt','palace'],
      activePackages:[...all,'secret-debt','palace']
    }),
    true
  );
});

test('Palace invitation pack has no RNG, stat gate, item gate or alternative access write',()=>{
  const pack=rawPacks.find(item=>item.id==='palace.invitation');
  assert.ok(pack);

  assert.deepEqual(pack.capabilities?.writes?.worldFacts,[PALACE_ACCESS_FACT]);
  assert.equal(pack.events.length,2);

  const arrival=pack.events.find(event=>event.id==='palace.invitation.day1-arrival');
  const reveal=pack.events.find(event=>event.id==='palace.invitation.reveal');
  assert.ok(arrival);
  assert.ok(reveal);

  assert.deepEqual(arrival.reactionTriggers,[{kind:'creationCompleted'}]);
  assert.equal(arrival.delivery.policy,'latched');
  assert.equal(arrival.maxShows,1);
  assert.equal(arrival.blocking,true);
  assert.equal(arrival.chance,undefined);
  assert.equal(arrival.conditions.every(condition=>condition.kind==='worldFact'),true);

  assert.equal(reveal.delivery.policy,'latched');
  assert.equal(reveal.maxShows,1);
  assert.equal(reveal.chance,undefined);
  assert.equal(reveal.conditions.every(condition=>condition.kind==='worldFact'),true);

  const allConditions=[
    ...arrival.conditions,
    ...arrival.variants.flatMap(variant=>variant.conditions),
    ...arrival.choices.flatMap(choice=>choice.conditions),
    ...reveal.conditions,
    ...reveal.variants.flatMap(variant=>variant.conditions),
    ...reveal.choices.flatMap(choice=>choice.conditions)
  ];
  assert.equal(allConditions.some(condition=>condition.kind==='stat'),false);
  assert.equal(allConditions.some(condition=>condition.kind==='itemCount'||condition.kind==='itemCapability'),false);

  const accessWrites=pack.events.flatMap(event=>event.choices)
    .flatMap(choice=>choice.effects)
    .filter(effect=>effect.kind==='addWorldFact'&&effect.fact===PALACE_ACCESS_FACT);
  assert.equal(accessWrites.length,1);
  assert.deepEqual(reveal.choices.find(choice=>choice.id==='accept')?.effects,[{
    kind:'addWorldFact',
    fact:PALACE_ACCESS_FACT
  }]);
});

test('migrated old completed save never receives a retroactive Palace invitation',()=>{
  const seed=freshSave({hardWorkProgress:all,unlocks:['palace']});
  seed.run.creation.remaining=0;
  seed.run.creation.complete=true;

  const raw=JSON.parse(JSON.stringify(seed));
  raw.schemaVersion=4;
  delete raw.run.character.progressionStatCap;
  delete raw.run.character.creation.activeHardWorkPackages;
  delete raw.run.character.creation.hardWorkPackagesApplied;

  const migrated=parseSave(JSON.stringify(raw),catalog);
  assert.equal(migrated.schemaVersion,5);
  assert.deepEqual(migrated.run.creation.activeHardWorkPackages,[]);
  assert.equal(migrated.run.creation.hardWorkPackagesApplied,true);
  assert.equal(migrated.run.progression.worldFacts.includes(PALACE_D23_QUALIFIED_FACT),false);
  assert.equal(palaceHasAccess(migrated),false);
  assert.equal(migrated.run.pending,null);
  assert.equal(migrated.meta.unlocks.includes('palace'),false);
  assert.equal(palaceRunQualified(migrated),false);
});

test('fixed True Ending stat readiness remains all 12 progression stats >=91 with Lust outside the function',()=>{
  const ready=Object.fromEntries(stats.map(stat=>[stat,91])) as Record<Stat,number>;
  assert.equal(PALACE_TRUE_ENDING_STAT_THRESHOLD,91);
  assert.equal(palaceTrueEndingStatsReady(ready),true);

  const low={...ready,strength:90};
  assert.equal(palaceTrueEndingStatsReady(low),false);

  const cap200={...ready,strength:200,magic:180};
  assert.equal(palaceTrueEndingStatsReady(cap200),true);
  assert.equal(Object.keys(ready).length,12);
  assert.equal(Object.prototype.hasOwnProperty.call(ready,'lust'),false);
});

test('Palace cap-200 contribution is copy/semantics only and does not multiply values',()=>{
  assert.match(palaceCap200Copy.en,/maximum of each of the 12 progression stats becomes 200 instead of 100/i);
  assert.match(palaceCap200Copy.en,/not multiplied/i);
  assert.match(palaceCap200Copy.ru,/максимум каждой из 12 характеристик развития становится 200 вместо 100/i);
  assert.match(palaceCap200Copy.ru,/не умножаются/i);
  assert.equal(/stats? double|stats? doubled|doubling stats/i.test(palaceCap200Copy.en),false);

  let s=freshSave({hardWorkProgress:all},{progressionStatCap:200});
  s=select(s,all);
  s=allocateTen(s);
  const before=structuredClone(s.run.character.stats);
  markPalaceCreationQualification(s);
  assert.deepEqual(s.run.character.stats,before,'Palace qualification must not modify or multiply stats');
});

test('v5 invitation/reveal RU/EN localization is bound to the live event identities',()=>{
  const required=[
    'event.palace.invitation.day1-arrival.title',
    'event.palace.invitation.day1-arrival.variant.default.text',
    'event.palace.invitation.day1-arrival.choice.open.label',
    'event.palace.invitation.day1-arrival.choice.open.text',
    'event.palace.invitation.reveal.title',
    'event.palace.invitation.reveal.variant.default.text',
    'event.palace.invitation.reveal.choice.accept.label',
    'event.palace.invitation.reveal.choice.accept.text'
  ];

  for(const key of required){
    const entry=localization.strings[key];
    assert.ok(entry,key);
    assert.ok(entry.ru.length>0,key);
    assert.ok(entry.en.length>0,key);
  }

  assert.equal(localization.strings['event.palace.invitation.day1-arrival.title'].ru,'Письмо в первый день');
  assert.equal(localization.strings['event.palace.invitation.day1-arrival.title'].en,'A Letter on the First Day');
  assert.equal(localization.strings['event.palace.invitation.reveal.choice.accept.label'].en,'Accept the invitation');
});

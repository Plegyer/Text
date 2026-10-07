import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

import {presentationSchema,presentationSlots,resolvePresentation} from '../src/core/presentation.ts';
import {stats} from '../src/core/schema.ts';
import {catalog,rawPacks} from './helpers.ts';

const localization=JSON.parse(readFileSync('content/localization.json','utf8'));
const presentation=presentationSchema.parse(JSON.parse(readFileSync('content/presentation.json','utf8')));
const strings=localization.strings;

const palaceSlotIds=[
  'job/palace/event/palace-invitation-day1-arrival/default',
  'job/palace/event/palace-invitation-reveal/default',
  'job/palace/event/palace-progression-milestone-02-working-rhythm/default',
  'job/palace/event/palace-progression-milestone-05-trusted-service/default',
  'job/palace/event/palace-progression-milestone-08-palace-network/default',
  'job/palace/event/palace-progression-milestone-12-crossroads/default',
  'job/palace/event/palace-progression-milestone-15-outcome-ready/default',
  'job/palace/event/palace-outcome-finalize-service-life/default',
  'job/palace/event/palace-outcome-finalize-court-power/default',
  'job/palace/event/palace-outcome-finalize-inner-truth/default',
  'location/town/palace/confront-prince/default',
  'job/palace/event/palace-prince-confrontation-phase-01-audit-record/default',
  'job/palace/event/palace-prince-confrontation-phase-02-name-contradiction/default',
  'job/palace/event/palace-prince-confrontation-phase-03-define-boundary/default',
  'job/palace/event/palace-prince-confrontation-phase-04-reconstruct-return/default',
  'ending/palace/service-life',
  'ending/palace/court-power',
  'ending/palace/inner-truth',
  'ending/palace/return-home'
];

test('v19 Palace final prose keeps the frozen confrontation mechanics exact',()=>{
  const action=catalog.definitions.actions.find(item=>item.id==='palace.confront-prince')!;
  const quest=catalog.definitions.quests.find(item=>item.id==='palace.prince-confrontation')!;
  const pack=rawPacks.find(item=>item.id==='palace.prince-confrontation')!;

  assert.ok(action);
  assert.ok(quest);
  assert.ok(pack);
  assert.equal(action.mode,'story');
  assert.deepEqual(action.cost,{money:0,energy:0});
  assert.deepEqual(quest.stages,[
    'ready','audit-record','name-contradiction','define-boundary','reconstruct-return','defeated'
  ]);

  const statConditions=action.conditions.filter(condition=>condition.kind==='stat');
  assert.equal(statConditions.length,12);
  assert.deepEqual([...statConditions.map(condition=>condition.stat)].sort(),[...stats].sort());
  for(const condition of statConditions){
    assert.equal(condition.op,'gte');
    assert.equal(condition.value,91);
  }

  const serialized=JSON.stringify({action,quest,pack});
  assert.equal(serialized.toLowerCase().includes('"lust"'),false);
  assert.equal(serialized.includes('itemCapability'),false);
  assert.equal(serialized.includes('schoolCounter'),false);
  assert.equal(serialized.includes('relationshipStage'),false);
  assert.equal(serialized.includes('activityResult'),false);

  assert.equal(pack.events.length,4);
  for(const event of pack.events){
    assert.equal(event.blocking,true);
    assert.equal(event.delivery.policy,'latched');
    assert.equal(event.maxShows,1_000_000);
    assert.equal(event.chance,undefined);
    assert.equal(event.choices.some(choice=>choice.id==='not-yet'),true);
  }

  const defeatWriters=pack.events.flatMap(event=>event.choices)
    .filter(choice=>choice.effects.some(effect=>effect.kind==='addWorldFact'&&effect.fact==='palace.prince-defeated'));
  assert.equal(defeatWriters.length,1);
  assert.equal(defeatWriters[0]!.id,'present-origin-trace');
});

test('v19 Palace prose preserves D45 ambiguity and non-combat meaning',()=>{
  const progression=rawPacks.find(item=>item.id==='palace.progression')!;
  const prince=rawPacks.find(item=>item.id==='palace.prince-confrontation')!;
  const invitation=rawPacks.find(item=>item.id==='palace.invitation')!;

  const inviteText=JSON.stringify(invitation);
  assert.doesNotMatch(inviteText,/Threshold Archive|inter-world Threshold/i);

  const milestones=new Map(progression.events.map(event=>[event.id,event]));
  assert.doesNotMatch(
    milestones.get('palace.progression.milestone-12-crossroads')!.variants[0].text,
    /Threshold Archive|inter-world Threshold/i
  );
  assert.match(
    milestones.get('palace.progression.milestone-15-outcome-ready')!.variants[0].text,
    /Palace Concordance/
  );
  assert.match(
    milestones.get('palace.progression.milestone-15-outcome-ready')!.variants[0].text,
    /Threshold Archive/
  );
  assert.match(
    milestones.get('palace.progression.milestone-15-outcome-ready')!.variants[0].text,
    /do not know what originally displaced you/i
  );

  const princeText=JSON.stringify(prince);
  assert.match(princeText,/not combat/i);
  assert.match(princeText,/original cause/i);
  assert.doesNotMatch(princeText,/god|avatar|slay|kill the prince/i);
});

test('v19 Palace presentation mapping uses only existing neutral project-owned media',()=>{
  const knownSlots=new Set(presentationSlots(catalog).map(slot=>slot.id));
  for(const id of palaceSlotIds){
    assert.equal(knownSlots.has(id),true,id);
    const override=presentation.slots?.[id];
    assert.ok(override,id);
    assert.ok(override.static,id);
    assert.equal(
      ['assets/stage-town.svg','assets/stage-room.svg'].includes(override.static.src),
      true,
      `${id}: ${override.static.src}`
    );
    assert.equal(existsSync(override.static.src),true,override.static.src);
    const resolved=resolvePresentation(catalog,presentation,id,{animationsEnabled:false});
    assert.equal(resolved.textOnly,false,id);
    assert.ok(resolved.selected,id);
    assert.equal(resolved.selected!.source,'override-static',id);
  }
});

test('v19 Palace presentation accessibility keys have RU EN alt and caption',()=>{
  const prefixes=[
    'presentation.static.palace.invitation',
    'presentation.static.palace.service',
    'presentation.static.palace.archive',
    'presentation.static.palace.custodian',
    'presentation.static.palace.return-home'
  ];
  for(const prefix of prefixes){
    for(const suffix of ['alt','caption']){
      const key=`${prefix}.${suffix}`;
      assert.ok(strings[key],key);
      assert.ok(strings[key].ru?.trim(),key+' ru');
      assert.ok(strings[key].en?.trim(),key+' en');
    }
  }
});

test('v19 Palace ending epilogues have final RU EN authored copy',()=>{
  for(const endingId of [
    'ending.palace.service-life',
    'ending.palace.court-power',
    'ending.palace.inner-truth',
    'ending.palace.return-home'
  ]){
    for(const field of ['title','description','epilogue']){
      const key=`ending.${endingId}.${field}`;
      assert.ok(strings[key],key);
      assert.ok(strings[key].ru?.trim(),key+' ru');
      assert.ok(strings[key].en?.trim(),key+' en');
    }
  }

  assert.match(strings['ending.ending.palace.return-home.epilogue'].en,/world behind you/);
  assert.match(strings['ending.ending.palace.return-home.epilogue'].en,/recognize the world you came from/);
  assert.match(strings['ending.ending.palace.inner-truth.epilogue'].en,/refuse to invent the missing cause/);
});

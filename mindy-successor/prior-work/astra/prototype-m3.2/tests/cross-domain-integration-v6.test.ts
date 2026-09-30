import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {actionAvailable,availableActivityActions,calendar,dispatch,eligible,parseSave} from '../src/core/engine.ts';
import {SCHOOL_COURSES} from '../src/core/school.ts';
import {schoolTeacherReactionBinding} from '../src/ui/schoolReactive.ts';
import {forestResultDepthLocalizationKey,forestRouteDepthLocalizationKey} from '../src/ui/forestDepth.ts';
import {povertyPendingLocalizationKey} from '../src/ui/povertyDepth.ts';
import type {Save} from '../src/core/schema.ts';
import {catalog,started} from './helpers.ts';

const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;

function reload(state:Save){
  return parseSave(JSON.stringify(state),catalog);
}

function resolvePending(input:Save){
  let s=input;
  let guard=0;
  while(s.run.pending){
    if(++guard>12)throw new Error('cross-domain pending loop');
    const event=catalog.events.find(item=>item.id===s.run.pending!.eventId);
    assert.ok(event,s.run.pending.eventId);
    const allowed=s.run.pending.allowedChoiceIds??event.choices.map(choice=>choice.id);
    const choice=event.choices.find(item=>allowed.includes(item.id)&&eligible(item.conditions,s,catalog));
    assert.ok(choice,event.id);
    s=dispatch(s,{type:'choice',id:choice.id},catalog);
  }
  return s;
}

test('C1D-59 one current-main Save keeps starter, School, Forest and poverty integration coherent',()=>{
  let s=started();

  for(const id of ['lumber.shift','satyr-maid.shift','undead-farm.shift']){
    const action=catalog.definitions.actions.find(item=>item.id===id);
    assert.ok(action,id);
    assert.equal(actionAvailable(action,s,catalog),true,id);
  }
  for(const id of ['tavern.shift','hunter.shift','guard.shift','merchant.shift','artist-geisha.shift','assassin.shift','prostitute.shift']){
    const action=catalog.definitions.actions.find(item=>item.id===id);
    assert.ok(action,id);
    assert.deepEqual(action.conditions,[],id);
    assert.equal(actionAvailable(action,s,catalog),false,id);
  }

  s=reload(s);
  s.run.resources.money=1000;
  const rhetoric=SCHOOL_COURSES.find(course=>course.id==='school.course.rhetoric_and_social');
  assert.ok(rhetoric);
  s=dispatch(s,{type:'schoolLesson',id:rhetoric.id},catalog);
  assert.equal(s.run.lastAction?.presentationId,rhetoric.presentationId);
  assert.equal(schoolTeacherReactionBinding(rhetoric.id).teacherContentId,'school.teacher.cassian-reed');
  assert.equal(s.run.progression.worldFacts.includes('lumber.school.management-ready'),false);
  s=resolvePending(s);

  s=reload(s);
  assert.equal(
    s.run.progression.school.tracks['school.track.rhetoric_and_social']?.counters.lessons_completed,
    1
  );
  assert.equal(s.run.progression.worldFacts.includes('lumber.school.management-ready'),false);

  const season=calendar(s.run.day).season;
  s=dispatch(s,{type:'enterActivity',id:'lumber.forest'},catalog);
  assert.ok(availableActivityActions(s,catalog).some(action=>action.id==='forest.route.logging-road'));
  s=dispatch(s,{type:'activityAction',id:'forest.route.logging-road'},catalog);
  assert.equal(s.run.flow.activity?.internalState.routeId,'logging-road');
  const routeKey=forestRouteDepthLocalizationKey(
    'logging-road',
    season,
    s.run.flow.activity?.internalState.steps??0
  );
  assert.ok(routeKey);
  assert.ok(localization[routeKey]?.ru?.trim());
  assert.ok(localization[routeKey]?.en?.trim());

  s=reload(s);
  s=dispatch(s,{type:'activityAction',id:'advance'},catalog);
  s=reload(s);
  s=dispatch(s,{type:'activityAction',id:'advance'},catalog);
  assert.equal(s.run.flow.activity,null);
  assert.ok(s.run.progression.worldFacts.includes('lumber.forest.truth-known'));
  assert.equal(s.run.flow.pendingScene?.eventId,'lumber-cross.activity-forest-return');
  assert.equal(
    forestResultDepthLocalizationKey('forest-result-content-v1.success',1),
    'presentation.activity.forest.success-aftermath-v2.evidence-order.text'
  );

  s=dispatch(s,{type:'choice',id:'continue'},catalog);
  assert.ok(s.run.progression.careers.lumber?.facts.includes('forest-truth-known'));
  assert.ok(s.run.progression.careers.lumber?.facts.includes('forest-problem-resolved'));

  const povertyPacks=catalog.packs.filter(pack=>pack.id.startsWith('poverty-'));
  const serializedPoverty=JSON.stringify(povertyPacks);
  assert.equal(/secret.?debt|lender|slave/i.test(serializedPoverty),false);
  const debtWrites=povertyPacks
    .flatMap(pack=>pack.events)
    .flatMap(event=>event.choices)
    .flatMap(choice=>choice.effects)
    .filter(effect=>effect.kind==='metric'&&effect.key==='debt');
  assert.equal(debtWrites.length,0);

  const povertyKey=povertyPendingLocalizationKey(
    'poverty-cheap-production-v2.shared-room-seasons',
    'spring-window',
    4
  );
  assert.equal(
    povertyKey,
    'presentation.poverty.contact-recovery-v2.shared-room.spring-routine.text'
  );
  assert.ok(localization[povertyKey]?.ru?.trim());
  assert.ok(localization[povertyKey]?.en?.trim());

  const finalReload=reload(s);
  assert.deepEqual(finalReload.run.progression.school,s.run.progression.school);
  assert.deepEqual(finalReload.run.progression.careers,s.run.progression.careers);
  assert.deepEqual(finalReload.run.progression.worldFacts,s.run.progression.worldFacts);
  assert.equal(finalReload.run.progression.worldFacts.includes('lumber.school.management-ready'),false);
});

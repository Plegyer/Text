import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {actionAvailable,dispatch,parseSave} from '../src/core/engine.ts';
import {forestRouteDepthLocalizationKey} from '../src/ui/forestDepth.ts';
import {povertyPendingLocalizationKey} from '../src/ui/povertyDepth.ts';
import {schoolTeacherReactionBinding} from '../src/ui/schoolReactive.ts';
import {catalog,started} from './helpers.ts';

const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const povertyPackPaths=[
  'content/packs/poverty-street-production.json',
  'content/packs/poverty-street-production-v2.json',
  'content/packs/poverty-cheap-production.json',
  'content/packs/poverty-cheap-production-v2.json',
  'content/packs/poverty-recovery-production.json',
  'content/packs/poverty-pressure-production.json'
];

test('C1D-59 cross-domain current-main integration stays on existing identities and survives reload',()=>{
  let s=started();

  for(const id of ['lumber.shift','satyr-maid.shift','undead-farm.shift']){
    const action=catalog.definitions.actions.find(item=>item.id===id);
    assert.ok(action,id);
    assert.equal(actionAvailable(action,s,catalog),true,id);
  }
  for(const id of ['tavern.shift','hunter.shift','guard.shift','merchant.shift','artist-geisha.shift','assassin.shift','prostitute.shift']){
    const action=catalog.definitions.actions.find(item=>item.id===id);
    assert.ok(action,id);
    assert.deepEqual(action.conditions,[],id+' current authored conditions');
    assert.equal(actionAvailable(action,s,catalog),false,id);
  }

  s.run.resources.money=2_000;
  s=dispatch(s,{type:'schoolLesson',id:'school.course.rhetoric_and_social'},catalog);
  assert.equal(s.run.lastAction?.presentationId,'school/rhetoric-and-social/lesson/default');
  assert.equal(s.run.progression.worldFacts.includes('lumber.school.management-ready'),false);
  const schoolBinding=schoolTeacherReactionBinding('school.course.rhetoric_and_social');
  assert.equal(schoolBinding.teacherContentId,'school.teacher.cassian-reed');
  assert.ok(localization[schoolBinding.bodyKey]?.ru?.trim());
  assert.ok(localization[schoolBinding.bodyKey]?.en?.trim());

  s=dispatch(s,{type:'enterActivity',id:'lumber.forest'},catalog);
  s=dispatch(s,{type:'activityAction',id:'forest.route.logging-road'},catalog);
  const forestKey=forestRouteDepthLocalizationKey('logging-road','spring');
  assert.equal(forestKey,'presentation.activity.forest.logging-road-depth.spring.meltwater.text');
  assert.ok(localization[forestKey!]?.ru?.trim());
  assert.ok(localization[forestKey!]?.en?.trim());

  s=dispatch(s,{type:'activityAction',id:'advance'},catalog);
  s=dispatch(s,{type:'activityAction',id:'advance'},catalog);
  assert.equal(s.run.flow.activity,null);
  assert.ok(s.run.progression.worldFacts.includes('lumber.forest.truth-known'));
  assert.equal(s.run.pending?.eventId,'lumber-cross.activity-forest-return');
  s=dispatch(s,{type:'choice',id:'continue'},catalog);
  assert.equal(s.run.pending,null);
  assert.ok(s.run.progression.careers.lumber?.facts.includes('forest-truth-known'));
  assert.ok(s.run.progression.careers.lumber?.facts.includes('forest-problem-resolved'));

  const povertyKey=povertyPendingLocalizationKey('poverty-street-production.neutral-autumn','default',1);
  assert.equal(povertyKey,'presentation.poverty.recovery-depth-v5.street.autumn-no-milestone.text');
  assert.ok(localization[povertyKey!]?.ru?.trim());
  assert.ok(localization[povertyKey!]?.en?.trim());

  for(const path of povertyPackPaths){
    const pack=JSON.parse(readFileSync(path,'utf8'));
    const serialized=JSON.stringify(pack);
    assert.equal(/secret.?debt|lender/i.test(serialized),false,path);
    const debtWrites=pack.events
      .flatMap((event:any)=>event.choices)
      .flatMap((choice:any)=>choice.effects)
      .filter((effect:any)=>effect.kind==='metric'&&effect.key==='debt');
    assert.equal(debtWrites.length,0,path);
  }

  const reload1=parseSave(JSON.stringify(s),catalog);
  const reload2=parseSave(JSON.stringify(reload1),catalog);
  assert.deepEqual(reload1.run.progression,s.run.progression);
  assert.deepEqual(reload2.run.progression,s.run.progression);
  assert.deepEqual(reload2.run.lastAction,s.run.lastAction);
  assert.equal(reload2.run.endings.eligible.includes('ending.lumber.forest'),true);
});

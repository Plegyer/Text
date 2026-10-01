import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {schoolNightStudyChoice} from '../src/core/school.ts';

const inventory=JSON.parse(readFileSync('content/school-hunter-v15-live-inventory.fixture.json','utf8'));
const definitions=JSON.parse(readFileSync('content/definitions.json','utf8'));
const base=JSON.parse(readFileSync('content/packs/base.json','utf8'));

test('C5-162 authoritative Field Craft hook is produced by the existing zero-Energy field-kit action, not a new threshold',()=>{
  const field=inventory.hooks.find((x:any)=>x.role==='navigation_preparation');
  assert.ok(field);
  assert.equal(field.reactionEvent,'hunter.school.field-craft');
  assert.equal(field.threshold,null);
  assert.deepEqual(field.authorizedCondition,{kind:'worldFact',fact:'forest.school-field-notes',present:true});

  const action=definitions.actions.find((x:any)=>x.id==='forest.collect-field-kit');
  assert.ok(action);
  assert.equal(action.cost.energy,0);
  assert.ok(action.conditions.some((x:any)=>x.kind==='flag'&&x.key==='school.enrolled'&&x.value===true));
  assert.ok(action.effects.some((x:any)=>x.kind==='addWorldFact'&&x.fact==='forest.school-field-notes'));
});

test('C5-162 paid School enrollment is the existing prerequisite for collecting Field Craft notes',()=>{
  const event=base.events.find((x:any)=>x.id==='base.school');
  assert.ok(event);
  assert.ok(event.trigger.includes('school'));
  const listen=event.choices.find((x:any)=>x.id==='listen');
  assert.ok(listen);
  assert.ok(listen.effects.some((x:any)=>x.kind==='flag'&&x.key==='school.enrolled'&&x.value===true));
});

test('C5-163 Night-study alone cannot manufacture forest.school-field-notes or a numeric Hunter threshold',()=>{
  const field=inventory.hooks.find((x:any)=>x.role==='navigation_preparation');
  assert.ok(field);
  for(const stat of ['dexterity','wits','creativity'] as const){
    const choice=schoolNightStudyChoice('school.course.field_craft',stat);
    assert.equal(choice.effects.some((x:any)=>x.kind==='flag'&&x.key==='school.enrolled'),false,stat);
    assert.equal(choice.effects.some((x:any)=>x.kind==='addWorldFact'&&x.fact==='forest.school-field-notes'),false,stat);
    assert.ok(choice.effects.some((x:any)=>x.kind==='incrementSchoolCounter'&&x.counter==='night_study_sessions'),stat);
  }
  assert.equal(field.nightParityStatus,'BLOCKED_NIGHT_STUDY_DOES_NOT_PRODUCE_FIELD_NOTES');
  assert.equal(inventory.localHookPolicy.nightParityThreshold,null);
});

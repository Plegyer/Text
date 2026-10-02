import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {
  palaceActivityReadInputs,
  palaceCalendarThemes,
  palaceItemCapabilityRoles,
  palaceRelationshipRoles,
  palaceSchoolReadInputs
} from '../src/core/palace.ts';

const schoolSource=readFileSync('src/core/school.ts','utf8');
const definitions=JSON.parse(readFileSync('content/definitions.json','utf8'));

test('Palace School seams read only current shipped course identities',()=>{
  assert.deepEqual(palaceSchoolReadInputs,[
    'school.course.literacy_and_numbers',
    'school.course.etiquette_and_presentation',
    'school.course.arcana',
    'school.course.rhetoric_and_social'
  ]);
  for(const id of palaceSchoolReadInputs)assert.ok(schoolSource.includes(id),id);
});

test('Palace Activity seams use only revalidated shipped Lumber and Hunter evidence',()=>{
  const forest=definitions.activities.find((x:any)=>x.id===palaceActivityReadInputs.lumberForest.activity);
  assert.ok(forest);
  assert.ok(forest.results.some((x:any)=>x.effects.some((e:any)=>
    e.kind==='addWorldFact'&&e.fact===palaceActivityReadInputs.lumberForest.worldFact
  )));

  const hunter=definitions.activities.find((x:any)=>x.id===palaceActivityReadInputs.hunterExpedition.activity);
  assert.ok(hunter);
  assert.ok(hunter.results.some((x:any)=>x.effects.some((e:any)=>
    e.kind==='addCareerFact'
      &&e.career===palaceActivityReadInputs.hunterExpedition.career
      &&e.fact===palaceActivityReadInputs.hunterExpedition.careerFact
  )));
});

test('Palace relationship roles stay semantic and do not invent concrete NPC identities',()=>{
  assert.deepEqual(palaceRelationshipRoles,[
    'professional-patron',
    'rival',
    'servant-or-official-contact',
    'optional-romance'
  ]);
  const raw=JSON.stringify(palaceRelationshipRoles);
  assert.equal(raw.includes('prince'),false);
  assert.equal(raw.includes('king'),false);
  assert.equal(raw.includes('queen'),false);
});

test('Palace item hooks stay capability-semantic rather than production item IDs',()=>{
  assert.deepEqual(palaceItemCapabilityRoles,[
    'invitation-or-seal',
    'formal-outfit',
    'archive-key',
    'ceremonial-component',
    'proof-or-document'
  ]);
});

test('Palace calendar themes preserve the locked late-game seasonal breadth without numeric timing',()=>{
  assert.deepEqual(palaceCalendarThemes,[
    'ceremonies',
    'receptions',
    'supplies-and-taxes',
    'delegations',
    'rituals-and-festivals'
  ]);
});

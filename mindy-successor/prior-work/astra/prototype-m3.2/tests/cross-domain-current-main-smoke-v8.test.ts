import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {actionAvailable,dispatch,parseSave} from '../src/core/engine.ts';
import {presentationIdForActivityRoute,presentationIdForEnding} from '../src/core/presentation.ts';
import {catalog,started} from './helpers.ts';

const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));

test('C1D-82 current main starter School Forest poverty presentation and Save contracts coexist',()=>{
  let s=started();
  const starters=['lumber.shift','satyr-maid.shift','undead-farm.shift'];
  const late=['tavern.shift','hunter.shift','guard.shift','merchant.shift','artist-geisha.shift','assassin.shift','prostitute.shift'];
  for(const id of starters){
    const action=catalog.definitions.actions.find(item=>item.id===id);assert.ok(action,id);assert.equal(actionAvailable(action,s,catalog),true,id);
  }
  for(const id of late){
    const action=catalog.definitions.actions.find(item=>item.id===id);assert.ok(action,id);assert.equal(actionAvailable(action,s,catalog),false,id);
  }

  s.run.resources.money=2_000;
  s=dispatch(s,{type:'schoolLesson',id:'school.course.rhetoric_and_social'},catalog);
  assert.equal(s.run.lastAction?.id,'school');
  assert.equal(s.run.lastAction?.presentationId,'school/rhetoric-and-social/lesson/default');
  assert.equal(s.run.progression.worldFacts.includes('lumber.school.management-ready'),false);
  s=parseSave(JSON.stringify(s),catalog);

  s=dispatch(s,{type:'enterActivity',id:'lumber.forest'},catalog);
  s=dispatch(s,{type:'activityAction',id:'forest.route.logging-road'},catalog);
  assert.equal(s.run.flow.activity?.internalState.routeId,'logging-road');
  const forestPresentation=presentationIdForActivityRoute(catalog,'lumber.forest','logging-road');
  assert.ok(presentation.slots[forestPresentation],forestPresentation);
  s=parseSave(JSON.stringify(s),catalog);
  assert.equal(s.run.flow.activity?.internalState.routeId,'logging-road');

  const povertyPacks=catalog.packs.filter(pack=>pack.id.startsWith('poverty-'));
  const serialized=JSON.stringify(povertyPacks);
  assert.equal(/secret.?debt|lender|slave/i.test(serialized),false);
  const debtWrites=povertyPacks.flatMap(pack=>pack.events).flatMap(event=>event.choices).flatMap(choice=>choice.effects).filter(effect=>effect.kind==='metric'&&effect.key==='debt');
  assert.equal(debtWrites.length,0);

  for(const ending of catalog.definitions.endings){
    const id=presentationIdForEnding(ending.id);
    assert.ok(presentation.slots[id],id);
  }
});

import test from 'node:test';
import assert from 'node:assert/strict';

import {catalog,started,act} from './helpers.ts';
import {availableActivityActions,dispatch,parseSave} from '../src/core/engine.ts';

function ids(s:any){return availableActivityActions(s,catalog).map(x=>x.id);}
function resolvePending(s:any,choice='take-kit'){
  while(s.run.pending){
    const event=catalog.events.find(e=>e.id===s.run.pending.eventId)!;
    const selected=event.choices.find(c=>c.id===choice)??event.choices.find(c=>c.conditions.length===0)!;
    s=dispatch(s,{type:'choice',id:selected.id},catalog);
  }
  return s;
}

test('C3-122/C3-124 Hunter outfitter naturally produces clue + Rope Kit and summer/autumn Hunter Trail',()=>{
  let s=started();
  s=act(s,'forest.hunter-outfitter');
  assert.equal(s.run.resources.inventory.rope_kit,1);
  assert.ok(s.run.progression.worldFacts.includes('forest.hunter-trail-clue'));

  s.run.calendar.elapsedDays=0;
  s=dispatch(s,{type:'enterActivity',id:'lumber.forest'},catalog);
  assert.equal(ids(s).includes('forest.route.hunter-trail'),false);

  let summer=parseSave(JSON.stringify(s),catalog);
  summer.run.flow.activity=null;
  summer.run.calendar.elapsedDays=40;
  summer.run.dayState.energyCurrent=3;
  summer=dispatch(summer,{type:'enterActivity',id:'lumber.forest'},catalog);
  assert.ok(ids(summer).includes('forest.route.hunter-trail'));
});

test('C3-123/C3-126 Lumber/relationship preparation naturally produces Reinforced Axe and Old Boundary Token',()=>{
  let s=started();
  s=act(s,'lumber.shift');
  assert.equal(s.run.progression.careers.lumber.stage,'accepted-hand');
  assert.equal(s.run.progression.relationships['lumber.foreman'].stage,'route-professional');

  s=act(s,'forest.collect-reinforced-axe');
  assert.equal(s.run.resources.inventory.reinforced_axe,1);
  assert.ok(s.run.progression.careers.lumber.facts.includes('forest-route-surveyed'));

  s=act(s,'forest.claim-boundary-token');
  assert.equal(s.run.resources.inventory.old_boundary_token,1);

  s.run.dayState.energyCurrent=3;
  s=dispatch(s,{type:'enterActivity',id:'lumber.forest'},catalog);
  assert.ok(ids(s).includes('forest.route.old-boundary'));
});

test('C3-125/C3-129 a real School lesson yields preservation kit + knowledge prep without changing School mechanics',()=>{
  let s=started();
  s=dispatch(s,{type:'schoolLesson',id:'school.course.field_craft'},catalog);
  s=resolvePending(s);
  assert.equal(s.run.resources.inventory.field_preservation_kit,1);
  assert.ok(s.run.progression.worldFacts.includes('forest.school-field-notes'));
  assert.ok((s.run.progression.school.tracks['school.track.field_craft']?.counters.lessons_completed??0)>=1);
});

test('C3-127/C3-128 real challenge families read stats/capabilities and season changes availability',()=>{
  let spring=started();
  spring.run.character.stats.strength=4;
  spring.run.character.stats.reason=3;
  spring=dispatch(spring,{type:'enterActivity',id:'lumber.forest'},catalog);
  assert.ok(ids(spring).includes('forest.challenge.logging-navigation'));
  assert.ok(ids(spring).includes('forest.challenge.logging-spring-mud'));
  assert.equal(ids(spring).includes('forest.challenge.logging-summer-deadfall'),false);

  let summer=started();
  summer.run.calendar.elapsedDays=40;
  summer.run.character.stats.strength=1;
  summer.run.resources.inventory.reinforced_axe=1;
  summer=dispatch(summer,{type:'enterActivity',id:'lumber.forest'},catalog);
  assert.ok(ids(summer).includes('forest.challenge.logging-summer-deadfall'));
  assert.equal(ids(summer).includes('forest.challenge.logging-spring-mud'),false);

  let boundary=started();
  boundary.run.resources.inventory.old_boundary_token=1;
  boundary.run.resources.inventory.rope_kit=1;
  boundary.run.progression.worldFacts.push('forest.school-field-notes');
  boundary=dispatch(boundary,{type:'enterActivity',id:'lumber.forest'},catalog);
  assert.ok(ids(boundary).includes('forest.challenge.boundary-interpretation'));
  assert.ok(ids(boundary).includes('forest.challenge.boundary-rough-crossing'));
});

test('C3-125 extraction capability is mechanically required for success',()=>{
  let s=started();
  s.run.character.stats.strength=4;
  s.run.character.stats.reason=3;
  s=dispatch(s,{type:'enterActivity',id:'lumber.forest'},catalog);
  s=dispatch(s,{type:'activityAction',id:'forest.route.logging-road'},catalog);
  s=dispatch(s,{type:'activityAction',id:'forest.challenge.logging-navigation'},catalog);
  s=dispatch(s,{type:'activityAction',id:'forest.challenge.logging-spring-mud'},catalog);
  while(s.run.flow.activity)s=dispatch(s,{type:'activityAction',id:'advance'},catalog);
  assert.ok(s.run.progression.worldFacts.includes('lumber.forest.failed'));
  assert.equal(s.run.resources.inventory.forest_preserved_specimen??0,0);
});

test('C3-131 route/challenge save-resume is deterministic and Forest specimen is consumed by Lumber',()=>{
  let s=started();
  s=act(s,'forest.hunter-outfitter');
  s=dispatch(s,{type:'schoolLesson',id:'school.course.field_craft'},catalog);
  s=resolvePending(s);
  s.run.calendar.elapsedDays=40;
  s.run.dayState.energyCurrent=3;

  s=dispatch(s,{type:'enterActivity',id:'lumber.forest'},catalog);
  s=dispatch(s,{type:'activityAction',id:'forest.route.hunter-trail'},catalog);
  const afterRoute=parseSave(JSON.stringify(s),catalog);
  assert.deepEqual(afterRoute.run.flow.activity,s.run.flow.activity);

  s=dispatch(afterRoute,{type:'activityAction',id:'forest.challenge.hunter-navigation'},catalog);
  const beforeChallengeResume=parseSave(JSON.stringify(s),catalog);
  const direct=dispatch(s,{type:'activityAction',id:'forest.challenge.hunter-rough-crossing'},catalog);
  const resumed=dispatch(beforeChallengeResume,{type:'activityAction',id:'forest.challenge.hunter-rough-crossing'},catalog);
  assert.deepEqual(resumed,direct);

  s=dispatch(resumed,{type:'activityAction',id:'forest.challenge.hunter-preserve-sample'},catalog);
  s=parseSave(JSON.stringify(s),catalog);
  s=dispatch(s,{type:'activityAction',id:'advance'},catalog);
  const beforeFinal=parseSave(JSON.stringify(s),catalog);
  const a=dispatch(s,{type:'activityAction',id:'advance'},catalog);
  const b=dispatch(beforeFinal,{type:'activityAction',id:'advance'},catalog);
  assert.deepEqual(a,b);
  assert.equal(a.run.flow.activity,null);
  assert.equal(a.run.resources.inventory.forest_preserved_specimen,1);
  assert.equal(a.run.pending?.eventId,'lumber-cross.activity-forest-return');

  const returned=dispatch(a,{type:'choice',id:'continue'},catalog);
  assert.equal(returned.run.resources.inventory.forest_preserved_specimen,0);
  assert.ok(returned.run.progression.careers.lumber.facts.includes('forest-specimen-catalogued'));
});

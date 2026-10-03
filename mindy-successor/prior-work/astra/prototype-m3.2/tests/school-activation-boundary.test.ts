import test from 'node:test';
import assert from 'node:assert/strict';
import {loadCatalog} from '../src/core/content.ts';
import {dispatch,freshSave,parseSave} from '../src/core/engine.ts';
import type {Catalog} from '../src/core/schema.ts';

function catalog():Catalog{
  return loadCatalog({
    version:'0.1.0',
    flags:['story.arrived'],
    actions:[{
      id:'school',
      label:'School',
      description:'School transaction marker.',
      cost:{money:0,energy:0},
      conditions:[],
      effects:[],
      mode:'normal'
    }],
    endings:[{
      id:'ending.school.reason',
      title:'Reason ending',
      description:'Becomes eligible from the paid lesson package.',
      conditions:[{kind:'stat',stat:'reason',op:'gte',value:5}],
      reward:'school.reason.compat',
      metaRewards:[],
      epilogue:'Synthetic School boundary ending.'
    }]
  },[{
    schemaVersion:1,
    id:'school-ending-boundary',
    reads:[],
    writes:[],
    media:[],
    events:[{
      id:'school-ending-boundary.eligible',
      title:'School ending eligible',
      trigger:[],
      reactionTriggers:[{kind:'endingEligible',ending:'ending.school.reason'}],
      priorityClass:'critical_progression',
      priority:100,
      blocking:true,
      delivery:{policy:'live'},
      cooldownDays:0,
      variantCooldownDays:0,
      maxShows:1,
      conditions:[],
      variants:[{
        id:'default',
        text:'The School lesson made an ending eligible in this same transaction boundary.',
        conditions:[],
        media:[]
      }],
      choices:[{
        id:'continue',
        label:'Continue',
        text:'',
        conditions:[],
        effects:[]
      }]
    }]
  }]);
}

function ready(){
  const s=freshSave();
  s.run.character.creation.remaining=0;
  s.run.character.creation.allocated={};
  s.run.character.creation.complete=true;
  s.run.character.creation.hardWorkPackagesApplied=true;
  s.run.flags['story.arrived']=true;
  s.run.resources.money=1_000;
  s.run.dayState.energyCurrent=3;
  s.run.character.stats.reason=1;
  return s;
}

test('one schoolLesson command registers ending eligibility before the same Resolver boundary',()=>{
  const cat=catalog();
  const before=ready();
  assert.equal(before.run.endings.eligible.includes('ending.school.reason'),false);

  const after=dispatch(before,{type:'schoolLesson',id:'school.course.literacy_and_numbers'},cat);

  assert.equal(after.run.character.stats.reason,5);
  assert.equal(after.run.resources.money,700);
  assert.equal(after.run.dayState.energyCurrent,2);
  assert.equal(
    after.run.progression.school.tracks['school.track.literacy_and_numbers']?.counters.lessons_completed,
    1
  );
  assert.ok(after.run.endings.eligible.includes('ending.school.reason'));
  assert.equal(after.run.flow.pendingScene?.eventId,'school-ending-boundary.eligible');
  assert.equal(after.run.flow.lastAction?.presentationId,'school/literacy-and-numbers/lesson/default');

  const reloaded=parseSave(JSON.stringify(after),cat);
  assert.equal(reloaded.run.flow.pendingScene?.eventId,'school-ending-boundary.eligible');
  assert.equal(reloaded.run.flow.lastAction?.presentationId,'school/literacy-and-numbers/lesson/default');
  assert.equal(
    reloaded.run.progression.school.tracks['school.track.literacy_and_numbers']?.counters.lessons_completed,
    1
  );
});

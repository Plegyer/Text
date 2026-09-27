import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {loadCatalog} from '../src/core/content.ts';
import {dispatch,freshSave,parseSave} from '../src/core/engine.ts';
import {schoolNightStudyChoices} from '../src/core/school.ts';
import {packSchema,type Catalog,type Save} from '../src/core/schema.ts';

const pack=JSON.parse(
  readFileSync(
    'content/packs/school-target/school-night-exact-v3.json',
    'utf8'
  )
);

function definitions(){
  return {
    version:'0.1.0',
    flags:[],
    actions:[],
    endings:[],
    careers:[],
    quests:[],
    relationships:[],
    lodgings:[{
      id:'school.night.exact.fixture.room',
      label:'Night routing room',
      housing:'normal',
      moneyCost:0,
      conditions:[],
      effects:[],
      nextDayEffects:[],
      nextDayEnergyDelta:0
    }],
    nightChoices:schoolNightStudyChoices(),
    activities:[]
  };
}

function catalog():Catalog{
  return loadCatalog(definitions(),[structuredClone(pack)]);
}

function ready():Save{
  const state=freshSave();
  state.run.character.creation.remaining=0;
  state.run.character.creation.allocated={};
  state.run.character.creation.complete=true;
  state.run.resources.money=777;
  state.run.dayState.energyCurrent=1;
  return state;
}

test('exact Night School pack passes strict schema and pack-owned namespace validation',()=>{
  assert.doesNotThrow(()=>packSchema.parse(pack));
  assert.doesNotThrow(()=>catalog());
  assert.equal(pack.id,'school.night.exact.v3');
  assert.equal(pack.events.length,24);
  assert.equal(
    pack.events.every((event:any)=>event.id.startsWith(pack.id+'.')),
    true
  );
  assert.equal(
    pack.media.every((media:any)=>media.id.startsWith(pack.id+'.')),
    true
  );
});

test('all 24 current School Night choices have one exact authored route',()=>{
  const choices=schoolNightStudyChoices().map(choice=>choice.id).sort();
  const routed=pack.events
    .flatMap((event:any)=>event.reactionTriggers)
    .filter((trigger:any)=>trigger.kind==='nightChoiceCompleted')
    .map((trigger:any)=>trigger.choice)
    .sort();

  assert.deepEqual(routed,choices);
  assert.equal(new Set(routed).size,24);
});

test('a real Night choice naturally routes only its exact authored event',()=>{
  const cat=catalog();
  let state=ready();
  state.run.character.stats.reason=10;

  state=dispatch(state,{type:'endDay'},cat);
  state=dispatch(
    state,
    {type:'chooseLodging',id:'school.night.exact.fixture.room'},
    cat
  );
  state=dispatch(
    state,
    {type:'chooseNightChoice',id:'school.night_study.arcana.reason'},
    cat
  );

  const exact=state.run.flow.reaction.queued.filter(
    q=>q.eventId==='school.night.exact.v3.arcana.reason'
  );
  assert.equal(exact.length,1);
  assert.equal(
    state.run.flow.reaction.queued.some(
      q=>q.eventId==='school.night.exact.v3.arcana.magic'
    ),
    false
  );

  assert.equal(state.run.resources.money,777);
  assert.equal(state.run.character.stats.reason,12);
  assert.equal(state.run.dayState.energyCurrent,2);
});

test('exact Night presentation remains stable across reload and resolving it cannot replay Night mechanics',()=>{
  const cat=catalog();
  let state=ready();
  state.run.character.stats.reason=10;

  state=dispatch(state,{type:'endDay'},cat);
  state=dispatch(
    state,
    {type:'chooseLodging',id:'school.night.exact.fixture.room'},
    cat
  );
  state=dispatch(
    state,
    {type:'chooseNightChoice',id:'school.night_study.arcana.reason'},
    cat
  );

  const queued=state.run.flow.reaction.queued.find(
    q=>q.eventId==='school.night.exact.v3.arcana.reason'
  );
  assert.ok(queued);

  const reload1=parseSave(JSON.stringify(state),cat);
  const reload2=parseSave(JSON.stringify(reload1),cat);
  const q1=reload1.run.flow.reaction.queued.find(q=>q.instanceId===queued.instanceId);
  const q2=reload2.run.flow.reaction.queued.find(q=>q.instanceId===queued.instanceId);

  assert.equal(q1?.variantId,queued.variantId);
  assert.equal(q2?.variantId,queued.variantId);

  const before={
    money:reload2.run.resources.money,
    energy:reload2.run.dayState.energyCurrent,
    stats:structuredClone(reload2.run.character.stats),
    progression:structuredClone(reload2.run.progression),
    lust:reload2.run.character.lust
  };

  const opened=dispatch(
    reload2,
    {type:'openOffer',id:queued.instanceId},
    cat
  );
  const resolved=dispatch(
    opened,
    {type:'choice',id:'continue'},
    cat
  );

  assert.equal(resolved.run.resources.money,before.money);
  assert.equal(resolved.run.dayState.energyCurrent,before.energy);
  assert.deepEqual(resolved.run.character.stats,before.stats);
  assert.deepEqual(resolved.run.progression,before.progression);
  assert.equal(resolved.run.character.lust,before.lust);
});

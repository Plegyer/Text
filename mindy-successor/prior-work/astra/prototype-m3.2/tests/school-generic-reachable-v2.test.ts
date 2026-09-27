import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {loadCatalog} from '../src/core/content.ts';
import {
  applyEffects,
  dispatch,
  freshSave,
  parseSave,
  resolveReactions
} from '../src/core/engine.ts';
import {executeSchoolLesson} from '../src/core/school.ts';
import {packSchema,type Catalog,type Save} from '../src/core/schema.ts';

const pack=JSON.parse(
  readFileSync(
    'content/packs/school-target/school-generic-reachable-v2.json',
    'utf8'
  )
);
const runtime={applyEffects,resolveReactions};

function definitions(){
  return {
    version:'0.1.0',
    flags:[],
    actions:[],
    endings:[],
    careers:[],
    quests:[],
    relationships:[],
    lodgings:[],
    nightChoices:[],
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
  state.run.resources.money=2_000;
  state.run.dayState.energyCurrent=3;
  return state;
}

test('generic reachable School pack passes strict schema and pack-owned namespace validation',()=>{
  assert.doesNotThrow(()=>packSchema.parse(pack));
  assert.doesNotThrow(()=>catalog());
  assert.equal(pack.id,'school.generic.reachable.v2');
  assert.equal(
    pack.events.every((event:any)=>event.id.startsWith(pack.id+'.')),
    true
  );
  assert.equal(
    pack.media.every((media:any)=>media.id.startsWith(pack.id+'.')),
    true
  );
});

test('a real paid School lesson naturally routes the generic post-lesson offer',()=>{
  const cat=catalog();
  const input=ready();
  input.run.character.stats.magic=1;
  input.run.character.stats.reason=1;
  input.run.character.stats.creativity=1;
  const lustBefore=input.run.character.lust;

  const result=executeSchoolLesson(
    input,
    'school.course.arcana',
    cat,
    runtime
  );
  const out=result.state;

  assert.equal(out.run.resources.money,1_500);
  assert.equal(out.run.dayState.energyCurrent,2);
  assert.equal(out.run.character.stats.magic,5);
  assert.equal(out.run.character.stats.reason,5);
  assert.equal(out.run.character.stats.creativity,3);
  assert.equal(out.run.character.lust,lustBefore);

  const queued=out.run.flow.reaction.queued.find(
    q=>q.eventId==='school.generic.reachable.v2.after.school'
  );
  assert.ok(queued);
  assert.equal(out.run.dayState.optionalOfferIds.includes(queued.instanceId),true);
});

test('generic materialized presentation is stable across reload and resolving it is effect-free',()=>{
  const cat=catalog();
  const paid=executeSchoolLesson(
    ready(),
    'school.course.literacy_and_numbers',
    cat,
    runtime
  ).state;

  const queued=paid.run.flow.reaction.queued.find(
    q=>q.eventId==='school.generic.reachable.v2.after.school'
  );
  assert.ok(queued);

  const reload1=parseSave(JSON.stringify(paid),cat);
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

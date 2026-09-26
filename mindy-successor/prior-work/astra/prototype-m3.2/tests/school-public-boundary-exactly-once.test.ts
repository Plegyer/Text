import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const fixture=JSON.parse(
  readFileSync(
    'content/school-public-boundary-exactly-once.fixture.json',
    'utf8'
  )
);

type State={
  privateSchool:{
    tracks:Record<string,{
      lessons_completed:number;
      milestones:string[];
    }>;
  };
  worldFacts:string[];
  publicationProofs:string[];
  emittedFacts:string[];
};

function clone<T>(value:T):T{
  return JSON.parse(JSON.stringify(value)) as T;
}

function publish(state:State){
  const out=clone(state);
  const def=fixture.fixturePublication;
  const track=out.privateSchool.tracks[def.trackId];

  if(!track.milestones.includes(def.privateMilestoneId)){
    return out;
  }

  if(out.publicationProofs.includes(def.publicationId)){
    return out;
  }

  out.publicationProofs.push(def.publicationId);

  if(!out.worldFacts.includes(def.publicFactId)){
    out.worldFacts.push(def.publicFactId);
    out.emittedFacts.push('worldFactAdded:'+def.publicFactId);
  }

  return out;
}

function baseState():State{
  const def=fixture.fixturePublication;
  return {
    privateSchool:{
      tracks:{
        [def.trackId]:{
          lessons_completed:5,
          milestones:[def.privateMilestoneId]
        }
      }
    },
    worldFacts:[],
    publicationProofs:[],
    emittedFacts:[]
  };
}

test('private School milestone publishes one explicit public fact exactly once',()=>{
  const def=fixture.fixturePublication;
  const state=publish(baseState());

  assert.deepEqual(state.worldFacts,[def.publicFactId]);
  assert.deepEqual(state.publicationProofs,[def.publicationId]);
  assert.deepEqual(
    state.emittedFacts,
    ['worldFactAdded:'+def.publicFactId]
  );
});

test('reload before publication still allows one later publication',()=>{
  const before=clone(baseState());
  const reloaded=clone(before);
  const published=publish(reloaded);

  assert.equal(published.worldFacts.length,1);
  assert.equal(published.publicationProofs.length,1);
  assert.equal(published.emittedFacts.length,1);
});

test('reload after publication cannot duplicate public fact or reaction',()=>{
  const first=publish(baseState());
  const reloaded=clone(first);
  const replay=publish(reloaded);

  assert.deepEqual(replay.worldFacts,first.worldFacts);
  assert.deepEqual(replay.publicationProofs,first.publicationProofs);
  assert.deepEqual(replay.emittedFacts,first.emittedFacts);
  assert.equal(replay.worldFacts.length,1);
  assert.equal(replay.emittedFacts.length,1);
});

test('removing or replaying private counters cannot silently re-emit after committed publication',()=>{
  const def=fixture.fixturePublication;
  let committed=publish(baseState());

  committed.privateSchool.tracks[def.trackId].lessons_completed=0;
  committed.privateSchool.tracks[def.trackId].milestones=[];
  const afterRemoval=publish(clone(committed));

  assert.deepEqual(afterRemoval.worldFacts,[def.publicFactId]);
  assert.deepEqual(afterRemoval.publicationProofs,[def.publicationId]);
  assert.equal(afterRemoval.emittedFacts.length,1);

  committed.privateSchool.tracks[def.trackId].lessons_completed=999;
  committed.privateSchool.tracks[def.trackId].milestones=[
    def.privateMilestoneId
  ];
  const afterReplay=publish(clone(committed));

  assert.deepEqual(afterReplay.worldFacts,[def.publicFactId]);
  assert.deepEqual(afterReplay.publicationProofs,[def.publicationId]);
  assert.equal(afterReplay.emittedFacts.length,1);
});

test('Lumber-facing evidence contains only the public fact and never private School counters',()=>{
  const def=fixture.fixturePublication;
  const state=publish(baseState());

  const lumberView={
    worldFacts:state.worldFacts
  };

  assert.deepEqual(lumberView,{
    worldFacts:[def.publicFactId]
  });
  assert.equal(
    JSON.stringify(lumberView).includes('lessons_completed'),
    false
  );
});

test('final management and Arcana publication identities and thresholds remain OPEN',()=>{
  assert.deepEqual(fixture.authoringSlots,[
    {
      slot:'management-accounting',
      finalPublicFactId:null,
      privateThreshold:null,
      status:'OPEN'
    },
    {
      slot:'arcana-forest',
      finalPublicFactId:null,
      privateThreshold:null,
      status:'OPEN'
    }
  ]);
  assert.equal(fixture.fixturePublication.fixtureOnly,true);
  assert.match(
    fixture.fixturePublication.publicFactId,
    /^school\.fixture\.public\./
  );
});

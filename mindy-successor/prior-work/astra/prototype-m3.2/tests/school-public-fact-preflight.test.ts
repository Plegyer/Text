import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const fixture=JSON.parse(
  readFileSync('content/school-public-fact-preflight.fixture.json','utf8')
);

type Candidate={
  owner:string;
  privateTriggerOwner:string;
  declaredPublicFactIds:string[];
  publishPublicFactId:string;
  boundary:string;
  exactlyOnce:boolean;
  replayProofRequired:boolean;
  directLumberPrivateMutation:boolean;
  lumberReadsSchoolPrivateCounter:boolean;
};

function validate(candidate:Candidate){
  if(candidate.owner!=='school'||candidate.privateTriggerOwner!=='school'){
    throw new Error('School must own the private trigger/progression');
  }
  if(!candidate.declaredPublicFactIds.includes(candidate.publishPublicFactId)){
    throw new Error('published public fact ID must be explicitly declared');
  }
  if(!['worldFacts','domain-public'].includes(candidate.boundary)){
    throw new Error('publication must cross worldFacts/domain-public boundary');
  }
  if(!candidate.exactlyOnce||!candidate.replayProofRequired){
    throw new Error('publication must be exactly-once across reload');
  }
  if(candidate.directLumberPrivateMutation){
    throw new Error('School may not directly mutate Lumber private state');
  }
  if(candidate.lumberReadsSchoolPrivateCounter){
    throw new Error('Lumber may not read private School counters directly');
  }
  return true;
}

test('valid preflight example keeps School ownership and crosses the declared public boundary exactly once',()=>{
  assert.equal(validate(fixture.validExample),true);
  assert.equal(fixture.validExample.owner,'school');
  assert.equal(fixture.validExample.privateTriggerOwner,'school');
  assert.equal(fixture.validExample.boundary,'worldFacts');
  assert.equal(fixture.validExample.exactlyOnce,true);
  assert.equal(fixture.validExample.replayProofRequired,true);
  assert.equal(fixture.validExample.directLumberPrivateMutation,false);
  assert.equal(fixture.validExample.lumberReadsSchoolPrivateCounter,false);
  assert.equal(fixture.validExample.fixtureOnly,true);
});

test('every invalid preflight example rejects for its declared ownership/boundary violation',()=>{
  for(const invalid of fixture.invalidExamples){
    assert.throws(
      ()=>validate(invalid),
      error=>
        error instanceof Error &&
        error.message===invalid.rejectReason,
      invalid.id
    );
  }
});

test('management/accounting and Arcana/forest final fact IDs remain OPEN',()=>{
  assert.deepEqual(fixture.authoringSlots,[
    {
      slot:'management-accounting',
      finalPublicFactId:null,
      privateTrigger:null,
      status:'OPEN'
    },
    {
      slot:'arcana-forest',
      finalPublicFactId:null,
      privateTrigger:null,
      status:'OPEN'
    }
  ]);
});

test('preflight forbids direct private-state coupling in both directions',()=>{
  const ids=new Set(
    fixture.invalidExamples.map((entry:any)=>entry.id)
  );
  assert.ok(ids.has('lumber-reads-private-school-counter'));
  assert.ok(ids.has('school-mutates-lumber-private-state'));
});

test('fixture-only public fact is explicit evidence plumbing, not a production authoring choice',()=>{
  assert.match(
    fixture.validExample.publishPublicFactId,
    /^school\.fixture\.public\./
  );
  assert.equal(fixture.validExample.fixtureOnly,true);
});

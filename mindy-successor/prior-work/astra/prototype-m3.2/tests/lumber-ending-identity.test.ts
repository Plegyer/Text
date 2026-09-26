import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {eligible,freshSave} from '../src/core/engine.ts';
import {loadCatalog} from '../src/core/content.ts';
import {presentationIdForEnding} from '../src/core/presentation.ts';
import type {Catalog,Save} from '../src/core/schema.ts';

const matrix=JSON.parse(readFileSync('content/lumber-ending-identity.fixture.json','utf8'));
const definitions=JSON.parse(readFileSync('content/lumber-target-definitions.fixture.json','utf8'));

function catalog():Catalog{return loadCatalog(structuredClone(definitions),[]);}
function ending(cat:Catalog,id:string){
  const value=cat.definitions.endings.find(e=>e.id===id);
  assert.ok(value,id);
  return value;
}
function ready():Save{
  const s=freshSave();
  s.run.creation={remaining:0,allocated:{},complete:true};
  s.run.flags['story.arrived']=true;
  return s;
}

test('ending identity fixture mirrors exact target Lumber ending IDs, conditions and semantic IDs',()=>{
  const cat=catalog();
  assert.deepEqual(
    matrix.endings.map((x:any)=>x.id),
    ['ending.lumber.hard-work','ending.lumber.forewoman','ending.lumber.forest']
  );

  for(const expected of matrix.endings){
    const actual=ending(cat,expected.id);
    assert.deepEqual(actual.conditions,expected.conditions,expected.id);
    assert.deepEqual(actual.metaRewards,expected.metaRewards,expected.id);
    assert.equal(presentationIdForEnding(expected.id),expected.semanticPresentationId,expected.id);
  }
});

test('Hard Work is the only ending in this matrix granting exact hardWork:lumber',()=>{
  const rewards=matrix.endings.flatMap((e:any)=>
    e.metaRewards.map((r:any)=>({endingId:e.id,...r}))
  );
  assert.deepEqual(rewards,[
    {
      endingId:'ending.lumber.hard-work',
      kind:'hardWork',
      rewardId:'hardWork:lumber',
      career:'lumber'
    }
  ]);
  assert.equal(matrix.invariants.hardWorkRewardOwner,'ending.lumber.hard-work');
  assert.equal(matrix.invariants.hardWorkRewardId,'hardWork:lumber');
});

test('Hard Work identity remains one-condition completed_shifts >= 50 only',()=>{
  const expected=matrix.endings.find((e:any)=>e.id==='ending.lumber.hard-work');
  assert.ok(expected);
  assert.equal(expected.conditions.length,1);
  assert.deepEqual(expected.conditions,[
    {kind:'careerCounter',career:'lumber',counter:'completed_shifts',op:'gte',value:50}
  ]);
  assert.equal(matrix.invariants.hardWorkConditionCount,1);
});

test('Forewoman and Forest have independent complex conditions and no Meta rewards',()=>{
  const forewoman=matrix.endings.find((e:any)=>e.id==='ending.lumber.forewoman');
  const forest=matrix.endings.find((e:any)=>e.id==='ending.lumber.forest');
  assert.ok(forewoman);
  assert.ok(forest);
  assert.deepEqual(forewoman.metaRewards,[]);
  assert.deepEqual(forest.metaRewards,[]);
  assert.notDeepEqual(forewoman.conditions,forest.conditions);
  assert.equal(forewoman.conditions.some((c:any)=>c.kind==='relationshipStage'),true);
  assert.equal(forest.conditions.every((c:any)=>c.kind==='careerFact'),true);
});

test('ending families can be independently eligible without changing Hard Work contract',()=>{
  const cat=catalog();

  const hard=ready();
  hard.run.progression.careers.lumber={
    stage:'newcomer',shifts:0,counters:{completed_shifts:50},choices:{},facts:[]
  };
  assert.equal(eligible(ending(cat,'ending.lumber.hard-work').conditions,hard,cat),true);
  assert.equal(eligible(ending(cat,'ending.lumber.forewoman').conditions,hard,cat),false);
  assert.equal(eligible(ending(cat,'ending.lumber.forest').conditions,hard,cat),false);

  const forest=ready();
  forest.run.progression.careers.lumber={
    stage:'newcomer',shifts:0,counters:{completed_shifts:0},choices:{},
    facts:['forest-truth-known','forest-problem-resolved']
  };
  assert.equal(eligible(ending(cat,'ending.lumber.hard-work').conditions,forest,cat),false);
  assert.equal(eligible(ending(cat,'ending.lumber.forest').conditions,forest,cat),true);
});

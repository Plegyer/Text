import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {loadCatalog} from '../src/core/content.ts';
import {applyEffects,dispatch,eligible,freshSave,parseSave} from '../src/core/engine.ts';
import type {Catalog,Save} from '../src/core/schema.ts';

const matrix=JSON.parse(readFileSync('content/lumber-ending-independence.fixture.json','utf8'));
const definitions=JSON.parse(readFileSync('content/lumber-target-definitions.fixture.json','utf8'));
const productionPack=JSON.parse(readFileSync('content/packs/lumber-target/lumber-production.pack.json','utf8'));
const crossPack=JSON.parse(readFileSync('content/packs/lumber-target/lumber-cross-system.pack.json','utf8'));
const itemCapabilityFixture=JSON.parse(readFileSync('content/lumber-item-capabilities.fixture.json','utf8'));

function catalog():Catalog{
  return loadCatalog(
    structuredClone(definitions),
    [structuredClone(productionPack),structuredClone(crossPack)]
  );
}

function ready():Save{
  const s=freshSave();
  s.run.creation={remaining:0,allocated:{},complete:true};
  s.run.flags['story.arrived']=true;
  s.run.dayState.energyCurrent=3;
  return s;
}

function ending(cat:Catalog,id:string){
  const found=cat.definitions.endings.find(e=>e.id===id);
  assert.ok(found,`missing ending ${id}`);
  return found;
}

function seedCareer(input:Save,completedShifts:number,stage='newcomer'){
  input.run.progression.careers.lumber={
    stage,
    shifts:0,
    counters:{completed_shifts:completedShifts},
    choices:{},
    facts:[]
  };
  return input;
}

function establishProfessionalRoute(input:Save,cat:Catalog):Save{
  let s=dispatch(input,{type:'action',id:'lumber.shift'},cat);
  assert.equal(s.run.pending?.eventId,'lumber.career-first-shift');
  s=dispatch(s,{type:'choice',id:'continue'},cat);
  assert.equal(s.run.pending?.eventId,'lumber.foreman-notice');
  s=dispatch(s,{type:'choice',id:'professional'},cat);
  assert.equal(s.run.progression.relationships['lumber.foreman'].stage,'route-professional');
  assert.equal(s.run.progression.relationships['lumber.foreman'].choices.route,'professional');
  return s;
}

function grantForestCapability(input:Save,cat:Catalog):Save{
  const capability=itemCapabilityFixture.capabilities.find((c:any)=>c.id==='enter_old_boundary');
  assert.ok(capability);
  return applyEffects(input,[{kind:'addWorldFact',fact:capability.runtimeAdapter.fact}],cat);
}

function eligibility(cat:Catalog,s:Save){
  return {
    hardWork:eligible(ending(cat,'ending.lumber.hard-work').conditions,s,cat),
    forewoman:eligible(ending(cat,'ending.lumber.forewoman').conditions,s,cat),
    forest:eligible(ending(cat,'ending.lumber.forest').conditions,s,cat)
  };
}

test('independence fixture mirrors merged ending conditions and reward ownership exactly',()=>{
  const cat=catalog();
  for(const family of Object.values(matrix.families) as any[]){
    const actual=ending(cat,family.endingId);
    assert.deepEqual(actual.conditions,family.conditions);
    assert.deepEqual(actual.metaRewards.map((r:any)=>r.rewardId),family.metaRewardIds);
  }

  assert.deepEqual(matrix.families.hardWork.conditions,[
    {kind:'careerCounter',career:'lumber',counter:'completed_shifts',op:'gte',value:50}
  ]);
  assert.deepEqual(matrix.families.hardWork.metaRewardIds,['hardWork:lumber']);
  assert.equal(matrix.lockedContracts.hardWorkThreshold,50);
  assert.equal(matrix.lockedContracts.hardWorkCounter,'completed_shifts');
  assert.equal(matrix.lockedContracts.hardWorkRewardId,'hardWork:lumber');
  assert.equal(matrix.lockedContracts.activityReturnBoundary,'activityResult');
});

test('Hard Work is false at 49 and true at exactly 50 with no other prerequisite',()=>{
  const cat=catalog();

  const at49=seedCareer(ready(),49);
  assert.deepEqual(eligibility(cat,at49),{
    hardWork:false,
    forewoman:false,
    forest:false
  });
  assert.equal(at49.run.progression.relationships['lumber.foreman'],undefined);
  assert.deepEqual(at49.run.progression.worldFacts,[]);

  const at50=seedCareer(ready(),50);
  assert.deepEqual(eligibility(cat,at50),{
    hardWork:true,
    forewoman:false,
    forest:false
  });
  assert.equal(at50.run.progression.relationships['lumber.foreman'],undefined);
  assert.deepEqual(at50.run.progression.worldFacts,[]);
});

test('Forewoman owns professional and School-result facts without changing Hard Work eligibility or reward',()=>{
  const cat=catalog();
  let s=establishProfessionalRoute(ready(),cat);

  assert.equal(s.run.progression.careers.lumber.counters.completed_shifts,1);
  assert.deepEqual(eligibility(cat,s),{
    hardWork:false,
    forewoman:false,
    forest:false
  });

  s=dispatch(s,{type:'action',id:'school.lumber-management'},cat);
  assert.equal(s.run.pending?.eventId,'lumber-cross.school-management-return');
  s=dispatch(s,{type:'choice',id:'apply'},cat);

  assert.ok(s.run.progression.careers.lumber.facts.includes('management-school-ready'));
  assert.ok(s.run.progression.careers.lumber.facts.includes('forewoman-problem-resolved'));
  assert.equal(s.run.progression.relationships['lumber.foreman'].stage,'route-professional');
  assert.deepEqual(eligibility(cat,s),{
    hardWork:false,
    forewoman:true,
    forest:false
  });
  assert.ok(s.run.endings.eligible.includes('ending.lumber.forewoman'));
  assert.ok(!s.run.endings.eligible.includes('ending.lumber.hard-work'));

  s=parseSave(JSON.stringify(s),cat);
  s=dispatch(s,{type:'commitEnding',id:'ending.lumber.forewoman'},cat);
  s=parseSave(JSON.stringify(s),cat);
  s=dispatch(s,{type:'completeEnding'},cat);
  s=parseSave(JSON.stringify(s),cat);

  assert.equal(s.run.endings.result?.endingId,'ending.lumber.forewoman');
  assert.deepEqual(s.run.endings.result?.appliedMetaRewardIds,[]);
  assert.deepEqual(s.meta.hardWorkProgress,[]);
  assert.ok(!s.run.endings.result?.appliedMetaRewardIds.includes('hardWork:lumber'));

  const tx=s.run.endings.result!.transactionId;
  const again=dispatch(s,{type:'completeEnding'},cat);
  assert.deepEqual(again.meta.appliedResultTransactions,[tx]);
  assert.deepEqual(again.meta.hardWorkProgress,[]);
});

test('Forest owns Forest continuation facts without changing Hard Work eligibility or reward',()=>{
  const cat=catalog();
  let s=grantForestCapability(ready(),cat);
  s=dispatch(s,{type:'enterActivity',id:'lumber.forest'},cat);
  const entryEnergy=s.run.dayState.energyCurrent;
  s=dispatch(s,{type:'activityAction',id:'advance'},cat);
  s=dispatch(s,{type:'activityAction',id:'advance'},cat);

  assert.equal(s.run.pending?.eventId,'lumber-cross.activity-forest-return');
  assert.equal(s.run.dayState.energyCurrent,entryEnergy);
  s=dispatch(s,{type:'choice',id:'continue'},cat);

  assert.ok(s.run.progression.careers.lumber.facts.includes('forest-truth-known'));
  assert.ok(s.run.progression.careers.lumber.facts.includes('forest-problem-resolved'));
  assert.deepEqual(eligibility(cat,s),{
    hardWork:false,
    forewoman:false,
    forest:true
  });
  assert.ok(s.run.endings.eligible.includes('ending.lumber.forest'));
  assert.ok(!s.run.endings.eligible.includes('ending.lumber.hard-work'));

  s=parseSave(JSON.stringify(s),cat);
  s=dispatch(s,{type:'commitEnding',id:'ending.lumber.forest'},cat);
  s=parseSave(JSON.stringify(s),cat);
  s=dispatch(s,{type:'completeEnding'},cat);
  s=parseSave(JSON.stringify(s),cat);

  assert.equal(s.run.endings.result?.endingId,'ending.lumber.forest');
  assert.deepEqual(s.run.endings.result?.appliedMetaRewardIds,[]);
  assert.deepEqual(s.meta.hardWorkProgress,[]);
  assert.ok(!s.run.endings.result?.appliedMetaRewardIds.includes('hardWork:lumber'));

  const tx=s.run.endings.result!.transactionId;
  const again=dispatch(s,{type:'completeEnding'},cat);
  assert.deepEqual(again.meta.appliedResultTransactions,[tx]);
  assert.deepEqual(again.meta.hardWorkProgress,[]);
});

test('Hard Work completion grants exactly hardWork:lumber once and survives commit/completion reloads independently',()=>{
  const cat=catalog();
  let s=seedCareer(ready(),49,'accepted-hand');

  s=dispatch(s,{type:'action',id:'lumber.shift'},cat);
  assert.equal(s.run.progression.careers.lumber.counters.completed_shifts,50);
  assert.equal(s.run.pending,null);
  assert.deepEqual(eligibility(cat,s),{
    hardWork:true,
    forewoman:false,
    forest:false
  });
  assert.ok(s.run.endings.eligible.includes('ending.lumber.hard-work'));
  assert.ok(!s.run.endings.eligible.includes('ending.lumber.forewoman'));
  assert.ok(!s.run.endings.eligible.includes('ending.lumber.forest'));

  s=dispatch(s,{type:'commitEnding',id:'ending.lumber.hard-work'},cat);
  assert.deepEqual(s.meta.hardWorkProgress,[]);
  s=parseSave(JSON.stringify(s),cat);
  assert.equal(s.run.status,'ending_committed');
  assert.equal(s.run.endings.committed,'ending.lumber.hard-work');
  assert.deepEqual(s.meta.hardWorkProgress,[]);

  s=dispatch(s,{type:'completeEnding'},cat);
  assert.deepEqual(s.run.endings.result?.appliedMetaRewardIds,['hardWork:lumber']);
  assert.deepEqual(s.meta.hardWorkProgress,['lumber']);
  assert.equal(s.meta.hardWorkProgress.filter(x=>x==='lumber').length,1);
  const tx=s.run.endings.result!.transactionId;
  assert.deepEqual(s.meta.appliedResultTransactions,[tx]);

  s=parseSave(JSON.stringify(s),cat);
  assert.deepEqual(s.run.endings.result?.appliedMetaRewardIds,['hardWork:lumber']);
  assert.deepEqual(s.meta.hardWorkProgress,['lumber']);
  assert.deepEqual(s.meta.appliedResultTransactions,[tx]);

  const again=dispatch(s,{type:'completeEnding'},cat);
  assert.deepEqual(again.run.endings.result?.appliedMetaRewardIds,['hardWork:lumber']);
  assert.deepEqual(again.meta.hardWorkProgress,['lumber']);
  assert.equal(again.meta.hardWorkProgress.filter(x=>x==='lumber').length,1);
  assert.deepEqual(again.meta.appliedResultTransactions,[tx]);
});

test('fixture scenario matrix encodes mutually independent eligibility families',()=>{
  const cat=catalog();
  const byScenario=new Map<string,any>(matrix.matrix.map((x:any)=>[x.scenario,x] as [string,any]));

  const hard49=seedCareer(ready(),byScenario.get('hard_work_49_only').completedShifts);
  assert.deepEqual(eligibility(cat,hard49),{hardWork:false,forewoman:false,forest:false});

  const hard50=seedCareer(ready(),byScenario.get('hard_work_50_only').completedShifts);
  assert.deepEqual(eligibility(cat,hard50),{hardWork:true,forewoman:false,forest:false});

  const forewoman=seedCareer(ready(),1,'accepted-hand');
  forewoman.run.progression.careers.lumber.facts.push('management-school-ready','forewoman-problem-resolved');
  forewoman.run.progression.relationships['lumber.foreman']={
    stage:'route-professional',
    counters:{},
    choices:{route:'professional'},
    facts:[]
  };
  assert.deepEqual(eligibility(cat,forewoman),{hardWork:false,forewoman:true,forest:false});

  const forest=seedCareer(ready(),0);
  forest.run.progression.careers.lumber.facts.push('forest-truth-known','forest-problem-resolved');
  assert.deepEqual(eligibility(cat,forest),{hardWork:false,forewoman:false,forest:true});
});

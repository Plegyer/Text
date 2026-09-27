import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const contract=JSON.parse(readFileSync('content/forest-content-completeness.fixture.json','utf8'));
const production=JSON.parse(readFileSync('content/definitions.json','utf8'));
const target=JSON.parse(readFileSync('content/lumber-target-definitions.fixture.json','utf8'));
const schema=readFileSync('../src/core/schema.ts','utf8');
const engine=readFileSync('../src/core/engine.ts','utf8');

type ValidationInput={
  routes:string[];
  challengeFamilies:string[];
  hasSeasonTopology:boolean;
  hasSaveReload:boolean;
  terminalResults:string[];
  hasCapabilityHook:boolean;
};

function validate(input:ValidationInput){
  const missingRoutes=contract.target.routes.filter((x:string)=>!input.routes.includes(x));
  const missingFamilies=contract.target.challengeFamilies.filter((x:string)=>!input.challengeFamilies.includes(x));
  const resultSet=new Set(input.terminalResults);
  const resultsOk=contract.target.terminalResults.every((x:string)=>resultSet.has(x));
  const complete=
    missingRoutes.length===0 &&
    missingFamilies.length===0 &&
    input.hasSeasonTopology &&
    input.hasSaveReload &&
    resultsOk &&
    input.hasCapabilityHook;
  return {complete,missingRoutes,missingFamilies,resultsOk};
}

test('target validator requires every locked completeness dimension',()=>{
  assert.deepEqual(contract.target.routes,['logging-road','hunter-trail','old-boundary']);
  assert.equal(contract.target.challengeFamilies.length,3);
  assert.equal(contract.target.seasonTopology.required,true);
  assert.equal(contract.target.saveReload.required,true);
  assert.deepEqual(contract.target.terminalResults,[
    'lumber.forest.success','lumber.forest.escape','lumber.forest.failure'
  ]);
  assert.equal(contract.target.capabilityHooks.required,true);
});

test('merged-main assessment is intentionally not full-complete while authoring gaps remain',()=>{
  assert.equal(contract.mergedMainAssessment.fullComplete,false);
  assert.equal(contract.mergedMainAssessment.routes['logging-road'],true);
  assert.equal(contract.mergedMainAssessment.routes['old-boundary'],true);
  assert.equal(contract.mergedMainAssessment.routes['hunter-trail'],false);
  assert.equal(contract.mergedMainAssessment.seasonTopology,false);
  assert.ok(contract.mergedMainAssessment.missing.includes('hunter-trail'));
  assert.equal(contract.invariants.currentFailureIsExpected,true);
});

test('validator cannot pass when any one required dimension is missing',()=>{
  const full:ValidationInput={
    routes:['logging-road','hunter-trail','old-boundary'],
    challengeFamilies:[
      'forest.challenge.navigation',
      'forest.challenge.physical-obstacle',
      'forest.challenge.interpretation-ritual-anomaly'
    ],
    hasSeasonTopology:true,
    hasSaveReload:true,
    terminalResults:['lumber.forest.success','lumber.forest.escape','lumber.forest.failure'],
    hasCapabilityHook:true
  };
  assert.equal(validate(full).complete,true);
  for(const key of ['hasSeasonTopology','hasSaveReload','hasCapabilityHook'] as const){
    assert.equal(validate({...full,[key]:false}).complete,false,key);
  }
  assert.equal(validate({...full,routes:full.routes.filter(x=>x!=='hunter-trail')}).complete,false);
  assert.equal(validate({...full,challengeFamilies:full.challengeFamilies.slice(0,2)}).complete,false);
  assert.equal(validate({...full,terminalResults:full.terminalResults.slice(0,2)}).complete,false);
});

test('local production is never fabricated into a completeness pass',()=>{
  const forest=production.activities?.find((a:any)=>a.id==='lumber.forest');
  const routes=(forest?.options??[]).filter((o:any)=>o.category==='route').map((o:any)=>o.setRoute).filter(Boolean);
  const encoded=JSON.stringify(forest??{});
  const families=contract.target.challengeFamilies.filter((id:string)=>encoded.includes(id));
  const hasSeasonTopology=encoded.includes('calendarSeason');
  const hasCapabilityHook=encoded.includes('itemCapability');
  const results=(forest?.results??[]).map((r:any)=>r.id);
  const hasSaveReload=Boolean(forest?.resumePolicy==='allowed') && (
    (!schema.includes('optionModelVersion')) ||
    (schema.includes('optionModelVersion')&&engine.includes('availableActivityActions'))
  );
  const report=validate({routes,challengeFamilies:families,hasSeasonTopology,hasSaveReload,terminalResults:results,hasCapabilityHook});
  assert.equal(report.complete,false);
});

test('completeness validator cannot change Hard Work or A5',()=>{
  const hardWork=target.endings.find((e:any)=>e.id==='ending.lumber.hard-work');
  assert.deepEqual(hardWork.conditions,[
    {kind:'careerCounter',career:'lumber',counter:'completed_shifts',op:'gte',value:50}
  ]);
  assert.deepEqual(hardWork.metaRewards,[
    {kind:'hardWork',rewardId:'hardWork:lumber',career:'lumber'}
  ]);
  assert.equal(contract.invariants.hardWorkIndependent,true);
  assert.equal(contract.invariants.exactA5,'activityResult');
});

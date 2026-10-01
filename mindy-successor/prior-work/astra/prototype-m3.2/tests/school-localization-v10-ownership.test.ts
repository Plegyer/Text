import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

function read(path:string){return JSON.parse(readFileSync(path,'utf8'));}

const contract=read('content/school-localization-v10-ownership-boundary-contract.fixture.json');
const reach=read('content/school-localization-v10-reachability-audit.fixture.json');
const parity=read('content/school-localization-parity-v10-audit.fixture.json');
const teacher=read('content/school-teacher-milestone-text-audit-v10.fixture.json');
const night=read('content/school-night-study-text-preparation-v10.fixture.json');
const handoff=read('content/school-to-career-handoff-audit-v10.fixture.json');
const terminology=read('content/school-terminology-consistency-audit-v10.fixture.json');
const access=read('content/school-accessibility-text-parity-audit-v10.fixture.json');

function walk(value:any,path:string[]=[]):Array<{path:string[],value:any}>{
  const out=[{path,value}];
  if(Array.isArray(value))for(let i=0;i<value.length;i++)out.push(...walk(value[i],[...path,String(i)]));
  else if(value&&typeof value==='object')for(const [k,v] of Object.entries(value))out.push(...walk(v,[...path,k]));
  return out;
}

test('C5-104 ownership contract explicitly forbids runtime and progression ownership',()=>{
  for(const value of Object.values(contract.constraints))assert.equal(value,false);
  assert.ok(contract.forbiddenRoots.some((x:string)=>x.endsWith('/src/')));
  assert.ok(contract.forbiddenRoots.some((x:string)=>x.endsWith('/content/packs/')));
  assert.ok(contract.forbiddenExactFiles.some((x:string)=>x.endsWith('/content/localization.json')));
  assert.ok(contract.forbiddenSystems.includes('NightFlow'));
  assert.ok(contract.forbiddenSystems.includes('Save schema'));
});

test('C5-104 content fixtures keep change/add/create/write constraints false',()=>{
  for(const fixture of [reach,parity,teacher,handoff,terminology,access]){
    for(const node of walk(fixture)){
      const key=node.path.at(-1)??'';
      if(/^(changes|creates|adds|writes|modifies|selects)/.test(key)&&typeof node.value==='boolean'){
        assert.equal(node.value,false,fixture.id+' '+node.path.join('.'));
      }
    }
  }
});

test('C5-104 Night-study preparation contains no active gameplay write arrays',()=>{
  assert.equal(night.selectedRuntimeConsumerId,null);
  assert.deepEqual(night.mechanics.effects,[]);
  assert.deepEqual(night.mechanics.careerWrites,[]);
  assert.deepEqual(night.mechanics.relationshipWrites,[]);
  assert.deepEqual(night.mechanics.nightFlowChanges,[]);
  assert.deepEqual(night.mechanics.publishesWorldFacts,[]);
  assert.deepEqual(night.invariants,{tuitionDelta:0,currentDayEnergyDelta:0,statGain:2,nextDayEnergyDelta:-1,counter:'night_study_sessions'});
});

test('C5-104 career handoff makes no threshold producer or career-state selection',()=>{
  assert.equal(handoff.allMappingThresholdsNull,true);
  assert.equal(handoff.allProducerPublicFactsNull,true);
  assert.equal(handoff.constraints.createsCareerState,false);
  assert.equal(handoff.constraints.createsThreshold,false);
  assert.equal(handoff.constraints.createsProducerFact,false);
  assert.equal(handoff.constraints.changesRuntime,false);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

function read(path:string){return JSON.parse(readFileSync(path,'utf8'));}

const contract=read('content/school-queue-v9-ownership-collision-regression-v4.fixture.json');
const fixtures=contract.queueArtifacts.map((path:string)=>read(path));

function walk(value:any,path:string[]=[]):Array<{path:string[],value:any}>{
  const out:Array<{path:string[],value:any}>=[{path,value}];
  if(Array.isArray(value))for(let i=0;i<value.length;i++)out.push(...walk(value[i],[...path,String(i)]));
  else if(value&&typeof value==='object')for(const [k,v] of Object.entries(value))out.push(...walk(v,[...path,k]));
  return out;
}

test('C5-95 ownership contract excludes runtime and cross-role production roots',()=>{
  assert.deepEqual(contract.constraints,{
    modifiesRuntime:false,modifiesSave:false,modifiesNightFlow:false,modifiesCareer:false,
    modifiesActivity:false,modifiesMedia:false,modifiesProducerState:false,modifiesEconomy:false,
    modifiesCurriculum:false,modifiesTeacherCanon:false
  });
  assert.ok(contract.forbiddenProductionOwnership.some((x:string)=>x.endsWith('/src/')));
  assert.ok(contract.forbiddenProductionOwnership.some((x:string)=>x.endsWith('/content/localization.json')));
  assert.ok(contract.forbiddenProductionOwnership.some((x:string)=>x.endsWith('/content/packs/')));
  assert.ok(contract.forbiddenProductionOwnership.some((x:string)=>x.endsWith('/assets/')));
});

test('C5-95 queue-v9 fixtures contain no active mechanic write arrays or nonzero audit write counts',()=>{
  const guarded=new Set([
    'effects','careerWrites','activityWrites','relationshipWrites','economyChanges','nightFlowChanges',
    'publishesWorldFacts','teacherStateWrites','lustEffects','lustRoutingChanges','consentRuleChanges',
    'sexualityPackageChanges','groomingPackageChanges','endurancePackageChanges','teacherRelationshipWrites',
    'mechanicClaims'
  ]);
  for(const fixture of fixtures){
    for(const node of walk(fixture)){
      const key=node.path.at(-1);
      if(key&&guarded.has(key)){
        if(Array.isArray(node.value))assert.equal(node.value.length,0,fixture.id+' owns '+node.path.join('.'));
        else if(typeof node.value==='number')assert.equal(node.value,0,fixture.id+' records nonzero '+node.path.join('.'));
        else if(typeof node.value==='boolean')assert.equal(node.value,false,fixture.id+' enables '+node.path.join('.'));
      }
    }
  }
});

test('C5-95 queue-v9 decisions do not select runtime consumers thresholds or public producer results',()=>{
  for(const fixture of fixtures){
    for(const node of walk(fixture)){
      const key=node.path.at(-1);
      if(key==='selectedRuntimeConsumerId'||key==='selectedThreshold'||key==='selectedPublicFactId'||key==='selectedProducerPublicFactId'){
        assert.equal(node.value,null,fixture.id+' '+node.path.join('.'));
      }
      if(key==='selectedThresholds'||key==='selectedPublicResultIds'){
        for(const value of Object.values(node.value as Record<string,unknown>))assert.equal(value,null,fixture.id+' '+node.path.join('.'));
      }
    }
  }
});

test('C5-95 explicit change/add/write constraints remain false',()=>{
  for(const fixture of fixtures){
    if(!fixture.constraints)continue;
    for(const [key,value] of Object.entries(fixture.constraints)){
      if(/^(changes|modifies|adds|writes)/.test(key))assert.equal(value,false,fixture.id+' '+key);
    }
  }
});

test('C5-95 queue-v9 fixture ids remain School-owned and files are fixture-local only',()=>{
  for(const fixture of fixtures)assert.match(fixture.id,/^school\./,fixture.id);
  for(const path of contract.queueArtifacts)assert.match(path,/^content\/school-.*\.fixture\.json$/,path);
});

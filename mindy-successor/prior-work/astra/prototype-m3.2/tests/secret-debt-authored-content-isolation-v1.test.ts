import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';

import {ordinaryHardWorkCareers} from '../src/core/schema.ts';
import {catalog} from './helpers.ts';

const authored=JSON.parse(
  readFileSync('content/secret-debt-authored-content-ru-en-v1.fixture.json','utf8')
);

const rootPackFiles=readdirSync('content/packs')
  .filter(name=>name.endsWith('.json'))
  .sort();

const ordinaryPovertyPackFiles=[
  'poverty-street-production.json',
  'poverty-street-production-v2.json',
  'poverty-cheap-production.json',
  'poverty-cheap-production-v2.json',
  'poverty-recovery-production.json',
  'poverty-pressure-production.json'
];

const ordinaryPovertyIds=new Set(
  ordinaryPovertyPackFiles
    .map(name=>JSON.parse(readFileSync('content/packs/'+name,'utf8')))
    .flatMap((pack:any)=>pack.events.map((event:any)=>event.id))
);

function collectIdentityStrings(value:any,out:string[]=[]):string[]{
  if(Array.isArray(value)){
    for(const item of value)collectIdentityStrings(item,out);
    return out;
  }
  if(value&&typeof value==='object'){
    for(const [key,item] of Object.entries(value)){
      if(
        typeof item==='string' &&
        ['id','gameplayIdentity','presentationId','rewardId'].includes(key)
      ){
        out.push(item);
      }else{
        collectIdentityStrings(item,out);
      }
    }
  }
  return out;
}

function assertOpenSlotsRemainNull(value:any,path:string[]=[]){
  if(Array.isArray(value)){
    value.forEach((item,index)=>assertOpenSlotsRemainNull(item,[...path,String(index)]));
    return;
  }
  if(!value||typeof value!=='object')return;

  if(
    typeof value.status==='string' &&
    value.status.startsWith('OPEN') &&
    Object.prototype.hasOwnProperty.call(value,'value')
  ){
    assert.equal(
      value.value,
      null,
      'Product-open slot received a value at '+path.join('.')
    );
  }

  for(const [key,item] of Object.entries(value)){
    assertOpenSlotsRemainNull(item,[...path,key]);
  }
}

test('Secret Debt authored fixture is explicitly outside root-loaded production packs',()=>{
  assert.equal(authored.status,'BILINGUAL_CONTENT_DRAFT_NOT_PRODUCTION');
  assert.equal(authored.productionCatalogIncluded,false);

  assert.ok(rootPackFiles.every(name=>!/secret.?debt/i.test(name)),rootPackFiles.join(', '));
  assert.ok(catalog.packs.every(pack=>!/secret.?debt/i.test(pack.id)));
  assert.ok(catalog.events.every(event=>!/secret.?debt/i.test(event.id)));
});

test('Secret Debt does not count toward Palace ordinary Hard Work 10 of 10',()=>{
  assert.deepEqual(ordinaryHardWorkCareers,[
    'lumber','satyr-maid','undead-farm','tavern','hunter',
    'guard','merchant','artist-geisha','assassin','prostitute'
  ]);
  assert.equal(ordinaryHardWorkCareers.length,10);
  assert.equal(
    ordinaryHardWorkCareers.some(id=>/secret|debt/i.test(id)),
    false
  );
  assert.equal(JSON.stringify(authored).includes('hardWork:'),false);
});

test('Secret Debt authored identities do not collide with ordinary-poverty production IDs',()=>{
  const identities=collectIdentityStrings(authored);
  for(const id of identities){
    assert.equal(ordinaryPovertyIds.has(id),false,id);
  }

  for(const id of ordinaryPovertyIds){
    assert.match(id,/^poverty-/);
    assert.equal(/secret.?debt/i.test(id),false,id);
  }
});

test('all Product-open Secret Debt mechanic and reward slots remain unselected',()=>{
  assertOpenSlotsRemainNull(authored);

  for(const [key,slot] of Object.entries(authored.globalOpenMechanics) as [string,any][]){
    assert.equal(slot.status,'OPEN',key);
    assert.equal(slot.value,null,key);
  }

  for(const key of [
    'encounterProbability',
    'immediatePrincipal',
    'delayedDebtAmount',
    'activationDelayDays',
    'hiddenCareerId',
    'hiddenCareerShiftEnergyCost',
    'hiddenCareerWage',
    'hiddenCareerStatGains',
    'hiddenCareerThresholds',
    'forcedNightNextDayPenalty',
    'paidFreedomEligibility',
    'boundLifeEligibility',
    'takeoverEligibility',
    'paidFreedomMetaReward',
    'boundLifeMetaReward',
    'takeoverMetaReward'
  ]){
    assert.ok(authored.globalOpenMechanics[key],key);
    assert.equal(authored.globalOpenMechanics[key].value,null,key);
  }
});

test('Secret Debt outcome family names remain authored-only and fixed without thresholds',()=>{
  assert.deepEqual(
    Object.keys(authored.outcomes),
    ['paid_freedom','bound_life','takeover']
  );

  assert.equal(authored.globalOpenMechanics.paidFreedomEligibility.value,null);
  assert.equal(authored.globalOpenMechanics.boundLifeEligibility.value,null);
  assert.equal(authored.globalOpenMechanics.takeoverEligibility.value,null);
  assert.equal(authored.globalOpenMechanics.takeoverExternalDependency.value,null);
});

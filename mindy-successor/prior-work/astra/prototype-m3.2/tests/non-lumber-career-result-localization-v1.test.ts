import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const fixture=JSON.parse(readFileSync('content/non-lumber-career-result-localization-v1.fixture.json','utf8'));
const root=JSON.parse(readFileSync('content/localization.json','utf8'));
const definitions=JSON.parse(readFileSync('content/definitions.json','utf8'));

const expectedActionIds=[
  'satyr-maid.shift','undead-farm.shift','tavern.shift','hunter.shift','guard.shift',
  'merchant.shift','artist-geisha.shift','assassin.shift','prostitute.shift'
].sort();

function collectKeys(value:unknown,out:string[]=[]):string[]{
  if(Array.isArray(value)){for(const item of value)collectKeys(item,out);return out;}
  if(value&&typeof value==='object'){
    for(const [key,child] of Object.entries(value as Record<string,unknown>)){
      out.push(key);collectKeys(child,out);
    }
  }
  return out;
}

test('item 37 covers exactly the nine current non-Lumber ordinary career actions',()=>{
  assert.deepEqual([...fixture.actionIds].sort(),expectedActionIds);
  for(const id of expectedActionIds){
    assert.ok(definitions.actions.some((action:{id:string})=>action.id===id),id);
  }
  assert.equal(fixture.actionIds.includes('lumber.shift'),false);
});

test('item 37 has complete RU and EN result copy for four seasonal scene IDs per career',()=>{
  const entries=Object.entries(fixture.strings) as [string,{ru:string;en:string}][];
  assert.equal(entries.length,36);
  for(const id of expectedActionIds){
    for(const season of ['spring','summer','autumn','winter']){
      const key=`action.${id}.result.${season}.default.text`;
      const entry=fixture.strings[key];
      assert.ok(entry,key);
      assert.ok(entry.ru.trim().length>0,key+' RU');
      assert.ok(entry.en.trim().length>0,key+' EN');
    }
  }
});

test('proposed result keys are additive or exact-identical against current root localization',()=>{
  for(const [key,value] of Object.entries(fixture.strings)){
    const current=root.strings[key];
    if(current!==undefined)assert.deepEqual(current,value,key);
  }
});

test('fixture is presentation-only and contains no mechanics, effects, rewards, RNG or Save fields',()=>{
  const forbidden=[
    'conditions','effects','reward','rewards','metaRewards','wage','cost','energy','money',
    'nextDayEffects','nextDayEnergyDelta','rng','save','transitions','stages','relationship',
    'careerCounter','worldFact','nightPolicy'
  ];
  const keys=collectKeys(fixture);
  for(const field of forbidden)assert.equal(keys.includes(field),false,field);
  assert.equal(fixture.invariants.mechanicsIncluded,false);
  assert.equal(fixture.invariants.effectsIncluded,false);
  assert.equal(fixture.invariants.rewardsIncluded,false);
  assert.equal(fixture.invariants.rngIncluded,false);
  assert.equal(fixture.invariants.saveFieldsIncluded,false);
});

test('fixture does not contaminate Lumber, Forest or Secret Debt content',()=>{
  const serialized=JSON.stringify(fixture).toLowerCase();
  assert.equal(serialized.includes('lumber.shift'),false);
  assert.equal(serialized.includes('lumber.forest'),false);
  assert.equal(serialized.includes('secret debt'),false);
  assert.equal(serialized.includes('secret-debt'),false);
});

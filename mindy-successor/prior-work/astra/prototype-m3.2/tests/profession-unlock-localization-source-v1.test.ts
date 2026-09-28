import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const definitions=JSON.parse(readFileSync('content/definitions.json','utf8'));
const professions=JSON.parse(readFileSync('content/profession-localization-v1.fixture.json','utf8'));
const unlocks=JSON.parse(readFileSync('content/legacy-unlock-localization-v1.fixture.json','utf8'));

const expectedCareerIds=[
  'lumber','satyr-maid','undead-farm','tavern','hunter',
  'guard','merchant','artist-geisha','assassin','prostitute'
].sort();

const expectedUnlockIds=[
  'guild','scholar','calendar','host','mediator','court','vitality',
  'lumber.forewoman.compat','lumber.forest.compat','palace'
].sort();

test('profession fixture targets exact current ordinary career IDs',()=>{
  assert.deepEqual(definitions.careers.map((career:any)=>career.id).sort(),expectedCareerIds);

  const keys=Object.keys(professions.strings).sort();
  const expected=expectedCareerIds.flatMap(id=>[
    `profession.${id}.label`,
    `profession.${id}.description`
  ]).sort();

  assert.deepEqual(keys,expected);
  assert.equal(keys.some(key=>key.startsWith('profession.palace.')),false);
});

test('legacy unlock fixture covers exact current and legacy-compatible display IDs',()=>{
  const generated=definitions.endings
    .filter((ending:any)=>(ending.metaRewards??[]).length===0)
    .map((ending:any)=>ending.reward)
    .sort();

  const expectedGenerated=[
    'guild','scholar','host','mediator','court','vitality',
    'lumber.forewoman.compat','lumber.forest.compat'
  ].sort();

  assert.deepEqual(generated,expectedGenerated);

  const keys=Object.keys(unlocks.strings).sort();
  const expected=expectedUnlockIds.map(id=>`unlock.${id}.label`).sort();
  assert.deepEqual(keys,expected);

  assert.equal(keys.includes('unlock.lumber.hardwork.compat.label'),false);
  assert.ok(keys.includes('unlock.palace.label'));
  assert.ok(keys.includes('unlock.calendar.label'));
});

test('all profession and unlock values have complete RU EN pairs',()=>{
  for(const [key,value] of Object.entries({
    ...professions.strings,
    ...unlocks.strings
  }) as [string,{ru:string;en:string}][]){
    assert.ok(value.ru?.trim(),key+' missing ru');
    assert.ok(value.en?.trim(),key+' missing en');
    assert.deepEqual(Object.keys(value).sort(),['en','ru'],key);
  }
});

test('profession and unlock fixtures carry presentation data only',()=>{
  const forbidden=new Set([
    'wage','wages','conditions','condition','effects','effect','reward','rewards',
    'metaRewards','counter','counters','progression','rng','rngState','save','Save',
    'cost','moneyCost','energyCost'
  ]);

  const scan=(value:any,path:string[]=[]):void=>{
    if(Array.isArray(value)){value.forEach((item,index)=>scan(item,[...path,String(index)]));return;}
    if(value&&typeof value==='object'){
      for(const [key,child] of Object.entries(value)){
        assert.equal(forbidden.has(key),false,'forbidden field '+[...path,key].join('.'));
        scan(child,[...path,key]);
      }
    }
  };

  scan({strings:professions.strings});
  scan({strings:unlocks.strings});
});

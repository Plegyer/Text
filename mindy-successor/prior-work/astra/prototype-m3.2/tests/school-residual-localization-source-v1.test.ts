import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const root=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const presentationRaw=JSON.parse(readFileSync('content/presentation.json','utf8'));
const presentation=presentationRaw.slots??presentationRaw;
const ru=JSON.parse(readFileSync('content/school-residual-localization-ru-v1.fixture.json','utf8'));
const en=JSON.parse(readFileSync('content/school-residual-localization-en-v1.fixture.json','utf8'));
const merged=JSON.parse(readFileSync('content/school-residual-localization-v1.fixture.json','utf8'));

const expectedKeys=[
  'presentation.static.school-course-literacy-and-numbers.alt',
  'presentation.static.school-course-arcana.alt',
  'presentation.static.school-course-etiquette-and-presentation.alt',
  'presentation.static.school-course-arts-and-performance.alt'
].sort();

const expectedConsumers={
  'presentation.static.school-course-literacy-and-numbers.alt':'school/literacy-and-numbers/lesson/default',
  'presentation.static.school-course-arcana.alt':'school/arcana/lesson/default',
  'presentation.static.school-course-etiquette-and-presentation.alt':'school/etiquette-and-presentation/lesson/default',
  'presentation.static.school-course-arts-and-performance.alt':'school/arts-and-performance/lesson/default'
} as const;

test('residual patch is either audited-empty or exact current School accessibility keys',()=>{
  const keys=Object.keys(merged.strings).sort();
  if(keys.length===0){
    assert.deepEqual(Object.keys(ru.strings),[]);
    assert.deepEqual(Object.keys(en.strings),[]);
    assert.equal(merged.invariants.verifiedResidualKeysOnly,true);
    return;
  }
  assert.deepEqual(keys,expectedKeys);
});

test('every non-empty residual key has complete RU EN pair',()=>{
  for(const [key,value] of Object.entries(merged.strings) as [string,{ru:string;en:string}][]){
    assert.ok(value.ru?.trim(),key+' missing ru');
    assert.ok(value.en?.trim(),key+' missing en');
    assert.deepEqual(Object.keys(value).sort(),['en','ru'],key);
  }
});

test('every residual key already has an exact current presentation consumer',()=>{
  for(const [key,presentationId] of Object.entries(expectedConsumers)){
    if(!(key in merged.strings))continue;
    const slot=presentation[presentationId];
    assert.ok(slot,'missing presentation '+presentationId);
    assert.equal(slot.static?.altKey,key);
    assert.ok(slot.static?.src?.startsWith('assets/presentation/school-course-'));
  }
});

test('worker RU and EN patches merge consistently into stable pairs',()=>{
  for(const [key,value] of Object.entries(ru.strings) as [string,string][]){
    assert.ok(key in merged.strings,key);
    assert.equal(merged.strings[key].ru,value,key+' ru mismatch');
  }
  for(const [key,value] of Object.entries(en.strings) as [string,string][]){
    assert.ok(key in merged.strings,key);
    assert.equal(merged.strings[key].en,value,key+' en mismatch');
  }
});

test('promoted residual accessibility keys match the reviewed merged patch',()=>{
  if(Object.keys(merged.strings).length===0)return;

  for(const key of expectedKeys){
    assert.ok(root[key],key+' missing current root key');
    assert.deepEqual(root[key],merged.strings[key],key+' promoted pair mismatch');
  }
});

test('fixtures do not promote teacher staging or carry gameplay fields',()=>{
  const allKeys=Object.keys(merged.strings);
  assert.equal(allKeys.some(key=>key.includes('teacher')),false);
  assert.equal(allKeys.some(key=>key.includes('school.track.')),false);
  assert.equal(allKeys.some(key=>key.includes('night_study')),false);

  const forbidden=new Set([
    'conditions','condition','effects','effect','reward','rewards','metaRewards',
    'tuition','energyCost','statEffects','progression','rng','rngState','save','Save',
    'moneyCost','nextDayEnergyDelta','nextDayEffects','media','src','presentationId'
  ]);

  const scan=(value:any,path:string[]=[]):void=>{
    if(Array.isArray(value)){
      value.forEach((item,index)=>scan(item,[...path,String(index)]));
      return;
    }
    if(value&&typeof value==='object'){
      for(const [key,child] of Object.entries(value)){
        assert.equal(forbidden.has(key),false,'forbidden field '+[...path,key].join('.'));
        scan(child,[...path,key]);
      }
    }
  };

  scan({strings:merged.strings});
});

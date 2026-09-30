import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const strings=JSON.parse(readFileSync('content/localization.json','utf8')).strings as Record<string,{ru?:string;en?:string}>;

const prefixes=[
  'school.depth.rhetoric_and_social.',
  'school.depth.etiquette_and_presentation.',
  'school.depth.field_craft.',
  'school.depth.physical_training.',
  'school.depth.arts_and_performance.',
  'school.depth.body_confidence.'
] as const;

test('QA-accepted School depth localization is integrated as RU/EN text only',()=>{
  const all=Object.keys(strings);
  let total=0;
  for(const prefix of prefixes){
    const keys=all.filter(key=>key.startsWith(prefix));
    assert.equal(keys.length,8,prefix);
    total+=keys.length;
    for(const key of keys){
      assert.ok(strings[key]?.ru?.trim(),key+' ru');
      assert.ok(strings[key]?.en?.trim(),key+' en');
    }
  }
  assert.equal(total,48);
});

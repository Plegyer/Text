import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

function read(name:string){return JSON.parse(readFileSync(`content/${name}`,'utf8'));}

const fixtures=[
  read('school-satyr-v12-accounting.fixture.json'),
  read('school-satyr-v12-rhetoric.fixture.json'),
  read('school-satyr-v12-boundary.fixture.json')
];

test('C5-129 source copy covers RU EN title body result journal and accessibility for all three hooks',()=>{
  assert.equal(fixtures.length,3);
  for(const fixture of fixtures){
    for(const field of ['title','body','result','journal','accessibility']){
      const pair=fixture.copy[field];
      assert.ok(pair?.ru?.trim(),fixture.id+' '+field+' ru');
      assert.ok(pair?.en?.trim(),fixture.id+' '+field+' en');
      assert.notEqual(pair.ru,pair.en,fixture.id+' '+field+' locale parity must not be a duplicate');
    }
  }
});

test('C5-129 source copy stays bound to the exact live courses and existing teachers',()=>{
  assert.deepEqual(fixtures.map(x=>[x.courseId,x.teacherContentId]),[
    ['school.course.literacy_and_numbers','school.teacher.mara-fen'],
    ['school.course.rhetoric_and_social','school.teacher.cassian-reed'],
    ['school.course.body_confidence','school.teacher.sera-vey']
  ]);
});

test('C5-129 source authoring never turns the local threshold into a certificate or project result',()=>{
  const text=JSON.stringify(fixtures);
  for(const fixture of fixtures){
    assert.equal(fixture.localThreshold.counter,'lessons_completed');
    assert.equal(fixture.localThreshold.value,3);
    assert.equal(fixture.localThreshold.scope,'satyr-maid-only');
  }
  assert.equal(/"publishesGlobalCertificate":true/.test(text),false);
  assert.equal(/"publishesGlobalProject":true/.test(text),false);
});

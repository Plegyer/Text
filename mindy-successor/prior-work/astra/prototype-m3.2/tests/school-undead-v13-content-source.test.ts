import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const arcana=JSON.parse(readFileSync('content/school-undead-v13-arcana.fixture.json','utf8'));
const management=JSON.parse(readFileSync('content/school-undead-v13-management.fixture.json','utf8'));
const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;

test('C5-138 reuses current Arcana and Literacy teachers',()=>{
  assert.equal(arcana.teacherContentId,'school.teacher.ilyra-venn');
  assert.equal(management.teacherContentId,'school.teacher.mara-fen');
  assert.ok(localization['school.course.arcana.description'].en.includes('Ilyra Venn'));
  assert.ok(localization['school.course.arcana.description'].ru.includes('Илира Венн'));
  assert.ok(localization['school.course.literacy_and_numbers.description'].en.includes('Mara Fen'));
  assert.ok(localization['school.course.literacy_and_numbers.description'].ru.includes('Мара Фен'));
});

test('C5-139/C5-140 source copy has complete RU EN result journal and accessibility coverage',()=>{
  for(const fixture of [arcana,management]){
    for(const field of ['title','body','result','journal','accessibility']){
      const pair=fixture.copy[field];
      assert.ok(pair?.ru?.trim(),fixture.id+' '+field+' ru');
      assert.ok(pair?.en?.trim(),fixture.id+' '+field+' en');
      assert.notEqual(pair.ru,pair.en,fixture.id+' '+field);
    }
  }
});

test('C5-139 Arcana copy acknowledges research without inventing item mechanics',()=>{
  assert.equal(arcana.constraints.createsItem,false);
  assert.equal(arcana.constraints.changesCareerStateDirectly,false);
  assert.equal(arcana.careerFact,'school-research-ready');
  assert.equal(arcana.reactionEvent,'undead-farm.school.arcana-research');
});

test('C5-140 management copy does not directly advance the Farm career machine',()=>{
  assert.equal(management.constraints.advancesCareerDirectly,false);
  assert.equal(management.constraints.changesCurriculumEconomy,false);
  assert.equal(management.careerFact,'school-management-ready');
  assert.equal(management.reactionEvent,'undead-farm.school.management-records');
});

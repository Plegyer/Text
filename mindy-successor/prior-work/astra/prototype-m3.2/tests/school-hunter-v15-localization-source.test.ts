import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const hunterSchool=JSON.parse(readFileSync('content/packs/hunter-school.json','utf8'));

test('C5-165 authoritative Hunter Field Craft event has complete RU EN source localization',()=>{
  for(const suffix of ['title','variant.default.text','choice.apply.label','choice.apply.text']){
    const pair=localization[`event.hunter.school.field-craft.${suffix}`];
    assert.ok(pair?.ru?.trim(),suffix+' ru');
    assert.ok(pair?.en?.trim(),suffix+' en');
    assert.notEqual(pair.ru,pair.en,suffix);
  }
});

test('C5-164/C5-165 Rowan teacher continuity is bilingual and wired into the live Hunter event',()=>{
  const course=localization['school.course.field_craft.description'];
  const alt=localization['media.school.teacher.field-craft.classroom.alt'];
  assert.ok(course?.ru?.includes('Роуэн Пайк'));
  assert.ok(course?.en?.includes('Rowan Pike'));
  assert.ok(alt?.ru?.includes('Роуэн Пайк'));
  assert.ok(alt?.en?.includes('Rowan Pike'));

  const event=hunterSchool.events.find((x:any)=>x.id==='hunter.school.field-craft');
  assert.ok(event);
  assert.deepEqual(event.variants[0].media,['school.teacher.field-craft.classroom']);
});

test('C5-165 Hunter v15 does not carry Tavern School v14 localization through the restack',()=>{
  assert.equal(localization['event.tavern.school.records.title'],undefined);
  assert.equal(localization['event.tavern.school.broker.title'],undefined);
  assert.equal(localization['event.tavern.school.etiquette.title'],undefined);
  assert.equal(localization['event.tavern.school.arcana.title'],undefined);
});

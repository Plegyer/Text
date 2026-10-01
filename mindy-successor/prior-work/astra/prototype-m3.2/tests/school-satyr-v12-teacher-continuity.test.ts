import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const continuity=JSON.parse(readFileSync('content/school-satyr-v12-teacher-continuity.fixture.json','utf8'));
const teachers=JSON.parse(readFileSync('content/packs/school-teachers-v1.json','utf8'));
const localization=JSON.parse(readFileSync('content/localization.json','utf8'));

test('C5-127 reuses existing live teacher identities and media only',()=>{
  const media=new Set(teachers.media.map((x:any)=>x.id));
  assert.equal(continuity.entries.length,3);
  for(const entry of continuity.entries){
    assert.ok(media.has(entry.liveMediaId),entry.liveMediaId);
    const description=localization.strings[`${entry.courseId}.description`];
    assert.ok(description?.en.includes(entry.teacherName),entry.teacherName);
    assert.ok(description?.ru.trim(),entry.courseId);
  }
  assert.equal(continuity.constraints.newTeacherRosterEntries,0);
  assert.equal(continuity.constraints.usesExistingTeachersOnly,true);
});

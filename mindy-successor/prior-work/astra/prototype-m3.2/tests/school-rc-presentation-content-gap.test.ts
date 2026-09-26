import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {SCHOOL_COURSES} from '../src/core/school.ts';

const doc=readFileSync(
  '../../../docs/school-prep/SCHOOL_RC_PRESENTATION_CONTENT_GAP_v1.md',
  'utf8'
);
const ui=JSON.parse(
  readFileSync('content/school-production-ui.fixture.json','utf8')
);
const night=JSON.parse(
  readFileSync('content/school-night-presentation.fixture.json','utf8')
);

test('mechanics-ready and semantic presentation-ready surfaces remain separate from content depth',()=>{
  assert.match(doc,/## Mechanics-ready course surface/);
  assert.match(doc,/## Semantic presentation-ready surface/);
  assert.match(doc,/## Missing teacher identities/);
  assert.match(doc,/## Missing milestone\/certificate\/project authoring/);
  assert.match(doc,/## Future static\/GIF asset depth/);
});

test('all eight paid courses retain stable semantic presentation IDs',()=>{
  assert.equal(ui.courses.length,8);

  for(const source of SCHOOL_COURSES){
    const row=ui.courses.find(
      (item:any)=>item.courseId===source.id
    );
    assert.ok(row,source.id);
    assert.equal(row.presentationId,source.presentationId);
    assert.match(
      row.presentationId,
      /^school\/[a-z0-9]+(?:-[a-z0-9]+)*\/lesson\/default$/
    );
  }
});

test('Night presentation mapping remains semantic and independent of teacher authoring',()=>{
  assert.equal(night.entries.length,24);
  for(const entry of night.entries){
    assert.match(
      entry.presentationId,
      /^school\/night-study\/[a-z0-9]+(?:-[a-z0-9]+)*\/default$/
    );
  }
});

test('teacher and asset polish are not described as mechanics blockers',()=>{
  assert.match(
    doc,
    /Teacher authoring is \*\*CONTENT_DEPTH\*\*, not a mechanics blocker/
  );
  assert.match(
    doc,
    /Asset depth is \*\*PRESENTATION_FUTURE\*\*/
  );
  assert.match(
    doc,
    /Do not convert presentation polish into a mechanics blocker/
  );
});

test('milestone certificate project and public-fact decisions remain OPEN authoring',()=>{
  for(const phrase of [
    'final milestone thresholds',
    'final certificate thresholds',
    'exact project definitions',
    'final management/accounting public fact',
    'final Arcana/Forest public fact'
  ]){
    assert.equal(doc.includes(phrase),true,phrase);
  }
});

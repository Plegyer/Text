import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const leadership=JSON.parse(
  readFileSync('content/school-leadership-preparation-text-v1.fixture.json','utf8')
);
const forestKnowledge=JSON.parse(
  readFileSync('content/school-forest-knowledge-preparation-text-v1.fixture.json','utf8')
);
const teacherDepth=JSON.parse(
  readFileSync('content/school-teacher-milestone-depth-v1.fixture.json','utf8')
);
const nightDepth=JSON.parse(
  readFileSync('content/school-night-study-content-depth-v1.fixture.json','utf8')
);
const definitions=JSON.parse(readFileSync('content/definitions.json','utf8'));
const localization=JSON.parse(readFileSync('content/localization.json','utf8'));

const fixtures=[leadership,forestKnowledge,teacherDepth,nightDepth];

function referencedKeys(value:any,out:string[]=[]):string[]{
  if(Array.isArray(value)){
    for(const item of value)referencedKeys(item,out);
    return out;
  }
  if(!value||typeof value!=='object')return out;
  for(const [key,item] of Object.entries(value)){
    if(key==='keys'&&item&&typeof item==='object'&&!Array.isArray(item)){
      for(const ref of Object.values(item)){
        if(typeof ref==='string')out.push(ref);
      }
    }else referencedKeys(item,out);
  }
  return out;
}

test('C5-10 prepared School localization fixtures have complete RU EN parity',()=>{
  const allKeys:string[]=[];

  for(const fixture of fixtures){
    assert.equal(fixture.formatVersion,1,fixture.id);
    assert.equal(fixture.status,'CONTENT_PREP_ONLY',fixture.id);

    const strings=fixture.strings as Record<string,{ru:string;en:string}>;
    assert.ok(strings&&typeof strings==='object',fixture.id);

    const refs=referencedKeys(fixture);
    assert.deepEqual(
      [...new Set(refs)].sort(),
      Object.keys(strings).sort(),
      `${fixture.id}: every prepared string must be referenced exactly by the fixture`
    );

    for(const [key,pair] of Object.entries(strings)){
      assert.match(key,/^school\.[a-z0-9_.]+$/,key);
      assert.equal(typeof pair.ru,'string',`${key}: ru`);
      assert.equal(typeof pair.en,'string',`${key}: en`);
      assert.ok(pair.ru.trim().length>0,`${key}: missing RU text`);
      assert.ok(pair.en.trim().length>0,`${key}: missing EN text`);

      const current=localization.strings?.[key];
      if(current!==undefined){
        assert.deepEqual(
          current,
          pair,
          `${key}: any future root integration must preserve the reviewed RU/EN pair`
        );
      }

      allKeys.push(key);
    }
  }

  assert.equal(
    new Set(allKeys).size,
    allKeys.length,
    'prepared School localization keys must not collide across fixtures'
  );
});

test('C5-10 leadership and Arcana content stays on exact existing School identities',()=>{
  assert.equal(leadership.id,'school.leadership-preparation-text.v1');
  assert.equal(leadership.sourceCourseId,'school.course.literacy_and_numbers');
  assert.equal(leadership.sourceTrackId,'school.track.literacy_and_numbers');
  assert.equal(leadership.teacherContentId,'school.teacher.mara-fen');
  assert.equal(leadership.selectedMilestoneId,null);
  assert.equal(leadership.selectedThreshold,null);

  assert.equal(forestKnowledge.id,'school.forest-knowledge-preparation-text.v1');
  assert.equal(forestKnowledge.sourceCourseId,'school.course.arcana');
  assert.equal(forestKnowledge.sourceTrackId,'school.track.arcana');
  assert.equal(forestKnowledge.teacherContentId,'school.teacher.ilyra-venn');
  assert.equal(forestKnowledge.selectedMilestoneId,null);
  assert.equal(forestKnowledge.selectedThreshold,null);
  assert.equal(forestKnowledge.selectedPublicResultId,null);
  assert.equal(forestKnowledge.selectedDirectForestConsumerId,null);
});

test('C5-10 teacher depth keeps stable teacher identities and no mechanics',()=>{
  assert.equal(teacherDepth.id,'school.teacher-milestone-depth.v1');

  assert.deepEqual(
    teacherDepth.teachers.map((item:any)=>[
      item.teacherContentId,
      item.sourceCourseId,
      item.sourceTrackId
    ]),
    [
      [
        'school.teacher.mara-fen',
        'school.course.literacy_and_numbers',
        'school.track.literacy_and_numbers'
      ],
      [
        'school.teacher.ilyra-venn',
        'school.course.arcana',
        'school.track.arcana'
      ]
    ]
  );

  assert.equal(teacherDepth.selectedMilestoneIds['school.teacher.mara-fen'],null);
  assert.equal(teacherDepth.selectedMilestoneIds['school.teacher.ilyra-venn'],null);
  assert.deepEqual(teacherDepth.mechanics.effects,[]);
  assert.deepEqual(teacherDepth.mechanics.selectedThresholds,[]);
  assert.deepEqual(teacherDepth.mechanics.publishesWorldFacts,[]);

  for(const teacher of teacherDepth.teachers){
    assert.equal(
      new Set(teacher.variants.map((variant:any)=>variant.id)).size,
      teacher.variants.length,
      teacher.teacherContentId
    );
  }
});

test('C5-10 Night-study depth references only exact current choice IDs and keeps mechanics invariant',()=>{
  assert.equal(nightDepth.id,'school.night-study-content-depth.v1');

  const expected=[
    'school.night_study.literacy_and_numbers.reason',
    'school.night_study.literacy_and_numbers.wits',
    'school.night_study.arcana.magic',
    'school.night_study.arcana.reason',
    'school.night_study.arcana.creativity'
  ];

  assert.deepEqual(nightDepth.entries.map((item:any)=>item.choiceId),expected);

  const currentNightIds=new Set(
    definitions.nightChoices.map((choice:any)=>choice.id)
  );
  for(const id of expected)assert.ok(currentNightIds.has(id),id);

  assert.deepEqual(nightDepth.invariants,{
    changesNightFlow:false,
    tuitionDelta:0,
    currentDayEnergyDelta:0,
    nextDayEnergyDelta:-1,
    statGain:2,
    additionalProgressEffects:[]
  });
});

import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {executeSchoolLesson} from '../src/core/school.ts';
import {applyEffects,dispatch,eligible,freshSave,resolveReactions} from '../src/core/engine.ts';
import {catalog} from './helpers.ts';

const map=JSON.parse(readFileSync('content/school-satyr-v12-track-map.fixture.json','utf8'));
const schoolSource=readFileSync('src/core/school.ts','utf8');
const runtime={applyEffects,resolveReactions};

function ready(){
  const s=freshSave();
  s.run.character.creation.remaining=0;
  s.run.character.creation.allocated={};
  s.run.character.creation.complete=true;
  s.run.flags['story.arrived']=true;
  s.run.resources.money=5_000;
  s.run.dayState.energyCurrent=3;
  return s;
}

function clearBlockingScenes(input:ReturnType<typeof ready>){
  let s=input;
  let guard=0;
  while(s.run.flow.pendingScene){
    if(++guard>10)throw new Error('Unexpected School scene loop');
    const event=catalog.events.find(e=>e.id===s.run.flow.pendingScene!.eventId);
    assert.ok(event);
    const choice=event.choices.find(c=>eligible(c.conditions,s));
    assert.ok(choice);
    s=dispatch(s,{type:'choice',id:choice.id},catalog);
  }
  return s;
}

test('C5-130 Satyr threshold does not enter the global School runtime source',()=>{
  assert.equal(schoolSource.includes('satyr-maid'),false);
  assert.equal(schoolSource.includes('school-management-ready'),false);
  assert.equal(schoolSource.includes('school-rhetoric-ready'),false);
  assert.equal(schoolSource.includes('school-boundaries-ready'),false);
});

test('C5-130 three paid lessons remain ordinary School progress, not a global certificate or milestone',()=>{
  let s=ready();
  for(let i=0;i<3;i++){
    s=executeSchoolLesson(s,'school.course.literacy_and_numbers',catalog,runtime).state;
    s=clearBlockingScenes(s);
  }
  const track=s.run.progression.school.tracks['school.track.literacy_and_numbers'];
  assert.equal(track.counters.lessons_completed,3);
  assert.deepEqual(track.milestones,[]);
  assert.deepEqual(track.certificates,[]);
});

test('C5-130 only the three contract tracks carry the local Satyr hook policy',()=>{
  const relevant=map.tracks.filter((x:any)=>x.minorHookRelevant);
  assert.equal(map.localMinorHookPolicy.threshold,3);
  assert.equal(map.localMinorHookPolicy.scope,'satyr-maid-only');
  assert.equal(map.localMinorHookPolicy.globalCertificateRule,false);
  assert.equal(map.localMinorHookPolicy.globalProjectRule,false);
  assert.deepEqual(relevant.map((x:any)=>x.trackId).sort(),[
    'school.track.body_confidence',
    'school.track.literacy_and_numbers',
    'school.track.rhetoric_and_social'
  ]);
});

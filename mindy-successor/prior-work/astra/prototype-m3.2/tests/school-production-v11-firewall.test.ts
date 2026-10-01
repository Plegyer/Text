import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

function read(path:string){return JSON.parse(readFileSync(path,'utf8'));}

const lesson=read('content/packs/school-lesson-content-v1.json');
const life=read('content/packs/school-life-content-v1.json');
const teachers=read('content/packs/school-teachers-v1.json');
const packs=[lesson,life,teachers];

test('C5-117 School production packs contain no unresolved producer/public-result facts or thresholds',()=>{
  const serialized=JSON.stringify(packs);
  for(const forbidden of [
    'lumber.school.management-ready',
    'lumber.forest.truth-known',
    '"kind":"addWorldFact"',
    '"kind":"advanceCareer"',
    'selectedThreshold',
    'selectedProducerPublicFactId'
  ]){
    assert.equal(serialized.includes(forbidden),false,forbidden);
  }
});

test('C5-117 School production choices remain effect-free content presentation',()=>{
  for(const pack of packs){
    assert.deepEqual(pack.reads,[],pack.id+' reads');
    assert.deepEqual(pack.writes,[],pack.id+' writes');
    for(const event of pack.events){
      for(const choice of event.choices)assert.deepEqual(choice.effects,[],event.id);
    }
  }
});

test('C5-117 School reaction routing uses only existing safe paid-lesson and exact Night-study facts',()=>{
  const generic=[lesson,life]
    .flatMap((pack:any)=>pack.events)
    .filter((event:any)=>event.reactionTriggers.some((t:any)=>t.kind==='actionCompleted'&&t.action==='school'))
    .map((event:any)=>event.id)
    .sort();
  assert.deepEqual(generic,['school-lesson-content-v1.after-school','school-life-content-v1.after-paid-lesson']);

  const exact=life.events.filter((event:any)=>event.id.startsWith('school-life-content-v1.night-study.'));
  assert.equal(exact.length,24);
  for(const event of exact){
    assert.equal(event.reactionTriggers.length,1,event.id);
    assert.equal(event.reactionTriggers[0].kind,'nightChoiceCompleted',event.id);
  }

  const unsafe=life.events
    .flatMap((event:any)=>event.reactionTriggers)
    .filter((trigger:any)=>['worldFactAdded','careerFactAdded','careerTransition','careerCounterChanged'].includes(trigger.kind));
  assert.deepEqual(unsafe,[]);
});

test('C5-117 legacy generic Night-study event is retained but unreachable for new runs',()=>{
  const legacy=life.events.find((event:any)=>event.id==='school-life-content-v1.after-night-study');
  assert.ok(legacy);
  assert.deepEqual(legacy.trigger,[]);
  assert.deepEqual(legacy.reactionTriggers,[{kind:'nightChoiceCompleted',choice:'school.night_study.literacy_and_numbers.reason'}]);
  assert.deepEqual(legacy.conditions,[]);
  assert.deepEqual(legacy.chance,{base:0,stat:'intelligence',perPoint:0,max:0});
});

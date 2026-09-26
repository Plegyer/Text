import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const compat=JSON.parse(readFileSync('content/forest-future-authoring-compat.fixture.json','utf8'));
const schema=readFileSync('../src/core/schema.ts','utf8');
const engine=readFileSync('../src/core/engine.ts','utf8');
const production=JSON.parse(readFileSync('content/definitions.json','utf8'));
const target=JSON.parse(readFileSync('content/lumber-target-definitions.fixture.json','utf8'));
const cross=JSON.parse(readFileSync('content/packs/lumber-target/lumber-cross-system.pack.json','utf8'));

test('compat contract protects legacy optionModelVersion 0 advance/escape behavior',()=>{
  assert.deepEqual(compat.protectedContracts.legacyActivitySave,{
    optionModelVersion:0,
    availableActions:['advance','escape'],
    mustRemainValid:true
  });

  if(schema.includes('optionModelVersion')&&engine.includes('availableActivityActions')){
    assert.ok(schema.includes('optionModelVersion'));
    assert.ok(engine.includes("if(envelope.optionModelVersion===0)return [{id:'advance',label:'Продолжить'},{id:'escape',label:'Отступить'}]"));
  }
});

test('future authoring is additive and cannot reuse existing route/result IDs for different meaning',()=>{
  assert.equal(compat.additiveRules.futureRoutesMayBeAdded,true);
  assert.equal(compat.additiveRules.futureChallengesMayBeAdded,true);
  assert.equal(compat.additiveRules.existingOptionIdsMayBeReusedForDifferentMeaning,false);
  assert.equal(compat.additiveRules.existingResultIdsMayBeReplaced,false);
  assert.equal(compat.futureAuthoringSlots.every((s:any)=>s.productionId===null),true);
});

test('when PR22 production options are present locally, logging-road and old-boundary semantics remain protected',()=>{
  const forest=production.activities?.find((a:any)=>a.id==='lumber.forest');
  if(!forest?.options?.length){
    assert.equal(compat.protectedContracts.loggingRoad.optionId,'forest.route.logging-road');
    assert.equal(compat.protectedContracts.oldBoundary.optionId,'forest.route.old-boundary');
    return;
  }

  const logging=forest.options.find((o:any)=>o.id==='forest.route.logging-road');
  const oldBoundary=forest.options.find((o:any)=>o.id==='forest.route.old-boundary');
  assert.ok(logging);
  assert.ok(oldBoundary);
  assert.deepEqual(logging.conditions,[]);
  assert.equal(logging.setRoute,'logging-road');
  assert.deepEqual(oldBoundary.conditions,[
    {kind:'itemCapability',capability:'enter_old_boundary',present:true}
  ]);
  assert.equal(oldBoundary.setRoute,'old-boundary');

  const synthetic=structuredClone(forest);
  synthetic.options.push({
    id:'future.test.route',
    label:'Future route fixture',
    category:'route',
    conditions:[],
    progressDelta:0,
    enduranceCost:0,
    setRoute:'future-test'
  });
  assert.deepEqual(
    synthetic.options.find((o:any)=>o.id==='forest.route.logging-road'),
    logging
  );
  assert.deepEqual(
    synthetic.options.find((o:any)=>o.id==='forest.route.old-boundary'),
    oldBoundary
  );
});

test('future authoring cannot replace Forest terminal results or exact Lumber activityResult continuation',()=>{
  const forest=target.activities.find((a:any)=>a.id==='lumber.forest');
  assert.deepEqual(forest.results.map((r:any)=>r.id),[
    'lumber.forest.success','lumber.forest.escape','lumber.forest.failure'
  ]);
  assert.deepEqual(compat.protectedContracts.results,[
    'lumber.forest.success','lumber.forest.escape','lumber.forest.failure'
  ]);

  const event=cross.events.find((e:any)=>e.id==='lumber-cross.activity-forest-return');
  assert.deepEqual(event.reactionTriggers,[{
    kind:'activityResult',activity:'lumber.forest',outcome:'success',result:'lumber.forest.success'
  }]);
  assert.deepEqual(compat.protectedContracts.a5,{
    kind:'activityResult',activity:'lumber.forest',outcome:'success',result:'lumber.forest.success'
  });
});

test('future Forest authoring remains independent from Hard Work',()=>{
  const hardWork=target.endings.find((e:any)=>e.id==='ending.lumber.hard-work');
  assert.deepEqual(hardWork.conditions,[
    {kind:'careerCounter',career:'lumber',counter:'completed_shifts',op:'gte',value:50}
  ]);
  assert.deepEqual(hardWork.metaRewards,[
    {kind:'hardWork',rewardId:'hardWork:lumber',career:'lumber'}
  ]);
  assert.equal(compat.hardWorkIsolation.futureForestAuthoringMayChangeHardWork,false);
});

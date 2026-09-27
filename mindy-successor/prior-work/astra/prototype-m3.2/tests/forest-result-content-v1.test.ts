import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

import {loadCatalog} from '../src/core/content.ts';
import {dispatch,freshSave,parseSave} from '../src/core/engine.ts';
import type {Catalog,Save} from '../src/core/schema.ts';

const targetDefinitions=JSON.parse(readFileSync('content/lumber-target-definitions.fixture.json','utf8'));
const forestPack=JSON.parse(readFileSync('content/packs/forest-result-content-v1.json','utf8'));

function catalog(definitions=targetDefinitions):Catalog{
  return loadCatalog(structuredClone(definitions),[structuredClone(forestPack)]);
}

function ready():Save{
  const s=freshSave();
  s.run.creation={remaining:0,allocated:{},complete:true};
  s.run.flags['story.arrived']=true;
  s.run.dayState.energyCurrent=3;
  s.run.progression.worldFacts.push('lumber.capability.enter-old-boundary');
  return s;
}

function finishPending(input:Save,cat:Catalog){
  const before=structuredClone({
    resources:input.run.resources,
    worldFacts:input.run.progression.worldFacts,
    careers:input.run.progression.careers
  });

  let s=parseSave(JSON.stringify(input),cat);
  const eventId=s.run.pending?.eventId;
  const variantId=s.run.pending?.variantId;
  assert.ok(eventId);
  assert.ok(variantId);

  s=parseSave(JSON.stringify(s),cat);
  assert.equal(s.run.pending?.eventId,eventId);
  assert.equal(s.run.pending?.variantId,variantId);

  s=dispatch(s,{type:'choice',id:'return'},cat);
  assert.equal(s.run.pending,null);
  assert.deepEqual(s.run.resources,before.resources);
  assert.deepEqual(s.run.progression.worldFacts,before.worldFacts);
  assert.deepEqual(s.run.progression.careers,before.careers);
  assert.throws(()=>dispatch(s,{type:'choice',id:'return'},cat),/Нет активной сцены/);
  return s;
}

test('Forest result content pack declares the three exact activityResult boundaries',()=>{
  const expected=[
    {
      id:'forest-result-content-v1.success',
      outcome:'success',
      result:'lumber.forest.success'
    },
    {
      id:'forest-result-content-v1.escape',
      outcome:'escape',
      result:'lumber.forest.escape'
    },
    {
      id:'forest-result-content-v1.failure',
      outcome:'failure',
      result:'lumber.forest.failure'
    }
  ];

  assert.deepEqual(
    forestPack.events.map((event:any)=>({
      id:event.id,
      outcome:event.reactionTriggers[0]?.outcome,
      result:event.reactionTriggers[0]?.result
    })),
    expected
  );

  for(const event of forestPack.events){
    assert.deepEqual(event.reactionTriggers,[{
      kind:'activityResult',
      activity:'lumber.forest',
      outcome:event.id.split('.').at(-1),
      result:`lumber.forest.${event.id.split('.').at(-1)}`
    }]);
    assert.ok(event.choices.every((choice:any)=>choice.effects.length===0));
  }
});

test('success result selects content reaction, survives reload, and commits no duplicate content effect',()=>{
  const cat=catalog();
  let s=dispatch(ready(),{type:'enterActivity',id:'lumber.forest'},cat);
  const entryEnergy=s.run.dayState.energyCurrent;

  s=dispatch(s,{type:'activityAction',id:'advance'},cat);
  s=dispatch(s,{type:'activityAction',id:'advance'},cat);

  assert.equal(s.run.flow.activity,null);
  assert.equal(s.run.dayState.energyCurrent,entryEnergy);
  assert.ok(s.run.progression.worldFacts.includes('lumber.forest.truth-known'));
  assert.equal(s.run.pending?.eventId,'forest-result-content-v1.success');
  assert.equal(s.run.history['forest-result-content-v1.success']?.count,1);

  const out=finishPending(s,cat);
  assert.equal(out.run.history['forest-result-content-v1.success']?.count,1);
});

test('escape remains distinct and triggers only the escape content identity',()=>{
  const cat=catalog();
  let s=dispatch(ready(),{type:'enterActivity',id:'lumber.forest'},cat);
  s=dispatch(s,{type:'activityAction',id:'escape'},cat);

  assert.equal(s.run.flow.activity,null);
  assert.ok(s.run.progression.worldFacts.includes('lumber.forest.escaped'));
  assert.ok(!s.run.progression.worldFacts.includes('lumber.forest.truth-known'));
  assert.equal(s.run.pending?.eventId,'forest-result-content-v1.escape');
  assert.equal(s.run.history['forest-result-content-v1.escape']?.count,1);
  assert.equal(s.run.history['forest-result-content-v1.success'],undefined);

  finishPending(s,cat);
});

test('failure uses the exact lumber.forest.failure boundary and never aliases success or escape',()=>{
  const failureDefinitions=structuredClone(targetDefinitions);
  const forest=failureDefinitions.activities.find((activity:any)=>activity.id==='lumber.forest');
  forest.adapterConfig={
    ...forest.adapterConfig,
    initialEndurance:2,
    successAtProgress:99,
    failAtEndurance:0
  };

  const cat=catalog(failureDefinitions);
  let s=dispatch(ready(),{type:'enterActivity',id:'lumber.forest'},cat);
  s=dispatch(s,{type:'activityAction',id:'advance'},cat);
  s=dispatch(s,{type:'activityAction',id:'advance'},cat);

  assert.equal(s.run.flow.activity,null);
  assert.ok(s.run.progression.worldFacts.includes('lumber.forest.failed'));
  assert.ok(!s.run.progression.worldFacts.includes('lumber.forest.truth-known'));
  assert.ok(!s.run.progression.worldFacts.includes('lumber.forest.escaped'));
  assert.equal(s.run.pending?.eventId,'forest-result-content-v1.failure');
  assert.equal(s.run.history['forest-result-content-v1.failure']?.count,1);

  finishPending(s,cat);
});

test('Forest reaction content does not change Lumber Hard Work eligibility or reward',()=>{
  const cat=catalog();
  const ending=cat.definitions.endings.find(entry=>entry.id==='ending.lumber.hard-work');
  assert.ok(ending);
  assert.deepEqual(ending.conditions,[{
    kind:'careerCounter',
    career:'lumber',
    counter:'completed_shifts',
    op:'gte',
    value:50
  }]);
  assert.deepEqual(ending.metaRewards,[{
    kind:'hardWork',
    rewardId:'hardWork:lumber',
    career:'lumber'
  }]);

  assert.ok(forestPack.events.every((event:any)=>
    !JSON.stringify(event).includes('completed_shifts') &&
    !JSON.stringify(event).includes('hardWork:lumber')
  ));
});

test('every Forest result content identity resolves to an existing shipped fallback asset path',()=>{
  const cat=catalog();
  const mediaIds=new Set(cat.media.map(media=>media.id));
  assert.ok(existsSync('assets/stage-forest.svg'));

  for(const media of forestPack.media){
    assert.equal(media.src,'assets/stage-forest.svg');
    assert.ok(mediaIds.has(media.id));
  }

  for(const event of forestPack.events){
    for(const variant of event.variants){
      assert.ok(variant.media.length>0);
      assert.ok(variant.media.every((id:string)=>mediaIds.has(id)));
    }
  }
});

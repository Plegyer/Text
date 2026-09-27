import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {dispatch,parseSave} from '../src/core/engine.ts';
import {catalog,started,definitions} from './helpers.ts';

const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const forestPack=JSON.parse(readFileSync('content/packs/forest-result-content-bilingual-v2.json','utf8'));
const cases=[
  ['success','forest-result-content-v1.success','lumber.forest.success'],
  ['escape','forest-result-content-v1.escape','lumber.forest.escape'],
  ['failure','forest-result-content-v1.failure','lumber.forest.failure']
] as const;

function reach(outcome:string){
  let s=dispatch(started(),{type:'enterActivity',id:'lumber.forest'},catalog);
  if(outcome==='escape')return dispatch(s,{type:'activityAction',id:'escape'},catalog);
  s=dispatch(s,{type:'activityAction',id:'forest.route.logging-road'},catalog);
  if(outcome==='failure'){
    s.run.flow.activity!.internalState.endurance=1;
    s=parseSave(JSON.stringify(s),catalog);
    return dispatch(s,{type:'activityAction',id:'advance'},catalog);
  }
  s=dispatch(s,{type:'activityAction',id:'advance'},catalog);
  return dispatch(s,{type:'activityAction',id:'advance'},catalog);
}

function gameplay(s:any){
  return structuredClone({
    metrics:s.run.metrics,
    resources:s.run.resources,
    progression:s.run.progression,
    endings:s.run.endings
  });
}

test('Forest success escape failure naturally trigger matching bilingual reactions',()=>{
  for(const [outcome,eventId,result] of cases){
    const event=forestPack.events.find((e:any)=>e.id===eventId);
    assert.deepEqual(event.reactionTriggers,[{kind:'activityResult',activity:'lumber.forest',outcome,result}]);
    let s=reach(outcome);
    assert.equal(s.run.pending?.eventId,eventId);
    assert.equal(s.run.pending?.variantId,'default');
    assert.equal(/(^|[._/-])(ru|en)([._/-]|$)/i.test(eventId),false);

    for(const key of [
      `event.${eventId}.title`,
      `event.${eventId}.variant.default.text`,
      `event.${eventId}.choice.return.label`,
      `event.${eventId}.choice.return.text`,
      `media.${eventId}.alt`
    ]){
      assert.ok(localization[key]?.ru?.trim(),key+' ru');
      assert.ok(localization[key]?.en?.trim(),key+' en');
    }

    const pending=structuredClone(s.run.pending);
    const before=gameplay(s);
    s=parseSave(JSON.stringify(s),catalog);
    assert.deepEqual(s.run.pending,pending);

    s=dispatch(s,{type:'choice',id:'return'},catalog);
    assert.equal(s.run.pending,null);
    assert.deepEqual(gameplay(s),before);

    s=parseSave(JSON.stringify(s),catalog);
    assert.equal(s.run.pending,null);
    assert.deepEqual(gameplay(s),before);
  }
});

test('Lumber Hard Work remains completed_shifts >= 50 only',()=>{
  const ending=definitions.endings.find((e:any)=>e.id==='ending.lumber.hard-work');
  assert.deepEqual(ending.conditions,[{
    kind:'careerCounter',career:'lumber',counter:'completed_shifts',op:'gte',value:50
  }]);
  assert.deepEqual(ending.metaRewards,[{
    kind:'hardWork',rewardId:'hardWork:lumber',career:'lumber'
  }]);
});

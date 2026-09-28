import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const definitions=JSON.parse(readFileSync('content/definitions.json','utf8'));
const fixture=JSON.parse(readFileSync('content/relationship-foreman-semantic-labels-v1.fixture.json','utf8'));

const expectedStages=['unknown','professional','route-professional'];
const expectedCounter='night_meetings';
const expectedFact='night-followup-complete';

test('semantic fixture targets exact current Foreman relationship and stages',()=>{
  const relationship=definitions.relationships.find((item:any)=>item.id==='lumber.foreman');
  assert.ok(relationship);
  assert.equal(fixture.invariants.relationshipId,'lumber.foreman');
  assert.deepEqual(relationship.stages,expectedStages);
  assert.deepEqual(fixture.invariants.exactStages,expectedStages);
});

test('semantic fixture uses only exact current counter fact and route choice identities',()=>{
  const nightChoice=definitions.nightChoices.find((item:any)=>item.id==='lumber.foreman.night');
  assert.ok(nightChoice);

  assert.ok(nightChoice.effects.some((effect:any)=>
    effect.kind==='incrementRelationshipCounter' &&
    effect.relationship==='lumber.foreman' &&
    effect.counter===expectedCounter
  ));

  assert.deepEqual(fixture.invariants.exactCounters,[expectedCounter]);
  assert.deepEqual(fixture.invariants.exactFacts,[expectedFact]);
  assert.deepEqual(
    fixture.invariants.exactChoices,
    [{choice:'route',values:['professional']}]
  );

  const relationship=definitions.relationships.find((item:any)=>item.id==='lumber.foreman');
  const routeTransition=relationship.transitions.find((item:any)=>item.id==='choose-professional');
  assert.ok(routeTransition.effects.some((effect:any)=>
    effect.kind==='setRelationshipChoice' &&
    effect.choice==='route' &&
    effect.value==='professional'
  ));
});

test('semantic fixture has the exact approved key set',()=>{
  const expected=[
    'relationship.lumber.foreman.label',
    'relationship.lumber.foreman.stage.unknown.label',
    'relationship.lumber.foreman.stage.professional.label',
    'relationship.lumber.foreman.stage.route-professional.label',
    'relationship.lumber.foreman.counter.night_meetings.label',
    'relationship.lumber.foreman.fact.night-followup-complete.label',
    'relationship.lumber.foreman.choice.route.label',
    'relationship.lumber.foreman.choice.route.value.professional.label'
  ].sort();

  assert.deepEqual(Object.keys(fixture.strings).sort(),expected);
});

test('all semantic labels have complete RU EN pairs',()=>{
  for(const [key,value] of Object.entries(fixture.strings) as [string,{ru:string;en:string}][]){
    assert.ok(value.ru?.trim(),key+' missing ru');
    assert.ok(value.en?.trim(),key+' missing en');
    assert.deepEqual(Object.keys(value).sort(),['en','ru'],key);
  }
});

test('semantic fixture contains no gameplay RNG or Save payload fields',()=>{
  const forbidden=new Set([
    'conditions','condition','effects','effect','transitions','transition',
    'nextDayEffects','nextDayEnergyDelta','reward','rewards','metaRewards',
    'rng','rngState','save','Save','cost','wage','moneyCost','energyCost',
    'nightPolicy'
  ]);

  const scan=(value:any,path:string[]=[]):void=>{
    if(Array.isArray(value)){
      value.forEach((item,index)=>scan(item,[...path,String(index)]));
      return;
    }
    if(value&&typeof value==='object'){
      for(const [key,child] of Object.entries(value)){
        assert.equal(forbidden.has(key),false,'forbidden field '+[...path,key].join('.'));
        scan(child,[...path,key]);
      }
    }
  };

  scan({strings:fixture.strings});
});

test('no new stage counter fact or route value is present in fixture invariants',()=>{
  assert.equal(fixture.invariants.currentIdentitiesOnly,true);
  assert.equal(fixture.invariants.presentationOnly,true);
  assert.deepEqual(fixture.invariants.exactStages,expectedStages);
  assert.deepEqual(fixture.invariants.exactCounters,[expectedCounter]);
  assert.deepEqual(fixture.invariants.exactFacts,[expectedFact]);
  assert.deepEqual(fixture.invariants.exactChoices,[{choice:'route',values:['professional']}]);
});

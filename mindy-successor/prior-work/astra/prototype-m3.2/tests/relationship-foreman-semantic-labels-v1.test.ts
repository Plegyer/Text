import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {localizationSchema,resolveLocalizedText} from '../src/core/localization.ts';
import {freshSave} from '../src/core/engine.ts';

const definitions=JSON.parse(readFileSync('content/definitions.json','utf8'));
const fixture=JSON.parse(readFileSync('content/relationship-foreman-semantic-labels-v1.fixture.json','utf8'));
const localization=localizationSchema.parse(JSON.parse(readFileSync('content/localization.json','utf8')));
const app=readFileSync('src/ui/app.ts','utf8');
const lumberNight=JSON.parse(readFileSync('content/packs/lumber-night-production.json','utf8'));

const expectedStages=['unknown','professional','route-professional'];
const expectedCounter='night_meetings';
const expectedFact='night-followup-complete';
const expectedKeys=[
  'relationship.lumber.foreman.label',
  'relationship.lumber.foreman.stage.unknown.label',
  'relationship.lumber.foreman.stage.professional.label',
  'relationship.lumber.foreman.stage.route-professional.label',
  'relationship.lumber.foreman.counter.night_meetings.label',
  'relationship.lumber.foreman.fact.night-followup-complete.label',
  'relationship.lumber.foreman.choice.route.label',
  'relationship.lumber.foreman.choice.route.value.professional.label'
].sort();

const collect=(value:any,predicate:(node:any)=>boolean,out:any[]=[]):any[]=>{
  if(Array.isArray(value)){
    for(const item of value)collect(item,predicate,out);
    return out;
  }
  if(value&&typeof value==='object'){
    if(predicate(value))out.push(value);
    for(const child of Object.values(value))collect(child,predicate,out);
  }
  return out;
};

test('Foreman semantic integration targets exact current relationship identities',()=>{
  const relationship=definitions.relationships.find((item:any)=>item.id==='lumber.foreman');
  const nightChoice=definitions.nightChoices.find((item:any)=>item.id==='lumber.foreman.night');
  assert.ok(relationship);
  assert.ok(nightChoice);
  assert.equal(relationship.initialStage,'unknown');
  assert.deepEqual(relationship.stages,expectedStages);
  assert.deepEqual(fixture.invariants.exactStages,expectedStages);
  assert.ok(nightChoice.effects.some((effect:any)=>
    effect.kind==='incrementRelationshipCounter' &&
    effect.relationship==='lumber.foreman' &&
    effect.counter===expectedCounter
  ));

  const routeTransition=relationship.transitions.find((item:any)=>item.id==='choose-professional');
  assert.ok(routeTransition?.effects.some((effect:any)=>
    effect.kind==='setRelationshipChoice' &&
    effect.relationship==='lumber.foreman' &&
    effect.choice==='route' &&
    effect.value==='professional'
  ));

  const factEffects=collect(lumberNight,(node:any)=>
    node.kind==='addRelationshipFact' &&
    node.relationship==='lumber.foreman' &&
    node.fact===expectedFact
  );
  assert.equal(factEffects.length,1);
  assert.deepEqual(fixture.invariants.exactCounters,[expectedCounter]);
  assert.deepEqual(fixture.invariants.exactFacts,[expectedFact]);
  assert.deepEqual(fixture.invariants.exactChoices,[{choice:'route',values:['professional']}]);
});

test('all eight reviewed semantic labels are merged into the production localization root',()=>{
  assert.deepEqual(Object.keys(fixture.strings).sort(),expectedKeys);
  for(const key of expectedKeys){
    assert.deepEqual(localization.strings[key],fixture.strings[key],key);
    assert.ok(fixture.strings[key].ru?.trim(),key+' missing ru');
    assert.ok(fixture.strings[key].en?.trim(),key+' missing en');
  }
  assert.equal(fixture.invariants.sourceBaseline,'5b22db9bbc2f7c306d25ca4d079e1eda2900b5d4');
});

test('generic relationship conditions resolve semantic labels with raw-ID fallbacks',()=>{
  for(const token of [
    "const relationshipLabel=(id:string)=>tr(\`relationship.\${id}.label\`,id);",
    "const relationshipStageLabel=(id:string,stage:string)=>tr(\`relationship.\${id}.stage.\${stage}.label\`,stage);",
    "const relationshipCounterLabel=(id:string,counter:string)=>tr(\`relationship.\${id}.counter.\${counter}.label\`,counter);",
    "const relationshipFactLabel=(id:string,fact:string)=>tr(\`relationship.\${id}.fact.\${fact}.label\`,fact);",
    "const relationshipChoiceLabel=(id:string,choice:string)=>tr(\`relationship.\${id}.choice.\${choice}.label\`,choice);",
    "const relationshipChoiceValueLabel=(id:string,choice:string,value:string)=>tr(\`relationship.\${id}.choice.\${choice}.value.\${value}.label\`,value);",
    'relationship:relationshipLabel(c.relationship),stage:relationshipStageLabel(c.relationship,c.stage)',
    'relationship:relationshipLabel(c.relationship),counter:relationshipCounterLabel(c.relationship,c.counter)',
    'relationship:relationshipLabel(c.relationship),fact:relationshipFactLabel(c.relationship,c.fact)',
    'choice:relationshipChoiceLabel(c.relationship,c.choice),value:relationshipChoiceValueLabel(c.relationship,c.choice,c.value)'
  ]) assert.ok(app.includes(token),token);

  assert.equal(resolveLocalizedText(localization,'relationship.unknown.person.label','en','unknown.person'),'unknown.person');
  assert.equal(resolveLocalizedText(localization,'relationship.unknown.person.stage.missing.label','ru','missing'),'missing');
});

test('RU and EN change rendered Foreman labels only, not Save state or RNG bytes',()=>{
  const save=freshSave();
  save.run.progression.relationships['lumber.foreman']={
    stage:'route-professional',
    counters:{night_meetings:1},
    choices:{route:'professional'},
    facts:['night-followup-complete']
  };
  const before=JSON.stringify(save);
  const rngBefore=JSON.stringify(save.run.rngState);
  const ru=expectedKeys.map(key=>resolveLocalizedText(localization,key,'ru',''));
  const en=expectedKeys.map(key=>resolveLocalizedText(localization,key,'en',''));
  assert.notDeepEqual(ru,en);
  assert.equal(JSON.stringify(save),before);
  assert.equal(JSON.stringify(save.run.rngState),rngBefore);
  const relationship=save.run.progression.relationships['lumber.foreman'];
  assert.equal(relationship.stage,'route-professional');
  assert.equal(relationship.counters.night_meetings,1);
  assert.deepEqual(relationship.facts,['night-followup-complete']);
  assert.equal(relationship.choices.route,'professional');
});

test('current player-visible Foreman condition consumer is stage-only; no new UI surface is invented',()=>{
  const ending=definitions.endings.find((item:any)=>item.id==='ending.lumber.forewoman');
  assert.ok(ending?.conditions.some((condition:any)=>
    condition.kind==='relationshipStage' &&
    condition.relationship==='lumber.foreman' &&
    condition.stage==='route-professional'
  ));

  const currentSpecificConditions=collect([definitions,lumberNight],(node:any)=>
    ['relationshipCounter','relationshipFact','relationshipChoice'].includes(node.kind) &&
    node.relationship==='lumber.foreman'
  );
  assert.deepEqual(currentSpecificConditions,[{kind:'relationshipFact',relationship:'lumber.foreman',fact:'social-night-seen',present:true}]);
});

test('semantic localization payload remains presentation-only with no gameplay RNG or Save fields',()=>{
  const forbidden=new Set([
    'conditions','condition','effects','effect','transitions','transition',
    'nextDayEffects','nextDayEnergyDelta','reward','rewards','metaRewards',
    'rng','rngState','save','Save','cost','wage','moneyCost','energyCost','nightPolicy'
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
  assert.equal(fixture.invariants.presentationOnly,true);
  assert.equal(fixture.invariants.gameplayFieldsIncluded,false);
  assert.equal(fixture.invariants.rngFieldsIncluded,false);
  assert.equal(fixture.invariants.saveFieldsIncluded,false);
});

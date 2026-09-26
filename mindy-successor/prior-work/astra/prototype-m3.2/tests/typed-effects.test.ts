import test from 'node:test';import assert from 'node:assert/strict';
import {loadCatalog} from '../src/core/content.ts';
import {applyEffects,dispatch,freshSave,meets,parseSave} from '../src/core/engine.ts';
import {effectSchema,type Catalog,type Condition,type Effect} from '../src/core/schema.ts';
import {definitions,rawPacks,started} from './helpers.ts';

function typedDefinitions(){
  const d=structuredClone(definitions);
  d.careers=[{
    id:'lumber.target',label:'Target Lumber',initialStage:'new',stages:['new','trusted'],
    transitions:[{
      id:'qualify',from:['new'],to:'trusted',
      conditions:[{kind:'careerCounter',career:'lumber.target',counter:'training',op:'gte',value:2}],
      effects:[{kind:'addCareerFact',career:'lumber.target',fact:'qualified'}]
    }]
  }];
  d.quests=[{
    id:'forest.quest',label:'Forest Quest',initialStage:'open',stages:['open','done'],
    transitions:[{id:'finish',from:['open'],to:'done',conditions:[],effects:[]}]
  }];
  d.relationships=[{
    id:'foreman.rel',label:'Foreman',initialStage:'known',stages:['known','trusted'],
    transitions:[{id:'trust',from:['known'],to:'trusted',conditions:[],effects:[]}]
  }];
  return d;
}
function catalog():Catalog{return loadCatalog(typedDefinitions(),structuredClone(rawPacks));}

test('typed conditions read target owners and virtual initial machine stages',()=>{
  const cat=catalog(),s=freshSave();
  const yes:Condition[]=[
    {kind:'stat',stat:'strength',op:'eq',value:1},
    {kind:'resource',resource:'money',op:'eq',value:600},
    {kind:'itemCount',id:'herb',op:'gte',count:2},
    {kind:'calendarYear',op:'eq',value:1},
    {kind:'calendarSeason',value:'spring'},
    {kind:'calendarDayInYear',op:'eq',value:1},
    {kind:'calendarElapsedDays',op:'eq',value:0},
    {kind:'careerStage',career:'lumber.target',stage:'new'},
    {kind:'careerShifts',career:'lumber.target',op:'eq',value:0},
    {kind:'questStage',quest:'forest.quest',stage:'open'},
    {kind:'relationshipStage',relationship:'foreman.rel',stage:'known'},
    {kind:'worldFact',fact:'forest.safe',present:false},
    {kind:'metaUnlock',unlock:'guild',present:false},
    {kind:'metaEndingCompleted',ending:'guild-life',present:false},
    {kind:'metaHardWork',career:'lumber.target',present:false}
  ];
  for(const c of yes)assert.equal(meets(c,s,cat),true,JSON.stringify(c));
});

test('typed effect batch writes target owners and uses documented ordering before transition',()=>{
  const cat=catalog(),s=started();
  const effects:Effect[]=[
    {kind:'advanceCareer',career:'lumber.target',transition:'qualify'},
    {kind:'incrementCareerCounter',career:'lumber.target',counter:'training',amount:2},
    {kind:'modifyStat',stat:'strength',delta:3},
    {kind:'modifyResource',resource:'money',delta:25},
    {kind:'addItem',id:'tonic',count:1},
    {kind:'addWorldFact',fact:'forest.safe'},
    {kind:'setCareerChoice',career:'lumber.target',choice:'method',value:'careful'},
    {kind:'addNextDayModifier',energyDelta:-1,statEffects:[{stat:'grooming',delta:-1}],tag:'late.study'}
  ];
  const out=applyEffects(s,effects,cat);
  assert.equal(out.run.character.stats.strength,s.run.character.stats.strength+3);
  assert.equal(out.run.resources.money,s.run.resources.money+25);
  assert.equal(out.run.resources.inventory.tonic,(s.run.resources.inventory.tonic??0)+1);
  assert.deepEqual(out.run.progression.worldFacts,['forest.safe']);
  assert.equal(out.run.progression.careers['lumber.target'].counters.training,2);
  assert.equal(out.run.progression.careers['lumber.target'].stage,'trusted');
  assert.ok(out.run.progression.careers['lumber.target'].facts.includes('qualified'));
  assert.equal(out.run.progression.careers['lumber.target'].choices.method,'careful');
  assert.equal(out.run.dayState.nextDayModifiers.energyDelta,-1);
  assert.deepEqual(out.run.dayState.nextDayModifiers.tags,['late.study']);
  assert.equal(s.run.progression.careers['lumber.target'],undefined);
});

test('invalid transition id and wrong-stage transition are atomic',()=>{
  const cat=catalog(),s=started(),before=JSON.stringify(s);
  assert.throws(()=>applyEffects(s,[{kind:'advanceCareer',career:'lumber.target',transition:'missing'}],cat),/transition/);
  assert.equal(JSON.stringify(s),before);

  const trusted=applyEffects(s,[
    {kind:'incrementCareerCounter',career:'lumber.target',counter:'training',amount:2},
    {kind:'advanceCareer',career:'lumber.target',transition:'qualify'}
  ],cat);
  const trustedBefore=JSON.stringify(trusted);
  assert.throws(()=>applyEffects(trusted,[{kind:'advanceCareer',career:'lumber.target',transition:'qualify'}],cat),/недоступен/);
  assert.equal(JSON.stringify(trusted),trustedBefore);
});

test('quest and relationship effects use named machine transitions',()=>{
  const cat=catalog(),s=started();
  const out=applyEffects(s,[
    {kind:'incrementQuestCounter',quest:'forest.quest',counter:'clues',amount:1},
    {kind:'addQuestFact',quest:'forest.quest',fact:'trail'},
    {kind:'setQuestChoice',quest:'forest.quest',choice:'route',value:'north'},
    {kind:'advanceQuest',quest:'forest.quest',transition:'finish'},
    {kind:'incrementRelationshipCounter',relationship:'foreman.rel',counter:'talks',amount:2},
    {kind:'addRelationshipFact',relationship:'foreman.rel',fact:'helped'},
    {kind:'setRelationshipChoice',relationship:'foreman.rel',choice:'tone',value:'warm'},
    {kind:'advanceRelationship',relationship:'foreman.rel',transition:'trust'}
  ],cat);
  assert.equal(out.run.progression.quests['forest.quest'].stage,'done');
  assert.equal(out.run.progression.quests['forest.quest'].counters.clues,1);
  assert.equal(out.run.progression.relationships['foreman.rel'].stage,'trusted');
  assert.equal(out.run.progression.relationships['foreman.rel'].counters.talks,2);
});

function typedPack(){
  return {
    schemaVersion:1,id:'typed',
    reads:[],writes:[],
    capabilities:{
      reads:{stats:['strength'],careers:['lumber.target'],meta:['unlock']},
      writes:{stats:['strength'],careers:['lumber.target'],worldFacts:['typed.done']}
    },
    media:[],
    events:[{
      id:'typed.test',title:'Typed test',trigger:['arrival'],priority:1,cooldownDays:0,variantCooldownDays:0,maxShows:1,
      conditions:[
        {kind:'stat',stat:'strength',op:'gte',value:1},
        {kind:'careerStage',career:'lumber.target',stage:'new'},
        {kind:'metaUnlock',unlock:'guild',present:false}
      ],
      variants:[{id:'default',text:'Typed fallback variant for architecture test.',conditions:[],media:[]}],
      choices:[{id:'ok',label:'OK',text:'Typed target effects applied.',conditions:[],effects:[
        {kind:'modifyStat',stat:'strength',delta:1},
        {kind:'addCareerFact',career:'lumber.target',fact:'tested'},
        {kind:'addWorldFact',fact:'typed.done'}
      ]}]
    }]
  };
}

test('typed pack capabilities are required for declared reads and writes',()=>{
  const d=typedDefinitions(),p=typedPack();
  assert.doesNotThrow(()=>loadCatalog(d,[...structuredClone(rawPacks),p]));
  const noWrite=structuredClone(p);noWrite.capabilities.writes.stats=[];
  assert.throws(()=>loadCatalog(d,[...structuredClone(rawPacks),noWrite]),/typed capability/);
  const noRead=structuredClone(p);noRead.capabilities.reads.careers=[];
  assert.throws(()=>loadCatalog(d,[...structuredClone(rawPacks),noRead]),/typed capability/);
});

test('unknown machine stages and nested transitions are rejected at catalog load',()=>{
  const d=typedDefinitions();
  d.careers[0].transitions[0].to='missing';
  assert.throws(()=>loadCatalog(d,structuredClone(rawPacks)),/to stage/);

  const nested=typedDefinitions();
  nested.careers[0].transitions[0].effects=[{kind:'advanceCareer',career:'lumber.target',transition:'qualify'}];
  assert.throws(()=>loadCatalog(nested,structuredClone(rawPacks)),/Nested transition/);
});

test('contradictory target thresholds are rejected',()=>{
  const d=typedDefinitions();
  d.actions[0].conditions=[
    {kind:'stat',stat:'strength',op:'gte',value:50},
    {kind:'stat',stat:'strength',op:'lte',value:20}
  ];
  assert.throws(()=>loadCatalog(d,structuredClone(rawPacks)),/Противоречивые/);

  const r=typedDefinitions();
  r.actions[0].conditions=[
    {kind:'resource',resource:'money',op:'gte',value:500},
    {kind:'resource',resource:'money',op:'lte',value:100}
  ];
  assert.throws(()=>loadCatalog(r,structuredClone(rawPacks)),/Противоречивые/);
});

test('meta is readable by typed conditions but has no ordinary mutation effect',()=>{
  const cat=catalog(),s=started();s.meta.unlocks=['guild'];
  assert.equal(meets({kind:'metaUnlock',unlock:'guild',present:true},s,cat),true);
  assert.equal(effectSchema.safeParse({kind:'metaUnlock',unlock:'guild',present:true}).success,false);
  assert.equal(effectSchema.safeParse({kind:'awardMetaReward',id:'anything'}).success,false);
});

test('next-day modifier applies once at sleep and then clears',()=>{
  const cat=catalog(),s=started(),g=s.run.character.stats.grooming;
  const prepared=applyEffects(s,[{kind:'addNextDayModifier',energyDelta:-1,statEffects:[{stat:'grooming',delta:-1}],tag:'night.study'}],cat);
  const slept=dispatch(prepared,{type:'sleep',payment:'money'},cat);
  assert.equal(slept.run.dayState.energyCurrent,2);
  assert.equal(slept.run.character.stats.grooming,Math.max(0,g-1));
  assert.deepEqual(slept.run.dayState.nextDayModifiers,{energyDelta:0,statEffects:[],tags:[]});
});


test('schema4 save validates persisted machine IDs and stages against catalog',()=>{
  const cat=catalog(),base=started();
  const withCareer=applyEffects(base,[{kind:'addCareerFact',career:'lumber.target',fact:'seen'}],cat);
  assert.doesNotThrow(()=>parseSave(JSON.stringify(withCareer),cat));

  const badId=JSON.parse(JSON.stringify(withCareer));
  badId.run.progression.careers['ghost.job']=badId.run.progression.careers['lumber.target'];
  delete badId.run.progression.careers['lumber.target'];
  assert.throws(()=>parseSave(JSON.stringify(badId),cat),/state machine/);

  const badStage=JSON.parse(JSON.stringify(withCareer));
  badStage.run.progression.careers['lumber.target'].stage='ghost-stage';
  assert.throws(()=>parseSave(JSON.stringify(badStage),cat),/stage/);
});

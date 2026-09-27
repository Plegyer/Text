import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {loadCatalog} from '../src/core/content.ts';
import {dispatch,freshSave,parseSave,resolveReactions} from '../src/core/engine.ts';
import {localizationSchema,missingEnglishKeys} from '../src/core/localization.ts';
import {packSchema} from '../src/core/schema.ts';

const rootDefinitions=JSON.parse(readFileSync('content/definitions.json','utf8'));
const rootRelationshipPack=JSON.parse(readFileSync('content/packs/lumber-production.json','utf8'));
const stagingRaw=JSON.parse(readFileSync('content/packs/relationship-target/foreman-relationship-content-v1.json','utf8'));
const localization=localizationSchema.parse(
  JSON.parse(readFileSync('content/relationship-foreman-localization-v1.fixture.json','utf8'))
);

function minimalDefinitions(){
  const d=structuredClone(rootDefinitions);
  d.actions=[];
  d.endings=d.endings.filter((ending:{id:string})=>ending.id==='ending.lumber.hard-work');
  d.careers=d.careers.filter((career:{id:string})=>career.id==='lumber');
  d.quests=[];
  d.relationships=d.relationships.filter((relationship:{id:string})=>relationship.id==='lumber.foreman');
  d.itemDefinitions=[];
  d.lodgings=[];
  d.nightChoices=[];
  d.activities=[];
  return d;
}

function stagingCatalog(){
  return loadCatalog(minimalDefinitions(),[structuredClone(stagingRaw)]);
}

function readyState(){
  const s=freshSave();
  s.run.creation={remaining:0,allocated:{},complete:true};
  s.run.progression.careers.lumber={
    stage:'accepted-hand',
    shifts:1,
    counters:{completed_shifts:1},
    choices:{},
    facts:['foreman-noticed-player']
  };
  s.run.progression.relationships['lumber.foreman']={
    stage:'unknown',
    counters:{},
    choices:{},
    facts:[]
  };
  return s;
}

function mechanicalProjection(event:any){
  return {
    id:event.id,
    sourceDomain:event.sourceDomain,
    trigger:event.trigger,
    reactionTriggers:event.reactionTriggers,
    priorityClass:event.priorityClass,
    priority:event.priority,
    blocking:event.blocking,
    delivery:event.delivery,
    nightPolicy:event.nightPolicy,
    chance:event.chance,
    cooldownDays:event.cooldownDays,
    variantCooldownDays:event.variantCooldownDays,
    maxShows:event.maxShows,
    conditions:event.conditions,
    variants:event.variants.map((variant:any)=>({
      id:variant.id,
      conditions:variant.conditions,
      media:variant.media
    })),
    choices:event.choices.map((choice:any)=>({
      id:choice.id,
      conditions:choice.conditions,
      effects:choice.effects,
      media:choice.media
    }))
  };
}

test('Foreman staging pack is schema-valid and stays inside the existing Lumber namespace',()=>{
  const pack=packSchema.parse(stagingRaw);
  assert.equal(pack.id,'lumber');
  assert.equal(pack.events.length,1);
  assert.ok(pack.events.every(event=>event.id.startsWith(pack.id+'.')));
  assert.deepEqual(pack.capabilities?.reads?.relationships,['lumber.foreman']);
  assert.deepEqual(pack.capabilities?.writes?.relationships,['lumber.foreman']);
  assert.deepEqual(pack.capabilities?.reads?.careers,['lumber']);

  assert.doesNotThrow(()=>stagingCatalog());
});

test('staging pack keeps the current relationship identity and does not add a second gameplay transaction',()=>{
  const staged=stagingRaw.events[0];
  const shipped=rootRelationshipPack.events.find((event:any)=>event.id==='lumber.foreman-notice');
  assert.ok(shipped);

  assert.equal(staged.id,'lumber.foreman-notice');
  assert.equal(staged.sourceDomain,'lumber.foreman');
  assert.deepEqual(mechanicalProjection(staged),mechanicalProjection(shipped));

  const serialized=JSON.stringify(stagingRaw);
  assert.equal(serialized.includes('route-close'),false);
  assert.equal(serialized.includes('route-rival'),false);
  assert.equal(serialized.includes('lumber.school.management-ready'),false);
  assert.equal(serialized.includes('old_boundary'),false);
  assert.equal(serialized.includes('hunter'),false);
});

test('staged professional milestone charges no daytime Energy and survives reload with deterministic identity',()=>{
  const cat=stagingCatalog();
  const start=readyState();
  const energyBefore=start.run.dayState.energyCurrent;

  const resolved=resolveReactions(start,[
    {kind:'careerTransition',career:'lumber',from:'newcomer',to:'accepted-hand'}
  ],cat).state;

  assert.equal(resolved.run.pending?.eventId,'lumber.foreman-notice');
  assert.equal(resolved.run.pending?.variantId,'default');
  assert.equal(
    resolved.run.pending?.presentationId,
    'relationship/lumber-foreman/lumber-foreman-notice/default'
  );
  assert.equal(resolved.run.dayState.energyCurrent,energyBefore);

  const restored=parseSave(JSON.stringify(resolved),cat);
  assert.equal(restored.run.pending?.eventId,'lumber.foreman-notice');
  assert.equal(restored.run.pending?.variantId,'default');
  assert.equal(
    restored.run.pending?.presentationId,
    'relationship/lumber-foreman/lumber-foreman-notice/default'
  );
  assert.equal(restored.run.dayState.energyCurrent,energyBefore);

  const completed=dispatch(restored,{type:'choice',id:'professional'},cat);
  assert.equal(completed.run.pending,null);
  assert.equal(completed.run.dayState.energyCurrent,energyBefore);
  assert.equal(completed.run.progression.relationships['lumber.foreman'].stage,'route-professional');
  assert.equal(completed.run.progression.relationships['lumber.foreman'].choices.route,'professional');
});

test('staging content adds no universal next-day Energy penalty',()=>{
  const stagedEffects=stagingRaw.events.flatMap((event:any)=>
    event.choices.flatMap((choice:any)=>choice.effects)
  );
  assert.equal(stagedEffects.some((effect:any)=>effect.kind==='modifyEnergy'),false);
  assert.equal(stagedEffects.some((effect:any)=>effect.kind==='addNextDayModifier'),false);

  const foremanNight=rootDefinitions.nightChoices.find((choice:any)=>choice.id==='lumber.foreman.night');
  assert.ok(foremanNight);
  assert.deepEqual(foremanNight.nextDayEffects,[]);
  assert.equal(foremanNight.nextDayEnergyDelta,0);
});

test('Lumber Hard Work gate and reward remain exactly locked',()=>{
  const hardWork=rootDefinitions.endings.find((ending:any)=>ending.id==='ending.lumber.hard-work');
  assert.ok(hardWork);
  assert.deepEqual(hardWork.conditions,[
    {kind:'careerCounter',career:'lumber',counter:'completed_shifts',op:'gte',value:50}
  ]);
  assert.deepEqual(hardWork.metaRewards,[
    {kind:'hardWork',rewardId:'hardWork:lumber',career:'lumber'}
  ]);

  assert.equal(JSON.stringify(stagingRaw).includes('completed_shifts'),false);
  assert.equal(JSON.stringify(stagingRaw).includes('hardWork:lumber'),false);
});

test('every staged player-facing Foreman field has RU+EN localization coverage',()=>{
  assert.deepEqual(missingEnglishKeys(localization),[]);

  const event=stagingRaw.events[0];
  const variant=event.variants[0];
  const choice=event.choices[0];
  const media=stagingRaw.media[0];

  const coverage=[
    ['event.'+event.id+'.title',event.title],
    ['event.'+event.id+'.variant.'+variant.id+'.text',variant.text],
    ['event.'+event.id+'.choice.'+choice.id+'.label',choice.label],
    ['event.'+event.id+'.choice.'+choice.id+'.text',choice.text],
    ['media.'+media.id+'.alt',media.alt]
  ] as const;

  for(const [key,russianSource] of coverage){
    const entry=localization.strings[key];
    assert.ok(entry,key+' must exist in the Foreman localization fixture');
    assert.equal(entry.ru,russianSource,key+' RU text must match staged source authoring');
    assert.ok(entry.en?.trim().length,key+' must have full English coverage');
  }
});

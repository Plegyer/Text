import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {loadCatalog} from '../src/core/content.ts';
import {applyEffects,dispatch,eligible,freshSave,meets,parseSave,resolveReactions} from '../src/core/engine.ts';
import {
  STRONG_META_IDS,
  emptyStrongMetaState,
  grantStrongMetaReward,
  setPreferredStrongMetaSpecialist
} from '../src/core/strongMeta.ts';
import type {Save,Stat} from '../src/core/schema.ts';

const definitions=JSON.parse(readFileSync('content/definitions.json','utf8'));
const relationshipPack=JSON.parse(readFileSync('content/packs/assassin-relationship.json','utf8'));
const catalog=loadCatalog(definitions,[relationshipPack]);

function selectedFormal(){
  let meta=emptyStrongMetaState();
  meta=grantStrongMetaReward(meta,STRONG_META_IDS.palaceFormalIntroduction);
  return setPreferredStrongMetaSpecialist(meta,STRONG_META_IDS.palaceFormalIntroduction,true);
}

function created(withFormal=true){
  let s=freshSave(withFormal?{strongMeta:selectedFormal()}:undefined);
  const allocation:Partial<Record<Stat,number>>={strength:10};
  for(const [stat,count] of Object.entries(allocation)){
    for(let i=0;i<(count??0);i++)s=dispatch(s,{type:'allocate',stat:stat as Stat,delta:1},catalog);
  }
  s=dispatch(s,{type:'finishCreation'},catalog);
  s.run.flags['story.arrived']=true;
  s.run.character.stats.dexterity=30;
  s.run.character.stats.wits=25;
  s.run.character.stats.reason=20;
  return s;
}

function oneShiftOperative(input:Save){
  let s=applyEffects(input,[{
    kind:'incrementCareerCounter',
    career:'assassin',
    counter:'completed_shifts',
    amount:1
  }],catalog);
  s=applyEffects(s,[{
    kind:'advanceCareer',
    career:'assassin',
    transition:'first-shift'
  }],catalog);
  return s;
}

function introOffer(input:Save){
  return resolveReactions(
    input,
    [{kind:'actionCompleted',action:'assassin.shift'}],
    catalog
  ).state;
}

test('approved Assassin topology adds one neutral Formal Introduction stage and keeps normal trust separate',()=>{
  const handler=definitions.relationships.find((x:any)=>x.id==='assassin.handler');
  assert.ok(handler);
  assert.ok(handler.stages.includes('formal-introduced'));
  const formal=handler.transitions.find((x:any)=>x.id==='formal-introduction');
  assert.deepEqual(formal,{
    id:'formal-introduction',
    from:['introduced'],
    to:'formal-introduced',
    conditions:[],
    effects:[{kind:'addRelationshipFact',relationship:'assassin.handler',fact:'introduced-at-work'}]
  });
  const trust=handler.transitions.find((x:any)=>x.id==='build-trust');
  assert.deepEqual(trust.from,['introduced','formal-introduced']);
  assert.deepEqual(trust.effects,[{
    kind:'addRelationshipFact',
    relationship:'assassin.handler',
    fact:'professional-trust-earned'
  }]);

  const intro=relationshipPack.events.find((x:any)=>x.id==='assassin.relationship.intro');
  assert.deepEqual(intro.conditions,[
    {kind:'any',conditions:[
      {kind:'careerStage',career:'assassin',stage:'operative'},
      {kind:'careerStage',career:'assassin',stage:'trusted-blade'}
    ]},
    {kind:'relationshipFact',relationship:'assassin.handler',fact:'introduced-at-work',present:false}
  ]);
  assert.deepEqual(relationshipPack.capabilities.reads.meta,['strongMetaFormalIntroduction']);
});

test('baseline Assassin intro remains free and consumes no Formal Introduction use',()=>{
  let s=oneShiftOperative(created(true));
  s=introOffer(s);
  assert.equal(s.run.pending?.eventId,'assassin.relationship.intro');
  const event=catalog.events.find(e=>e.id==='assassin.relationship.intro');
  assert.ok(event);
  assert.ok(event.choices.some(c=>c.id==='professional'&&eligible(c.conditions,s,catalog)));

  s=dispatch(s,{type:'choice',id:'professional'},catalog);
  const handler=s.run.progression.relationships['assassin.handler'];
  assert.equal(handler.stage,'introduced');
  assert.ok(handler.facts.includes('introduced-at-work'));
  assert.deepEqual(s.run.strongMetaRuntime.formalIntroductionUsedRelationshipIds,[]);
  assert.equal(handler.facts.includes('professional-trust-earned'),false);
});

test('Formal Introduction is gated by current-life shift, transitions once, survives reload, then normal trust remains reachable',()=>{
  let s=created(true);
  const condition={
    kind:'strongMetaFormalIntroductionAvailable' as const,
    career:'assassin',
    relationship:'assassin.handler',
    transition:'formal-introduction'
  };
  assert.equal(meets(condition,s,catalog),false,'zero current-life shifts must not qualify');

  s=oneShiftOperative(s);
  assert.equal(meets(condition,s,catalog),true);
  s=introOffer(s);
  assert.equal(s.run.pending?.eventId,'assassin.relationship.intro');
  assert.ok(s.run.pending?.allowedChoiceIds?.includes('formal-introduction'));

  s=dispatch(s,{type:'choice',id:'formal-introduction'},catalog);
  let handler=s.run.progression.relationships['assassin.handler'];
  assert.equal(handler.stage,'formal-introduced');
  assert.ok(handler.facts.includes('introduced-at-work'));
  assert.equal(handler.facts.includes('professional-trust-earned'),false);
  assert.equal(s.run.progression.careers.assassin.facts.includes('handler-trust-ready'),false);
  assert.deepEqual(s.run.strongMetaRuntime.formalIntroductionUsedRelationshipIds,['assassin.handler']);

  const afterUse=JSON.stringify(s);
  assert.equal(meets(condition,s,catalog),false);
  assert.throws(
    ()=>applyEffects(s,[{
      kind:'useStrongMetaFormalIntroduction',
      career:'assassin',
      relationship:'assassin.handler',
      transition:'formal-introduction'
    }],catalog),
    /Formal Introduction/
  );
  assert.equal(JSON.stringify(s),afterUse);

  s=parseSave(JSON.stringify(s),catalog);
  handler=s.run.progression.relationships['assassin.handler'];
  assert.equal(handler.stage,'formal-introduced');
  assert.deepEqual(s.run.strongMetaRuntime.formalIntroductionUsedRelationshipIds,['assassin.handler']);

  assert.equal(s.run.pending?.eventId,'assassin.relationship.trust');
  assert.ok(s.run.pending?.allowedChoiceIds?.includes('continue'));
  s=dispatch(s,{type:'choice',id:'continue'},catalog);
  handler=s.run.progression.relationships['assassin.handler'];
  assert.equal(handler.stage,'professional-trust');
  assert.ok(handler.facts.includes('professional-trust-earned'));
  assert.ok(s.run.progression.careers.assassin.facts.includes('handler-trust-ready'));
  assert.deepEqual(s.run.strongMetaRuntime.formalIntroductionUsedRelationshipIds,['assassin.handler']);
});

test('old-style relationship state does not fabricate Formal Introduction usage or the new stage',()=>{
  let s=oneShiftOperative(created(false));
  s=introOffer(s);
  s=dispatch(s,{type:'choice',id:'professional'},catalog);
  const restored=parseSave(JSON.stringify(s),catalog);
  assert.equal(restored.run.progression.relationships['assassin.handler'].stage,'introduced');
  assert.deepEqual(restored.run.strongMetaRuntime.formalIntroductionUsedRelationshipIds,[]);
});

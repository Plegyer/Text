import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {loadCatalog} from '../src/core/content.ts';
import {
  dispatch,
  freshSave,
  parseSave,
  resolveReactions
} from '../src/core/engine.ts';
import {schoolNightStudyChoices} from '../src/core/school.ts';
import {STRONG_META_KNOWLEDGE_IDS,emptyResolvedStrongMetaSnapshot} from '../src/core/strongMeta.ts';

const localization=JSON.parse(readFileSync('content/localization.json','utf8'));

const pack=JSON.parse(
  readFileSync(
    'content/packs/school-life-content-v1.json',
    'utf8'
  )
);

function definitions(){
  return {
    version:'0.1.0',
    flags:[],
    actions:[],
    endings:[],
    careers:[],
    quests:[],
    relationships:[],
    lodgings:[],
    nightChoices:schoolNightStudyChoices(),
    activities:[]
  };
}

function ready(){
  const s=freshSave();
  s.run.character.creation.remaining=0;
  s.run.character.creation.allocated={};
  s.run.character.creation.complete=true;
  s.run.character.creation.hardWorkPackagesApplied=true;
  s.run.strongMetaSnapshot=emptyResolvedStrongMetaSnapshot();
  return s;
}

test('materialized School-life optional content keeps the same variant across reload',()=>{
  const cat=loadCatalog(definitions(),[pack]);
  const out=resolveReactions(
    ready(),
    [{kind:'actionCompleted',action:'school'}],
    cat
  ).state;

  const offerId=out.run.dayState.optionalOfferIds[0];
  assert.ok(offerId);
  const queued=out.run.flow.reaction.queued.find(
    q=>q.instanceId===offerId
  );
  assert.ok(queued);
  assert.equal(queued.eventId,'school-life-content-v1.after-paid-lesson');

  const first=parseSave(JSON.stringify(out),cat);
  const second=parseSave(JSON.stringify(first),cat);
  const firstQueued=first.run.flow.reaction.queued.find(
    q=>q.instanceId===offerId
  );
  const secondQueued=second.run.flow.reaction.queued.find(
    q=>q.instanceId===offerId
  );

  assert.equal(firstQueued?.variantId,queued.variantId);
  assert.equal(secondQueued?.variantId,queued.variantId);
});

test('opening and resolving School-life content commits no mechanics twice',()=>{
  const cat=loadCatalog(definitions(),[pack]);
  const start=ready();
  start.run.resources.money=1234;
  start.run.dayState.energyCurrent=3;

  const offered=resolveReactions(
    start,
    [{kind:'actionCompleted',action:'school'}],
    cat
  ).state;
  const offerId=offered.run.dayState.optionalOfferIds[0];
  assert.ok(offerId);

  const before={
    money:offered.run.resources.money,
    energy:offered.run.dayState.energyCurrent,
    stats:structuredClone(offered.run.character.stats),
    progression:structuredClone(offered.run.progression)
  };

  const restored=parseSave(JSON.stringify(offered),cat);
  const opened=dispatch(
    restored,
    {type:'openOffer',id:offerId},
    cat
  );
  const resolved=dispatch(
    opened,
    {type:'choice',id:'continue'},
    cat
  );

  assert.equal(resolved.run.resources.money,before.money);
  assert.equal(resolved.run.dayState.energyCurrent,before.energy);
  assert.deepEqual(resolved.run.character.stats,before.stats);
  assert.deepEqual(resolved.run.progression,before.progression);
  assert.equal(
    resolved.run.history['school-life-content-v1.after-paid-lesson']?.count,
    1
  );
});

test('Night-study flavor content does not own Night-study mechanics',()=>{
  const cat=loadCatalog(definitions(),[pack]);
  const start=ready();
  const before=JSON.stringify({
    stats:start.run.character.stats,
    progression:start.run.progression,
    money:start.run.resources.money,
    energy:start.run.dayState.energyCurrent
  });

  const out=resolveReactions(
    start,
    [{
      kind:'nightChoiceCompleted',
      choice:'school.night_study.arcana.reason'
    }],
    cat
  ).state;

  const offer=out.run.flow.reaction.queued.find(
    q=>q.eventId==='school-life-content-v1.night-study.arcana-reason'
  );
  assert.ok(offer);

  assert.equal(
    JSON.stringify({
      stats:out.run.character.stats,
      progression:out.run.progression,
      money:out.run.resources.money,
      energy:out.run.dayState.energyCurrent
    }),
    before
  );
});

test('all School-life authored choices are effect-free',()=>{
  for(const event of pack.events){
    for(const choice of event.choices){
      assert.deepEqual(choice.effects,[],event.id);
    }
  }
});

test('Source Method uses a future-run snapshot for an effect-free reload-stable Arcana/Reason variant',()=>{
  const cat=loadCatalog(definitions(),[pack]);

  const sameLife=ready();
  sameLife.meta.strongMeta.knowledge.inheritedKnowledgeIds=[
    STRONG_META_KNOWLEDGE_IDS.palaceSourceMethod
  ];
  const sameLifeOut=resolveReactions(
    sameLife,
    [{kind:'nightChoiceCompleted',choice:'school.night_study.arcana.reason'}],
    cat
  ).state;
  const sameLifeOffer=sameLifeOut.run.flow.reaction.queued.find(
    q=>q.eventId==='school-life-content-v1.night-study.arcana-reason'
  );
  assert.equal(sameLifeOffer?.variantId,'default');

  const future=ready();
  future.run.strongMetaSnapshot={
    ...emptyResolvedStrongMetaSnapshot(),
    automaticKnowledgeIds:[STRONG_META_KNOWLEDGE_IDS.palaceSourceMethod]
  };
  const before={
    money:future.run.resources.money,
    energy:future.run.dayState.energyCurrent,
    stats:structuredClone(future.run.character.stats),
    progression:structuredClone(future.run.progression),
    endings:structuredClone(future.run.endings)
  };
  const offered=resolveReactions(
    future,
    [{kind:'nightChoiceCompleted',choice:'school.night_study.arcana.reason'}],
    cat
  ).state;
  const offer=offered.run.flow.reaction.queued.find(
    q=>q.eventId==='school-life-content-v1.night-study.arcana-reason'
  );
  assert.ok(offer);
  assert.equal(offer.variantId,'source-method-crosscheck');

  const restored=parseSave(JSON.stringify(offered),cat);
  const restoredOffer=restored.run.flow.reaction.queued.find(
    q=>q.instanceId===offer.instanceId
  );
  assert.equal(restoredOffer?.variantId,'source-method-crosscheck');

  const opened=dispatch(restored,{type:'openOffer',id:offer.instanceId},cat);
  const resolved=dispatch(opened,{type:'choice',id:'continue'},cat);
  assert.equal(resolved.run.resources.money,before.money);
  assert.equal(resolved.run.dayState.energyCurrent,before.energy);
  assert.deepEqual(resolved.run.character.stats,before.stats);
  assert.deepEqual(resolved.run.progression,before.progression);
  assert.deepEqual(resolved.run.endings,before.endings);

  assert.deepEqual(pack.capabilities,{
    reads:{meta:['strongMetaKnowledge']},
    writes:{}
  });
});

test('Source Method player-facing copy stays below the D49 macro-lore ceiling in RU and EN',()=>{
  const event=pack.events.find(
    (e:any)=>e.id==='school-life-content-v1.night-study.arcana-reason'
  );
  assert.ok(event);
  const variant=event.variants.find(
    (v:any)=>v.id==='source-method-crosscheck'
  );
  assert.ok(variant);
  assert.deepEqual(variant.conditions,[{
    kind:'strongMetaKnowledge',
    knowledge:STRONG_META_KNOWLEDGE_IDS.palaceSourceMethod,
    present:true
  }]);

  const key='event.school-life-content-v1.night-study.arcana-reason.variant.source-method-crosscheck.text';
  const localized=localization.strings[key];
  assert.equal(typeof localized?.ru,'string');
  assert.equal(typeof localized?.en,'string');

  const forbiddenEnglish=/\b(?:palace|threshold|crossing|origin|return|prince|archive)\b/i;
  const forbiddenRussian=/(?:дворец|порог|пересеч|переход|происхожд|возвращ|принц|архив)/i;
  for(const copy of [variant.text,localized.en]){
    assert.equal(forbiddenEnglish.test(copy),false,copy);
  }
  assert.equal(forbiddenRussian.test(localized.ru),false,localized.ru);
});

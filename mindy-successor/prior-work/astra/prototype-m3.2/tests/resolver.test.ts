import test from 'node:test';import assert from 'node:assert/strict';
import {loadCatalog} from '../src/core/content.ts';
import {dispatch,freshSave,parseSave,resolveReactions} from '../src/core/engine.ts';
import {emptyResolvedStrongMetaSnapshot} from '../src/core/strongMeta.ts';
import type {Catalog,Effect,ReactionFact,Save} from '../src/core/schema.ts';

function action(id:string,effects:Effect[]=[]){
  return {id,label:id,description:id,cost:{money:0,energy:1},conditions:[],effects,mode:'normal',scenes:[{id:'default',text:`Synthetic action scene for ${id}.`,conditions:[],media:['stage.town']}]};
}
function definitions(probeEffects:Effect[]=[]){
  return {
    version:'0.1.0',
    flags:['story.arrived'],
    actions:[
      action('school',[{kind:'modifyStat',stat:'strength',delta:1}]),
      action('probe',probeEffects),
      action('work',[])
    ],
    endings:[],
    careers:[{
      id:'test.job',label:'Test Job',initialStage:'introduced',stages:['introduced','ready','completed'],
      transitions:[
        {id:'become-ready',from:['introduced'],to:'ready',conditions:[{kind:'stat',stat:'strength',op:'gte',value:2}],effects:[]},
        {id:'complete',from:['ready'],to:'completed',conditions:[],effects:[]}
      ]
    }],
    quests:[{
      id:'test.quest',label:'Test Quest',initialStage:'open',stages:['open','done'],
      transitions:[{id:'finish',from:['open'],to:'done',conditions:[],effects:[]}]
    }]
  };
}
function choice(id='continue',effects:Effect[]=[]){return {id,label:id,text:`Synthetic choice ${id} resolved.`,conditions:[],effects};}
function event(id:string,overrides:any={}){
  return {
    id:`resolver.${id}`,title:`Resolver ${id}`,
    trigger:[],reactionTriggers:[{kind:'actionCompleted',action:'probe'}],
    priorityClass:'normal_progression',priority:10,blocking:true,delivery:{policy:'live'},
    cooldownDays:0,variantCooldownDays:0,maxShows:100,conditions:[],
    variants:[{id:'default',text:`Synthetic resolver event ${id} fallback text.`,conditions:[],media:[]}],
    choices:[choice()],
    ...overrides
  };
}
function pack(events:any[]){
  return {
    schemaVersion:1,id:'resolver',reads:[],writes:[],
    capabilities:{
      reads:{
        stats:['strength'],
        resources:['money'],
        careers:['test.job'],
        quests:['test.quest'],
        worldFacts:['gate.open','ping','pong','cascade.done']
      },
      writes:{
        stats:['strength'],
        careers:['test.job'],
        quests:['test.quest'],
        worldFacts:['gate.open','ping','pong','cascade.done']
      }
    },
    media:[{id:'stage.town',kind:'image',src:'assets/town.svg',alt:'Synthetic town stage'}],
    events
  };
}
function catalog(events:any[],probeEffects:Effect[]=[]):Catalog{return loadCatalog(definitions(probeEffects),[pack(events)]);}
function start():Save{
  const s=freshSave();
  s.run.creation={remaining:0,allocated:{},activeHardWorkPackages:[],hardWorkPackagesApplied:true,complete:true};
  s.run.strongMetaSnapshot=emptyResolvedStrongMetaSnapshot();
  s.run.flags['story.arrived']=true;
  return s;
}

test('same-class ties use stable event ID regardless of input order',()=>{
  const cat=catalog([event('b'),event('a')]);
  const s=dispatch(start(),{type:'action',id:'probe'},cat);
  assert.equal(s.run.pending?.eventId,'resolver.a');
});

test('priority class beats arbitrary numeric priority from lower class',()=>{
  const cat=catalog([
    event('low-number',{priorityClass:'critical_progression',priority:0}),
    event('huge-number',{priorityClass:'optional_world',priority:999999})
  ]);
  const s=dispatch(start(),{type:'action',id:'probe'},cat);
  assert.equal(s.run.pending?.eventId,'resolver.low-number');
});

test('school stat gain triggers career scene without another work action, then choice cascades through quest fact',()=>{
  const ready=event('career-ready',{
    reactionTriggers:[{kind:'statChanged',stat:'strength'}],
    priorityClass:'critical_progression',
    conditions:[
      {kind:'stat',stat:'strength',op:'gte',value:2},
      {kind:'careerStage',career:'test.job',stage:'introduced'}
    ],
    choices:[choice('advance',[
      {kind:'advanceCareer',career:'test.job',transition:'become-ready'},
      {kind:'addQuestFact',quest:'test.quest',fact:'career.ready'}
    ])]
  });
  const follow=event('quest-followup',{
    reactionTriggers:[{kind:'questFactAdded',quest:'test.quest',fact:'career.ready'}],
    priorityClass:'critical_progression',
    conditions:[{kind:'questFact',quest:'test.quest',fact:'career.ready',present:true}],
    choices:[choice('finish',[{kind:'addWorldFact',fact:'cascade.done'}])]
  });
  const cat=catalog([follow,ready]);
  let s=dispatch(start(),{type:'action',id:'school'},cat);
  assert.equal(s.run.character.stats.strength,2);
  assert.equal(s.run.pending?.eventId,'resolver.career-ready');
  assert.equal(s.run.progression.careers['test.job'],undefined);
  assert.equal(s.run.historyState.actionCounts.work,undefined);

  s=dispatch(s,{type:'choice',id:'advance'},cat);
  assert.equal(s.run.progression.careers['test.job'].stage,'ready');
  assert.ok(s.run.progression.quests['test.quest'].facts.includes('career.ready'));
  assert.equal(s.run.pending?.eventId,'resolver.quest-followup');

  s=dispatch(s,{type:'choice',id:'finish'},cat);
  assert.equal(s.run.pending,null);
  assert.ok(s.run.progression.worldFacts.includes('cascade.done'));
});

test('same save and RNG produce identical probabilistic pending; reload does not reroll it',()=>{
  const randomEvent=event('random',{
    chance:{base:.5,stat:'strength',perPoint:0,max:.5},
    variants:[
      {id:'va',text:'Random variant A synthetic fallback.',conditions:[],media:[]},
      {id:'vb',text:'Random variant B synthetic fallback.',conditions:[],media:[]}
    ]
  });
  const cat=catalog([randomEvent]);
  const source=start();source.run.rng=1;
  const serialized=JSON.stringify(source);
  const a=dispatch(source,{type:'action',id:'probe'},cat);
  const b=dispatch(parseSave(serialized,cat),{type:'action',id:'probe'},cat);
  assert.deepEqual(a,b);
  assert.equal(a.run.pending?.eventId,'resolver.random');

  const restored=parseSave(JSON.stringify(a),cat);
  const rng=restored.run.rng;
  const resolved=resolveReactions(restored,[{kind:'actionCompleted',action:'probe'}],cat,{newEpoch:false});
  assert.equal(resolved.state.run.pending?.variantId,a.run.pending?.variantId);
  assert.equal(resolved.state.run.rng,rng);
  assert.match(resolved.trace.steps.join('|'),/existing-pending/);
});

test('failed probabilistic event is attempted only once inside one epoch',()=>{
  const cat=catalog([event('never',{chance:{base:0,stat:'strength',perPoint:0,max:0}})]);
  const fact:ReactionFact={kind:'actionCompleted',action:'probe'};
  const first=resolveReactions(start(),[fact],cat);
  assert.equal(first.state.run.pending,null);
  const rng=first.state.run.rng;
  const second=resolveReactions(first.state,[fact],cat,{newEpoch:false});
  assert.equal(second.state.run.rng,rng);
  assert.match(second.trace.steps.join('|'),/already-attempted/);
});

test('optional offer does not block ordinary work and can be opened explicitly',()=>{
  const cat=catalog([event('optional',{blocking:false,priorityClass:'optional_world'})]);
  let s=dispatch(start(),{type:'action',id:'probe'},cat);
  assert.equal(s.run.pending,null);
  assert.equal(s.run.dayState.optionalOfferIds.length,1);
  const offerId=s.run.dayState.optionalOfferIds[0];

  s=dispatch(s,{type:'action',id:'work'},cat);
  assert.equal(s.run.pending,null);
  assert.ok(s.run.dayState.optionalOfferIds.includes(offerId));

  s=dispatch(s,{type:'openOffer',id:offerId},cat);
  assert.equal(s.run.pending?.eventId,'resolver.optional');
  assert.ok(!s.run.dayState.optionalOfferIds.includes(offerId));
});

test('latched resolved event survives loss of its original condition',()=>{
  const high=event('high',{
    priorityClass:'forced',priority:1,
    choices:[
      choice('close',[{kind:'removeWorldFact',fact:'gate.open'}]),
      choice('leave',[])
    ]
  });
  const latched=event('latched',{
    priorityClass:'normal_progression',priority:1,delivery:{policy:'latched'},
    conditions:[{kind:'worldFact',fact:'gate.open',present:true}]
  });
  const cat=catalog([latched,high]);
  let s=start();s.run.progression.worldFacts.push('gate.open');
  s=dispatch(s,{type:'action',id:'probe'},cat);
  assert.equal(s.run.pending?.eventId,'resolver.high');
  assert.ok(s.run.flow.reaction.queued.some(q=>q.eventId==='resolver.latched'));

  s=dispatch(s,{type:'choice',id:'close'},cat);
  assert.ok(!s.run.progression.worldFacts.includes('gate.open'));
  assert.equal(s.run.pending?.eventId,'resolver.latched');
});

test('scheduled queued instance expires deterministically before later delivery',()=>{
  const high=event('high',{priorityClass:'forced'});
  const scheduled=event('scheduled',{
    priorityClass:'scheduled_mandatory',delivery:{policy:'scheduled',expiresAfterDays:1}
  });
  const cat=catalog([scheduled,high]);
  let s=dispatch(start(),{type:'action',id:'probe'},cat);
  assert.equal(s.run.pending?.eventId,'resolver.high');
  assert.equal(s.run.dayState.scheduledEventIds.length,1);

  s=parseSave(JSON.stringify(s),cat);
  s.run.pending=null;
  s.run.day=1;
  const out=resolveReactions(s,[{kind:'dayStarted',day:1},{kind:'calendarAdvanced',from:0,to:1}],cat);
  assert.equal(out.state.run.pending,null);
  assert.equal(out.state.run.dayState.scheduledEventIds.length,0);
  assert.ok(!out.state.run.flow.reaction.queued.some(q=>q.eventId==='resolver.scheduled'));
  assert.match(out.trace.steps.join('|'),/expired:resolver\.scheduled/);
});

test('committed ending suppresses normal progression candidates',()=>{
  const cat=catalog([event('normal')]);
  const s=start();s.run.endings.committed='synthetic.ending';s.run.status='ending_committed';
  const out=resolveReactions(s,[{kind:'actionCompleted',action:'probe'}],cat);
  assert.equal(out.state.run.pending,null);
  assert.match(out.trace.steps.join('|'),/ending-committed/);
});

test('cascade limit catches deterministic A-B-A loop without mutating caller on failure',()=>{
  const a=event('loop-a',{
    reactionTriggers:[{kind:'worldFactAdded',fact:'ping'}],
    choices:[choice('go',[{kind:'removeWorldFact',fact:'ping'},{kind:'addWorldFact',fact:'pong'}]),choice('stop',[])]
  });
  const b=event('loop-b',{
    reactionTriggers:[{kind:'worldFactAdded',fact:'pong'}],
    choices:[choice('go',[{kind:'removeWorldFact',fact:'pong'},{kind:'addWorldFact',fact:'ping'}]),choice('stop',[])]
  });
  const cat=catalog([b,a],[{kind:'addWorldFact',fact:'ping'}]);
  let s=dispatch(start(),{type:'action',id:'probe'},cat);
  assert.equal(s.run.flow.reaction.cascadeDepth,1);
  for(let i=0;i<15;i++)s=dispatch(s,{type:'choice',id:'go'},cat);
  assert.equal(s.run.flow.reaction.cascadeDepth,16);
  const before=JSON.stringify(s);
  assert.throws(()=>dispatch(s,{type:'choice',id:'go'},cat),/cascade limit 16/);
  assert.equal(JSON.stringify(s),before);
});

test('pending scene blocks incompatible actions and snapshots allowed choices',()=>{
  const cat=catalog([event('blocking',{choices:[choice('yes'),choice('no')]})]);
  const s=dispatch(start(),{type:'action',id:'probe'},cat);
  assert.deepEqual(s.run.pending?.allowedChoiceIds,['yes','no']);
  assert.throws(()=>dispatch(s,{type:'action',id:'work'},cat),/Сначала выберите ответ/);
  const raw=JSON.parse(JSON.stringify(s));raw.run.flow.pendingScene.allowedChoiceIds=['missing-choice'];
  assert.throws(()=>parseSave(JSON.stringify(raw),cat),/snapshot/);
});

test('resolver trace records facts, rejections and selected event',()=>{
  const cat=catalog([
    event('needs-money',{conditions:[{kind:'resource',resource:'money',op:'gte',value:999999}]}),
    event('selected')
  ]);
  const out=resolveReactions(start(),[{kind:'actionCompleted',action:'probe'}],cat);
  assert.equal(out.trace.selected,'resolver.selected');
  assert.ok(out.trace.facts.includes('actionCompleted:probe'));
  assert.match(out.trace.steps.join('|'),/reject:resolver\.needs-money:conditions/);
  assert.match(out.trace.steps.join('|'),/selected:resolver\.selected/);
});

test('resolver delivery validation rejects malformed optional/scheduled definitions',()=>{
  const badOptional=event('bad-optional',{blocking:false,delivery:{policy:'latched'}});
  assert.throws(()=>catalog([badOptional]),/Optional event/);
  const badScheduled=event('bad-scheduled',{delivery:{policy:'scheduled'}});
  assert.throws(()=>catalog([badScheduled]),/expiresAfterDays/);
});


test('older latched eligibility wins before newer equal-priority candidate',()=>{
  const high=event('hold',{priorityClass:'forced',reactionTriggers:[{kind:'actionCompleted',action:'probe'}]});
  const oldEvent=event('z-old',{
    reactionTriggers:[{kind:'actionCompleted',action:'probe'}],
    priorityClass:'normal_progression',priority:5,delivery:{policy:'latched'}
  });
  const newEvent=event('a-new',{
    reactionTriggers:[{kind:'actionCompleted',action:'work'}],
    priorityClass:'normal_progression',priority:5,delivery:{policy:'latched'}
  });
  const cat=catalog([newEvent,oldEvent,high]);
  let s=dispatch(start(),{type:'action',id:'probe'},cat);
  assert.equal(s.run.pending?.eventId,'resolver.hold');
  assert.ok(s.run.flow.reaction.queued.some(q=>q.eventId==='resolver.z-old'&&q.createdDay===0));

  s=parseSave(JSON.stringify(s),cat);
  s.run.pending=null;
  s.run.day=1;
  const out=resolveReactions(s,[{kind:'actionCompleted',action:'work'}],cat);
  assert.equal(out.state.run.pending?.eventId,'resolver.z-old');
  assert.ok(out.state.run.flow.reaction.queued.some(q=>q.eventId==='resolver.a-new'));
});

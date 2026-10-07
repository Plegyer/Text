import {definitionsSchema,ordinaryHardWorkCareers,packSchema, type Catalog,type Condition, type Effect, type Definitions, type Pack, type MachineDefinition, type ReactionTrigger} from './schema.ts';

function unique(ids:string[],label:string){if(new Set(ids).size!==ids.length)throw new Error(`Повтор ID: ${label}`);}
function visit(c:Condition,fn:(c:Condition)=>void,depth=0){
  if(depth>8)throw new Error('Слишком глубокое условие.');
  fn(c);
  if(c.kind==='all'||c.kind==='any')c.conditions.forEach(x=>visit(x,fn,depth+1));
  if(c.kind==='not')visit(c.condition,fn,depth+1);
}
function thresholdKey(c:Condition):{key:string;op:'gte'|'lte'|'eq';value:number}|null{
  if(c.kind==='metric')return {key:`legacy.metric.${c.key}`,op:c.op,value:c.value};
  if(c.kind==='stat')return {key:`stat.${c.stat}`,op:c.op,value:c.value};
  if(c.kind==='resource')return {key:`resource.${c.resource}`,op:c.op,value:c.value};
  if(c.kind==='itemCount')return {key:`item.${c.id}`,op:c.op,value:c.count};
  if(c.kind==='calendarYear')return {key:'calendar.year',op:c.op,value:c.value};
  if(c.kind==='calendarDayInYear')return {key:'calendar.dayInYear',op:c.op,value:c.value};
  if(c.kind==='calendarElapsedDays')return {key:'calendar.elapsedDays',op:c.op,value:c.value};
  if(c.kind==='careerShifts')return {key:`career.${c.career}.shifts`,op:c.op,value:c.value};
  if(c.kind==='careerCounter')return {key:`career.${c.career}.counter.${c.counter}`,op:c.op,value:c.value};
  if(c.kind==='questCounter')return {key:`quest.${c.quest}.counter.${c.counter}`,op:c.op,value:c.value};
  if(c.kind==='relationshipCounter')return {key:`relationship.${c.relationship}.counter.${c.counter}`,op:c.op,value:c.value};
  return null;
}
function contradictions(conditions:Condition[]){
  const flat:Condition[]=[];
  function expand(c:Condition){if(c.kind==='all')c.conditions.forEach(expand);else flat.push(c);}
  conditions.forEach(expand);
  const ranges=new Map<string,[number,number]>(),flags=new Map<string,boolean>();
  for(const c of flat){
    const t=thresholdKey(c);
    if(t){
      const [lo,hi]=ranges.get(t.key)??[0,1_000_000];
      const nextLo=t.op==='lte'?lo:Math.max(lo,t.value);
      const nextHi=t.op==='gte'?hi:Math.min(hi,t.value);
      if(nextLo>nextHi)throw new Error(`Противоречивые пороги: ${t.key}`);
      ranges.set(t.key,[nextLo,nextHi]);
    }
    if(c.kind==='flag'){
      if(flags.has(c.key)&&flags.get(c.key)!==c.value)throw new Error(`Противоречивый флаг ${c.key}`);
      flags.set(c.key,c.value);
    }
  }
}

const ordinaryCareerSet=new Set<string>(ordinaryHardWorkCareers);
type MachineKind='career'|'quest'|'relationship';
type MachineMaps={career:Map<string,MachineDefinition>;quest:Map<string,MachineDefinition>;relationship:Map<string,MachineDefinition>};

function machineMaps(d:Definitions):MachineMaps{
  const result:MachineMaps={
    career:new Map((d.careers??[]).map(x=>[x.id,x])),
    quest:new Map((d.quests??[]).map(x=>[x.id,x])),
    relationship:new Map((d.relationships??[]).map(x=>[x.id,x]))
  };
  return result;
}
function machineFor(maps:MachineMaps,kind:MachineKind,id:string){
  const m=maps[kind].get(id);if(!m)throw new Error(`Неизвестная ${kind} state machine: ${id}`);return m;
}
function checkMachineReference(c:Condition,maps:MachineMaps){
  if(c.kind==='careerStage'){const m=machineFor(maps,'career',c.career);if(!m.stages.includes(c.stage))throw new Error(`Неизвестный stage career.${c.career}.${c.stage}`);}
  if(c.kind==='careerShifts'||c.kind==='careerCounter'||c.kind==='careerFact'||c.kind==='careerChoice')machineFor(maps,'career',c.career);
  if(c.kind==='questStage'){const m=machineFor(maps,'quest',c.quest);if(!m.stages.includes(c.stage))throw new Error(`Неизвестный stage quest.${c.quest}.${c.stage}`);}
  if(c.kind==='questCounter'||c.kind==='questFact'||c.kind==='questChoice')machineFor(maps,'quest',c.quest);
  if(c.kind==='strongMetaFormalIntroductionAvailable'){
    if(!ordinaryCareerSet.has(c.career))throw new Error(`Formal Introduction requires an ordinary career: ${c.career}`);
    machineFor(maps,'career',c.career);
    const relationship=machineFor(maps,'relationship',c.relationship);
    if(!relationship.transitions.some(t=>t.id===c.transition))throw new Error(`Неизвестный Formal Introduction transition relationship.${c.relationship}.${c.transition}`);
  }
}
function isAdvance(e:Effect){return e.kind==='advanceCareer'||e.kind==='advanceQuest'||e.kind==='advanceRelationship'||e.kind==='useStrongMetaFormalIntroduction';}
function checkEffectReference(e:Effect,maps:MachineMaps){
  if(c.kind==='relationshipStage'){const m=machineFor(maps,'relationship',c.relationship);if(!m.stages.includes(c.stage))throw new Error(`Неизвестный stage relationship.${c.relationship}.${c.stage}`);}
  if(c.kind==='relationshipCounter'||c.kind==='relationshipFact'||c.kind==='relationshipChoice')machineFor(maps,'relationship',c.relationship);
}
function isAdvance(e:Effect){return e.kind==='advanceCareer'||e.kind==='advanceQuest'||e.kind==='advanceRelationship'||e.kind==='useStrongMetaFormalIntroduction';}
function checkEffectReference(e:Effect,maps:MachineMaps){
  if(e.kind==='incrementCareerCounter'||e.kind==='addCareerFact'||e.kind==='setCareerChoice')machineFor(maps,'career',e.career);
  if(e.kind==='advanceCareer'){
    const m=machineFor(maps,'career',e.career);
    if(!m.transitions.some(t=>t.id===e.transition))throw new Error(`Неизвестный transition career.${e.career}.${e.transition}`);
  }
  if(e.kind==='incrementQuestCounter'||e.kind==='addQuestFact'||e.kind==='setQuestChoice')machineFor(maps,'quest',e.quest);
  if(e.kind==='advanceQuest'){
    const m=machineFor(maps,'quest',e.quest);
    if(!m.transitions.some(t=>t.id===e.transition))throw new Error(`Неизвестный transition quest.${e.quest}.${e.transition}`);
  }
  if(e.kind==='incrementRelationshipCounter'||e.kind==='addRelationshipFact'||e.kind==='setRelationshipChoice')machineFor(maps,'relationship',e.relationship);
  if(e.kind==='useStrongMetaFormalIntroduction'){
    if(!ordinaryCareerSet.has(e.career))throw new Error(`Formal Introduction requires an ordinary career: ${e.career}`);
    machineFor(maps,'career',e.career);
    const m=machineFor(maps,'relationship',e.relationship);
    if(!m.transitions.some(t=>t.id===e.transition))throw new Error(`Неизвестный Formal Introduction transition relationship.${e.relationship}.${e.transition}`);
  }
}
function validateMachine(kind:MachineKind,m:MachineDefinition,maps:MachineMaps,checkConditions:(cs:Condition[])=>void,checkEffects:(es:Effect[])=>void){
  unique(m.stages,`${kind}.${m.id} stages`);
  unique(m.transitions.map(t=>t.id),`${kind}.${m.id} transitions`);
  if(e.kind==='advanceRelationship'){
    const m=machineFor(maps,'relationship',e.relationship);
    if(!m.transitions.some(t=>t.id===e.transition))throw new Error(`Неизвестный transition relationship.${e.relationship}.${e.transition}`);
  }
}
function validateMachine(kind:MachineKind,m:MachineDefinition,maps:MachineMaps,checkConditions:(cs:Condition[])=>void,checkEffects:(es:Effect[])=>void){
  unique(m.stages,`${kind}.${m.id} stages`);
  unique(m.transitions.map(t=>t.id),`${kind}.${m.id} transitions`);
  if(!m.stages.includes(m.initialStage))throw new Error(`Initial stage отсутствует: ${kind}.${m.id}.${m.initialStage}`);
  for(const t of m.transitions){
    for(const from of t.from)if(!m.stages.includes(from))throw new Error(`Неизвестный from stage ${kind}.${m.id}.${from}`);
    if(!m.stages.includes(t.to))throw new Error(`Неизвестный to stage ${kind}.${m.id}.${t.to}`);
    checkConditions(t.conditions);
    if(t.effects.some(isAdvance))throw new Error(`Nested transition запрещён: ${kind}.${m.id}.${t.id}`);
    checkEffects(t.effects);
  }
  const reachable=new Set<string>([m.initialStage]);
  let changed=true;
  while(changed){
    changed=false;
    for(const t of m.transitions){
      if(t.from.some(from=>reachable.has(from))&&!reachable.has(t.to)){
        reachable.add(t.to);changed=true;
      }
    }
  }
  for(const stage of m.stages)if(!reachable.has(stage))throw new Error(`Недостижимый orphan stage ${kind}.${m.id}.${stage}`);
}

function has<T>(xs:T[]|undefined,value:T){return !!xs?.includes(value);}
function needCapability(ok:boolean,label:string){if(!ok)throw new Error(`Недопустимая typed capability: ${label}`);}
function checkTypedRead(c:Condition,p:Pack){
  const r=p.capabilities?.reads;
  if(c.kind==='stat')needCapability(has(r?.stats,c.stat),`read stat ${c.stat}`);
  if(c.kind==='resource')needCapability(has(r?.resources,c.resource),`read resource ${c.resource}`);
  if(c.kind==='itemCount')needCapability(has(r?.inventory,c.id),`read item ${c.id}`);
  if(c.kind==='itemCapability')needCapability(has(r?.itemCapabilities,c.capability),`read item capability ${c.capability}`);
  if(c.kind==='calendarYear'||c.kind==='calendarSeason'||c.kind==='calendarDayInYear'||c.kind==='calendarElapsedDays')needCapability(r?.calendar===true,'read calendar');
  if(c.kind==='housingTier')needCapability(r?.housing===true,'read housing');
  if(c.kind==='schoolCounter')needCapability(has(r?.schoolTracks,c.track),`read School track ${c.track}`);
  if(c.kind==='schoolPaidLessons')needCapability(r?.schoolPaidLessons===true,'read paid School lesson total');
  if(c.kind==='lust')needCapability(r?.lust===true,'read Lust');
  if(c.kind==='secretDebtStatus'||c.kind==='secretDebtShifts'||c.kind==='secretDebtLenderEligible')needCapability(r?.secretDebt===true,'read Secret Debt state');
  if(c.kind==='careerStage'||c.kind==='careerShifts'||c.kind==='careerCounter'||c.kind==='careerFact'||c.kind==='careerChoice')needCapability(has(r?.careers,c.career),`read career ${c.career}`);
  if(c.kind==='questStage'||c.kind==='questCounter'||c.kind==='questFact'||c.kind==='questChoice')needCapability(has(r?.quests,c.quest),`read quest ${c.quest}`);
  if(c.kind==='relationshipStage'||c.kind==='relationshipCounter'||c.kind==='relationshipFact'||c.kind==='relationshipChoice')needCapability(has(r?.relationships,c.relationship),`read relationship ${c.relationship}`);
  if(c.kind==='worldFact')needCapability(has(r?.worldFacts,c.fact),`read worldFact ${c.fact}`);
  if(c.kind==='strongMetaKnowledge')needCapability(has(r?.meta,'strongMetaKnowledge'),`read Strong Meta knowledge`);
  if(c.kind==='metaUnlock')needCapability(has(r?.meta,'unlock'),`read meta.unlock`);
  if(c.kind==='metaEndingCompleted')needCapability(has(r?.meta,'endingCompleted'),`read meta.endingCompleted`);
  if(c.kind==='metaHardWork')needCapability(has(r?.meta,'hardWork'),`read meta.hardWork`);
}
function checkTypedWrite(e:Effect,p:Pack){
  const w=p.capabilities?.writes;
  if(e.kind==='modifyStat')needCapability(has(w?.stats,e.stat),`write stat ${e.stat}`);
  if(e.kind==='modifyResource')needCapability(has(w?.resources,e.resource),`write resource ${e.resource}`);
  if(e.kind==='modifyEnergy')needCapability(w?.energy===true,'write current Energy');
  if(e.kind==='addItem'||e.kind==='removeItem')needCapability(has(w?.inventory,e.id),`write item ${e.id}`);
  if(e.kind==='setHousing')needCapability(w?.housing===true,'write housing');
  if(e.kind==='incrementCareerCounter'||e.kind==='addCareerFact'||e.kind==='setCareerChoice'||e.kind==='advanceCareer')needCapability(has(w?.careers,e.career),`write career ${e.career}`);
  if(e.kind==='incrementQuestCounter'||e.kind==='addQuestFact'||e.kind==='setQuestChoice'||e.kind==='advanceQuest')needCapability(has(w?.quests,e.quest),`write quest ${e.quest}`);
  if(e.kind==='incrementRelationshipCounter'||e.kind==='addRelationshipFact'||e.kind==='setRelationshipChoice'||e.kind==='advanceRelationship'||e.kind==='useStrongMetaFormalIntroduction')needCapability(has(w?.relationships,e.relationship),`write relationship ${e.relationship}`);
  if(e.kind==='addWorldFact'||e.kind==='removeWorldFact')needCapability(has(w?.worldFacts,e.fact),`write worldFact ${e.fact}`);
  if(e.kind==='addNextDayModifier')needCapability(w?.nextDay===true,'write nextDay modifier');
  if(e.kind==='secretDebtAccept'){
    needCapability(w?.secretDebt===true,'write Secret Debt state');
    needCapability(has(w?.resources,'money'),'write Secret Debt lender grant');
  }
  if(e.kind==='secretDebtRefuse')needCapability(w?.secretDebt===true,'write Secret Debt state');
}
function freeEffect(e:Effect){
  if(e.kind==='housing'||e.kind==='setHousing'||e.kind==='removeItem'||e.kind==='removeWorldFact')return false;
  if(e.kind==='metric'||e.kind==='item')return e.delta>=0;
  if(e.kind==='modifyStat'||e.kind==='modifyResource'||e.kind==='modifyEnergy')return e.delta>=0;
  if(e.kind==='incrementCareerCounter'||e.kind==='incrementQuestCounter'||e.kind==='incrementRelationshipCounter')return e.amount>=0;
  if(e.kind==='addNextDayModifier')return e.energyDelta>=0&&e.statEffects.every(x=>x.delta>=0);
  return true;
}
function checkReactionTrigger(t:ReactionTrigger,p:Pack,maps:MachineMaps,endingIds:Set<string>,nightChoiceIds:Set<string>,activityById:Map<string,Definitions['activities'][number]>){
  const reads=p.capabilities?.reads;
  if(t.kind==='statChanged'&&t.stat)needCapability(has(reads?.stats,t.stat),`reaction stat ${t.stat}`);
  if(t.kind==='resourceChanged'&&t.resource)needCapability(has(reads?.resources,t.resource),`reaction resource ${t.resource}`);
  if(t.kind==='careerCounterChanged'||t.kind==='careerTransition'||t.kind==='careerFactAdded'){
    machineFor(maps,'career',t.career);needCapability(has(reads?.careers,t.career),`reaction career ${t.career}`);
  }
  if(t.kind==='questCounterChanged'||t.kind==='questTransition'||t.kind==='questFactAdded'){
    machineFor(maps,'quest',t.quest);needCapability(has(reads?.quests,t.quest),`reaction quest ${t.quest}`);
  }
  if(t.kind==='relationshipCounterChanged'||t.kind==='relationshipTransition'||t.kind==='relationshipFactAdded'){
    machineFor(maps,'relationship',t.relationship);needCapability(has(reads?.relationships,t.relationship),`reaction relationship ${t.relationship}`);
  }
  if(t.kind==='worldFactAdded'&&t.fact)needCapability(has(reads?.worldFacts,t.fact),`reaction worldFact ${t.fact}`);
  if(t.kind==='endingEligible'&&t.ending&&!endingIds.has(t.ending))throw new Error(`Неизвестная судьба reaction trigger ${t.ending}`);
  if(t.kind==='endingCommitted'&&!endingIds.has(t.ending))throw new Error(`Неизвестная committed судьба reaction trigger ${t.ending}`);
  if(t.kind==='nightChoiceCompleted'&&!nightChoiceIds.has(t.choice))throw new Error(`Неизвестный night choice reaction trigger ${t.choice}`);
  if(t.kind==='activityResult'){
    const activity=activityById.get(t.activity);
    if(!activity)throw new Error(`Неизвестная Activity reaction trigger ${t.activity}`);
    needCapability(has(reads?.activities,t.activity),`reaction activity ${t.activity}`);
    if(t.result&&!activity.results.some(r=>r.id===t.result))throw new Error(`Неизвестный Activity result ${t.activity}.${t.result}`);
    if(t.result&&t.outcome){
      const result=activity.results.find(r=>r.id===t.result)!;
      if(result.outcome!==t.outcome)throw new Error(`Activity result/outcome mismatch ${t.activity}.${t.result}`);
    }
  }
}

export function loadCatalog(definitions:unknown,packs:unknown[]):Catalog {
  const d=definitionsSchema.parse(definitions),ps=packs.map(p=>packSchema.parse(p));
  const events=ps.flatMap(p=>p.events),media=ps.flatMap(p=>p.media);
  unique(d.flags,'флаги');unique(d.actions.map(a=>a.id),'действия');unique(d.endings.map(e=>e.id),'судьбы');
  unique((d.careers??[]).map(x=>x.id),'careers');unique((d.quests??[]).map(x=>x.id),'quests');unique((d.relationships??[]).map(x=>x.id),'relationships');
  unique(d.itemDefinitions.map(x=>x.id),'item definitions');for(const item of d.itemDefinitions)unique(item.capabilities,`item.${item.id}.capabilities`);
  unique(d.lodgings.map(x=>x.id),'lodgings');unique(d.nightChoices.map(x=>x.id),'night choices');unique(d.activities.map(x=>x.id),'activities');
  unique(ps.map(p=>p.id),'пакеты');unique(events.map(e=>e.id),'события');unique(media.map(m=>m.id),'медиа');

  const known=new Set(d.flags),actionIds=new Set(d.actions.map(a=>a.id)),endingIds=new Set(d.endings.map(e=>e.id)),nightChoiceIds=new Set(d.nightChoices.map(x=>x.id)),activityById=new Map(d.activities.map(x=>[x.id,x])),mediaIds=new Set(media.map(m=>m.id)),itemCapabilities=new Set(d.itemDefinitions.flatMap(item=>item.capabilities)),maps=machineMaps(d);
  const checkConditionsGlobal=(cs:Condition[])=>{
    contradictions(cs);
    cs.forEach(c=>visit(c,x=>{
      if(x.kind==='visits'&&!actionIds.has(x.action))throw new Error(`Неизвестное действие счётчика ${x.action}`);
      if(x.kind==='itemCapability'&&!itemCapabilities.has(x.capability))throw new Error(`Неизвестная item capability ${x.capability}`);
      checkMachineReference(x,maps);
    }));
  };
  const checkEffectsGlobal=(es:Effect[])=>es.forEach(e=>checkEffectReference(e,maps));

  for(const m of d.careers??[])validateMachine('career',m,maps,checkConditionsGlobal,checkEffectsGlobal);
  for(const m of d.quests??[])validateMachine('quest',m,maps,checkConditionsGlobal,checkEffectsGlobal);
  for(const m of d.relationships??[])validateMachine('relationship',m,maps,checkConditionsGlobal,checkEffectsGlobal);

  const checkConditions=(cs:Condition[],p?:Pack,legacyReads=known)=>{
    checkConditionsGlobal(cs);
    cs.forEach(c=>visit(c,x=>{
      if(x.kind==='flag'&&(!known.has(x.key)||!legacyReads.has(x.key)))throw new Error(`Недопустимое чтение ${x.key}`);
      if(p)checkTypedRead(x,p);
    }));
  };
  const checkEffects=(es:Effect[],p?:Pack,legacyWrites=known)=>{
    checkEffectsGlobal(es);
    for(const e of es){
      if(e.kind==='flag'&&(!known.has(e.key)||!legacyWrites.has(e.key)))throw new Error(`Недопустимая запись ${e.key}`);
      if(p)checkTypedWrite(e,p);
    }
  };

  for(const a of d.actions){
    checkConditions(a.conditions);checkEffects(a.effects);
    if(a.seasonal)Object.values(a.seasonal).forEach(es=>checkEffects(es));
    if(a.scenes){
      unique(a.scenes.map(v=>v.id),a.id);
      if(!a.scenes.some(v=>!v.conditions.length))throw new Error('Нет базовой сцены занятия');
      for(const v of a.scenes){checkConditions(v.conditions);if(v.media.some(id=>!mediaIds.has(id)))throw new Error('Неизвестное медиа занятия');}
    }
  }
  for(const e of d.endings){
    checkConditions(e.conditions);
    const metaRewards=e.metaRewards??[];
    unique(metaRewards.map(r=>r.rewardId),`ending.${e.id}.metaRewards`);
    const hardWork=metaRewards.filter(r=>r.kind==='hardWork').map(r=>r.career);
    unique(hardWork,`ending.${e.id}.hardWork`);
  }
  for(const lodging of d.lodgings){
    checkConditions(lodging.conditions);checkEffects(lodging.effects);
  }
  for(const nightChoice of d.nightChoices){
    checkConditions(nightChoice.conditions);checkEffects(nightChoice.effects);
  }
  for(const activity of d.activities){
    checkConditions(activity.entryConditions);
    unique(activity.options.map(option=>option.id),`activity.${activity.id}.options`);
    for(const option of activity.options)checkConditions(option.conditions);
    unique(activity.results.map(r=>r.id),`activity.${activity.id}.results`);
    const outcomes=new Set(activity.results.map(r=>r.outcome));
    if(outcomes.size!==3||!['success','escape','failure'].every(x=>outcomes.has(x as any)))throw new Error(`Activity ${activity.id} должна иметь success/escape/failure result`);
    for(const result of activity.results)checkEffects(result.effects);
    if(activity.adapter==='counter.v1'){
      if(activity.resumePolicy!=='allowed')throw new Error(`counter.v1 поддерживает только resumePolicy=allowed: ${activity.id}`);
      if(activity.timePolicy!=='same_day')throw new Error(`counter.v1 поддерживает только timePolicy=same_day: ${activity.id}`);
      if(activity.failurePolicy!=='exit_to_day')throw new Error(`counter.v1 поддерживает только failurePolicy=exit_to_day: ${activity.id}`);
      if(activity.adapterConfig.failAtEndurance>=activity.adapterConfig.initialEndurance)throw new Error(`Activity ${activity.id}: failAtEndurance должен быть ниже initialEndurance`);
    }
  }

  for(const p of ps){
    for(const flag of [...p.reads,...p.writes])if(!known.has(flag))throw new Error(`Неизвестный флаг ${flag}`);
    for(const e of p.events){
      if(!e.id.startsWith(p.id+'.'))throw new Error(`Событие вне namespace пакета: ${e.id}`);
      if(!e.trigger.length&&!e.reactionTriggers.length)throw new Error(`Событие без trigger: ${e.id}`);
      if(e.trigger.some(t=>!actionIds.has(t)))throw new Error(`Неизвестный триггер ${e.id}`);
      for(const trigger of e.reactionTriggers)checkReactionTrigger(trigger,p,maps,endingIds,nightChoiceIds,activityById);
      if(e.delivery.policy==='scheduled'&&!e.delivery.expiresAfterDays)throw new Error(`Scheduled event без expiresAfterDays: ${e.id}`);
      if(e.delivery.policy!=='scheduled'&&e.delivery.expiresAfterDays)throw new Error(`expiresAfterDays допустим только scheduled: ${e.id}`);
      if(!e.blocking&&e.delivery.policy!=='live')throw new Error(`Optional event должен использовать live delivery: ${e.id}`);
      if(e.nightPolicy){
        if(!e.blocking)throw new Error(`Night event должен быть blocking: ${e.id}`);
        if(e.nightPolicy.suppressLodgingPayment&&e.nightPolicy.intercept!=='before_lodging')throw new Error(`suppressLodgingPayment допустим только before_lodging: ${e.id}`);
        if(e.nightPolicy.consumesNight&&!e.nightPolicy.suppressVoluntaryMenu)throw new Error(`consumesNight требует suppressVoluntaryMenu: ${e.id}`);
        const hasPoint=e.reactionTriggers.some(t=>t.kind==='nightPhase'&&t.point===e.nightPolicy!.intercept);
        const hasChoice=e.nightPolicy.intercept==='after_choice'&&e.reactionTriggers.some(t=>t.kind==='nightChoiceCompleted');
        if(!hasPoint&&!hasChoice)throw new Error(`Night event trigger не соответствует intercept: ${e.id}`);
      }
      checkConditions(e.conditions,p,new Set(p.reads));
      unique(e.variants.map(v=>v.id),e.id+' варианты');unique(e.choices.map(c=>c.id),e.id+' выборы');
      if(!e.variants.some(v=>v.conditions.length===0))throw new Error(`Нет запасной постановки ${e.id}`);
      if(!['forced','terminal','ending_committed'].includes(e.priorityClass)&&!e.choices.some(c=>c.conditions.length===0&&c.effects.every(freeEffect)))throw new Error(`Нет бесплатного выхода ${e.id}`);
      for(const v of e.variants){
        checkConditions([...e.conditions,...v.conditions],p,new Set(p.reads));
        if(v.media.some(id=>!mediaIds.has(id)))throw new Error(`Неизвестное медиа ${e.id}`);
      }
      for(const c of e.choices){
        if(c.media?.some(id=>!mediaIds.has(id)))throw new Error('Неизвестное медиа выбора');
        checkConditions([...e.conditions,...c.conditions],p,new Set(p.reads));
        checkEffects(c.effects,p,new Set(p.writes));
      }
    }
  }
  return {definitions:d,packs:ps,events,media};
}

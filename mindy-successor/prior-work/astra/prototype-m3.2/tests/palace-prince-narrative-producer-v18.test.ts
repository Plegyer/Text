import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {
  actionAvailable,
  dispatch,
  parseSave
} from '../src/core/engine.ts';
import {
  PALACE_ACCESS_FACT,
  PALACE_CONFRONT_PRINCE_ACTION,
  PALACE_DUTY_COUNTER,
  PALACE_PRINCE_CONFRONTATION_QUEST,
  PALACE_PRINCE_DEFEATED_FACT,
  PALACE_PROGRESSION_COMPLETE_FACT,
  palaceDutyDefinitions,
  palacePrinceConfrontationReady
} from '../src/core/palace.ts';
import {stats,type Pack,type Save} from '../src/core/schema.ts';
import {catalog,rawPacks,started} from './helpers.ts';

const localization=JSON.parse(readFileSync('content/localization.json','utf8'));
const strings=localization.strings;
const packs=rawPacks as Pack[];
const quests=catalog.definitions.quests??[];

function outcomeReady(statsValue=91,lust=1){
  const s=started();
  if(!s.run.progression.worldFacts.includes(PALACE_ACCESS_FACT))s.run.progression.worldFacts.push(PALACE_ACCESS_FACT);
  if(!s.run.progression.worldFacts.includes(PALACE_PROGRESSION_COMPLETE_FACT))s.run.progression.worldFacts.push(PALACE_PROGRESSION_COMPLETE_FACT);
  const palace=s.run.progression.palace;
  palace.stage='outcome-ready';
  palace.shifts=15;
  palace.counters[PALACE_DUTY_COUNTER]=15;
  palace.committedDutyIds=palaceDutyDefinitions.map(definition=>definition.id);
  palace.lastStructuralDutyDay=-1;
  palace.lastSupportActionDay=-1;
  palace.completedSupportIds=[];
  palace.routePrepFacts=[];
  palace.facts=[];
  for(const stat of stats)s.run.character.stats[stat]=statsValue;
  s.run.character.lust=lust;
  return parseSave(JSON.stringify(s),catalog);
}

function choose(s:Save,id:string){
  return dispatch(s,{type:'choice',id},catalog);
}

test('v18 maps the D45 reveal ladder without front-loading the Threshold',()=>{
  const invitation=packs.find(pack=>pack.id==='palace.invitation')!;
  const progression=packs.find(pack=>pack.id==='palace.progression')!;
  const finalize=packs.find(pack=>pack.id==='palace.outcome-finalize')!;

  const invitationText=invitation.events.map(event=>event.variants[0]!.text).join(' ');
  assert.match(invitationText,/ten ordinary professions|ten ordinary Hard Work/i);
  assert.doesNotMatch(invitationText,/Threshold Archive|inter-world Threshold/i);

  const byId=new Map(progression.events.map(event=>[event.id,event]));
  for(const id of [
    'palace.progression.milestone-02-working-rhythm',
    'palace.progression.milestone-05-trusted-service',
    'palace.progression.milestone-08-palace-network'
  ]){
    assert.doesNotMatch(byId.get(id)!.variants[0]!.text,/Threshold Archive|inter-world Threshold/i,id);
  }
  assert.match(byId.get('palace.progression.milestone-12-crossroads')!.variants[0]!.text,/authenticated records/i);
  assert.match(byId.get('palace.progression.milestone-12-crossroads')!.variants[0]!.text,/anomaly/i);
  assert.doesNotMatch(byId.get('palace.progression.milestone-12-crossroads')!.variants[0]!.text,/Threshold Archive|inter-world Threshold/i);

  const outcomeText=byId.get('palace.progression.milestone-15-outcome-ready')!.variants[0]!.text;
  assert.match(outcomeText,/Palace Concordance/);
  assert.match(outcomeText,/Threshold Archive/);
  assert.match(outcomeText,/inter-world Threshold/);
  assert.match(outcomeText,/arrival is classified/i);
  assert.match(outcomeText,/cause.*unresolved/i);

  const service=finalize.events.find(event=>event.id.endsWith('.service-life'))!.variants[0]!.text;
  const court=finalize.events.find(event=>event.id.endsWith('.court-power'))!.variants[0]!.text;
  const truth=finalize.events.find(event=>event.id.endsWith('.inner-truth'))!.variants[0]!.text;
  assert.match(service,/clear handoffs|professional boundaries/i);
  assert.match(court,/appointments.*access.*audit.*routing/i);
  assert.match(court,/does not control the Threshold/i);
  assert.match(truth,/Threshold.*Archive/i);
  assert.match(truth,/remain unresolved/i);
});

test('v18 confrontation has exact stable IDs, exact 12x91 gate and no hidden prerequisite domain',()=>{
  const action=catalog.definitions.actions.find(item=>item.id===PALACE_CONFRONT_PRINCE_ACTION)!;
  const quest=quests.find(item=>item.id===PALACE_PRINCE_CONFRONTATION_QUEST)!;
  assert.ok(action);
  assert.ok(quest);
  assert.equal(action.mode,'story');
  assert.deepEqual(action.cost,{money:0,energy:0});
  assert.equal(quest.initialStage,'ready');
  assert.deepEqual(quest.stages,[
    'ready','audit-record','name-contradiction','define-boundary','reconstruct-return','defeated'
  ]);

  const statConditions=action.conditions.filter(condition=>condition.kind==='stat');
  assert.equal(statConditions.length,12);
  assert.deepEqual([...statConditions.map(condition=>condition.stat)].sort(),[...stats].sort());
  for(const condition of statConditions){
    assert.equal(condition.op,'gte');
    assert.equal(condition.value,91);
  }

  const serialized=JSON.stringify(action.conditions);
  assert.equal(serialized.includes('lust'),false);
  for(const forbidden of [
    'itemCapability','itemCount','schoolCounter','relationshipStage','relationshipFact',
    'housingTier','metaUnlock','metaEndingCompleted','metaHardWork','activity'
  ]) assert.equal(serialized.includes(forbidden),false,forbidden);
  assert.equal(serialized.includes('palace.access-granted'),true);
  assert.equal(serialized.includes('palace.progression-complete'),true);
  assert.equal(serialized.includes('palace.prince-defeated'),true);
});

test('v18 confrontation availability is 12x91, ignores Lust and requires Outcome Ready',()=>{
  const action=catalog.definitions.actions.find(item=>item.id===PALACE_CONFRONT_PRINCE_ACTION)!;
  const good=outcomeReady(91,1);
  assert.equal(palacePrinceConfrontationReady(good),true);
  assert.equal(actionAvailable(action,good,catalog),true);

  const highLust=outcomeReady(91,100);
  assert.equal(palacePrinceConfrontationReady(highLust),true);
  assert.equal(actionAvailable(action,highLust,catalog),true);

  const low=outcomeReady(91,100);
  low.run.character.stats.reason=90;
  assert.equal(palacePrinceConfrontationReady(low),false);
  assert.equal(actionAvailable(action,low,catalog),false);

  const notComplete=outcomeReady(91,1);
  notComplete.run.progression.worldFacts=notComplete.run.progression.worldFacts.filter(
    fact=>fact!==PALACE_PROGRESSION_COMPLETE_FACT
  );
  assert.equal(palacePrinceConfrontationReady(notComplete),false);
  assert.equal(actionAvailable(action,notComplete,catalog),false);
});

test('v18 Prince attempt is deterministic, reload-safe, failure-safe and retryable the same day',()=>{
  let s=outcomeReady(91,100);
  const rngBefore=s.run.rngState.state;
  s=dispatch(s,{type:'action',id:PALACE_CONFRONT_PRINCE_ACTION},catalog);
  assert.equal(s.run.progression.quests[PALACE_PRINCE_CONFRONTATION_QUEST]?.stage,'audit-record');
  assert.equal(s.run.pending?.eventId,'palace.prince-confrontation.phase-01-audit-record');
  assert.equal(s.run.rngState.state,rngBefore);

  s=parseSave(JSON.stringify(s),catalog);
  assert.equal(s.run.progression.quests[PALACE_PRINCE_CONFRONTATION_QUEST]?.stage,'audit-record');
  assert.equal(s.run.pending?.eventId,'palace.prince-confrontation.phase-01-audit-record');

  s=choose(s,'unsupported-conclusion');
  assert.equal(s.run.progression.quests[PALACE_PRINCE_CONFRONTATION_QUEST]?.stage,'ready');
  assert.equal(s.run.progression.worldFacts.includes(PALACE_PRINCE_DEFEATED_FACT),false);
  assert.equal(s.run.endings.committed,null);
  assert.equal(s.run.pending,null);
  assert.equal(s.run.rngState.state,rngBefore);

  s=dispatch(s,{type:'action',id:PALACE_CONFRONT_PRINCE_ACTION},catalog);
  assert.equal(s.run.pending?.eventId,'palace.prince-confrontation.phase-01-audit-record');
  assert.equal(s.run.historyState.eventHistory['palace.prince-confrontation.phase-01-audit-record']?.count,2);
  s=choose(s,'not-yet');
  assert.equal(s.run.progression.quests[PALACE_PRINCE_CONFRONTATION_QUEST]?.stage,'ready');
  assert.equal(s.run.progression.worldFacts.includes(PALACE_PRINCE_DEFEATED_FACT),false);
  assert.equal(s.run.rngState.state,rngBefore);
});

test('v18 four-phase success writes Prince defeat exactly once and never auto-commits Return Home',()=>{
  let s=outcomeReady(91,1);
  const rngBefore=s.run.rngState.state;
  s=dispatch(s,{type:'action',id:PALACE_CONFRONT_PRINCE_ACTION},catalog);
  assert.equal(s.run.pending?.eventId,'palace.prince-confrontation.phase-01-audit-record');

  s=choose(s,'separate-record-from-claim');
  assert.equal(s.run.pending?.eventId,'palace.prince-confrontation.phase-02-name-contradiction');
  assert.equal(s.run.progression.quests[PALACE_PRINCE_CONFRONTATION_QUEST]?.stage,'name-contradiction');

  s=parseSave(JSON.stringify(s),catalog);
  assert.equal(s.run.pending?.eventId,'palace.prince-confrontation.phase-02-name-contradiction');

  s=choose(s,'authority-is-not-proof');
  assert.equal(s.run.pending?.eventId,'palace.prince-confrontation.phase-03-define-boundary');
  s=choose(s,'leave-without-erasing');
  assert.equal(s.run.pending?.eventId,'palace.prince-confrontation.phase-04-reconstruct-return');
  s=choose(s,'present-origin-trace');

  assert.equal(s.run.progression.quests[PALACE_PRINCE_CONFRONTATION_QUEST]?.stage,'defeated');
  assert.equal(
    s.run.progression.worldFacts.filter(fact=>fact===PALACE_PRINCE_DEFEATED_FACT).length,
    1
  );
  assert.equal(s.run.endings.eligible.includes('ending.palace.return-home'),true);
  assert.equal(s.run.endings.committed,null);
  assert.equal(s.run.status,'active');
  assert.equal(s.run.rngState.state,rngBefore);
  assert.equal(palacePrinceConfrontationReady(s),false);

  assert.throws(
    ()=>dispatch(s,{type:'action',id:PALACE_CONFRONT_PRINCE_ACTION},catalog),
    /Условия действия не выполнены/
  );

  s=dispatch(s,{type:'commitEnding',id:'ending.palace.return-home'},catalog);
  assert.equal(s.run.endings.committed,'ending.palace.return-home');
  assert.equal(s.run.status,'ending_committed');
});

test('v18 confrontation pack is four-phase, latched, deterministic and retry-capable',()=>{
  const pack=packs.find(item=>item.id==='palace.prince-confrontation');
  assert.ok(pack);
  assert.equal(pack.events.length,4);
  for(const event of pack.events){
    assert.equal(event.blocking,true);
    assert.equal(event.delivery.policy,'latched');
    assert.equal(event.cooldownDays,0);
    assert.ok(event.maxShows>1);
    assert.equal(event.chance,undefined);
    assert.equal(event.choices.some(choice=>choice.id==='not-yet'),true);
  }
  assert.equal(JSON.stringify(pack).includes('activityResult'),false);
  assert.equal(JSON.stringify(pack).includes('itemCapability'),false);
  assert.equal(JSON.stringify(pack).includes('relationship'),false);
  assert.equal(JSON.stringify(pack).includes('school'),false);
  assert.equal(JSON.stringify(pack).includes('lust'),false);
});

test('v18 RU EN localization covers D45 terms, confrontation and explicit Return Home commit',()=>{
  const required=[
    'action.palace.confront-prince.label',
    'action.palace.confront-prince.description',
    'action.palace.confront-prince.scene.default.text',
    'ui.palace.revealTerms.title',
    'ui.palace.term.concordance.label',
    'ui.palace.term.thresholdArchive.label',
    'ui.palace.term.threshold.label',
    'ui.palace.term.custodian.label',
    'ui.palace.confrontation.title',
    'ui.palace.confrontation.ready',
    'ui.palace.confrontation.complete',
    'ui.palace.confrontationButton',
    'ui.palace.returnHome.explicitCommit'
  ];
  const pack=packs.find(item=>item.id==='palace.prince-confrontation')!;
  for(const event of pack.events){
    required.push(
      `event.${event.id}.title`,
      `event.${event.id}.variant.default.text`
    );
    for(const choice of event.choices){
      required.push(
        `event.${event.id}.choice.${choice.id}.label`,
        `event.${event.id}.choice.${choice.id}.text`
      );
    }
  }
  for(const key of required){
    assert.ok(strings[key],key);
    assert.ok(strings[key].ru?.trim(),key+' ru');
    assert.ok(strings[key].en?.trim(),key+' en');
  }
});

test('v18 keeps D23, Secret Debt, Hard Work and Strong Meta firewalls intact',()=>{
  const action=catalog.definitions.actions.find(item=>item.id===PALACE_CONFRONT_PRINCE_ACTION)!;
  const all=JSON.stringify({
    action,
    quest:quests.find(item=>item.id===PALACE_PRINCE_CONFRONTATION_QUEST),
    pack:packs.find(item=>item.id==='palace.prince-confrontation')
  }).toLowerCase();

  assert.equal(all.includes('hardwork:palace'),false);
  assert.equal(all.includes("meta.unlocks['palace']"),false);
  assert.equal(all.includes('ensurepalaceunlock'),false);
  assert.equal(all.includes('secret-debt'),false);
  assert.equal(all.includes('forced-night'),false);
  assert.equal(all.includes('strongrewardregistry'),false);
  assert.equal(catalog.definitions.nightChoices.some(choice=>choice.id.startsWith('palace.')),false);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';

import {parseSave} from '../src/core/engine.ts';
import {
  PALACE_ACCESS_FACT,
  PALACE_DUTY_COUNTER,
  PALACE_PRINCE_DEFEATED_FACT,
  PALACE_PROGRESSION_COMPLETE_FACT,
  palaceDutyDefinitions,
  palaceExpectedStageForDutyCount
} from '../src/core/palace.ts';
import {stats,type Save} from '../src/core/schema.ts';
import {catalog,started} from './helpers.ts';

const {JSDOM,VirtualConsole}=createRequire(import.meta.url)('jsdom');
const html=readFileSync('dist/index.html','utf8');
const bundle=readFileSync('dist/app.js','utf8');
const data=JSON.parse(readFileSync('dist/content.json','utf8'));

async function wait(check:()=>boolean){
  for(let i=0;i<100;i++){
    if(check())return;
    await new Promise(resolve=>setTimeout(resolve,5));
  }
  throw new Error('UI update timed out');
}

function boot(saved:string){
  const errors:string[]=[];
  const vc=new VirtualConsole();
  vc.on('jsdomError',(error:Error)=>errors.push(error.message));
  const dom=new JSDOM(html,{url:'http://localhost:4173',runScripts:'outside-only',virtualConsole:vc});
  const w=dom.window;
  w.structuredClone=structuredClone;
  w.fetch=async()=>({ok:true,json:async()=>structuredClone(data)});
  w.confirm=()=>true;
  w.localStorage.setItem('portal-life.v1',saved);
  w.eval(bundle);
  return {dom,w,errors};
}

function openedPalace(count=0){
  const s=started();
  if(!s.run.progression.worldFacts.includes(PALACE_ACCESS_FACT))s.run.progression.worldFacts.push(PALACE_ACCESS_FACT);
  const palace=s.run.progression.palace;
  palace.stage=palaceExpectedStageForDutyCount(count);
  palace.shifts=count;
  palace.counters[PALACE_DUTY_COUNTER]=count;
  palace.committedDutyIds=palaceDutyDefinitions.slice(0,count).map(definition=>definition.id);
  palace.lastStructuralDutyDay=-1;
  palace.lastSupportActionDay=-1;
  palace.completedSupportIds=[];
  palace.routePrepFacts=[];
  palace.facts=[];
  s.run.progression.worldFacts=s.run.progression.worldFacts.filter(fact=>
    !fact.startsWith('palace.prep.')
    && !fact.startsWith('palace.outcome.')
    && fact!==PALACE_PROGRESSION_COMPLETE_FACT
    && fact!==PALACE_PRINCE_DEFEATED_FACT
  );
  if(count===15)s.run.progression.worldFacts.push(PALACE_PROGRESSION_COMPLETE_FACT);
  return parseSave(JSON.stringify(s),catalog);
}

function prepareServiceLife(input:Save){
  const s=structuredClone(input) as Save;
  for(const id of [
    'palace.outcome-prep.service-life.01-continuity',
    'palace.outcome-prep.service-life.02-boundaries'
  ]){
    if(!s.run.progression.palace.completedSupportIds.includes(id))s.run.progression.palace.completedSupportIds.push(id);
    if(!s.run.progression.palace.facts.includes(id))s.run.progression.palace.facts.push(id);
  }
  if(!s.run.progression.palace.routePrepFacts.includes('service-life'))s.run.progression.palace.routePrepFacts.push('service-life');
  if(!s.run.progression.worldFacts.includes('palace.prep.service-life'))s.run.progression.worldFacts.push('palace.prep.service-life');
  if(!s.run.progression.worldFacts.includes('palace.outcome.service-life-ready'))s.run.progression.worldFacts.push('palace.outcome.service-life-ready');
  if(!s.run.endings.eligible.includes('ending.palace.service-life'))s.run.endings.eligible.push('ending.palace.service-life');
  return parseSave(JSON.stringify(s),catalog);
}

test('renderer: Palace block appears only after run-local access and reveals no inaccessible route names',async()=>{
  const noAccess=boot(JSON.stringify(started()));
  try{
    await wait(()=>!!noAccess.w.document.querySelector('[data-panel="work"]'));
    noAccess.w.document.querySelector('[data-panel="work"]').click();
    assert.equal(noAccess.w.document.querySelector('.palace-progress'),null);
  }finally{
    noAccess.dom.window.close();
  }

  const s=openedPalace();
  const {w,dom,errors}=boot(JSON.stringify(s));
  try{
    await wait(()=>!!w.document.querySelector('[data-panel="work"]'));
    const before=w.localStorage.getItem('portal-life.v1');
    w.document.querySelector('[data-panel="work"]').click();
    await wait(()=>!!w.document.querySelector('.palace-progress'));

    const panel=w.document.querySelector('.palace-progress');
    assert.equal(panel.getAttribute('data-palace-access'),'granted');
    assert.equal(panel.getAttribute('data-palace-stage'),'entered-service');
    assert.equal(panel.querySelector('.palace-duty-progress').getAttribute('data-palace-duty-progress'),'0/15');
    assert.match(panel.textContent,/Начало службы/);
    assert.match(panel.textContent,/0 \/ 15/);
    assert.match(panel.textContent,/Стоимость обязанности.*1 энергии/);
    assert.match(panel.textContent,/Доход этой обязанности.*35 монет/);

    const duty=panel.querySelector('[data-action="palace.duty.01-service-rotation"]');
    assert.ok(duty);
    assert.equal(duty.disabled,false);
    assert.equal(duty.textContent,'Выполнить');

    assert.equal(panel.querySelector('[data-palace-route]'),null);
    assert.doesNotMatch(panel.textContent,/Жизнь в службе/);
    assert.doesNotMatch(panel.textContent,/Придворное влияние/);
    assert.doesNotMatch(panel.textContent,/Внутренняя истина/);
    assert.equal(w.localStorage.getItem('portal-life.v1'),before);
    assert.deepEqual(errors,[]);
  }finally{
    dom.window.close();
  }
});

test('renderer: duty daily lock does not block same-day support and stage threshold reveals only Service Life',async()=>{
  const s=openedPalace(5);
  s.run.progression.palace.lastStructuralDutyDay=s.run.calendar.elapsedDays;
  s.run.dayState.energyCurrent=3;

  const {w,dom,errors}=boot(JSON.stringify(s));
  try{
    await wait(()=>!!w.document.querySelector('[data-panel="work"]'));
    w.document.querySelector('[data-panel="work"]').click();
    await wait(()=>!!w.document.querySelector('.palace-progress'));

    const panel=w.document.querySelector('.palace-progress');
    assert.equal(panel.getAttribute('data-palace-stage'),'trusted-service');
    assert.equal(panel.querySelector('.palace-duty-lock').getAttribute('data-palace-duty-used-today'),'true');
    assert.match(panel.querySelector('.palace-duty-lock').textContent,/уже выполнена/);

    const nextDuty=panel.querySelector('[data-action="palace.duty.06-coordination"]');
    assert.ok(nextDuty);
    assert.equal(nextDuty.disabled,true,'extra Energy must not expose a second structural duty');

    const support=panel.querySelector('[data-action="palace.outcome-prep.service-life.01-continuity"]');
    assert.ok(support);
    assert.equal(support.disabled,false,'support may occur on the same day when Energy remains');

    assert.ok(panel.querySelector('[data-palace-route="service-life"]'));
    assert.equal(panel.querySelector('[data-palace-route="court-power"]'),null);
    assert.equal(panel.querySelector('[data-palace-route="inner-truth"]'),null);
    assert.doesNotMatch(panel.textContent,/Придворное влияние/);
    assert.doesNotMatch(panel.textContent,/Внутренняя истина/);
    assert.deepEqual(errors,[]);
  }finally{
    dom.window.close();
  }
});

test('renderer: eligible Palace ending shows exact future-life reward preview and explicit commit only',async()=>{
  const s=prepareServiceLife(openedPalace(15));
  const {w,dom,errors}=boot(JSON.stringify(s));
  try{
    await wait(()=>!!w.document.querySelector('[data-panel="legacy"]'));
    w.document.querySelector('[data-panel="legacy"]').click();
    await wait(()=>!!w.document.querySelector('[data-palace-endings="eligible-only"]'));

    const service=w.document.querySelector('[data-ending-id="ending.palace.service-life"]');
    assert.ok(service);
    assert.equal(service.getAttribute('data-ending-state'),'eligible');
    assert.equal(w.document.querySelector('[data-ending-id="ending.palace.court-power"]'),null);
    assert.equal(w.document.querySelector('[data-ending-id="ending.palace.inner-truth"]'),null);
    assert.equal(w.document.querySelector('[data-ending-id="ending.palace.return-home"]'),null);

    const reward=service.querySelector('[data-palace-reward-id="palace.service-life.steady-practice"]');
    assert.ok(reward);
    assert.match(reward.textContent,/Устойчивая практика/);
    assert.match(reward.textContent,/Специалист/);
    assert.match(reward.textContent,/palace\.service-life\.steady-practice/);
    assert.equal(reward.querySelector('button'),null,'reward preview must not create a Strong Meta selector');

    const commit=service.querySelector('[data-ending="ending.palace.service-life"]');
    assert.ok(commit);
    assert.equal(commit.disabled,false);
    commit.click();
    await wait(()=>JSON.parse(w.localStorage.getItem('portal-life.v1')).run.status==='ending_committed');

    w.document.querySelector('[data-panel="legacy"]').click();
    await wait(()=>!!w.document.querySelector('[data-ending-id="ending.palace.service-life"]'));
    assert.equal(
      w.document.querySelector('[data-ending-id="ending.palace.service-life"]').getAttribute('data-ending-state'),
      'committed'
    );
    assert.deepEqual(errors,[]);
  }finally{
    dom.window.close();
  }
});

test('renderer: Return Home card appears only when full 12x91 plus Prince predicate is satisfied',async()=>{
  let ready=openedPalace(15);
  for(const stat of stats)ready.run.character.stats[stat]=91;
  ready.run.character.lust=1;
  ready.run.progression.worldFacts.push(PALACE_PRINCE_DEFEATED_FACT);
  ready.run.endings.eligible.push('ending.palace.return-home');
  ready=parseSave(JSON.stringify(ready),catalog);

  const good=boot(JSON.stringify(ready));
  try{
    await wait(()=>!!good.w.document.querySelector('[data-panel="legacy"]'));
    good.w.document.querySelector('[data-panel="legacy"]').click();
    await wait(()=>!!good.w.document.querySelector('[data-palace-endings="eligible-only"]'));
    const card=good.w.document.querySelector('[data-ending-id="ending.palace.return-home"]');
    assert.ok(card);
    assert.equal(card.getAttribute('data-palace-true-ending'),'runtime-eligible');
    const reward=card.querySelector('[data-palace-reward-id="palace.true.cap-200"]');
    assert.ok(reward);
    assert.match(reward.textContent,/Предел характеристик 200/);
    assert.match(reward.textContent,/Специалист/);
  }finally{
    good.dom.window.close();
  }

  let low=openedPalace(15);
  for(const stat of stats)low.run.character.stats[stat]=91;
  low.run.character.stats.reason=90;
  low.run.character.lust=100;
  low.run.progression.worldFacts.push(PALACE_PRINCE_DEFEATED_FACT);
  low.run.endings.eligible.push('ending.palace.return-home');
  low=parseSave(JSON.stringify(low),catalog);

  const bad=boot(JSON.stringify(low));
  try{
    await wait(()=>!!bad.w.document.querySelector('[data-panel="legacy"]'));
    bad.w.document.querySelector('[data-panel="legacy"]').click();
    await wait(()=>!!bad.w.document.querySelector('[data-palace-endings="eligible-only"]'));
    assert.equal(bad.w.document.querySelector('[data-ending-id="ending.palace.return-home"]'),null);
    assert.doesNotMatch(bad.w.document.querySelector('[data-palace-endings="eligible-only"]').textContent,/Возвращение домой/);
  }finally{
    bad.dom.window.close();
  }
});

test('renderer: Palace UI switches RU EN without changing the life save',async()=>{
  const s=openedPalace(5);
  const {w,dom,errors}=boot(JSON.stringify(s));
  try{
    await wait(()=>!!w.document.querySelector('[data-panel="work"]'));
    const before=w.localStorage.getItem('portal-life.v1');
    w.document.querySelector('[data-panel="work"]').click();
    await wait(()=>!!w.document.querySelector('.palace-progress'));
    assert.match(w.document.querySelector('.palace-progress').textContent,/Доверенная служба/);
    assert.match(w.document.querySelector('[data-palace-route="service-life"]').textContent,/Жизнь в службе/);

    w.document.querySelector('#close').click();
    w.document.querySelector('[data-panel="menu"]').click();
    w.document.querySelector('#language-toggle').click();
    await wait(()=>w.document.documentElement.lang==='en');
    assert.equal(w.localStorage.getItem('portal-life.v1'),before);

    w.document.querySelector('#close').click();
    w.document.querySelector('[data-panel="work"]').click();
    await wait(()=>!!w.document.querySelector('.palace-progress'));
    assert.match(w.document.querySelector('.palace-progress').textContent,/Trusted Service/);
    assert.match(w.document.querySelector('[data-palace-route="service-life"]').textContent,/Service Life/);
    assert.equal(w.document.querySelector('[data-action="palace.duty.06-coordination"]').textContent,'Perform');
    assert.equal(w.localStorage.getItem('portal-life.v1'),before);
    assert.deepEqual(errors,[]);
  }finally{
    dom.window.close();
  }
});

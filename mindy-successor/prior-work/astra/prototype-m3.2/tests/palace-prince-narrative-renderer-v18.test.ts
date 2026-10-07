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
  palaceDutyDefinitions
} from '../src/core/palace.ts';
import {stats} from '../src/core/schema.ts';
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

function readyState(defeated=false){
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
  for(const stat of stats)s.run.character.stats[stat]=91;
  s.run.character.lust=1;
  if(defeated){
    s.run.progression.worldFacts.push(PALACE_PRINCE_DEFEATED_FACT);
    s.run.endings.eligible.push('ending.palace.return-home');
  }
  return parseSave(JSON.stringify(s),catalog);
}

test('renderer v18: Outcome Ready reveals D45 terms and exact Prince confrontation action',async()=>{
  const {w,dom,errors}=boot(JSON.stringify(readyState(false)));
  try{
    await wait(()=>!!w.document.querySelector('[data-panel="work"]'));
    w.document.querySelector('[data-panel="work"]').click();
    await wait(()=>!!w.document.querySelector('[data-palace-reveal="outcome-ready"]'));

    const reveal=w.document.querySelector('[data-palace-reveal="outcome-ready"]');
    assert.match(reveal.textContent,/Дворцовый Свод/);
    assert.match(reveal.textContent,/Архив Порога/);
    assert.match(reveal.textContent,/Порог/);
    assert.match(reveal.textContent,/Хранитель/);

    const confrontation=w.document.querySelector('[data-palace-confrontation="ready"]');
    assert.ok(confrontation);
    assert.match(confrontation.textContent,/не бой/i);
    const button=confrontation.querySelector('[data-action="palace.confront-prince"]');
    assert.ok(button);
    assert.equal(button.disabled,false);
    assert.equal(button.textContent,'Противостоять');
    assert.deepEqual(errors,[]);
  }finally{
    dom.window.close();
  }
});

test('renderer v18: Prince defeat preserves explicit Return Home commit and bilingual presentation',async()=>{
  const saved=JSON.stringify(readyState(true));
  const {w,dom,errors}=boot(saved);
  try{
    await wait(()=>!!w.document.querySelector('[data-panel="work"]'));
    w.document.querySelector('[data-panel="work"]').click();
    await wait(()=>!!w.document.querySelector('[data-palace-confrontation="completed"]'));
    assert.match(
      w.document.querySelector('[data-palace-confrontation="completed"]').textContent,
      /Возвращение домой остаётся отдельным явным выбором/
    );
    assert.equal(w.document.querySelector('[data-action="palace.confront-prince"]'),null);

    w.document.querySelector('#close').click();
    w.document.querySelector('[data-panel="legacy"]').click();
    await wait(()=>!!w.document.querySelector('[data-ending-id="ending.palace.return-home"]'));
    const card=w.document.querySelector('[data-ending-id="ending.palace.return-home"]');
    assert.ok(card.querySelector('[data-palace-return-home-commit="explicit"]'));
    assert.match(card.textContent,/возвращение не происходит автоматически/i);
    const commit=card.querySelector('[data-ending="ending.palace.return-home"]');
    assert.ok(commit);
    assert.equal(commit.disabled,false);

    w.document.querySelector('#close').click();
    w.document.querySelector('[data-panel="menu"]').click();
    w.document.querySelector('#language-toggle').click();
    await wait(()=>w.document.documentElement.lang==='en');
    w.document.querySelector('#close').click();
    w.document.querySelector('[data-panel="legacy"]').click();
    await wait(()=>!!w.document.querySelector('[data-palace-return-home-commit="explicit"]'));
    assert.match(
      w.document.querySelector('[data-palace-return-home-commit="explicit"]').textContent,
      /does not happen automatically/i
    );
    assert.deepEqual(errors,[]);
  }finally{
    dom.window.close();
  }
});

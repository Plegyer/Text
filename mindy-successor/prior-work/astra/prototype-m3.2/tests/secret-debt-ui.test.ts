import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';

import {applyEffects,dispatch} from '../src/core/engine.ts';
import {ordinaryHardWorkCareers} from '../src/core/schema.ts';
import {catalog,started} from './helpers.ts';

const {JSDOM,VirtualConsole}=createRequire(import.meta.url)('jsdom');
const html=readFileSync('dist/index.html','utf8');
const bundle=readFileSync('dist/app.js','utf8');
const data=JSON.parse(readFileSync('dist/content.json','utf8'));

async function wait(check:()=>boolean){
  for(let i=0;i<100;i++){
    if(check())return;
    await new Promise(r=>setTimeout(r,5));
  }
  throw new Error('Secret Debt UI update timed out');
}

function boundSave(){
  let s=started();
  s=applyEffects(s,[{kind:'incrementCareerCounter',career:'lumber',counter:'completed_shifts',amount:1}],catalog);
  s=applyEffects(s,[{kind:'advanceCareer',career:'secret-debt',transition:'accept-offer'}],catalog);
  s.run.progression.careers['secret-debt']!.counters.accepted_day=s.run.day;
  s=applyEffects(s,[{kind:'advanceCareer',career:'secret-debt',transition:'activate-bound'}],catalog);
  return s;
}

async function boot(locale:'ru'|'en'){
  const errors:string[]=[];
  const vc=new VirtualConsole();
  vc.on('jsdomError',(e:Error)=>errors.push(e.message));
  const dom=new JSDOM(html,{url:'http://localhost:4173',runScripts:'outside-only',virtualConsole:vc});
  const w=dom.window;
  w.structuredClone=structuredClone;
  w.fetch=async()=>({ok:true,json:async()=>structuredClone(data)});
  w.confirm=()=>true;
  w.localStorage.setItem('portal-life.v1',JSON.stringify(boundSave()));
  w.localStorage.setItem('portal-life.locale',locale);
  w.eval(bundle);
  await wait(()=>!!w.document.querySelector('[data-panel="work"]'));
  w.document.querySelector('[data-panel="work"]').click();
  await wait(()=>!!w.document.querySelector('[data-action="secret-debt.shift"]'));
  return {dom,w,errors};
}

function paidFreedomSave(){
  let s=boundSave();
  s.run.resources.money=20000;
  s=dispatch(s,{type:'action',id:'secret-debt.repay'},catalog);
  s=dispatch(s,{type:'commitEnding',id:'ending.secret-debt.paid-freedom'},catalog);
  return dispatch(s,{type:'completeEnding'},catalog);
}

async function bootSave(save:any,locale:'ru'|'en'){
  const errors:string[]=[];
  const vc=new VirtualConsole();
  vc.on('jsdomError',(e:Error)=>errors.push(e.message));
  const dom=new JSDOM(html,{url:'http://localhost:4173',runScripts:'outside-only',virtualConsole:vc});
  const w=dom.window;
  w.structuredClone=structuredClone;
  w.fetch=async()=>({ok:true,json:async()=>structuredClone(data)});
  w.confirm=()=>true;
  w.localStorage.setItem('portal-life.v1',JSON.stringify(save));
  w.localStorage.setItem('portal-life.locale',locale);
  w.eval(bundle);
  await wait(()=>!!w.document.querySelector('.game-shell'));
  return {dom,w,errors};
}

test('bound Secret Debt UI locks ordinary work, preserves its progress, and exposes only the hidden bound shift',async()=>{
  for(const locale of ['ru','en'] as const){
    const save=boundSave();
    assert.equal(save.run.progression.careers.lumber?.counters.completed_shifts,1);

    const {dom,w,errors}=await boot(locale);
    try{
      for(const career of ordinaryHardWorkCareers){
        const id=`${career}.shift`;
        const button=w.document.querySelector(`[data-action="${id}"]`);
        assert.ok(button,id);
        assert.equal(button.disabled,true,id);
        assert.equal(button.getAttribute('aria-disabled'),'true',id);
        const helpId=button.getAttribute('aria-describedby');
        assert.ok(helpId,id+' debt lock help');
        const help=w.document.getElementById(helpId);
        assert.ok(help?.textContent?.trim(),id+' debt lock text');
        if(locale==='ru')assert.match(help.textContent,/связывающ.*долг/i,id);
        else assert.match(help.textContent,/binding debt/i,id);
      }

      const hidden=w.document.querySelector('[data-action="secret-debt.shift"]');
      assert.ok(hidden,'hidden bound shift');
      assert.equal(hidden.disabled,true,'paid shift stays gated until Product locks wage/stat tuning');
      const repay=w.document.querySelector('[data-action="secret-debt.repay"]');
      assert.ok(repay,'explicit all-at-once repayment action');
      assert.equal(repay.disabled,true,'initial bound save does not yet hold 20000');
      assert.equal(w.document.querySelector('[data-action="secret-debt.takeover"]'),null,'takeover stays hidden until the structural route gate is ready');
      const panelText=w.document.querySelector('.panel')?.textContent??'';
      if(locale==='ru'){assert.match(panelText,/Связывающий долг/);assert.match(panelText,/20000/);}
      else{assert.match(panelText,/Binding debt/);assert.match(panelText,/20000/);}

      assert.deepEqual(errors,[]);
    }finally{
      dom.window.close();
    }
  }
});

test('completed Paid Freedom screen uses localized Secret Debt identity and epilogue across reload',async()=>{
  const save=paidFreedomSave();
  assert.equal(save.run.status,'ended');
  assert.equal(save.run.endings.result?.endingId,'ending.secret-debt.paid-freedom');

  for(const locale of ['ru','en'] as const){
    const {dom,w,errors}=await bootSave(save,locale);
    try{
      const identity=w.document.querySelector('.ending-identity')?.textContent?.trim()??'';
      const body=w.document.querySelector('.dialogue p')?.textContent?.trim()??'';
      if(locale==='ru'){
        assert.equal(identity,'Выкупленная свобода');
        assert.match(body,/Обязательство закрыто/);
      }else{
        assert.equal(identity,'Paid Freedom');
        assert.match(body,/obligation is closed/i);
      }
      assert.deepEqual(errors,[]);
    }finally{
      dom.window.close();
    }
  }
});


test('pre-earned ordinary ending stays visible but locked while bound and unlocks after full repayment',async()=>{
  let bound=boundSave();
  bound.run.progression.careers.lumber!.counters.completed_shifts=50;
  if(!bound.run.endings.eligible.includes('ending.lumber.hard-work'))bound.run.endings.eligible.push('ending.lumber.hard-work');

  for(const locale of ['ru','en'] as const){
    const {dom,w,errors}=await bootSave(bound,locale);
    try{
      w.document.querySelector('[data-panel="legacy"]').click();
      await wait(()=>!!w.document.querySelector('[data-ending-id="ending.lumber.hard-work"]'));
      const article=w.document.querySelector('[data-ending-id="ending.lumber.hard-work"]');
      const button=article?.querySelector('button[data-ending="ending.lumber.hard-work"]');
      assert.ok(button);
      assert.equal(button.disabled,true);
      const text=article?.textContent??'';
      if(locale==='ru')assert.match(text,/связывающ.*долг/i);
      else assert.match(text,/binding debt/i);
      assert.deepEqual(errors,[]);
    }finally{
      dom.window.close();
    }
  }

  let released=structuredClone(bound);
  released.run.resources.money=20000;
  released=dispatch(released,{type:'action',id:'secret-debt.repay'},catalog);
  assert.equal(released.run.endings.eligible.includes('ending.lumber.hard-work'),true,'ordinary ending eligibility is preserved');

  const {dom,w,errors}=await bootSave(released,'en');
  try{
    w.document.querySelector('[data-panel="legacy"]').click();
    await wait(()=>!!w.document.querySelector('[data-ending-id="ending.lumber.hard-work"]'));
    const button=w.document.querySelector('[data-ending="ending.lumber.hard-work"]');
    assert.ok(button);
    assert.equal(button.disabled,false,'repayment releases the ordinary ending lock');
    assert.deepEqual(errors,[]);
  }finally{
    dom.window.close();
  }
});

import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';

import {applyEffects,dispatch,resolveReactions} from '../src/core/engine.ts';
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
  s=applyEffects(s,[
    {kind:'addCareerFact',career:'secret-debt',fact:'encounter-authorized'},
    {kind:'advanceCareer',career:'secret-debt',transition:'surface-offer'},
    {kind:'advanceCareer',career:'secret-debt',transition:'accept-offer'},
    {kind:'addCareerFact',career:'secret-debt',fact:'activation-authorized'},
    {kind:'advanceCareer',career:'secret-debt',transition:'activate-bound'}
  ],catalog);
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
  s=applyEffects(s,[{kind:'addCareerFact',career:'secret-debt',fact:'debt-cleared'}],catalog);
  s=resolveReactions(s,[{kind:'careerFactAdded',career:'secret-debt',fact:'debt-cleared'}],catalog).state;
  s=dispatch(s,{type:'choice',id:'leave'},catalog);
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
  await wait(()=>!!w.document.querySelector('[data-ending-id="ending.secret-debt.paid-freedom"]'));
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
      assert.equal(hidden.disabled,false);
      const panelText=w.document.querySelector('.panel')?.textContent??'';
      if(locale==='ru')assert.match(panelText,/Связывающий долг/);
      else assert.match(panelText,/Binding debt/);

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

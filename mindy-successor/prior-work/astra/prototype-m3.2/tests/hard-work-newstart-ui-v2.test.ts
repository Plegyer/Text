import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';

import {freshSave} from '../src/core/engine.ts';

const {JSDOM,VirtualConsole}=createRequire(import.meta.url)('jsdom');
const html=readFileSync('dist/index.html','utf8');
const bundle=readFileSync('dist/app.js','utf8');
const data=JSON.parse(readFileSync('dist/content.json','utf8'));

async function wait(check:()=>boolean){
  for(let i=0;i<100;i++){
    if(check())return;
    await new Promise(resolve=>setTimeout(resolve,5));
  }
  throw new Error('New Start+ UI update timed out');
}

function boot(earned:string[]){
  const errors:string[]=[];
  const vc=new VirtualConsole();
  vc.on('jsdomError',(error:Error)=>errors.push(error.message));
  const dom=new JSDOM(html,{url:'http://localhost:4173/?dev=1',runScripts:'outside-only',virtualConsole:vc});
  const w=dom.window;
  w.structuredClone=structuredClone;
  w.fetch=async()=>({ok:true,json:async()=>structuredClone(data)});
  w.confirm=()=>true;
  w.localStorage.setItem('portal-life.locale','ru');
  w.localStorage.setItem('portal-life.v1',JSON.stringify(freshSave({hardWorkProgress:earned})));
  w.eval(bundle);
  return {dom,w,errors};
}

function savedActive(w:any):string[]{
  return JSON.parse(w.localStorage.getItem('portal-life.v1')).run.character.creation.activeHardWorkPackages;
}

test('creation UI shows only earned packages and toggles each whole package independently',async()=>{
  const {dom,w,errors}=boot(['guard','prostitute']);
  try{
    await wait(()=>!!w.document.querySelector('[data-hard-work-package="guard"]'));

    const controls=[...w.document.querySelectorAll('[data-hard-work-package]')];
    assert.deepEqual(controls.map((node:any)=>node.dataset.hardWorkPackage),['guard','prostitute']);
    assert.equal(w.document.querySelector('[data-hard-work-package="lumber"]'),null);

    const guard=w.document.querySelector('[data-hard-work-package="guard"]');
    const professional=w.document.querySelector('[data-hard-work-package="prostitute"]');
    assert.equal(guard.getAttribute('aria-pressed'),'false');
    assert.equal(professional.getAttribute('aria-pressed'),'false');

    const guardCard=w.document.querySelector('[data-hard-work-package-card="guard"]');
    const professionalCard=w.document.querySelector('[data-hard-work-package-card="prostitute"]');
    assert.match(guardCard.textContent,/Выносливость \+5/);
    assert.match(guardCard.textContent,/Манеры \+5/);
    assert.match(professionalCard.textContent,/Сексуальность \+5/);
    assert.match(professionalCard.textContent,/Обаяние \+5/);
    assert.match(professionalCard.textContent,/Похоть \+5/);
    assert.match(guardCard.querySelector('.hard-work-early-access').textContent,/Hard Work/);

    guard.click();
    await wait(()=>savedActive(w).includes('guard'));
    assert.deepEqual(savedActive(w),['guard']);
    assert.equal(w.document.querySelector('[data-hard-work-package="guard"]').getAttribute('aria-pressed'),'true');

    w.document.querySelector('[data-hard-work-package="prostitute"]').click();
    await wait(()=>savedActive(w).includes('prostitute'));
    assert.deepEqual(savedActive(w),['guard','prostitute']);

    w.document.querySelector('[data-hard-work-package="guard"]').click();
    await wait(()=>!savedActive(w).includes('guard'));
    assert.deepEqual(savedActive(w),['prostitute']);

    assert.deepEqual(errors,[]);
  }finally{
    dom.window.close();
  }
});

test('all-ten earned UI exposes Palace requirement separately from package controls',async()=>{
  const earned=['lumber','satyr-maid','undead-farm','tavern','hunter','guard','merchant','artist-geisha','assassin','prostitute'];
  const {dom,w,errors}=boot(earned);
  try{
    await wait(()=>w.document.querySelectorAll('[data-hard-work-package]').length===10);
    const help=w.document.querySelector('.hard-work-palace-help');
    assert.ok(help);
    assert.equal(help.getAttribute('data-palace-qualified'),'false');
    assert.match(help.textContent,/10\/10/);
    assert.match(help.textContent,/активны все 10/);

    for(const career of earned){
      const control=w.document.querySelector(`[data-hard-work-package="${career}"]`);
      assert.ok(control,career);
      control.click();
      await wait(()=>savedActive(w).includes(career));
    }
    assert.equal(savedActive(w).length,10);
    await wait(()=>w.document.querySelector('.hard-work-palace-help')?.getAttribute('data-palace-qualified')==='true');

    assert.equal(w.document.querySelectorAll('[data-hard-work-package][aria-pressed="true"]').length,10);
    assert.deepEqual(errors,[]);
  }finally{
    dom.window.close();
  }
});

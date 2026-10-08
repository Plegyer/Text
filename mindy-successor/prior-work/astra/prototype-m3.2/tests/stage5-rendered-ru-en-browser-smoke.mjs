import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {chromium} from 'playwright';

const server=spawn(process.execPath,['scripts/serve.mjs'],{stdio:'pipe'});
const base='http://127.0.0.1:4173/';
async function ready(){
  for(let i=0;i<60;i++){try{const r=await fetch(base);if(r.ok)return;}catch{}await new Promise(resolve=>setTimeout(resolve,500));}
  throw new Error('preview server never became ready');
}
let browser;
try {
  await ready();
  browser=await chromium.launch({headless:true});
  for(const lang of ['ru','en']){
    const context=await browser.newContext({locale:lang==='ru'?'ru-RU':'en-US'});
    await context.addInitScript(value=>localStorage.setItem('portal-life.locale',value),lang);
    const page=await context.newPage();
    const exceptions=[];
    page.on('pageerror',e=>exceptions.push(String(e)));
    await page.goto(base,{waitUntil:'networkidle'});
    await page.locator('#language-toggle').waitFor();
    assert.equal(await page.locator('html').getAttribute('lang'),lang,'HTML locale '+lang);
    const toggle=page.locator('#language-toggle');
    assert.ok(await toggle.isVisible(),'language toggle visible '+lang);
    const modalTrigger=page.locator('[data-panel]').first();
    await modalTrigger.focus();
    assert.equal(await modalTrigger.evaluate(el=>document.activeElement===el),true,'keyboard focus reaches menu trigger '+lang);
    await modalTrigger.press('Enter');
    const modal=page.locator('[role="dialog"][aria-modal="true"]');
    await modal.waitFor();
    assert.ok((await modal.getAttribute('aria-label'))?.trim(),'localized modal accessible name '+lang);
    const close=modal.locator('#close');
    assert.equal(await close.evaluate(el=>document.activeElement===el),true,'focus moved into modal '+lang);
    assert.ok((await close.getAttribute('aria-label'))?.trim(),'close accessible label '+lang);
    await page.keyboard.press('Escape');
    assert.equal(await modal.count(),0,'Escape closes modal '+lang);
    const visuals=await page.locator('img').evaluateAll(nodes=>nodes.map(n=>({alt:n.getAttribute('alt'),src:n.getAttribute('src')})));
    for(const visual of visuals)assert.ok(visual.alt?.trim(),'missing image alt '+lang+': '+visual.src);
    const captions=await page.locator('figcaption,.media-caption').allTextContents();
    for(const caption of captions)assert.ok(caption.trim(),'empty rendered caption '+lang);
    assert.deepEqual(exceptions,[],'browser JS errors '+lang);
    console.log(JSON.stringify({locale:lang,result:'PASS',imagesChecked:visuals.length,captionsChecked:captions.length,modalAria:true,focus:true,escape:true}));
    await context.close();
  }
}finally{await browser?.close();server.kill();}

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
    await page.locator('[data-panel="menu"]').first().waitFor();
    assert.equal(await page.locator('html').getAttribute('lang'),lang,'HTML locale '+lang);
    const modalTrigger=page.locator('[data-panel="menu"]').first();
    await modalTrigger.focus();
    assert.equal(await modalTrigger.evaluate(el=>document.activeElement===el),true,'keyboard focus reaches menu trigger '+lang);
    await modalTrigger.press('Enter');
    const modal=page.locator('[role="dialog"][aria-modal="true"]');
    await modal.waitFor();
    const toggle=modal.locator('#language-toggle');
    assert.ok(await toggle.isVisible(),'language toggle visible inside menu '+lang);
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
    // Positive caption fixture: mount a real published caption-bearing media slot on the
    // initial location in a browser-only content response (no production mutation).
    const captionPage=await context.newPage();
    await captionPage.addInitScript(()=>localStorage.setItem('portal-life.presentation.animations','off'));
    let captionSource='';
    await captionPage.route('**/content.json',async route=>{
      const response=await route.fetch();
      const data=await response.json();
      const slots=data.presentation?.slots??{};
      const localized=data.localization?.strings??{};
      const found=Object.entries(slots).find(([id,slot])=>{
        const key=slot?.static?.altKey;
        return slot?.static?.kind==='image'&&typeof key==='string'&&key.endsWith('.alt')&&
          localized[key]?.[lang]?.trim()&&localized[key.slice(0,-4)+'.caption']?.[lang]?.trim();
      });
      assert.ok(found,'at least one real published localized captioned image slot '+lang);
      captionSource=found[0];
      slots['location/town/default']=structuredClone(found[1]);
      await route.fulfill({response,body:JSON.stringify(data),headers:{...response.headers(),'content-type':'application/json'}});
    });
    await captionPage.goto(base,{waitUntil:'networkidle'});
    const captionNode=captionPage.locator('.media-window .media-caption');
    await captionNode.waitFor();
    assert.ok((await captionNode.textContent())?.trim(),'rendered caption '+lang);
    const captionImage=captionPage.locator('.media-window img[aria-describedby]');
    assert.ok(await captionImage.count(),'media image references its caption '+lang);
    assert.equal(await captionImage.getAttribute('aria-describedby'),await captionNode.getAttribute('id'),'ARIA caption reference '+lang);
    assert.ok((await captionImage.getAttribute('alt'))?.trim(),'localized alt on captioned image '+lang);
    console.log(JSON.stringify({locale:lang,captionBranch:'PASS',sourceSlot:captionSource,renderedCaptions:1}));
    await captionPage.close();
    assert.deepEqual(exceptions,[],'browser JS errors '+lang);
    console.log(JSON.stringify({locale:lang,result:'PASS',imagesChecked:visuals.length,captionsChecked:captions.length,modalAria:true,focus:true,escape:true}));
    await context.close();
  }
}finally{await browser?.close();server.kill();}

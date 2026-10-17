/* Browser acceptance for the real wide farm brain-return scene, not a demo. */
import {chromium} from 'playwright-core';
import {access,mkdir} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
let executablePath;
for(const p of ['/usr/bin/google-chrome','/usr/bin/google-chrome-stable','/usr/bin/chromium','/snap/bin/chromium']){
 try{await access(p);executablePath=p;break;}catch{}
}
if(!executablePath)throw Error('Chrome/Chromium required for visual acceptance');
const browser=await chromium.launch({headless:true,executablePath,args:['--no-sandbox','--allow-file-access-from-files']});
try{
 const page=await browser.newPage({viewport:{width:1560,height:950},deviceScaleFactor:1});
 page.on('pageerror',err=>{console.error(err);process.exitCode=1;});
 await page.goto(pathToFileURL(resolve(root,'index.html')).href,{waitUntil:'load'});
 await page.waitForFunction(()=>document.querySelector('#game')?.dataset.ready==='yes');
 await page.evaluate(()=>{
  state.activeGame=true;
  state.settings.soundEnabled=false;
  state.sceneId='undead-farm-work';
  state.run.farmOwnerMet=true;
  state.run.farmBrainsMet=true;
  state.run.zombieBrainSearchUnlocked=true;
  state.run.zombieBrainFound=true;
  state.run.energy=3;
  state.run.farmShifts=17;
  state.character.stats.endurance=22;
  state.character.stats.reason=22;
  state.character.stats.magic=10;
  state.run.farmLastShift=null;
  render();
 });
 await page.locator('[data-action-id="undead-farm-start"]').click();
 const before=await page.evaluate(()=>({scene:state.sceneId,gold:state.run.gold,energy:state.run.energy,
  shifts:state.run.farmShifts,found:state.run.zombieBrainFound,pending:state.run.farmBrainHandoverPending,
  trained:state.run.farmBrainReturned}));
 if(before.scene!=='undead-farm-brain-return'||!before.pending||!before.found||before.trained||before.shifts!==18)
  throw Error('Paid shift failed to open brain handover: '+JSON.stringify(before));
 const img=page.locator('.farm-brain-return-scene .story-image');
 await img.waitFor({state:'visible'});
 const dims=await img.evaluate(el=>({width:el.naturalWidth,height:el.naturalHeight,objectFit:getComputedStyle(el).objectFit,
  drawnWidth:el.getBoundingClientRect().width,drawnHeight:el.getBoundingClientRect().height}));
 if(dims.width!==1672||dims.height!==941||dims.objectFit!=='contain')
  throw Error('Wide image was missing or cropped: '+JSON.stringify(dims));
 const text=await page.locator('.farm-brain-return-scene .story-text').textContent();
 if(text.length<1500||!text.includes('Сударыня!')||!text.includes('литературного слога')||!text.endsWith('удалился по своим делам.'))
  throw Error('Missing or shortened authored dialogue');
 const file=resolve(root,'previews/undead-farm-brain-return.png');
 await mkdir(dirname(file),{recursive:true});
 await page.locator('.farm-brain-return-scene').evaluate(el=>{
  el.style.height='auto';el.style.overflow='visible';
  document.querySelector('#game').style.height='auto';
  document.body.style.overflow='auto';
 });
 await page.screenshot({path:file,fullPage:true,animations:'disabled'});
 await page.locator('[data-action-id="undead-farm-brain-return-next"]').click();
 const after=await page.evaluate(()=>({scene:state.sceneId,gold:state.run.gold,energy:state.run.energy,
  shifts:state.run.farmShifts,found:state.run.zombieBrainFound,pending:state.run.farmBrainHandoverPending,
  trained:state.run.farmBrainReturned,saved:JSON.parse(localStorage.getItem('suslik2.save.v1')).activeRun?.run.farmBrainReturned}));
 if(after.scene!=='undead-farm-work'||after.gold!==before.gold||after.energy!==before.energy||
    after.shifts!==before.shifts||after.found||after.pending||!after.trained||!after.saved)
  throw Error('Brain was not consumed exactly once at Next: '+JSON.stringify(after));
 await page.locator('[data-action-id="undead-farm-return"]').click();
 await page.locator('[data-action-id="map-inventory"]').click();
 const inv=await page.locator('dialog.info-dialog').textContent();
 if(inv.includes('Мозг зомби'))throw Error('Brain incorrectly remains in inventory');
 await page.locator('[data-action-id="info-close"]').click();
 await page.locator('[data-action-id="map-sleep"]').click();
 await page.locator('[data-action-id="sleep-zombie-study"]').waitFor({state:'visible'});
 await page.locator('[data-action-id="sleep-zombie-study"]').click();
 const modal=await page.locator('dialog.info-dialog').textContent();
 if(!modal.includes('Сцена обучения будет добавлена позднее'))throw Error('Unspecified training behavior was invented');
 console.log('Browser PASS: paid farm shift -> wide authored image and long text -> Next consumes brain -> night study unlocked; screenshot='+file);
}finally{await browser.close();}

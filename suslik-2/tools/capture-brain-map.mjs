/* QA-only screenshot of the real index.html map; not included by the game. */
import {chromium} from 'playwright-core';
import {access,mkdir} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const candidates=['/usr/bin/google-chrome','/usr/bin/google-chrome-stable','/usr/bin/chromium','/snap/bin/chromium'];
let executablePath;
for(const path of candidates){try{await access(path);executablePath=path;break;}catch{}}
if(!executablePath)throw new Error('Chrome/Chromium is required for the actual map screenshot.');
const browser=await chromium.launch({headless:true,executablePath,args:['--no-sandbox','--allow-file-access-from-files']});
try{
 const page=await browser.newPage({viewport:{width:1760,height:1200},deviceScaleFactor:1});
 page.on('pageerror',error=>{console.error(error);process.exitCode=1;});
 await page.goto(pathToFileURL(resolve(root,'index.html')).href,{waitUntil:'load'});
 await page.waitForFunction(()=>document.querySelector('#game')?.dataset.ready==='yes');
 await page.evaluate(()=>{
   state.settings.soundEnabled=false;
   state.activeGame=true;
   state.run.farmBrainsMet=true;
   state.run.zombieBrainSearchUnlocked=true;
   state.run.zombieBrainFound=false;
   state.run.farmShifts=15;
   state.run.farmOwnerMet=true;
   state.run.elapsedDays=5;
   state.run.gold=620;
   state.run.energy=1;
   state.sceneId='game-main';
   render();
 });
 await page.locator('[data-pickup-id="zombie-brain"]').waitFor({state:'visible'});
 // Fullscreen belongs to the game menu alongside audio settings, never on the map.
 if(await page.locator('[data-action-id="map-fullscreen"]').count())throw Error('Duplicate fullscreen button on map.');
 await page.locator('[data-action-id="map-menu"]').click();
 if(await page.locator('dialog.game-menu [data-action-id="menu-settings"]').count()!==1)
   throw Error('Audio settings missing in game menu.');
 if(await page.locator('dialog.game-menu [data-action-id="menu-fullscreen"]').count()!==1)
   throw Error('Fullscreen button missing in game menu.');
 await page.locator('dialog.game-menu [data-action-id="menu-close"]').click();
 const loaded=await page.evaluate(async()=>{
  const source=window.SUSLIK2_CONTENT.map;
  const paths=[source.background,...source.locations.filter(loc=>source.initialVisible.includes(loc.id)).map(loc=>loc.image)];
  return Promise.all(paths.map(src=>new Promise(resolve=>{
   const im=new Image();im.onload=()=>resolve({src,ok:true});im.onerror=()=>resolve({src,ok:false});im.src=src;
  })));
 });
 if(loaded.some(x=>!x.ok))throw Error('Map art failed to load: '+JSON.stringify(loaded.filter(x=>!x.ok)));
 await page.waitForTimeout(400);
 const out=resolve(root,'previews/zombie-brain-map.png');
 await mkdir(dirname(out),{recursive:true});
 await page.screenshot({path:out,fullPage:true,animations:'disabled'});
 const pickup=await page.locator('[data-pickup-id="zombie-brain"]').boundingBox();
 console.log('Captured real SUSLIK 2 map',out,'brain button:',JSON.stringify(pickup));
 const sceneText=await page.locator('.game-map-title').textContent();
 if(!sceneText)throw Error('Map was not rendered');
 // Browser end-to-end check: the actual SVG click must remove the find,
 // persist the unique pickup, and show it in the standard inventory dialog.
 await page.locator('[data-action-id="map-zombie-brain"]').click();
 if(await page.locator('[data-action-id="map-zombie-brain"]').count()!==0)
   throw Error('Collected brain is still on the map.');
 const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('suslik2.save.v1')).activeRun?.run);
 if(saved?.zombieBrainFound!==true)throw Error('Zombie brain was not persisted.');
 await page.locator('[data-action-id="map-inventory"]').click();
 const inventory=await page.locator('dialog.info-dialog').textContent();
 if(!inventory?.includes('Мозг зомби: 1'))throw Error('Zombie brain missing from inventory: '+inventory);
 console.log('Browser pickup and inventory check passed.');
}finally{await browser.close();}

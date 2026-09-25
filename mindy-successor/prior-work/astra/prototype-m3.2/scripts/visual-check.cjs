// Isolated, offscreen Electron renderer check. Never loads the player's desktop save directory.
const {app,BrowserWindow}=require('electron');const path=require('node:path'),fs=require('node:fs');
app.setPath('userData',path.resolve('.cache/visual-'+Date.now()));
app.commandLine.appendSwitch('disable-gpu');app.commandLine.appendSwitch('ozone-platform','headless');
const delay=ms=>new Promise(r=>setTimeout(r,ms));
app.whenReady().then(async()=>{try{
 const w=new BrowserWindow({width:1280,height:800,show:false,webPreferences:{offscreen:true,backgroundThrottling:false,contextIsolation:true,nodeIntegration:false}});
 w.webContents.on('console-message',(_e,_level,msg)=>console.log('PAGE',msg));await w.loadFile(path.resolve('dist/index.html'));w.webContents.debugger.attach('1.3');
 const viewport=async(width,height)=>{await w.webContents.debugger.sendCommand('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:false});await delay(150);};
 const run=code=>w.webContents.executeJavaScript(code);
 const shot=async name=>{await delay(200);const data=await w.webContents.debugger.sendCommand('Page.captureScreenshot',{captureBeyondViewport:false});fs.writeFileSync(`test-artifacts/${name}.png`,Buffer.from(data.data,'base64'));};
 const click=async selector=>{console.log('CLICK',selector);await run(`(()=>{const b=document.querySelector(${JSON.stringify(selector)});if(!b)throw new Error('Missing '+${JSON.stringify(selector)}+' in '+document.body.innerText);b.click();})()`);await delay(90);};
 fs.mkdirSync('test-artifacts',{recursive:true});await viewport(1280,800);await delay(400);await shot('creation');
 for(let i=0;i<10;i++)await click('[data-stat="lust"][data-delta="1"]');
 await click('#create');await click('[data-action="arrival"]');await click('[data-choice="home"]');await click('#home');await shot('town');
 const results=[];const measure=async label=>{const m=await run(`JSON.stringify({width:innerWidth,height:innerHeight,scrollWidth:document.documentElement.scrollWidth,scrollHeight:document.documentElement.scrollHeight,brokenImages:[...document.images].filter(i=>!i.complete||!i.naturalWidth).length,mediaWindows:document.querySelectorAll('.media-window').length})`);const item={label,...JSON.parse(m)};results.push(item);if(item.scrollHeight>item.height||item.scrollWidth>item.width||item.brokenImages)throw new Error(JSON.stringify(item));};
 for(const [x,y] of [[1280,800],[960,640],[1920,1080],[850,640]]){await viewport(x,y);await measure('town');}
 await viewport(1280,800);await click('[data-panel="work"]');await shot('jobs');await click('[data-action="lumber"]');await shot('event');await click('[data-choice="learn"]');await shot('working');await measure('working');
 // Force a reproducible event roll in the isolated test profile, not the game code.
 await run(`(()=>{const s=JSON.parse(localStorage.getItem('portal-life.v1'));s.run.rng=2000;localStorage.setItem('portal-life.v1',JSON.stringify(s));})()`);
 await w.reload();await delay(500);await click('[data-action="lumber"]');await shot('goblin');await click('[data-choice="flirt"]');await shot('alternative');await measure('alternative');
 await viewport(960,640);await measure('alternative-small');await click('[data-panel="sleep"]');await shot('night');
 fs.writeFileSync('test-artifacts/visual-report.json',JSON.stringify(results,null,2));console.log('VISUAL OK '+JSON.stringify(results));app.quit();
 }catch(e){console.error(e);app.exit(1);}});

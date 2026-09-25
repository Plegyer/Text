const {app,BrowserWindow,ipcMain,session}=require('electron');
const path=require('node:path');const fs=require('node:fs');const {pathToFileURL}=require('node:url');
const {createStore}=require('./save-store.cjs');
const {parseSave,loadCatalog}=require('../dist/save-validator.cjs');
const raw=JSON.parse(fs.readFileSync(path.join(__dirname,'../dist/content.json'),'utf8'));
const catalog=loadCatalog(raw.definitions,raw.packs);let win,store;
const entry=pathToFileURL(path.join(__dirname,'../dist/index.html')).href;
function allowed(event){if(!win||event.sender!==win.webContents||event.senderFrame!==win.webContents.mainFrame||event.senderFrame.url!==entry)throw new Error('Unknown sender');}
app.whenReady().then(()=>{
  store=createStore(path.join(app.getPath('userData'),'saves'),text=>parseSave(text,catalog));
  session.defaultSession.setPermissionRequestHandler((_w,_p,callback)=>callback(false));
  ipcMain.handle('game:load',event=>{allowed(event);return store.read();});
  ipcMain.handle('game:save',(event,text)=>{allowed(event);return store.save(text);});
  win=new BrowserWindow({width:1320,height:900,minWidth:850,minHeight:640,backgroundColor:'#f6f0e4',webPreferences:{preload:path.join(__dirname,'preload.cjs'),contextIsolation:true,nodeIntegration:false,sandbox:true}});
  win.removeMenu();win.webContents.setWindowOpenHandler(()=>({action:'deny'}));
  win.webContents.on('will-navigate',event=>event.preventDefault());win.loadURL(entry);
});
app.on('window-all-closed',()=>app.quit());
let quitting=false;
app.on('before-quit',event=>{if(store&&!quitting){event.preventDefault();quitting=true;store.flush().finally(()=>app.quit());}});

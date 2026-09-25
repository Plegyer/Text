const {contextBridge,ipcRenderer}=require('electron');
contextBridge.exposeInMainWorld('gameStorage',{
  load:()=>ipcRenderer.invoke('game:load'),
  save:text=>ipcRenderer.invoke('game:save',text)
});

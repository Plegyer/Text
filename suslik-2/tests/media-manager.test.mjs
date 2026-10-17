import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {runInNewContext} from 'node:vm';
const src=async name=>readFile(new URL('../'+name,import.meta.url),'utf8');
const [catalogSource,manager,index,content,installer,stateSource,managedSource,launcher]=await Promise.all([
 'content/media-manager-slots.json','tools/media-manager.ps1','index.html','gameplay-content.js',
 'INSTALL OR UPDATE SUSLIK 2.cmd','content/media-manager-state.json','content/media-manager.local.js',
 'MEDIA MANAGER.cmd'
].map(src));
const entries=JSON.parse(catalogSource).events;
test('Windows media manager has event catalog, stable labels and no audio formats',()=>{
 assert.equal(entries.length,3);
 assert.equal(entries.find(x=>x.id==='goblin-permission').maxFiles,5);
 assert.equal(entries.find(x=>x.id==='sawmill-lust').maxFiles,20);
 assert.equal(entries.find(x=>x.id==='undead-farm-night-learning').connected,false);
 assert.ok(new Set(entries.map(x=>x.id)).size===entries.length);
 assert.ok(new Set(entries.map(x=>x.key)).size===entries.length);
 assert.match(launcher,/media-manager\.ps1/i);
 assert.match(manager,/Add-Type -AssemblyName System\.Windows\.Forms/);
 assert.match(manager,/FileNames/);
 assert.match(manager,/Выше/);
 assert.match(manager,/Ниже/);
 assert.match(manager,/Опубликовать в GitHub/);
 assert.match(manager,/\.webp/);
 assert.match(manager,/\.mp4/);
 assert.doesNotMatch(manager,/\.mp3|\.wav|\.ogg/);
 assert.deepEqual(JSON.parse(stateSource),{});
 assert.match(managedSource,/window\.SUSLIK2_MANAGED_MEDIA = \{\};/);
 assert.match(index,/content\/media-manager\.published\.js/);
 assert.match(content,/SUSLIK2_PUBLISHED_MEDIA/);
});
test('managed media loads before authored scene definitions without replacing old legacy imports',()=>{
 const lines=index.split('\n');
 const position=x=>lines.findIndex(l=>l.includes('src="'+x+'"'));
 assert.ok(position('content/media-manager.local.js')>position('content/user-media-lust.local.js'));
 assert.ok(position('content/media-manager.local.js')<position('gameplay-content.js'));
 assert.match(installer,/media-manager\.local\.js/);
 assert.match(installer,/media-manager-state\.json/);
 assert.match(installer,/user-media-lust\.local\.js/);
 const legacy={farGoblinPermission:['assets/old.png'],sawmill:['assets/old.gif']};
 const context={window:{
   SUSLIK2_USER_MEDIA:{farGoblinPermission:legacy.farGoblinPermission},
   SUSLIK2_USER_LUST_MEDIA:{sawmill:legacy.sawmill},
   SUSLIK2_MANAGED_MEDIA:{}
 }};
 runInNewContext(content,context);
 assert.equal(context.window.SUSLIK2_GAMEPLAY_CONTENT.permissionMedia[0].file,legacy.farGoblinPermission[0]);
 assert.equal(context.window.SUSLIK2_GAMEPLAY_CONTENT.lustMedia[0].file,legacy.sawmill[0]);
 const managed={window:{
   SUSLIK2_USER_MEDIA:{farGoblinPermission:legacy.farGoblinPermission},
   SUSLIK2_USER_LUST_MEDIA:{sawmill:legacy.sawmill},
   SUSLIK2_MANAGED_MEDIA:{
     farGoblinPermission:['assets/user-media/manager/goblin-permission/slot-01.png'],
     sawmillLust:['assets/user-media/manager/sawmill-lust/slot-01.mp4']
   }
 }};
 runInNewContext(content,managed);
 assert.equal(managed.window.SUSLIK2_GAMEPLAY_CONTENT.permissionMedia[0].file,managed.window.SUSLIK2_MANAGED_MEDIA.farGoblinPermission[0]);
 assert.equal(managed.window.SUSLIK2_GAMEPLAY_CONTENT.lustMedia[0].file,managed.window.SUSLIK2_MANAGED_MEDIA.sawmillLust[0]);
 assert.equal(managed.window.SUSLIK2_GAMEPLAY_CONTENT.permissionMedia[1].file,null);
 assert.equal(managed.window.SUSLIK2_GAMEPLAY_CONTENT.lustMedia[1].file,null);
});
test('future farm media can be staged without changing night rules or writing invented scenes',async()=>{
 const ui=await src('gameplay-ui.js');
 const sceneDefs=JSON.parse(await src('content/scenes.json'));
 assert.ok(!Object.hasOwn(sceneDefs.scenes,'undead-farm-night-learning'));
 assert.doesNotMatch(ui,/SUSLIK2_MANAGED_MEDIA/);
 assert.match(manager,/Read-MediaState/);
 assert.match(manager,/Install-Slot/);
 assert.match(manager,/Move-Item/);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const root=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const fixture=JSON.parse(readFileSync('content/global-ui-shell-localization-production-v2.fixture.json','utf8'));
const app=readFileSync('src/ui/app.ts','utf8');

test('remaining global UI shell v2 production fixture is fully merged RU EN',()=>{
 const entries=Object.entries(fixture.strings as Record<string,{ru:string;en:string}>);
 assert.equal(entries.length,108);
 for(const [key,value] of entries){
  assert.deepEqual(root[key],value,key);
  assert.ok(value.ru.trim(),key+' ru');
  assert.ok(value.en.trim(),key+' en');
 }
 assert.equal(root['ui.activity.enduranceLabel'],undefined);
 assert.ok(root['stat.endurance.label']);
});

test('remaining global UI shell v2 wires high-value player-facing consumers',()=>{
 const keys=[
  'ui.creation.eyebrow','ui.creation.title','ui.creation.body','ui.creation.heroineTitle','ui.creation.freePoints','ui.creation.startButton',
  'ui.menu.exportSave','ui.menu.importSave','ui.menu.editor','ui.menu.animationToggle','ui.menu.restart','ui.menu.footer',
  'ui.confirm.acceptEnding','ui.confirm.restart','ui.confirm.loadSave',
  'ui.save.fileTooLarge','ui.save.loaded','ui.save.importFailed','ui.save.backupRecovered','ui.save.noHealthyBackup','ui.save.loadStopped',
  'ui.presentation.saved','ui.presentation.customLoadFailed','ui.app.catalogLoadFailed','ui.app.startFailed',
  'ui.activity.eyebrow','ui.activity.progressLabel','ui.activity.checkpointLabel','ui.activity.routeLabel','ui.media.missing'
 ];
 for(const key of keys)assert.ok(app.includes(key),key);
 assert.ok(app.includes("const seasonLabel=(id:string,fallback:string)=>tr("));
 assert.ok(app.includes("season.${id}.label"));
 for(const season of ['spring','summer','autumn','winter'])assert.ok(root['season.'+season+'.label']);
 assert.ok(app.includes("tr('stat.endurance.label'"));
});

test('global UI shell v2 remains presentation-only',()=>{
 assert.equal(fixture.invariants.presentationOnly,true);
 assert.equal(fixture.invariants.gameplayIdsIncluded,false);
 assert.equal(fixture.invariants.mechanicsFieldsIncluded,false);
 assert.equal(fixture.invariants.changesSaveState,false);
});

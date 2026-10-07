import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings as Record<string,{ru:string;en:string}>;

const v42Keys=[
  'ui.strongMeta.title',
  'ui.strongMeta.help',
  'ui.strongMeta.automaticKnowledgeNote',
  'ui.strongMeta.keystoneTitle',
  'ui.strongMeta.specialistTitle',
  'ui.strongMeta.selected',
  'ui.strongMeta.available',
  'ui.strongMeta.select',
  'ui.strongMeta.remove',
  'ui.strongMeta.keystoneCapacity',
  'ui.strongMeta.specialistCapacity',
  'ui.strongMeta.noneKeystones',
  'ui.strongMeta.noneSpecialists'
] as const;

const modalKeys=[
  'ui.work.title',
  'ui.school.title',
  'ui.explore.title',
  'ui.sleep.title',
  'ui.panel.stats',
  'ui.panel.journal',
  'ui.bag.title',
  'ui.panel.legacy',
  'ui.menu.editor',
  'ui.menu.catalogInspector',
  'ui.menu.title'
] as const;

test('v42-v43 focused localization rows have RU/EN parity',()=>{
  for(const key of [...v42Keys,...modalKeys]){
    const entry=localization[key];
    assert.ok(entry,key+' must exist');
    assert.ok(entry.ru.trim(),key+' RU must be non-empty');
    assert.ok(entry.en.trim(),key+' EN must be non-empty');
  }
});

test('v43 source no longer binds the generic dialog accessible name to the raw panel id',()=>{
  const app=readFileSync('src/ui/app.ts','utf8');
  assert.match(app,/aria-label="\$\{esc\(panelAccessibleName\(panel\)\)\}"/);
  assert.doesNotMatch(app,/aria-label="\$\{esc\(panel\)\}"/);
  assert.match(app,/case 'catalog':return tr\('ui\.menu\.catalogInspector'/);
});

test('v42 source wires only existing Strong Meta commands and keeps Hard Work as a separate creation section',()=>{
  const app=readFileSync('src/ui/app.ts','utf8');
  assert.match(app,/data-strong-meta-selector="true"/);
  assert.match(app,/type:'setStrongMetaKeystone'/);
  assert.match(app,/type:'setStrongMetaSpecialist'/);
  assert.match(app,/Object\.values\(strongMetaRegistry\)/);
  assert.match(app,/reward\.lifecycle==='active'&&owned\.has\(reward\.id\)/);
  assert.match(app,/\$\{hardWorkNewStartHTML\(\)\}\$\{strongMetaNewStartHTML\(\)\}/);
});

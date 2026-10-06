import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;

const literalUi={
  'ui.condition.schoolCounter':{
    ru:'Школа {track}: {counter} {comparison}',
    en:'School {track}: {counter} {comparison}'
  },
  'ui.activity.fieldTimeLabel':{ru:'Полевое время',en:'Field time'},
  'ui.activity.miniGameLabel':{ru:'Мини-игра',en:'Mini-game'},
  'ui.activity.suspicionLabel':{ru:'Подозрение',en:'Suspicion'}
} as const;

const permanentUnlockLabels={
  'unlock.satyr-maid.clear-terms.label':{ru:'Чёткие условия',en:'Clear Terms'},
  'unlock.knowledge.undead-farm.anomaly-catalog.label':{ru:'Каталог аномалий',en:'Anomaly Catalog'},
  'unlock.knowledge.tavern.broker-index.label':{ru:'Справочник посредника',en:'Broker Index'},
  'unlock.knowledge.hunter.warden-signs.label':{ru:'Знаки хранителя',en:'Warden Signs'},
  'unlock.knowledge.hunter.legend-contracts.label':{ru:'Легендарные контракты',en:'Legend Contracts'},
  'unlock.unlock.guard.command-briefing.label':{ru:'Командный инструктаж',en:'Command Briefing'},
  'unlock.unlock.guard.reform-practice.label':{ru:'Практика реформ',en:'Reform Practice'},
  'unlock.unlock.guard.casebook-index.label':{ru:'Указатель дел',en:'Casebook Index'},
  'unlock.unlock.merchant.house-supplier.label':{ru:'Поставщик дома',en:'House Supplier'},
  'unlock.unlock.merchant.patron-destinations.label':{ru:'Направления покровителя',en:'Patron Destinations'},
  'unlock.unlock.artist.master-repertoire.label':{ru:'Репертуар мастера',en:'Master Repertoire'},
  'unlock.unlock.artist.court-context.label':{ru:'Придворный контекст',en:'Court Context'},
  'unlock.unlock.assassin.refusal-protocol.label':{ru:'Протокол отказа',en:'Refusal Protocol'},
  'unlock.unlock.prostitute.elite-protocol.label':{ru:'Элитный протокол',en:'Elite Protocol'},
  'unlock.secret-debt.paid-freedom.earned-reserve-match.label':{ru:'Паритет заработанного резерва',en:'Earned Reserve Match'},
  'unlock.secret-debt.bound-life.work-rhythm.label':{ru:'Рабочий ритм',en:'Work Rhythm'},
  'unlock.secret-debt.takeover.network-retainer.label':{ru:'Сетевой гонорар',en:'Network Retainer'}
} as const;

test('v40 closes all four accepted literal UI fallback gaps in RU and EN',()=>{
  assert.equal(Object.keys(literalUi).length,4);
  for(const [key,expected] of Object.entries(literalUi)){
    assert.deepEqual(localization[key],expected,key);
    assert.ok(localization[key].ru.trim(),key+' ru');
    assert.ok(localization[key].en.trim(),key+' en');
  }
});

test('v40 gives every audited permanent unlock a human-readable bilingual label',()=>{
  assert.equal(Object.keys(permanentUnlockLabels).length,17);
  for(const [key,expected] of Object.entries(permanentUnlockLabels)){
    assert.deepEqual(localization[key],expected,key);
    assert.ok(localization[key].ru.trim(),key+' ru');
    assert.ok(localization[key].en.trim(),key+' en');
    assert.notEqual(localization[key].ru,key,key+' ru raw-key leak');
    assert.notEqual(localization[key].en,key,key+' en raw-key leak');
  }
});

test('v40 preserves the current D40 generic consumer contract without renaming reward IDs',()=>{
  const stableIds=[
    'unlock.guard.command-briefing',
    'unlock.guard.reform-practice',
    'unlock.guard.casebook-index',
    'unlock.merchant.house-supplier',
    'unlock.merchant.patron-destinations',
    'unlock.artist.master-repertoire',
    'unlock.artist.court-context',
    'unlock.assassin.refusal-protocol',
    'unlock.prostitute.elite-protocol'
  ];
  for(const id of stableIds){
    const consumerKey=`unlock.${id}.label`;
    assert.ok(localization[consumerKey]?.ru?.trim(),consumerKey+' ru');
    assert.ok(localization[consumerKey]?.en?.trim(),consumerKey+' en');
  }
});

test('v40 Secret Debt locked reward identities remain exact in EN',()=>{
  assert.equal(localization['unlock.secret-debt.paid-freedom.earned-reserve-match.label'].en,'Earned Reserve Match');
  assert.equal(localization['unlock.secret-debt.bound-life.work-rhythm.label'].en,'Work Rhythm');
  assert.equal(localization['unlock.secret-debt.takeover.network-retainer.label'].en,'Network Retainer');
});

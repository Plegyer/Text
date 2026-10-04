import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const definitions=JSON.parse(readFileSync('content/definitions.json','utf8'));
const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;

const canonicalIds=[
  'ending.lumber.hard-work',
  'ending.satyr-maid.hard-work',
  'ending.undead-farm.hard-work',
  'ending.tavern.hard-work',
  'ending.hunter.hard-work',
  'ending.guard.hard-work',
  'ending.merchant.hard-work',
  'ending.artist-geisha.hard-work',
  'ending.assassin.hard-work',
  'ending.prostitute.hard-work',
  'ending.lumber.forewoman',
  'ending.lumber.forest',
  'ending.satyr-maid.house-power',
  'ending.satyr-maid.personal-network',
  'ending.satyr-maid.boundary-mastery',
  'ending.undead-farm.research-farmer',
  'ending.undead-farm.successor',
  'ending.undead-farm.external-anomaly',
  'ending.tavern.innkeeper',
  'ending.tavern.information-broker',
  'ending.tavern.sanctuary',
  'ending.hunter.master-hunter',
  'ending.hunter.warden',
  'ending.hunter.legend',
  'ending.guard.officer',
  'ending.guard.reform',
  'ending.guard.network',
  'ending.guard.major-case',
  'ending.merchant.house',
  'ending.merchant.speculator-smuggler',
  'ending.merchant.patron-of-routes',
  'ending.artist-geisha.master-artist',
  'ending.artist-geisha.patron-network',
  'ending.artist-geisha.court-invitation',
  'ending.assassin.ghost',
  'ending.assassin.handler-takeover',
  'ending.assassin.refusal-turncoat',
  'ending.prostitute.independent-house',
  'ending.prostitute.elite-clientele',
  'ending.prostitute.network-protection'
] as const;

const d40Ids=[
  'ending.guard.officer',
  'ending.guard.reform',
  'ending.guard.network',
  'ending.guard.major-case',
  'ending.merchant.house',
  'ending.merchant.speculator-smuggler',
  'ending.merchant.patron-of-routes',
  'ending.artist-geisha.master-artist',
  'ending.artist-geisha.patron-network',
  'ending.artist-geisha.court-invitation',
  'ending.assassin.ghost',
  'ending.assassin.handler-takeover',
  'ending.assassin.refusal-turncoat',
  'ending.prostitute.independent-house',
  'ending.prostitute.elite-clientele',
  'ending.prostitute.network-protection'
] as const;

function bilingual(key:string){
  const row=localization[key];
  assert.ok(row,key);
  assert.ok(row.ru?.trim(),key+' ru');
  assert.ok(row.en?.trim(),key+' en');
  return row;
}

test('v26 gives all 40 canonical ordinary-career endings bilingual title description and epilogue',()=>{
  assert.equal(canonicalIds.length,40);
  for(const id of canonicalIds){
    assert.ok(definitions.endings.some((ending:any)=>ending.id===id),id);
    bilingual(`ending.${id}.title`);
    bilingual(`ending.${id}.description`);
    bilingual(`ending.${id}.epilogue`);
  }
});

test('v26 gives all 16 D40 advanced endings final bilingual copy without leaking D49 late terms',()=>{
  const forbidden=/\b(?:Threshold Archive|Threshold|Palace Concordance)\b|\b(?:Архив Порога|Порог|Дворцовый Свод)\b/i;
  for(const id of d40Ids){
    for(const field of ['title','description','epilogue'] as const){
      const row=bilingual(`ending.${id}.${field}`);
      assert.doesNotMatch(row.ru,forbidden,`${id} ${field} ru`);
      assert.doesNotMatch(row.en,forbidden,`${id} ${field} en`);
    }
  }
});

test('v26 preserves the four already-localized D41 epilogues and closes the other ten',()=>{
  const ids=[
    'ending.satyr-maid.house-power',
    'ending.satyr-maid.boundary-mastery',
    'ending.undead-farm.research-farmer',
    'ending.undead-farm.successor',
    'ending.lumber.forewoman',
    'ending.lumber.forest',
    'ending.satyr-maid.personal-network',
    'ending.undead-farm.external-anomaly',
    'ending.tavern.innkeeper',
    'ending.tavern.information-broker',
    'ending.tavern.sanctuary',
    'ending.hunter.master-hunter',
    'ending.hunter.warden',
    'ending.hunter.legend'
  ];
  assert.equal(ids.length,14);
  for(const id of ids)bilingual(`ending.${id}.epilogue`);
});

test('v26 localizes live generic prototype epilogues but leaves lumber-stay policy untouched',()=>{
  bilingual('ending.guild-life.epilogue');
  bilingual('ending.scholar-life.epilogue');
  assert.equal(localization['ending.lumber-stay.epilogue'],undefined);
});

test('v26 repairs Merchant route meaning and consequence parity',()=>{
  const expected:Record<string,string>={
    'event.merchant.career.choose-route.choice.veteran.text':
      'Выбрать путь опытной обычной торговли без перехода в одну из продвинутых сетевых веток.',
    'event.merchant.career.choose-route.choice.speculator-smuggler.text':
      'Выбрать готовность к конкретному высокому риску без шкалы морали и без общей системы закона или преступности.',
    'event.merchant.routes.house-ready.choice.record.text':
      'Сохранить готовность Торгового дома наряду с другими готовыми маршрутами торговки.',
    'event.merchant.routes.speculator-ready.choice.record.text':
      'Сохранить готовность пути Спекулянта / Контрабандиста наряду с другими готовыми маршрутами торговки.',
    'event.merchant.routes.patron-ready.choice.record.text':
      'Сохранить готовность Покровительницы маршрутов наряду с другими готовыми маршрутами торговки.',
    'event.merchant.relationship.trust.choice.continue.text':
      'Укрепить профессиональное доверие ещё одной передачей, которую можно проверить.',
    'event.merchant.items.appraisal-scales.choice.defer.text':
      'Отложить оценочные весы; обычная работа торговки остаётся доступной.',
    'event.merchant.items.manifest-case.choice.defer.text':
      'Отложить футляр для накладных; карьеру можно продолжать без этого необязательного инструмента.',
    'event.merchant.items.sample-kit.choice.defer.text':
      'Продолжить обычную торговлю без работы с набором образцов.'
  };
  for(const [key,ru] of Object.entries(expected)){
    const row=bilingual(key);
    assert.equal(row.ru,ru,key);
  }
});

test('v26 uses the live double-prefix Hard Work namespace for Merchant and Artist House',()=>{
  for(const career of ['merchant','artist-geisha']){
    for(const field of ['title','description','epilogue']){
      bilingual(`ending.ending.${career}.hard-work.${field}`);
      assert.equal(localization[`ending.${career}.hard-work.${field}`],undefined);
    }
  }
});

test('v26 localization closure does not invent ending identities or reward ownership',()=>{
  const d40Rewards={
    'ending.guard.officer':'unlock.guard.command-briefing',
    'ending.guard.reform':'unlock.guard.reform-practice',
    'ending.guard.network':'specialist.guard.institutional-favors',
    'ending.guard.major-case':'unlock.guard.casebook-index',
    'ending.merchant.house':'unlock.merchant.house-supplier',
    'ending.merchant.speculator-smuggler':'specialist.merchant.risk-ledger',
    'ending.merchant.patron-of-routes':'unlock.merchant.patron-destinations',
    'ending.artist-geisha.master-artist':'unlock.artist.master-repertoire',
    'ending.artist-geisha.patron-network':'specialist.artist.salon-introductions',
    'ending.artist-geisha.court-invitation':'unlock.artist.court-context',
    'ending.assassin.ghost':'specialist.assassin.ghost-routes',
    'ending.assassin.handler-takeover':'specialist.assassin.contract-ledger',
    'ending.assassin.refusal-turncoat':'unlock.assassin.refusal-protocol',
    'ending.prostitute.independent-house':'specialist.prostitute.housebook',
    'ending.prostitute.elite-clientele':'unlock.prostitute.elite-protocol',
    'ending.prostitute.network-protection':'specialist.prostitute.mutual-aid-roster'
  } as const;
  for(const [id,reward] of Object.entries(d40Rewards)){
    const ending=definitions.endings.find((item:any)=>item.id===id);
    assert.ok(ending,id);
    assert.equal(ending.reward,reward,id);
  }
});

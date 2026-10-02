import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

import {
  applyPresentation,
  presentationIdForEnding,
  presentationIdForMerchantItem,
  presentationIdForMerchantRelationshipStage,
  presentationIdForMerchantStage,
  presentationIdForMerchantState,
  presentationSlots,
  resolvePresentation,
  MERCHANT_ADVANCED_STATUS_IDS,
  MERCHANT_CROSS_SYSTEM_EVENT_IDS,
  MERCHANT_ITEM_IDS,
  MERCHANT_POVERTY_STATUS_IDS,
  MERCHANT_PRESENTATION_STAGES,
  MERCHANT_PUBLIC_ENDING_IDS,
  MERCHANT_RELATIONSHIP_STAGES,
  MERCHANT_SCHOOL_EVENT_IDS,
  MERCHANT_TRADE_EVENT_IDS,
  MERCHANT_TRADE_STATUS_IDS
} from '../src/core/presentation.ts';
import {catalog,started} from './helpers.ts';

const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));
const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;

function assertLocalizedStatic(id:string){
  const slot=presentation.slots?.[id];
  assert.ok(slot?.static,id+' static');
  assert.ok(existsSync(slot.static.src),slot.static.src);
  assert.ok(slot.static.altKey,id+' altKey');
  const caption=slot.static.altKey.replace(/\.alt$/,'.caption');
  for(const key of [slot.static.altKey,caption]){
    assert.ok(localization[key]?.ru?.trim(),key+' ru');
    assert.ok(localization[key]?.en?.trim(),key+' en');
  }
}

test('C2-181..182 Merchant shipped work and Hard Work identities remain exact and static-safe',()=>{
  const action=catalog.definitions.actions.find(item=>item.id==='merchant.shift');
  const career=catalog.definitions.careers?.find(item=>item.id==='merchant');
  assert.ok(action);
  assert.ok(career);
  assert.equal(action.cost.energy,1);
  assert.deepEqual(career.stages,['stall-hand']);
  assert.deepEqual(
    catalog.definitions.endings.filter(ending=>ending.id.includes('merchant')).map(ending=>ending.id),
    ['ending.merchant.hard-work']
  );

  const ids=[
    'job/merchant/result/default',
    'job/merchant/shift/spring/default',
    'job/merchant/shift/summer/default',
    'job/merchant/shift/autumn/default',
    'job/merchant/shift/winter/default',
    'ending/merchant/hard-work'
  ];
  const checked=applyPresentation(catalog,presentation);
  for(const id of ids){
    assertLocalizedStatic(id);
    const off=resolvePresentation(checked,presentation,id,{animationsEnabled:false,occurrenceKey:'c2-191-prep'});
    assert.equal(off.textOnly,false,id);
    assert.equal(off.selected?.source,'override-static',id);
    assert.equal(off.selected?.src,presentation.slots[id].static.src,id);
  }
});

test('C2-183 Merchant stage semantic preparation is catalog-backed and deterministic',()=>{
  assert.deepEqual([...MERCHANT_PRESENTATION_STAGES],[
    'stall-hand','independent-trader','networked-merchant','veteran',
    'merchant-house','speculator-smuggler','patron-of-routes','outcome-ready'
  ]);
  for(const stage of MERCHANT_PRESENTATION_STAGES){
    assert.equal(presentationIdForMerchantStage(stage),`job/merchant/stage/${stage}`);
  }

  const known=new Set(presentationSlots(catalog).map(slot=>slot.id));
  assert.ok(known.has('job/merchant/stage/stall-hand'));
  for(const stage of MERCHANT_PRESENTATION_STAGES.filter(stage=>stage!=='stall-hand')){
    assert.equal(known.has(presentationIdForMerchantStage(stage)),false,stage+' absent until runtime publishes it');
  }
});

test('C2-184..189 provisional Merchant contract vocabulary never activates without live runtime backing',()=>{
  assert.deepEqual([...MERCHANT_RELATIONSHIP_STAGES],[
    'introduced','professional-trust','conflict-open','utility-ready','route-resolved'
  ]);
  assert.deepEqual([...MERCHANT_TRADE_EVENT_IDS],[
    'merchant.trade.appraisal','merchant.trade.records','merchant.trade.delivery','merchant.trade.shortage'
  ]);
  assert.deepEqual([...MERCHANT_CROSS_SYSTEM_EVENT_IDS],[
    'merchant.cross.lumber-route','merchant.cross.farm-sample','merchant.cross.hunter-return',
    'merchant.cross.tavern-rumour','merchant.cross.guard-pass'
  ]);
  assert.deepEqual([...MERCHANT_ITEM_IDS],[
    'merchant_appraisal_scales','merchant_manifest_case','merchant_sample_kit'
  ]);
  assert.deepEqual([...MERCHANT_SCHOOL_EVENT_IDS],[]);

  const known=new Set(presentationSlots(catalog).map(slot=>slot.id));
  for(const stage of MERCHANT_RELATIONSHIP_STAGES){
    assert.equal(known.has(presentationIdForMerchantRelationshipStage(stage)),false,stage+' relationship absent on shipped baseline');
  }
  for(const item of MERCHANT_ITEM_IDS){
    assert.equal(known.has(presentationIdForMerchantItem(item)),false,item+' item absent on shipped baseline');
  }
  for(const state of [...MERCHANT_TRADE_STATUS_IDS,...MERCHANT_POVERTY_STATUS_IDS,...MERCHANT_ADVANCED_STATUS_IDS]){
    assert.equal(known.has(presentationIdForMerchantState(state)),false,state+' status absent on shipped baseline');
  }
});

test('C2-190 Merchant Hard Work remains the sole public ending and advanced stages are not ending cards',()=>{
  assert.deepEqual([...MERCHANT_PUBLIC_ENDING_IDS],['ending.merchant.hard-work']);
  assert.equal(presentationIdForEnding('ending.merchant.hard-work'),'ending/merchant/hard-work');
  for(const id of [
    'ending/merchant/merchant-house',
    'ending/merchant/speculator-smuggler',
    'ending/merchant/patron-of-routes',
    'ending/merchant/outcome-ready'
  ]){
    assert.equal(presentation.slots?.[id],undefined,id);
  }
});

test('C2-191 Merchant presentation resolution is deterministic, locale/media-only and Save-neutral',()=>{
  const checked=applyPresentation(catalog,presentation);
  const merchantSlots=Object.entries<any>(presentation.slots??{}).filter(([id])=>id.includes('merchant'));
  const save=started();
  const before=JSON.stringify(save);

  for(const [id,slot] of merchantSlots){
    assertLocalizedStatic(id);
    const a=resolvePresentation(checked,presentation,id,{animationsEnabled:false,occurrenceKey:'merchant-c2-191'});
    const b=resolvePresentation(checked,presentation,id,{animationsEnabled:false,occurrenceKey:'merchant-c2-191'});
    assert.equal(a.selected?.src,b.selected?.src,id+' deterministic');
    assert.equal(a.selected?.source,'override-static',id);
    assert.equal(a.selected?.src,slot.static.src,id);
  }

  assert.equal(JSON.stringify(save),before,'presentation resolution must not mutate Save state');
});

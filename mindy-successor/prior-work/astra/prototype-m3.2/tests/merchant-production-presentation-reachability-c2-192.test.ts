import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

import {actionAvailable,calendar,dispatch,eligible} from '../src/core/engine.ts';
import {
  applyPresentation,
  presentationIdForEnding,
  presentationIdForEvent,
  presentationIdForMerchantItem,
  presentationIdForMerchantRelationshipStage,
  presentationIdForMerchantStage,
  presentationIdForMerchantState,
  presentationSlots,
  resolvePresentation,
  MERCHANT_ADVANCED_STATUS_IDS,
  MERCHANT_ITEM_IDS,
  MERCHANT_POVERTY_STATUS_IDS,
  MERCHANT_PRESENTATION_STAGES,
  MERCHANT_PUBLIC_ENDING_IDS,
  MERCHANT_RELATIONSHIP_STAGES,
  MERCHANT_SCHOOL_EVENT_IDS,
  MERCHANT_TRADE_STATUS_IDS
} from '../src/core/presentation.ts';
import {catalog,started} from './helpers.ts';
import type {Save} from '../src/core/schema.ts';

const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));
const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const appSource=readFileSync('src/ui/app.ts','utf8');

const preferred:Record<string,string>={
  'merchant.career.first-shift':'continue',
  'merchant.career.networked':'continue',
  'merchant.career.seasonal-breadth':'record',
  'merchant.career.veteran-ready':'record',
  'merchant.career.choose-route':'defer',
  'merchant.career.choose-patron':'defer',
  'merchant.career.outcome-ready':'continue',
  'merchant.trade.appraisal':'compare-notes',
  'merchant.trade.records':'write-plain-terms',
  'merchant.trade.delivery':'confirm-window',
  'merchant.trade.shortage':'accept-risk',
  'merchant.crisis.delivery-pressure':'accept-narrow-risk',
  'merchant.relationship.intro':'professional',
  'merchant.relationship.trust':'continue',
  'merchant.relationship.conflict-open':'open',
  'merchant.relationship.conflict-resolve':'decline',
  'merchant.relationship.utility':'decline',
  'merchant.items.appraisal-scales':'take',
  'merchant.items.manifest-case':'take',
  'merchant.items.sample-kit':'take',
  'merchant.poverty.liquidity-response':'commission-only',
  'merchant.routes.house-ready':'record',
  'merchant.routes.speculator-ready':'record',
  'merchant.routes.patron-ready':'record'
};

function settlePending(state:Save){
  let s=state,guard=0;
  while(s.run.pending){
    if(++guard>300)throw new Error('pending loop: '+s.run.pending.eventId);
    const event=catalog.events.find(item=>item.id===s.run.pending!.eventId);
    assert.ok(event,s.run.pending.eventId);
    const wanted=preferred[event.id];
    const choice=(wanted?event.choices.find(item=>item.id===wanted&&eligible(item.conditions,s,catalog)):undefined)
      ??event.choices.find(item=>eligible(item.conditions,s,catalog));
    assert.ok(choice,event.id);
    s=dispatch(s,{type:'choice',id:choice.id},catalog);
  }
  return s;
}

function finishNight(state:Save){
  let s=dispatch(state,{type:'endDay'},catalog),guard=0;
  while(s.run.flow.night||s.run.pending){
    if(++guard>300)throw new Error('night loop');
    if(s.run.pending){s=settlePending(s);continue;}
    if(s.run.flow.night?.phase==='LodgingResolution'){
      s=dispatch(s,{type:'chooseLodging',id:'lodging.street'},catalog);
      continue;
    }
    if(s.run.flow.night?.phase==='VoluntaryNightChoice'){
      s=dispatch(s,{type:'chooseNightChoice',id:'night.sleep'},catalog);
      continue;
    }
    throw new Error('night stalled at '+s.run.flow.night?.phase);
  }
  return s;
}

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

test('C2-192 frozen Merchant production identities back every presentation-owned semantic surface',()=>{
  const career=catalog.definitions.careers?.find(item=>item.id==='merchant');
  const relationship=catalog.definitions.relationships?.find(item=>item.id==='merchant.supplier');
  assert.ok(career);
  assert.ok(relationship);
  assert.deepEqual(career.stages,[...MERCHANT_PRESENTATION_STAGES]);
  assert.deepEqual(relationship.stages,[...MERCHANT_RELATIONSHIP_STAGES]);
  assert.deepEqual([...MERCHANT_SCHOOL_EVENT_IDS],[
    'd40.school.merchant.literacy'
  ]);

  const events=catalog.events.filter(event=>event.sourceDomain==='merchant');
  assert.equal(events.length,29);
  assert.equal(events.some(event=>event.id.startsWith('merchant.school.')),false);

  assert.deepEqual(
    catalog.definitions.endings.filter(ending=>ending.id.includes('merchant')).map(ending=>ending.id),
    [...MERCHANT_PUBLIC_ENDING_IDS]
  );

  const known=new Set(presentationSlots(catalog).map(slot=>slot.id));
  for(const stage of MERCHANT_PRESENTATION_STAGES)assert.ok(known.has(presentationIdForMerchantStage(stage)),stage);
  for(const stage of MERCHANT_RELATIONSHIP_STAGES)assert.ok(known.has(presentationIdForMerchantRelationshipStage(stage)),stage);

  const caps:Record<string,string>={
    merchant_appraisal_scales:'merchant_appraise_goods',
    merchant_manifest_case:'merchant_verify_manifest',
    merchant_sample_kit:'merchant_handle_samples'
  };
  for(const itemId of MERCHANT_ITEM_IDS){
    const item=catalog.definitions.itemDefinitions.find(item=>String(item.id)===itemId);
    assert.ok(item,itemId);
    assert.ok(item.capabilities.includes(caps[itemId]!),itemId+' capability');
    assert.ok(known.has(presentationIdForMerchantItem(itemId)),itemId+' presentation');
  }

  const runtimeText=JSON.stringify({career,relationship,events});
  for(const stateId of [...MERCHANT_TRADE_STATUS_IDS,...MERCHANT_POVERTY_STATUS_IDS,...MERCHANT_ADVANCED_STATUS_IDS]){
    assert.ok(runtimeText.includes(stateId),stateId+' backing');
    assert.ok(known.has(presentationIdForMerchantState(stateId)),stateId+' presentation');
  }

  assert.ok(known.has(presentationIdForEnding('ending.merchant.hard-work')));
});

test('C2-192 all 29 frozen Merchant events resolve through exact live presentation IDs',()=>{
  const checked=applyPresentation(catalog,presentation);
  const known=new Set(presentationSlots(checked).map(slot=>slot.id));
  const expected=new Set<string>();
  for(const event of checked.events.filter(event=>event.sourceDomain==='merchant')){
    for(const variant of event.variants){
      const id=presentationIdForEvent(checked,event.id,variant.id);
      expected.add(id);
      assert.ok(known.has(id),id);
      const resolved=resolvePresentation(checked,presentation,id,{animationsEnabled:false,occurrenceKey:'merchant-c2-192-event'});
      assert.equal(resolved.textOnly,false,id);
      assert.equal(resolved.selected?.source,'override-static',id);
      assert.ok(existsSync(resolved.selected!.src),resolved.selected!.src);
    }
  }
  assert.equal(expected.size,29);
});

test('C2-192 Merchant registry exposes exactly 67 semantic surfaces after D40 endings and remains static-safe with animations off',()=>{
  const checked=applyPresentation(catalog,presentation);
  const ids=presentationSlots(checked).map(slot=>slot.id).filter(id=>
    id.startsWith('job/merchant/')||id.startsWith('relationship/merchant-supplier/')||id.startsWith('ending/merchant/')
  );
  assert.equal(new Set(ids).size,67);

  const save=started();
  const before=JSON.stringify(save);
  const d40EndingSlots=new Set([
    'ending/merchant/house',
    'ending/merchant/speculator-smuggler',
    'ending/merchant/patron-of-routes'
  ]);
  for(const id of ids){
    const resolved=resolvePresentation(checked,presentation,id,{animationsEnabled:false,occurrenceKey:'merchant-c2-192-static'});
    assert.equal(resolved.textOnly,false,id);
    assert.equal(resolved.selected?.source,d40EndingSlots.has(id)?'catalog':'override-static',id);
    assert.ok(existsSync(resolved.selected!.src),resolved.selected!.src);
  }
  assert.equal(JSON.stringify(save),before);

  for(const id of [
    'job/merchant/result/default',
    'job/merchant/shift/spring/default',
    'job/merchant/shift/summer/default',
    'job/merchant/shift/autumn/default',
    'job/merchant/shift/winter/default',
    'ending/merchant/hard-work'
  ])assertLocalizedStatic(id);
});

test('C2-192 a real Year-2 Merchant shift reaches ordinary result and first milestone presentation IDs',()=>{
  let state=started();
  const action=catalog.definitions.actions.find(item=>item.id==='merchant.shift');
  assert.ok(action);
  assert.equal(action.cost.energy,1);
  assert.equal(actionAvailable(action,state,catalog),false);

  while(calendar(state.run.day).year<2)state=finishNight(state);
  assert.equal(actionAvailable(action,state,catalog),true);

  state=dispatch(state,{type:'action',id:'merchant.shift'},catalog);
  assert.equal(state.run.lastAction?.id,'merchant.shift');
  assert.equal(state.run.lastAction?.presentationId,'job/merchant/result/default');
  assert.equal(state.run.pending?.eventId,'merchant.career.first-shift');
  const firstId=presentationIdForEvent(catalog,'merchant.career.first-shift','default');
  assert.equal(state.run.pending?.presentationId,firstId);

  const ordinary=resolvePresentation(catalog,presentation,'job/merchant/result/default',{animationsEnabled:false,occurrenceKey:'merchant-c2-192-shift'});
  assert.equal(ordinary.selected?.source,'override-static');

  const milestone=resolvePresentation(catalog,presentation,firstId,{animationsEnabled:false,occurrenceKey:'merchant-c2-192-first'});
  assert.equal(milestone.selected?.source,'override-static');
  assert.equal(milestone.selected?.src,presentation.slots['job/merchant/result/default'].static.src);

  state=settlePending(state);
  assert.equal(state.run.progression.careers.merchant?.stage,'independent-trader');
});

test('C2-192 missing optional motion falls through to Merchant static and shipped consumers remain intact',()=>{
  const resultId='job/merchant/result/default';
  const staticSrc=presentation.slots[resultId].static.src;
  const synthetic:any={version:1,texts:{},media:{},slots:{
    [resultId]:{
      primary:{kind:'gif',src:'assets/presentation/missing-merchant-c2-192.gif',alt:'Optional Merchant animation.'},
      static:{kind:'image',src:staticSrc,alt:'Required Merchant static fallback.'}
    }
  }};
  const checked=applyPresentation(catalog,synthetic);
  const resolved=resolvePresentation(checked,synthetic,resultId,{animationsEnabled:true,occurrenceKey:'merchant-c2-192-missing'});
  assert.equal(resolved.candidates[0]?.src,'assets/presentation/missing-merchant-c2-192.gif');
  assert.equal(resolved.candidates[1]?.source,'override-static');
  assert.equal(resolved.candidates[1]?.src,staticSrc);
  assert.match(appSource,/node\.onerror=\(\)=>\{mediaIndex\+\+;render\(\);\}/);

  const known=new Set(presentationSlots(catalog).map(slot=>slot.id));
  for(const id of [
    'job/lumber/result/default','job/satyr-maid/result/default','job/undead-farm/result/default',
    'job/tavern/result/default','job/hunter/result/default','job/guard/result/default',
    'activity/forest/route/default','location/town/default'
  ])assert.ok(known.has(id),id+' retained');
});

import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

import {
  applyPresentation,
  presentationIdForEnding,
  presentationIdForGuardItem,
  presentationIdForGuardRelationshipStage,
  presentationIdForGuardStage,
  presentationIdForGuardState,
  presentationSlots,
  resolvePresentation,
  GUARD_ACCESS_EVENT_IDS,
  GUARD_CAREER_EVENT_IDS,
  GUARD_CITY_EVENT_IDS,
  GUARD_CROSS_SYSTEM_EVENT_IDS,
  GUARD_ITEM_IDS,
  GUARD_PRESENTATION_STAGES,
  GUARD_RELATIONSHIP_EVENT_IDS,
  GUARD_RELATIONSHIP_STAGES,
  GUARD_ROUTE_EVENT_IDS,
  GUARD_SCHOOL_EVENT_IDS,
  GUARD_STATUS_IDS
} from '../src/core/presentation.ts';
import {catalog} from './helpers.ts';

const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));
const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const app=readFileSync('src/ui/app.ts','utf8');
const css=readFileSync('src/ui/style.css','utf8');
const prepCopy=JSON.parse(readFileSync('../../../docs/presentation-prep/GUARD_PRESENTATION_COPY_C2_170_179.json','utf8'));

function assertLocalizedStatic(id:string){
  const slot=presentation.slots?.[id];
  assert.ok(slot?.static,id+' static');
  assert.ok(existsSync(slot.static.src),slot.static.src);
  assert.ok(slot.static.altKey,id+' alt key');
  const caption=slot.static.altKey.replace(/\.alt$/,'.caption');
  for(const key of [slot.static.altKey,caption]){
    assert.ok(localization[key]?.ru?.trim(),key+' ru');
    assert.ok(localization[key]?.en?.trim(),key+' en');
  }
}

test('C2-169 inventory constants mirror the observed Guard prep contract without School or complex endings',()=>{
  assert.deepEqual([...GUARD_PRESENTATION_STAGES],[
    'recruit','trusted-guard','senior-guard','veteran','officer','reform-order','network','major-case','outcome-ready'
  ]);
  assert.deepEqual([...GUARD_RELATIONSHIP_STAGES],[
    'introduced','professional-trust','conflict-open','cooperation-ready','route-resolved'
  ]);
  assert.deepEqual([...GUARD_ITEM_IDS],['guard_badge','guard_sealed_pass']);
  assert.deepEqual([...GUARD_CITY_EVENT_IDS],[
    'guard.city.dispute','guard.city.crowd-pressure','guard.city.suspicious-pass','guard.city.poverty-response','guard.city.formal-report'
  ]);
  assert.deepEqual([...GUARD_CROSS_SYSTEM_EVENT_IDS],['guard.cross.tavern-receipt']);
  assert.deepEqual([...GUARD_SCHOOL_EVENT_IDS],[]);

  for(const id of [
    ...GUARD_CAREER_EVENT_IDS,
    ...GUARD_RELATIONSHIP_EVENT_IDS,
    ...GUARD_CITY_EVENT_IDS,
    ...GUARD_ACCESS_EVENT_IDS,
    ...GUARD_CROSS_SYSTEM_EVENT_IDS,
    ...GUARD_ROUTE_EVENT_IDS
  ])assert.match(id,/^guard\./);

  assert.deepEqual(
    catalog.definitions.endings.filter(ending=>ending.id.includes('guard')).map(ending=>ending.id),
    ['ending.guard.hard-work']
  );
});

test('C2-170 ordinary seasonal Guard work uses project-owned static fallbacks and no fabricated motion',()=>{
  const action=catalog.definitions.actions.find(item=>item.id==='guard.shift');
  assert.ok(action);
  assert.equal(action.cost.energy,1);

  const checked=applyPresentation(catalog,presentation);
  for(const season of ['spring','summer','autumn','winter']){
    const id=`job/guard/shift/${season}/default`;
    const slot=presentation.slots[id];
    assertLocalizedStatic(id);
    assert.equal(slot.primary,undefined,id+' no primary animation');
    assert.equal(slot.pool,undefined,id+' no animation pool');
    const off=resolvePresentation(checked,presentation,id,{animationsEnabled:false,occurrenceKey:'c2-170'});
    assert.equal(off.textOnly,false,id);
    assert.equal(off.selected?.src,slot.static.src,id);
  }
  assertLocalizedStatic('job/guard/result/default');
  assert.match(presentation.slots['job/guard/result/default'].static.alt,/not a combat mechanic/i);
});

test('C2-171 prep emits Guard stage surfaces only for career stages that are actually live on the current prep base',()=>{
  const career=catalog.definitions.careers?.find(item=>item.id==='guard');
  assert.ok(career);
  const known=new Set(presentationSlots(catalog).map(slot=>slot.id));

  for(const stage of GUARD_PRESENTATION_STAGES){
    const id=presentationIdForGuardStage(stage);
    assert.equal(known.has(id),career.stages.includes(stage),id+' runtime conditional');
    const label=`presentation.guard.stage.${stage}.label`;
    assert.ok(localization[label]?.ru?.trim(),label+' ru');
    assert.ok(localization[label]?.en?.trim(),label+' en');
  }

  const recruit=resolvePresentation(catalog,presentation,presentationIdForGuardStage('recruit'),{
    animationsEnabled:false,
    occurrenceKey:'c2-171'
  });
  assert.equal(recruit.selected?.src,presentation.slots['job/guard/result/default'].static.src);
  assert.match(app,/data-guard-stage=/);
  assert.match(css,/\.guard-career-stage\[tabindex\]:focus-visible/);
});

test('C2-172 partner stage publication is conditional and refusal-safe UI semantics are prepared',()=>{
  const relationship=catalog.definitions.relationships?.find(item=>item.id==='guard.partner');
  const known=new Set(presentationSlots(catalog).map(slot=>slot.id));
  for(const stage of GUARD_RELATIONSHIP_STAGES){
    assert.equal(
      known.has(presentationIdForGuardRelationshipStage(stage)),
      !!relationship?.stages.includes(stage),
      stage+' live relationship backing'
    );
    const label=`presentation.guard.relationship.stage.${stage}.label`;
    assert.ok(localization[label]?.ru?.trim(),label+' ru');
    assert.ok(localization[label]?.en?.trim(),label+' en');
  }

  assert.match(app,/data-guard-relationship-event=/);
  assert.match(app,/data-guard-choice-state=/);
  for(const state of ['cooperate','rivalry','refusal','case-support-accepted','case-support-refused'])assert.match(app,new RegExp(state));
  assert.match(localization['presentation.guard.state.refusal-respected.label'].en,/without loss of ordinary duty/i);
});

test('C2-173 through C2-175 status and item slots require real production backing',()=>{
  const known=new Set(presentationSlots(catalog).map(slot=>slot.id));
  const runtimeText=JSON.stringify({
    career:catalog.definitions.careers?.find(item=>item.id==='guard'),
    relationship:catalog.definitions.relationships?.find(item=>item.id==='guard.partner'),
    events:catalog.events.filter(event=>event.sourceDomain==='guard')
  });

  const backing:Record<string,boolean>={
    'city-dispute-resolved':runtimeText.includes('city-dispute-resolved'),
    'crowd-pressure-resolved':runtimeText.includes('crowd-pressure-resolved'),
    'duty-report-evidence':runtimeText.includes('duty-report-evidence'),
    'cargo-pass-evidence':runtimeText.includes('cargo-pass-evidence'),
    'poverty-response-recorded':runtimeText.includes('poverty-response-recorded'),
    'tavern-evidence-known':runtimeText.includes('tavern-evidence-known'),
    'veteran-ready':runtimeText.includes('veteran-ready'),
    'officer-ready':runtimeText.includes('officer-route-ready'),
    'reform-ready':runtimeText.includes('reform-route-ready'),
    'network-ready':runtimeText.includes('network-route-ready'),
    'major-case-thread':runtimeText.includes('major-case-thread-ready'),
    'major-case-ready':runtimeText.includes('major-case-ready'),
    'crisis-resolved':runtimeText.includes('crisis-resolved'),
    'refusal-respected':runtimeText.includes('refusal-respected'),
    'partner-case-support':runtimeText.includes('case-support-ready')||runtimeText.includes('partner-case-support')
  };

  for(const stateId of GUARD_STATUS_IDS){
    assert.equal(known.has(presentationIdForGuardState(stateId)),backing[stateId],stateId+' runtime fact backing');
    const label=`presentation.guard.state.${stateId}.label`;
    assert.ok(localization[label]?.ru?.trim(),label+' ru');
    assert.ok(localization[label]?.en?.trim(),label+' en');
  }

  for(const itemId of GUARD_ITEM_IDS){
    const item=catalog.definitions.itemDefinitions.find(item=>String(item.id)===itemId);
    assert.equal(known.has(presentationIdForGuardItem(itemId)),!!item,itemId+' item backing');
    const label=`presentation.guard.item.${itemId}.label`;
    assert.ok(localization[label]?.ru?.trim(),label+' ru');
    assert.ok(localization[label]?.en?.trim(),label+' en');
  }
});

test('C2-174 and C2-176 prep contains only current poverty/Tavern seam and no Guard School, Merchant, Palace or Secret Debt publication',()=>{
  assert.deepEqual(prepCopy.eventGroups.crossSystem,['guard.cross.tavern-receipt']);
  assert.deepEqual(prepCopy.eventGroups.school,[]);
  const serialized=JSON.stringify(prepCopy);
  assert.doesNotMatch(serialized,/merchant\.cargo|palace\.|secret[-_. ]?debt/i);
  assert.equal(catalog.events.some(event=>event.id.startsWith('guard.school.')),false);
  assert.equal((GUARD_SCHOOL_EVENT_IDS as readonly string[]).length,0);
});

test('C2-177 and C2-178 crisis readiness stays presentation-only and Hard Work stays the only Guard ending',()=>{
  assert.ok((GUARD_ROUTE_EVENT_IDS as readonly string[]).includes('guard.crisis.market-gate-pressure'));
  for(const key of [
    'ui.guard.crisisFeedback.stabilize-by-report',
    'ui.guard.crisisFeedback.deescalate-crowd',
    'ui.guard.crisisFeedback.trade-access-network',
    'ui.guard.crisisFeedback.defer'
  ]){
    assert.ok(localization[key]?.ru?.trim(),key+' ru');
    assert.ok(localization[key]?.en?.trim(),key+' en');
  }

  const ending='ending.guard.hard-work';
  assert.ok(catalog.definitions.endings.some(item=>item.id===ending));
  assert.equal(presentationIdForEnding(ending),'ending/guard/hard-work');
  assertLocalizedStatic('ending/guard/hard-work');
  assert.equal(presentation.slots['ending/guard/officer'],undefined);
  assert.equal(presentation.slots['ending/guard/reform-order'],undefined);
  assert.equal(presentation.slots['ending/guard/network'],undefined);
  assert.equal(presentation.slots['ending/guard/major-case'],undefined);
});

test('C2-179 RU EN focus safety animation-off and missing optional media fallback are prepared without reserving fake live events',()=>{
  for(const key of ['ui.guard.stageAria','ui.guard.relationshipAria','ui.guard.itemAria','ui.guard.stateAria','ui.guard.relationshipEventAria']){
    assert.ok(localization[key]?.ru?.trim(),key+' ru');
    assert.ok(localization[key]?.en?.trim(),key+' en');
  }
  assert.match(css,/\.guard-relationship-stage\[tabindex\]:focus-visible/);
  assert.match(css,/\.guard-item-chip\[tabindex\]:focus-visible/);
  assert.match(css,/\.guard-state-chip\[tabindex\]:focus-visible/);

  const known=new Set(presentationSlots(catalog).map(slot=>slot.id));
  const currentGuardEvents=catalog.events.filter(event=>event.sourceDomain==='guard');
  for(const event of currentGuardEvents){
    for(const variant of event.variants){
      const clean=(value:string)=>value.trim().toLowerCase().replace(/[^a-z0-9_-]+/g,'-').replace(/^-+|-+$/g,'')||'default';
      const id=`job/guard/event/${clean(event.id)}/${clean(variant.id)}`;
      assert.ok(known.has(id),id+' live event only');
    }
  }

  const recruitId=presentationIdForGuardStage('recruit');
  const synthetic:any={
    version:1,
    texts:{},
    media:{},
    slots:{
      [recruitId]:{
        primary:{kind:'gif',src:'assets/presentation/missing-guard-c2-179.gif',alt:'Optional Guard animation.'},
        static:{kind:'image',src:'assets/presentation/career-guard-result.svg',alt:'Required Guard static fallback.'}
      }
    }
  };
  const checked=applyPresentation(catalog,synthetic);
  const off=resolvePresentation(checked,synthetic,recruitId,{animationsEnabled:false,occurrenceKey:'c2-179-off'});
  assert.equal(off.selected?.src,'assets/presentation/career-guard-result.svg');
  const on=resolvePresentation(checked,synthetic,recruitId,{animationsEnabled:true,occurrenceKey:'c2-179-on'});
  assert.equal(on.candidates[0]?.src,'assets/presentation/missing-guard-c2-179.gif');
  assert.equal(on.candidates[1]?.src,'assets/presentation/career-guard-result.svg');
});

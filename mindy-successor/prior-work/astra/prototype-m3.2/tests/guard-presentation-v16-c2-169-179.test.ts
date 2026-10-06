import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

import {
  applyPresentation,
  presentationIdForEnding,
  presentationIdForEvent,
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

test('C2-169 frozen Guard identities match the exact production catalog and publish no School consumer',()=>{
  const career=catalog.definitions.careers?.find(item=>item.id==='guard');
  const relationship=catalog.definitions.relationships?.find(item=>item.id==='guard.partner');
  assert.ok(career);
  assert.ok(relationship);
  assert.deepEqual([...GUARD_PRESENTATION_STAGES],career.stages);
  assert.deepEqual([...GUARD_RELATIONSHIP_STAGES],relationship.stages);
  assert.deepEqual([...GUARD_SCHOOL_EVENT_IDS],[
    'd40.school.guard.literacy',
    'd40.school.guard.etiquette'
  ]);

  const capability:Record<string,string>={
    guard_badge:'official_guard_access',
    guard_sealed_pass:'guard_sealed_pass'
  };
  for(const itemId of GUARD_ITEM_IDS){
    const item=catalog.definitions.itemDefinitions.find(item=>String(item.id)===itemId);
    assert.ok(item,itemId);
    assert.ok(item.capabilities.includes(capability[itemId]!),itemId+' capability');
  }

  const liveGroups=[
    ...GUARD_CAREER_EVENT_IDS,
    ...GUARD_RELATIONSHIP_EVENT_IDS,
    ...GUARD_CITY_EVENT_IDS,
    ...GUARD_ACCESS_EVENT_IDS,
    ...GUARD_CROSS_SYSTEM_EVENT_IDS,
    ...GUARD_ROUTE_EVENT_IDS
  ];
  assert.equal(liveGroups.length,26);
  assert.equal(new Set(liveGroups).size,26);
  for(const eventId of liveGroups){
    const event=catalog.events.find(item=>item.id===eventId);
    assert.ok(event,eventId);
    assert.equal(event.sourceDomain,'guard',eventId+' source domain');
    const expectedVariants=eventId==='guard.city.poverty-response'?['street-survival','cheap-room','default']:['default'];
    assert.deepEqual(event.variants.map(v=>v.id),expectedVariants,eventId+' variants');
  }

  assert.equal(catalog.events.some(event=>event.id.startsWith('guard.school.')),false);
  assert.deepEqual(
    catalog.definitions.endings.filter(ending=>ending.id.includes('guard')).map(ending=>ending.id),
    [
      'ending.guard.hard-work',
      'ending.guard.officer',
      'ending.guard.reform',
      'ending.guard.network',
      'ending.guard.major-case'
    ]
  );
});

test('C2-170 ordinary seasonal Guard work remains static-only and non-combat',()=>{
  const action=catalog.definitions.actions.find(item=>item.id==='guard.shift');
  assert.ok(action);
  assert.equal(action.cost.energy,1);
  const checked=applyPresentation(catalog,presentation);

  for(const season of ['spring','summer','autumn','winter']){
    const id=`job/guard/shift/${season}/default`;
    const slot=presentation.slots[id];
    assertLocalizedStatic(id);
    assert.equal(slot.primary,undefined,id+' no fabricated motion');
    assert.equal(slot.pool,undefined,id+' no fabricated motion pool');
    const off=resolvePresentation(checked,presentation,id,{animationsEnabled:false,occurrenceKey:'c2-170'});
    assert.equal(off.selected?.source,'override-static',id);
    assert.equal(off.selected?.src,slot.static.src,id);
  }
  assertLocalizedStatic('job/guard/result/default');
  assert.match(localization['presentation.static.career.guard.result.alt'].en,/not a combat mechanic/i);
});

test('C2-171 all nine frozen Guard stages have stable static presentation and focusable Work state',()=>{
  const known=new Set(presentationSlots(catalog).map(slot=>slot.id));
  for(const stage of GUARD_PRESENTATION_STAGES){
    const id=presentationIdForGuardStage(stage);
    assert.ok(known.has(id),id);
    assertLocalizedStatic(id);
    const label=`presentation.guard.stage.${stage}.label`;
    assert.ok(localization[label]?.ru?.trim(),label+' ru');
    assert.ok(localization[label]?.en?.trim(),label+' en');
  }
  assert.match(app,/data-guard-stage=/);
  assert.match(app,/presentationIdForGuardStage\(stage\)/);
  assert.match(css,/\.guard-career-stage\[tabindex\]:focus-visible/);
});

test('C2-172 guard.partner is professional and refusal-safe across all frozen stages',()=>{
  for(const stage of GUARD_RELATIONSHIP_STAGES){
    assertLocalizedStatic(presentationIdForGuardRelationshipStage(stage));
  }
  for(const eventId of GUARD_RELATIONSHIP_EVENT_IDS){
    assertLocalizedStatic(presentationIdForEvent(catalog,eventId,'default'));
  }
  assert.match(app,/data-guard-relationship-event=/);
  assert.match(app,/data-guard-choice-state=/);
  for(const state of ['cooperate','rivalry','refusal','case-support-accepted','case-support-refused'])assert.match(app,new RegExp(state));
  assert.match(localization['presentation.guard.state.refusal-respected.label'].en,/without loss of ordinary duty/i);
});

test('C2-173 city-duty evidence surfaces are qualitative and catalog-backed',()=>{
  for(const eventId of GUARD_CITY_EVENT_IDS)assertLocalizedStatic(presentationIdForEvent(catalog,eventId,'default'));
  for(const stateId of ['city-dispute-resolved','crowd-pressure-resolved','duty-report-evidence','cargo-pass-evidence','poverty-response-recorded']){
    assert.ok((GUARD_STATUS_IDS as readonly string[]).includes(stateId));
    assertLocalizedStatic(presentationIdForGuardState(stateId));
  }
  const guardCopy=Object.entries<any>(localization).filter(([key])=>key.includes('presentation.guard.'));
  assert.equal(guardCopy.some(([,value])=>/morality stat|corruption currency/i.test(value.en??'')),false);
});

test('C2-174 only frozen poverty and Tavern cross-system seams are published',()=>{
  assert.deepEqual([...GUARD_CROSS_SYSTEM_EVENT_IDS],['guard.cross.tavern-receipt']);
  assertLocalizedStatic(presentationIdForEvent(catalog,'guard.city.poverty-response','default'));
  assertLocalizedStatic(presentationIdForEvent(catalog,'guard.cross.tavern-receipt','default'));
  assertLocalizedStatic(presentationIdForGuardState('poverty-response-recorded'));
  assertLocalizedStatic(presentationIdForGuardState('tavern-evidence-known'));

  const published=Object.keys(presentation.slots??{}).filter(id=>id.includes('guard'));
  assert.equal(published.some(id=>/secret-debt|merchant|palace|assassin|prostitute/i.test(id)),false);
});

test('C2-175 Guard Badge and Sealed Pass presentation is access-only and live-item backed',()=>{
  for(const itemId of GUARD_ITEM_IDS){
    const item=catalog.definitions.itemDefinitions.find(item=>String(item.id)===itemId);
    assert.ok(item,itemId);
    assertLocalizedStatic(presentationIdForGuardItem(itemId));
  }
  assert.match(localization['presentation.static.guard.item.guard_badge.alt'].en,/access to options/i);
  assert.match(localization['presentation.static.guard.item.guard_sealed_pass.alt'].en,/not immunity or a combat bonus/i);
  assert.match(app,/data-guard-item=/);
});

test('C2-176 Guard School boundary exposes only the two D40 publishers and no legacy guard.school namespace',()=>{
  assert.deepEqual([...GUARD_SCHOOL_EVENT_IDS],[
    'd40.school.guard.literacy',
    'd40.school.guard.etiquette'
  ]);
  assert.equal(catalog.events.some(event=>event.id.startsWith('guard.school.')),false);
  const published=Object.keys(presentation.slots??{}).filter(id=>id.includes('guard-school')||id.includes('guard.school'));
  assert.deepEqual(published,[]);
});

test('C2-177 crisis and late routes are readiness presentation rather than invented endings',()=>{
  for(const eventId of GUARD_ROUTE_EVENT_IDS)assertLocalizedStatic(presentationIdForEvent(catalog,eventId,'default'));
  for(const stateId of ['veteran-ready','officer-ready','reform-ready','network-ready','major-case-thread','major-case-ready','crisis-resolved']){
    assertLocalizedStatic(presentationIdForGuardState(stateId));
  }
  for(const key of [
    'ui.guard.crisisFeedback.stabilize-by-report',
    'ui.guard.crisisFeedback.deescalate-crowd',
    'ui.guard.crisisFeedback.trade-access-network',
    'ui.guard.crisisFeedback.defer'
  ]){
    assert.ok(localization[key]?.ru?.trim(),key+' ru');
    assert.ok(localization[key]?.en?.trim(),key+' en');
  }
  for(const id of ['ending/guard/officer','ending/guard/reform-order','ending/guard/network','ending/guard/major-case']){
    assert.equal(presentation.slots[id],undefined,id);
  }
});

test('C2-178 Guard Hard Work remains present alongside the exact D40 ending surfaces',()=>{
  const endingId='ending.guard.hard-work';
  assert.ok(catalog.definitions.endings.some(ending=>ending.id===endingId));
  assert.equal(presentationIdForEnding(endingId),'ending/guard/hard-work');
  assertLocalizedStatic('ending/guard/hard-work');
  assert.deepEqual(
    catalog.definitions.endings.filter(ending=>ending.id.includes('guard')).map(ending=>ending.id),
    [
      endingId,
      'ending.guard.officer',
      'ending.guard.reform',
      'ending.guard.network',
      'ending.guard.major-case'
    ]
  );
});

test('C2-179 integrated 65 Guard surfaces have RU EN alt-caption parity and animation-off static safety',()=>{
  const checked=applyPresentation(catalog,presentation);
  const guardSlots=Object.entries<any>(presentation.slots??{}).filter(([id])=>id.includes('guard'));
  assert.equal(guardSlots.length,67,'complete integrated Guard surface count with D42 Night surfaces');
  for(const [id,slot] of guardSlots){
    assertLocalizedStatic(id);
    const off=resolvePresentation(checked,presentation,id,{animationsEnabled:false,occurrenceKey:'c2-179'});
    assert.equal(off.textOnly,false,id);
    assert.equal(off.selected?.source,'override-static',id);
    assert.equal(off.selected?.src,slot.static.src,id);
  }
  assert.match(css,/\.guard-relationship-stage\[tabindex\]:focus-visible/);
  assert.match(css,/\.guard-item-chip\[tabindex\]:focus-visible/);
  assert.match(css,/\.guard-state-chip\[tabindex\]:focus-visible/);
});

test('C2-179 every published Guard event override maps to one exact frozen production event',()=>{
  const expected=new Set(
    catalog.events
      .filter(event=>event.sourceDomain==='guard')
      .flatMap(event=>event.variants.map(variant=>presentationIdForEvent(catalog,event.id,variant.id)))
  );
  assert.equal(expected.size,29);
  const published=Object.keys(presentation.slots??{}).filter(id=>id.startsWith('job/guard/event/'));
  assert.equal(published.length,29);
  for(const id of published)assert.ok(expected.has(id),id+' exact catalog backing');
});

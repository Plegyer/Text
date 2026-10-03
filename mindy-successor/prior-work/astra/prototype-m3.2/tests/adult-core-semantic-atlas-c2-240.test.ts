import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {presentationSlots} from '../src/core/presentation.ts';
import {catalog} from './helpers.ts';

const atlas=JSON.parse(readFileSync('content/presentation-drafts/adult-core-semantic-atlas-v1.json','utf8'));
const manifest=JSON.parse(readFileSync('content/presentation-drafts/project-owned-animation-source-manifest-v4.json','utf8'));

test('C2-240 adult semantic atlas keeps current production adult binding count at zero',()=>{
  assert.equal(atlas.status,'PREP_ONLY_NO_PRODUCTION_BINDING');
  assert.equal(atlas.currentState.dedicatedAdultProductionConsumerCount,0);
  assert.equal(atlas.currentState.adultMediaProductionBindingCount,0);
  assert.equal(atlas.currentState.safeDefaultsRemainNonAdult,true);
  assert.equal(atlas.currentState.chat6AssetInventoryIsGameplayAuthority,false);

  const liveAdult=atlas.liveBound.filter((row:any)=>row.adult===true);
  assert.deepEqual(liveAdult,[]);
});

test('C2-240 all LIVE_BOUND precedent presentation IDs exist and remain marked non-adult',()=>{
  const known=new Set(presentationSlots(catalog).map(slot=>slot.id));
  assert.equal(atlas.liveBound.length,11);
  for(const row of atlas.liveBound){
    assert.equal(row.status,'LIVE_BOUND',row.presentationId);
    assert.equal(row.adult,false,row.presentationId);
    assert.ok(known.has(row.presentationId),row.presentationId);
  }
});

test('C2-240 future adult semantic identities remain PENDING_RUNTIME_ID with no reserved production ids',()=>{
  assert.ok(atlas.pendingRuntimeIdentities.length>0);
  for(const row of atlas.pendingRuntimeIdentities){
    assert.equal(row.status,'PENDING_RUNTIME_ID',row.family+': '+row.concept);
    assert.equal('runtimeId' in row,false,row.concept+' must not invent runtimeId');
    assert.equal('presentationId' in row,false,row.concept+' must not reserve presentationId');
  }

  const families=new Set(atlas.familyTaxonomy.map((row:any)=>row.family));
  for(const family of ['work-adult','Night-adult','relationship-adult','route-adult','ending-adult','dependency-adult']){
    assert.ok(families.has(family),family);
  }
  for(const row of atlas.familyTaxonomy)assert.equal(row.status,'PENDING_RUNTIME_ID');
});

test('C2-240 forbidden adult-core assumptions remain NO_AUTHORITY_NOT_BINDABLE',()=>{
  assert.ok(atlas.forbiddenOrUnowned.length>0);
  for(const row of atlas.forbiddenOrUnowned){
    assert.equal(row.status,'NO_AUTHORITY_NOT_BINDABLE',row.concept);
  }

  const text=atlas.forbiddenOrUnowned.map((row:any)=>row.concept).join('|');
  assert.match(text,/safe\/default presentation ID/);
  assert.match(text,/asset filename/);
  assert.match(text,/Night\/private context/);
  assert.match(text,/partner automatically treated as romance/);
  assert.match(text,/client automatically treated as relationship or romance/);
  assert.match(text,/private room treated as consent/);
  assert.match(text,/Lust threshold/);
  assert.match(text,/voluntary and coercive\/dependency/);
  assert.match(text,/ending payoff creates ending eligibility or Meta reward/);
  assert.match(text,/Chat 2 sources or procures Chat 6 media inventory/);
});

test('C2-240 fallback, Night and accessibility architecture stays presentation-only',()=>{
  assert.deepEqual(
    atlas.architectureVocabulary.nightInterceptPoints,
    ['before_lodging','after_lodging','after_choice']
  );
  assert.deepEqual(
    atlas.architectureVocabulary.fallbackOrder,
    ['exact semantic','compatible adult family fallback','safe exact/context static','generic safe fallback']
  );
  assert.equal(atlas.fallbackRules.adultAssetMayAttachToSafeDefault,false);
  assert.equal(atlas.fallbackRules.crossVoluntaryDependencyFallback,false);
  assert.equal(atlas.fallbackRules.safeStaticRequiredForFutureAdultConsumer,true);
  assert.equal(atlas.fallbackRules.missingMediaMayChangeGameplay,false);
  assert.equal(atlas.fallbackRules.animationOffMayChangeSemanticIdentity,false);
  assert.equal(atlas.accessibilityRules.ruEnParityRequired,true);
  assert.equal(atlas.accessibilityRules.filenameDerivedAltForbidden,true);
  assert.equal(atlas.accessibilityRules.inferRomanceForbidden,true);
  assert.equal(atlas.accessibilityRules.inferConsentForbidden,true);
});

test('C2-240 current project-owned animation manifest has no adult/intimacy production binding',()=>{
  const sequences=manifest.sequences??[];
  const adult=sequences.filter((row:any)=>{
    const haystack=[
      row.sequenceKey,
      row.presentationId,
      row.candidateKey,
      row.gifPath
    ].filter(Boolean).join('|').toLowerCase();
    return haystack.includes('adult')||haystack.includes('intim');
  });
  assert.deepEqual(adult,[]);
});

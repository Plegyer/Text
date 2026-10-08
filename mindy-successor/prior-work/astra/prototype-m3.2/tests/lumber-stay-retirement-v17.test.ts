import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {energyMax,freshSave,palaceAvailable,parseSave} from '../src/core/engine.ts';
import {
  LUMBER_STAY_LEGACY_PERK_ID,
  RETIRED_LUMBER_STAY_ENDING_ID,
  RETIRED_LUMBER_STAY_UNLOCK_ID
} from '../src/core/lumberStayLegacy.ts';
import {catalog,definitions} from './helpers.ts';

const ordinaryPrefixes=[
  'ending.lumber.','ending.satyr-maid.','ending.undead-farm.','ending.tavern.','ending.hunter.',
  'ending.guard.','ending.merchant.','ending.artist-geisha.','ending.assassin.','ending.prostitute.'
] as const;

function serialized<T>(value:T){return JSON.parse(JSON.stringify(value));}

test('v17 live ordinary-career surface is exactly canonical 40 and has no lumber-stay/vitality acquisition',()=>{
  const ordinary=definitions.endings.filter((ending:any)=>ordinaryPrefixes.some(prefix=>ending.id.startsWith(prefix)));
  assert.equal(ordinary.length,40);
  assert.equal(new Set(ordinary.map((ending:any)=>ending.id)).size,40);
  assert.equal(definitions.endings.some((ending:any)=>ending.id===RETIRED_LUMBER_STAY_ENDING_ID),false);
  assert.equal(definitions.endings.some((ending:any)=>ending.reward===RETIRED_LUMBER_STAY_UNLOCK_ID),false);
  assert.deepEqual(
    definitions.endings.filter((ending:any)=>ending.id.startsWith('ending.lumber.')).map((ending:any)=>ending.id),
    ['ending.lumber.hard-work','ending.lumber.forewoman','ending.lumber.forest']
  );
});

test('completed lumber-stay and vitality normalize to one historical +1 Energy perk',()=>{
  const state=freshSave({
    completedEndings:[RETIRED_LUMBER_STAY_ENDING_ID],
    unlocks:[RETIRED_LUMBER_STAY_UNLOCK_ID]
  });
  assert.deepEqual(state.meta.completedEndings,[RETIRED_LUMBER_STAY_ENDING_ID]);
  assert.equal(state.meta.unlocks.includes(RETIRED_LUMBER_STAY_UNLOCK_ID),false);
  assert.deepEqual(state.meta.activeLegacyPerks,[LUMBER_STAY_LEGACY_PERK_ID]);
  assert.equal(energyMax(state),4);
  assert.equal(state.run.dayState.energyCurrent,4);
  assert.equal(palaceAvailable(state.meta,[]),false);
  assert.deepEqual(state.meta.hardWorkProgress,[]);
  assert.deepEqual(state.meta.strongMeta.ownership.ownedRewardIds,[]);
});

test('vitality-only evidence preserves benefit without fabricating completion; no evidence grants nothing',()=>{
  const historical=freshSave({unlocks:[RETIRED_LUMBER_STAY_UNLOCK_ID]});
  assert.equal(historical.meta.completedEndings.includes(RETIRED_LUMBER_STAY_ENDING_ID),false);
  assert.deepEqual(historical.meta.activeLegacyPerks,[LUMBER_STAY_LEGACY_PERK_ID]);
  assert.equal(historical.meta.unlocks.includes(RETIRED_LUMBER_STAY_UNLOCK_ID),false);
  assert.equal(energyMax(historical),4);

  const fresh=freshSave();
  assert.equal(fresh.meta.activeLegacyPerks.includes(LUMBER_STAY_LEGACY_PERK_ID),false);
  assert.equal(energyMax(fresh),3);
});

test('eligible-only retired ending is removed without reward or modern completion',()=>{
  const raw=freshSave();
  raw.run.endings.eligible=[RETIRED_LUMBER_STAY_ENDING_ID];
  const migrated=parseSave(JSON.stringify(raw),catalog);
  assert.equal(migrated.run.endings.eligible.includes(RETIRED_LUMBER_STAY_ENDING_ID),false);
  assert.equal(migrated.meta.completedEndings.includes(RETIRED_LUMBER_STAY_ENDING_ID),false);
  assert.equal(migrated.meta.activeLegacyPerks.includes(LUMBER_STAY_LEGACY_PERK_ID),false);
});

test('committed but unfinished retired ending is cancelled and active run resumes without reward',()=>{
  const raw=freshSave();
  raw.run.status='ending_committed';
  raw.run.endings.eligible=[RETIRED_LUMBER_STAY_ENDING_ID];
  raw.run.endings.committed=RETIRED_LUMBER_STAY_ENDING_ID;
  raw.run.endings.result=null;

  const migrated=parseSave(JSON.stringify(raw),catalog);
  assert.equal(migrated.run.status,'active');
  assert.equal(migrated.run.endings.committed,null);
  assert.equal(migrated.run.endings.result,null);
  assert.equal(migrated.run.endings.eligible.includes(RETIRED_LUMBER_STAY_ENDING_ID),false);
  assert.equal(migrated.meta.activeLegacyPerks.includes(LUMBER_STAY_LEGACY_PERK_ID),false);
});

test('existing historical RunResult and transaction proof are preserved exactly',()=>{
  const raw=freshSave();
  raw.meta.completedEndings=[RETIRED_LUMBER_STAY_ENDING_ID];
  raw.meta.unlocks=[RETIRED_LUMBER_STAY_UNLOCK_ID];
  raw.meta.appliedResultTransactions=['tx.legacy.lumber-stay'];
  raw.run.status='ended';
  raw.run.endings.committed=RETIRED_LUMBER_STAY_ENDING_ID;
  raw.run.endings.result={
    resultId:'rr.legacy.lumber-stay',
    endingId:RETIRED_LUMBER_STAY_ENDING_ID,
    transactionId:'tx.legacy.lumber-stay',
    completedAtDay:17,
    firstCompletion:true,
    appliedMetaRewardIds:['legacy.reward.vitality']
  };
  const expected=structuredClone(raw.run.endings.result);

  const migrated=parseSave(JSON.stringify(raw),catalog);
  assert.deepEqual(migrated.run.endings.result,expected);
  assert.equal(migrated.run.endings.committed,RETIRED_LUMBER_STAY_ENDING_ID);
  assert.ok(migrated.meta.completedEndings.includes(RETIRED_LUMBER_STAY_ENDING_ID));
  assert.deepEqual(migrated.meta.activeLegacyPerks,[LUMBER_STAY_LEGACY_PERK_ID]);
  assert.equal(migrated.meta.unlocks.includes(RETIRED_LUMBER_STAY_UNLOCK_ID),false);
  assert.deepEqual(migrated.meta.appliedResultTransactions,['tx.legacy.lumber-stay']);
});

test('ended pre-RunResult lumber-stay gets deterministic compatibility proof without reward replay',()=>{
  const raw=freshSave();
  raw.meta.completedEndings=[RETIRED_LUMBER_STAY_ENDING_ID];
  raw.meta.unlocks=[];
  raw.meta.appliedResultTransactions=[];
  raw.run.status='ended';
  raw.run.endings.committed=RETIRED_LUMBER_STAY_ENDING_ID;
  raw.run.endings.result=null;

  const once=parseSave(JSON.stringify(raw),catalog);
  assert.equal(once.run.endings.result?.endingId,RETIRED_LUMBER_STAY_ENDING_ID);
  assert.equal(once.run.endings.result?.firstCompletion,false);
  assert.deepEqual(once.run.endings.result?.appliedMetaRewardIds,[]);
  assert.ok(once.run.endings.result?.transactionId);
  assert.ok(once.meta.appliedResultTransactions.includes(once.run.endings.result!.transactionId));
  assert.deepEqual(once.meta.activeLegacyPerks,[LUMBER_STAY_LEGACY_PERK_ID]);

  const twice=parseSave(JSON.stringify(once),catalog);
  assert.deepEqual(serialized(twice),serialized(once));
});

test('profile merge dedupes historical perk and strips duplicate vitality evidence',()=>{
  const saved=freshSave({completedEndings:[RETIRED_LUMBER_STAY_ENDING_ID]});
  const current=freshSave({
    unlocks:[RETIRED_LUMBER_STAY_UNLOCK_ID],
    activeLegacyPerks:[LUMBER_STAY_LEGACY_PERK_ID,LUMBER_STAY_LEGACY_PERK_ID]
  }).meta;
  const merged=parseSave(JSON.stringify(saved),catalog,current);
  assert.equal(merged.meta.activeLegacyPerks.filter(id=>id===LUMBER_STAY_LEGACY_PERK_ID).length,1);
  assert.equal(merged.meta.unlocks.includes(RETIRED_LUMBER_STAY_UNLOCK_ID),false);
  assert.equal(energyMax(merged),4);
});

test('live presentation/source inventory retires ending/lumber-stay while legacy localization remains available',()=>{
  const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));
  const manifest=JSON.parse(readFileSync('content/presentation-drafts/presentation-hardening-v9-manifest-v1.json','utf8'));
  const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
  const appSource=readFileSync('src/ui/app.ts','utf8');

  assert.equal(presentation.slots?.['ending/lumber-stay'],undefined);
  assert.equal(manifest.reachability.activeExact.some((row:any)=>row.presentationId==='ending/lumber-stay'),false);
  assert.equal(
    manifest.sourceIntegrity.uniqueProjectOwnedSources.some((row:any)=>(row.semanticIds??[]).includes('ending/lumber-stay')),
    false
  );
  assert.equal(manifest.endingParity.existingEndingPresentationIds.some((row:any)=>row.presentationId==='ending/lumber-stay'),false);

  for(const key of [
    'ending.lumber-stay.title',
    'ending.lumber-stay.description',
    'unlock.vitality.label',
    'presentation.static.ending.lumber-stay.alt',
    'presentation.static.ending.lumber-stay.caption'
  ])assert.equal(localization[key],undefined,key);

  for(const key of [
    'legacy.ending.lumber-stay.title',
    'legacy.ending.lumber-stay.description',
    'legacy.perk.lumber-stay-vitality.label'
  ])assert.ok(localization[key],key);

  assert.match(appSource,/data-legacy-ending-id/);
  assert.match(appSource,/legacy\.ending\.lumber-stay\.title/);
  assert.match(appSource,/job\/lumber\/result\/default/);
  assert.doesNotMatch(appSource,/presentationIdForEnding\(retiredLumberStayId\)/);
});

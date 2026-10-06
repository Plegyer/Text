import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';

const FIXTURE_PATH='tests/fixtures/final-player-facing-golden-v54.json';
const VALIDATOR_PATH='tests/final-player-facing-golden-manifest-v55.test.ts';
const HANDOFF_PATH='../../../docs/tasks/CHAT6_FINAL_PLAYER_FACING_GOLDEN_MANIFEST_v56.md';

const EXPECTED_FIXTURE_BLOB='bc8617be68825543ed7617e9dd5c7d915f6b0e14';
const EXPECTED_VALIDATOR_BLOB='e40737f3c6d6da83d1e4692e4457c04936279d53';
const EXPECTED_HANDOFF_BLOB='f249b0e8de6db53868433c19db37c53f3bd483ac';

function gitBlobSha(text:string){
  const header=Buffer.from('blob '+Buffer.byteLength(text,'utf8')+'\0','utf8');
  return createHash('sha1').update(header).update(text,'utf8').digest('hex');
}

function assertNoDuplicateJsonObjectKeys(raw:string){
  let i=0;
  const len=raw.length;
  const skipWs=()=>{while(i<len&&/\s/.test(raw[i]!))i++;};
  const parseString=()=>{
    skipWs();
    assert.equal(raw[i],'"','expected JSON string at '+i);
    const start=i++;
    let escaped=false;
    while(i<len){
      const ch=raw[i++]!;
      if(escaped){escaped=false;continue;}
      if(ch==='\\'){escaped=true;continue;}
      if(ch==='"')return JSON.parse(raw.slice(start,i)) as string;
    }
    assert.fail('unterminated JSON string at '+start);
  };
  const parseValue=(path:string):void=>{
    skipWs();
    const ch=raw[i];
    if(ch==='{'){
      i++;
      skipWs();
      const keys=new Set<string>();
      if(raw[i]==='}'){i++;return;}
      while(true){
        const key=parseString();
        assert.equal(keys.has(key),false,'duplicate JSON object key at '+path+': '+key);
        keys.add(key);
        skipWs();
        assert.equal(raw[i],':','expected colon after '+path+'.'+key);
        i++;
        parseValue(path+'.'+key);
        skipWs();
        if(raw[i]===','){i++;continue;}
        assert.equal(raw[i],'}','expected object close at '+path);
        i++;
        return;
      }
    }
    if(ch==='['){
      i++;
      skipWs();
      if(raw[i]===']'){i++;return;}
      let index=0;
      while(true){
        parseValue(path+'['+index+']');
        index++;
        skipWs();
        if(raw[i]===','){i++;continue;}
        assert.equal(raw[i],']','expected array close at '+path);
        i++;
        return;
      }
    }
    if(ch==='"'){parseString();return;}
    const start=i;
    while(i<len&&!/[\s,\]}]/.test(raw[i]!))i++;
    const token=raw.slice(start,i);
    assert.ok(token.length>0,'expected JSON primitive at '+path);
    assert.doesNotThrow(()=>JSON.parse(token),'invalid JSON primitive '+token+' at '+path);
  };

  parseValue('$');
  skipWs();
  assert.equal(i,len,'trailing JSON content at '+i);
}

function unique(values:readonly string[],label:string){
  assert.equal(new Set(values).size,values.length,label+' contains duplicates');
}

function pairComplete(value:any){
  return !!value&&typeof value.ru==='string'&&value.ru.trim().length>0&&typeof value.en==='string'&&value.en.trim().length>0;
}

test('v57 freezes the accepted v54-v56 package byte-for-byte',()=>{
  const fixtureRaw=readFileSync(FIXTURE_PATH,'utf8');
  const validatorRaw=readFileSync(VALIDATOR_PATH,'utf8');
  const handoffRaw=readFileSync(HANDOFF_PATH,'utf8');

  assert.equal(gitBlobSha(fixtureRaw),EXPECTED_FIXTURE_BLOB,'fixture drifted from accepted v54-v56 head');
  assert.equal(gitBlobSha(validatorRaw),EXPECTED_VALIDATOR_BLOB,'validator drifted from accepted v54-v56 head');
  assert.equal(gitBlobSha(handoffRaw),EXPECTED_HANDOFF_BLOB,'v56 handoff drifted from accepted v54-v56 head');

  assertNoDuplicateJsonObjectKeys(fixtureRaw);
});

test('v57 fixture counts, disjointness, and collision metadata are internally coherent',()=>{
  const manifest=JSON.parse(readFileSync(FIXTURE_PATH,'utf8')) as any;
  assert.equal(manifest.schemaVersion,1);
  assert.equal(manifest.id,'chat6.final-player-facing.golden.v54');
  assert.equal(manifest.status,'FINAL_EXPECTATION_POST_INTEGRATION_REQUIRED');

  const requiredLoc=manifest.localization.required as Record<string,any>;
  const retainedLoc=manifest.localization.retainedCompatibility as Record<string,any>;
  const forbiddenLoc=manifest.localization.forbidden as string[];
  const requiredPresentation=manifest.presentation.required as Record<string,any>;
  const presentationDelete=manifest.presentation.deleteTargets as string[];
  const retiredPresentation=manifest.presentation.retiredAbsentTargets as string[];

  assert.equal(Object.keys(requiredLoc).length,manifest.counts.requiredLocalizationTargets);
  assert.equal(Object.keys(requiredLoc).length,343);
  assert.equal(manifest.counts.orderedLocalizationOperations,344);
  assert.equal(forbiddenLoc.length,manifest.counts.forbiddenLocalizationTargets);
  assert.equal(forbiddenLoc.length,17);
  assert.equal(Object.keys(retainedLoc).length,manifest.counts.retainedTavernCompatibilityTargets);
  assert.equal(Object.keys(retainedLoc).length,9);
  assert.equal(Object.keys(requiredPresentation).length,manifest.counts.requiredPresentationTargets);
  assert.equal(Object.keys(requiredPresentation).length,127);
  assert.equal(presentationDelete.length,manifest.counts.presentationDeleteTargets);
  assert.equal(presentationDelete.length,1);
  assert.equal(retiredPresentation.length,manifest.counts.retiredTavernPresentationAbsentTargets);
  assert.equal(retiredPresentation.length,3);

  unique(forbiddenLoc,'forbidden localization');
  unique(presentationDelete,'presentation delete targets');
  unique(retiredPresentation,'retired presentation targets');

  const requiredLocKeys=new Set(Object.keys(requiredLoc));
  const retainedLocKeys=new Set(Object.keys(retainedLoc));
  for(const key of forbiddenLoc){
    assert.equal(requiredLocKeys.has(key),false,key+' is both required and forbidden');
    assert.equal(retainedLocKeys.has(key),false,key+' is both historical-retained and forbidden');
  }
  for(const key of retainedLocKeys)assert.equal(requiredLocKeys.has(key),false,key+' is both required and historical-only');
  for(const slot of presentationDelete)assert.equal(slot in requiredPresentation,false,slot+' is both required and deleted');
  for(const slot of retiredPresentation)assert.equal(slot in requiredPresentation,false,slot+' is both required and retired-absent');

  for(const [key,row] of Object.entries(requiredLoc))assert.ok(pairComplete((row as any).value),key+' lacks RU/EN');
  for(const [key,row] of Object.entries(retainedLoc))assert.ok(pairComplete((row as any).value),key+' historical row lacks RU/EN');

  const activity=manifest.activityNetworkFinalAuthority;
  assert.equal(activity.authority,'Activity Network v36');
  assert.deepEqual(requiredLoc[activity.key].value,activity.finalValue);
  assert.deepEqual(requiredLoc[activity.key].predecessorValue,activity.predecessorValue);
  assert.notDeepEqual(activity.finalValue,activity.predecessorValue);
});

test('v57 D48 and D42 declarations are unique, complete, and reference live manifest targets',()=>{
  const manifest=JSON.parse(readFileSync(FIXTURE_PATH,'utf8')) as any;
  const requiredPresentation=manifest.presentation.required as Record<string,any>;
  const d48=manifest.presentation.d48;

  unique(d48.assets,'D48 assets');
  unique(d48.allowedSlots,'D48 slots');
  assert.equal(d48.assets.length,4);
  assert.equal(d48.allowedSlots.length,17);
  assert.equal(d48.allowedSlots.length,manifest.counts.d48PresentationReplacements);

  const union=new Set<string>();
  for(const asset of d48.assets as string[]){
    assert.match(asset,/^assets\/presentation\/palace-[a-z0-9-]+\.svg$/);
    const expectedAltKey='presentation.static.'+asset.split('/').at(-1)!.replace(/\.svg$/,'').replace(/^palace-/,'palace.')+'.alt';
    const family=d48.allowedSlotsByAsset[asset] as string[];
    assert.ok(Array.isArray(family)&&family.length>0,asset+' needs an allowed slot family');
    unique(family,asset+' allowed slots');
    for(const slot of family){
      assert.equal(union.has(slot),false,slot+' appears in multiple D48 families');
      union.add(slot);
      assert.ok(slot.startsWith('job/palace/')||slot.startsWith('ending/palace/')||slot.startsWith('location/town/palace/'),slot+' is not Palace-only');
      const row=requiredPresentation[slot];
      assert.ok(row,slot+' missing from required presentation');
      assert.equal(row.operation,'replace',slot+' must be a v19 -> D48 replacement');
      assert.ok(row.predecessorValue,slot+' must retain the v19 predecessor for collision detection');
      assert.equal(row.value?.static?.src,asset,slot+' D48 source mismatch');
      assert.equal(row.value?.static?.altKey,expectedAltKey,slot+' D48 altKey family mismatch');
    }
  }
  assert.deepEqual([...union].sort(),[...d48.allowedSlots].sort());

  for(const slot of d48.invitationNeutralSlots as string[]){
    assert.equal(union.has(slot),false,slot+' invitation cannot be D48');
    assert.equal(requiredPresentation[slot]?.value?.static?.src,'assets/stage-town.svg',slot+' must remain neutral town');
  }

  const d42Loc=manifest.d42NightPreservation.localizationKeys as string[];
  const d42Presentation=manifest.d42NightPreservation.presentationSlots as string[];
  unique(d42Loc,'D42 localization preservation');
  unique(d42Presentation,'D42 presentation preservation');
  assert.equal(d42Loc.length,110);
  assert.equal(d42Loc.length,manifest.counts.d42NightLocalizationTargets);
  assert.equal(d42Presentation.length,12);
  assert.equal(d42Presentation.length,manifest.counts.d42NightPresentationTargets);
  for(const key of d42Loc)assert.ok(manifest.localization.required[key],key+' missing from final localization requirements');
  for(const slot of d42Presentation)assert.ok(requiredPresentation[slot],slot+' missing from final presentation requirements');
});

test('v57 Strong Meta/modal and retirement metadata cannot silently collapse',()=>{
  const manifest=JSON.parse(readFileSync(FIXTURE_PATH,'utf8')) as any;
  const strong=manifest.ui.strongMetaModal;
  const hunkIds=(strong.semanticHunks as any[]).map(hunk=>hunk.id);
  unique(hunkIds,'Strong Meta semantic hunk IDs');
  assert.equal(hunkIds.length,7);
  assert.equal(strong.selectionContract.maxKeystone,1);
  assert.equal(strong.selectionContract.maxSpecialists,2);
  assert.equal(strong.selectionContract.cap200Class,'specialist');
  assert.equal(strong.selectionContract.automaticKnowledgeSlotFree,true);
  assert.equal(strong.selectionContract.hardWorkPackagesOutsideStrongMeta,true);

  const modalEntries=Object.entries(strong.modalAccessibleNames.expected as Record<string,any>);
  assert.equal(modalEntries.length,11);
  for(const [panel,row] of modalEntries){
    assert.ok((row as any).localizationKey,panel+' missing modal localization key');
    assert.ok(pairComplete((row as any).value),panel+' modal accessible name lacks RU/EN');
  }

  unique(manifest.retiredSurfaces.tavern.forbiddenEndingDefinitionIds,'retired Tavern ending IDs');
  unique(manifest.retiredSurfaces.tavern.forbiddenPresentationSlots,'retired Tavern presentation slots');
  unique(manifest.retiredSurfaces.tavern.historicalLocalizationKeys,'retired Tavern historical localization');
  unique(manifest.retiredSurfaces.lumberStayVitality.forbiddenEndingDefinitionIds,'retired lumber ending IDs');
  unique(manifest.retiredSurfaces.lumberStayVitality.forbiddenPresentationSlots,'retired lumber presentation slots');
  unique(manifest.retiredSurfaces.lumberStayVitality.historicalLocalizationKeys,'retired lumber historical localization');
});

test('v57 keeps final-target execution explicitly opt-in',()=>{
  const source=readFileSync(VALIDATOR_PATH,'utf8');
  assert.match(source,/FINAL_PLAYER_FACING_GOLDEN_TARGET==='1'/);
  assert.match(source,/\{skip:!FINAL_TARGET\}/);
  assert.match(source,/THIRD_VALUE_CONFLICT/);
  assert.match(source,/THIRD_VALUE_PRESENTATION_CONFLICT/);
});

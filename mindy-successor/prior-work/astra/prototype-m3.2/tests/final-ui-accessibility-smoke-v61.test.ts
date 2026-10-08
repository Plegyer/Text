import test from 'node:test';
import assert from 'node:assert/strict';
import {assertStage5OverlayAuthority,stage5FinalExpectedLocalization} from './stage5-secret-debt-ru-adjudication-v1.ts';
import {existsSync,readFileSync,readdirSync} from 'node:fs';

const MATRIX_PATH='tests/fixtures/final-ui-accessibility-smoke-v60.json';
const GOLDEN_PATH='tests/fixtures/final-player-facing-golden-v54.json';
const FINAL_TARGET=process.env.FINAL_UI_ACCESSIBILITY_SMOKE_TARGET==='1';

const matrix=JSON.parse(readFileSync(MATRIX_PATH,'utf8')) as any;
const golden=JSON.parse(readFileSync(GOLDEN_PATH,'utf8')) as any;

type Issue={code:string;target:string;detail?:string};

function same(a:unknown,b:unknown){return JSON.stringify(a)===JSON.stringify(b);}
function pairComplete(value:any){
  return !!value&&typeof value.ru==='string'&&value.ru.trim().length>0&&typeof value.en==='string'&&value.en.trim().length>0;
}
function unique(values:string[],label:string){assert.equal(new Set(values).size,values.length,label+' contains duplicates');}
function readJson(path:string,issues:Issue[]){
  if(!existsSync(path)){issues.push({code:'MISSING_TARGET_FILE',target:path});return {};}
  try{return JSON.parse(readFileSync(path,'utf8'));}
  catch(error){issues.push({code:'INVALID_TARGET_JSON',target:path,detail:error instanceof Error?error.message:String(error)});return {};}
}
function issue(issues:Issue[],code:string,target:string,detail?:string){issues.push(detail?{code,target,detail}:{code,target});}

test('v61 smoke matrix is internally coherent and anchored to the golden contract',()=>{
  assertStage5OverlayAuthority(golden.localization.required);
  assert.equal(matrix.schemaVersion,1);
  assert.equal(matrix.id,'chat6.final-ui-accessibility-smoke.v60');
  assert.equal(matrix.status,'POST_INTEGRATION_RENDERED_EXECUTION_REQUIRED');
  assert.equal(matrix.authorities.goldenFixtureBlob,'bc8617be68825543ed7617e9dd5c7d915f6b0e14');
  assert.equal(matrix.global.finalIntegrationEnv,'FINAL_UI_ACCESSIBILITY_SMOKE_TARGET');

  const ids=matrix.surfaces.map((surface:any)=>surface.id);
  unique(ids,'surface IDs');
  for(const id of [
    'character-creation-strong-meta-selector','strong-meta-automatic-source-method','localized-modal-accessible-names',
    'secret-debt-status-actions-endings','d42-night-player-facing','activity-network-v36-ending',
    'palace-invitation-progression-confrontation-endings','palace-d48-media-accessibility-firewall',
    'retired-tavern-historical-display','retired-lumber-vitality-historical-display'
  ])assert.ok(ids.includes(id),'missing surface '+id);

  for(const surface of matrix.surfaces){
    assert.equal(typeof surface.prerequisiteState,'string',surface.id+' prerequisite');
    assert.ok(surface.sourceAuthority?.length,surface.id+' source authority');
    assert.equal(surface.finalIntegrationOnly,true,surface.id+' must be final-integration smoke');
    for(const [key,value] of Object.entries(surface.expectedLocalization??{})){
      assert.ok(pairComplete(value),surface.id+' '+key+' RU/EN');
      const frozen=golden.localization.required[key]?.value??golden.localization.retainedCompatibility[key]?.value;
      if(frozen!==undefined)assert.deepEqual(value,frozen,surface.id+' '+key+' differs from golden fixture');
    }
    for(const [slot,value] of Object.entries(surface.expectedPresentation??{})){
      const frozen=golden.presentation.required[slot]?.value;
      if(frozen!==undefined)assert.deepEqual(value,frozen,surface.id+' '+slot+' differs from golden fixture');
    }
  }

  const modal=matrix.surfaces.find((surface:any)=>surface.id==='localized-modal-accessible-names');
  assert.equal(Object.keys(modal.expectedAccessibleNames).length,11);
  for(const [panel,row] of Object.entries(modal.expectedAccessibleNames as Record<string,any>)){
    assert.ok(pairComplete((row as any).value),panel+' accessible name RU/EN');
    assert.deepEqual((row as any).value,golden.ui.strongMetaModal.modalAccessibleNames.expected[panel].value);
  }

  const d42=matrix.surfaces.find((surface:any)=>surface.id==='d42-night-player-facing');
  assert.equal(Object.keys(d42.expectedLocalization).length,110);
  assert.equal(Object.keys(d42.expectedPresentation).length,12);

  const d48=matrix.surfaces.find((surface:any)=>surface.id==='palace-d48-media-accessibility-firewall');
  unique(d48.expectedMedia.assets,'D48 assets');
  unique(d48.expectedMedia.allowedSlots,'D48 slots');
  assert.equal(d48.expectedMedia.assets.length,4);
  assert.equal(d48.expectedMedia.allowedSlots.length,17);
  assert.deepEqual([...d48.expectedMedia.allowedSlots].sort(),[...golden.presentation.d48.allowedSlots].sort());

  const activity=matrix.surfaces.find((surface:any)=>surface.id==='activity-network-v36-ending');
  assert.deepEqual(activity.expectedLocalization['ending.ending.activity.network.epilogue'],golden.activityNetworkFinalAuthority.finalValue);
  assert.notDeepEqual(activity.expectedLocalization['ending.ending.activity.network.epilogue'],golden.activityNetworkFinalAuthority.predecessorValue);
});

test('v61 assembled UI/accessibility smoke satisfies the matrix', {skip:!FINAL_TARGET}, ()=>{
  const issues:Issue[]=[];
  const localizationDoc=readJson('content/localization.json',issues);
  const presentationDoc=readJson('content/presentation.json',issues);
  const definitions=readJson('content/definitions.json',issues);
  const localization=localizationDoc.strings??{};
  const presentation=presentationDoc.slots??{};
  const appPath='src/ui/app.ts';
  const strongPath='src/core/strongMeta.ts';
  const app=existsSync(appPath)?readFileSync(appPath,'utf8'):'';
  const strong=existsSync(strongPath)?readFileSync(strongPath,'utf8'):'';
  if(!app)issue(issues,'MISSING_TARGET_FILE',appPath);
  if(!strong)issue(issues,'MISSING_TARGET_FILE',strongPath);

  const rawPatterns=(matrix.global.rawInternalIdRegexes as string[]).map(pattern=>new RegExp(pattern,'i'));

  for(const surface of matrix.surfaces as any[]){
    for(const [key,expected] of Object.entries(surface.expectedLocalization??{})){
      if(!(key in localization)){issue(issues,'MISSING_RU_EN_COPY',key,surface.id);continue;}
      const actual=localization[key];
      if(!pairComplete(actual))issue(issues,'MISSING_RU_EN_COPY',key,surface.id);
      if(!same(actual,stage5FinalExpectedLocalization(key,expected as {ru:string;en:string})))issue(issues,'VISIBLE_COPY_MISMATCH',key,surface.id);
      if(surface.rawIdScan){
        for(const locale of ['ru','en']){
          const value=String(actual?.[locale]??'');
          for(const pattern of rawPatterns)if(pattern.test(value))issue(issues,'RAW_INTERNAL_ID_VISIBLE',key,locale+': '+pattern.source);
          for(const token of surface.forbiddenVisibleTokens??[])if(token&&value.includes(token))issue(issues,'FORBIDDEN_VISIBLE_OUTPUT',key,locale+': '+token);
        }
      }
    }

    for(const [slot,expected] of Object.entries(surface.expectedPresentation??{})){
      // The frozen v60 matrix encodes four Strong Meta scalars, not media slots.
      const semantic:Record<string,number|boolean>={maxKeystone:1,maxSpecialists:2,noAutoSelect:true,automaticKnowledgeSlotFree:true};
      if(Object.hasOwn(semantic,slot)){
        if(!same(expected,semantic[slot]))issue(issues,'STRONG_META_MATRIX_SEMANTIC_DRIFT',slot,surface.id);
        if(slot==='maxKeystone'&&!strong.includes('STRONG_META_KEYSTONE_CAPACITY=1'))issue(issues,'STRONG_META_CAPACITY_DRIFT',slot);
        if(slot==='maxSpecialists'&&!strong.includes('STRONG_META_SPECIALIST_CAPACITY=2'))issue(issues,'STRONG_META_CAPACITY_DRIFT',slot);
        continue;
      }
      if(!(slot in presentation)){issue(issues,'MISSING_PRESENTATION_SURFACE',slot,surface.id);continue;}
      if(!same(presentation[slot],expected))issue(issues,'PRESENTATION_SURFACE_MISMATCH',slot,surface.id);
      const media=presentation[slot]?.static;
      if(media?.kind==='image'){
        const altKey=media.altKey;
        const captionKey=typeof altKey==='string'&&altKey.endsWith('.alt')?altKey.slice(0,-4)+'.caption':'';
        if(!pairComplete(localization[altKey]))issue(issues,'MISSING_ACCESSIBLE_ALT',slot,String(altKey));
        if(!captionKey||!pairComplete(localization[captionKey]))issue(issues,'MISSING_ACCESSIBLE_CAPTION',slot,captionKey||'no caption key');
      }
    }

    for(const token of surface.requiredSourceTokens??[]){
      if(!app.includes(token)&&!strong.includes(token))issue(issues,'REQUIRED_UI_SEMANTIC_MISSING',surface.id,token);
    }
    for(const patternText of surface.forbiddenSourceRegexes??[]){
      const pattern=new RegExp(patternText);
      if(pattern.test(app)||pattern.test(strong))issue(issues,'FORBIDDEN_UI_SEMANTIC_PRESENT',surface.id,patternText);
    }

    for(const key of surface.forbiddenLocalizationKeys??[])if(key in localization)issue(issues,'RETIRED_LIVE_LOCALIZATION_RETURNED',key,surface.id);
    for(const slot of surface.forbiddenPresentationSlots??[])if(slot in presentation)issue(issues,'RETIRED_LIVE_PRESENTATION_RETURNED',slot,surface.id);
  }

  const endings=Array.isArray(definitions.endings)?definitions.endings:[];
  const endingIds=new Set(endings.map((ending:any)=>ending?.id).filter((id:any)=>typeof id==='string'));
  for(const surface of matrix.surfaces as any[]){
    for(const id of surface.requiredEndingDefinitionIds??[])if(!endingIds.has(id))issue(issues,'MISSING_REQUIRED_ENDING_DEFINITION',id,surface.id);
    for(const id of surface.forbiddenEndingDefinitionIds??[])if(endingIds.has(id))issue(issues,'RETIRED_LIVE_ENDING_RETURNED',id,surface.id);
    for(const reward of surface.forbiddenEndingRewardIds??[])if(endings.some((ending:any)=>ending?.reward===reward))issue(issues,'RETIRED_LIVE_REWARD_RETURNED',reward,surface.id);
  }

  const modal=matrix.surfaces.find((surface:any)=>surface.id==='localized-modal-accessible-names');
  for(const [panel,row] of Object.entries(modal.expectedAccessibleNames as Record<string,any>)){
    const key=(row as any).localizationKey;
    if(!same(localization[key],(row as any).value))issue(issues,'MISSING_MODAL_ACCESSIBLE_NAME',panel,key);
  }
  if(app.includes(matrix.global.rawPanelAriaForbiddenToken))issue(issues,'RAW_MODAL_ID_ARIA_RETURNED','generic-dialog');
  if(!app.includes(matrix.global.localizedPanelAriaRequiredToken))issue(issues,'LOCALIZED_MODAL_ARIA_MISSING','generic-dialog');

  if(!app.includes("selectable.filter(reward=>reward.class==='keystone')")||!app.includes("selectable.filter(reward=>reward.class==='specialist')")){
    issue(issues,'AUTOMATIC_KNOWLEDGE_SELECTION_FILTER_REGRESSION','strong-meta-automatic-source-method');
  }
  if(/data-strong-meta-(?:keystone|specialist)=[^\\n>]*source-method/i.test(app)){
    issue(issues,'AUTOMATIC_KNOWLEDGE_SELECTABLE','strong-meta-automatic-source-method','source-method');
  }

  const activity=matrix.surfaces.find((surface:any)=>surface.id==='activity-network-v36-ending');
  const activityKey='ending.ending.activity.network.epilogue';
  if(same(localization[activityKey],activity.forbiddenExactLocalizationValues[activityKey])){
    issue(issues,'ACTIVITY_NETWORK_OLD_WORDING_RETURNED',activityKey);
  }

  const d48=matrix.surfaces.find((surface:any)=>surface.id==='palace-d48-media-accessibility-firewall');
  const d48Assets=new Set<string>(d48.expectedMedia.assets);
  const allowed=new Set<string>(d48.expectedMedia.allowedSlots);
  const assetDir='assets/presentation';
  if(!existsSync(assetDir))issue(issues,'MISSING_D48_ASSET_DIRECTORY',assetDir);
  else{
    const palaceFiles=readdirSync(assetDir).filter(name=>/^palace-.*\.svg$/i.test(name)).map(name=>assetDir+'/'+name).sort();
    if(!same(palaceFiles,[...d48Assets].sort()))issue(issues,'D48_ASSET_SET_DRIFT',assetDir);
  }
  for(const asset of d48Assets)if(!existsSync(asset))issue(issues,'MISSING_D48_ASSET',asset);
  for(const [slot,value] of Object.entries(presentation)){
    for(const asset of d48Assets)if(JSON.stringify(value).includes(asset)&&!allowed.has(slot))issue(issues,'D48_MEDIA_LEAKED',slot,asset);
  }
  for(const slot of d48.expectedMedia.invitationNeutralSlots as string[]){
    if(presentation[slot]?.static?.src!==d48.expectedMedia.invitationFinalSource)issue(issues,'PALACE_INVITATION_MEDIA_REGRESSION',slot);
  }

  const palace=matrix.surfaces.find((surface:any)=>surface.id==='palace-invitation-progression-confrontation-endings');
  if(!pairComplete(localization['ui.palace.returnHome.explicitCommit']))issue(issues,'PALACE_EXPLICIT_RETURN_HOME_COPY_MISSING','ui.palace.returnHome.explicitCommit');
  for(const id of palace.requiredEndingDefinitionIds as string[])if(!endingIds.has(id))issue(issues,'PALACE_EXPLICIT_ENDING_MISSING',id);
  if(!presentation['ending/palace/return-home'])issue(issues,'PALACE_RETURN_HOME_PRESENTATION_MISSING','ending/palace/return-home');

  assert.deepEqual(
    issues,[],
    'final UI/accessibility smoke issues:\\n'+issues.map(item=>item.code+' '+item.target+(item.detail?' — '+item.detail:'')).join('\\n')
  );
});

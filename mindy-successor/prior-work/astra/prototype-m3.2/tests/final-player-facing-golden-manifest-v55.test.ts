import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync,readdirSync} from 'node:fs';
import {basename} from 'node:path';

const MANIFEST_PATH='tests/fixtures/final-player-facing-golden-v54.json';
const manifest=JSON.parse(readFileSync(MANIFEST_PATH,'utf8')) as any;
const FINAL_TARGET=process.env.FINAL_PLAYER_FACING_GOLDEN_TARGET==='1';

type Issue={code:string;target:string;detail?:string};

function same(a:unknown,b:unknown){
  return JSON.stringify(a)===JSON.stringify(b);
}

function sorted(values:Iterable<string>){
  return [...values].sort();
}

function pairComplete(value:any){
  return !!value&&typeof value.ru==='string'&&value.ru.trim().length>0&&typeof value.en==='string'&&value.en.trim().length>0;
}

function readJson(path:string,issues:Issue[]){
  if(!existsSync(path)){
    issues.push({code:'MISSING_TARGET_FILE',target:path});
    return {};
  }
  try{return JSON.parse(readFileSync(path,'utf8'));}
  catch(error){
    issues.push({code:'INVALID_TARGET_JSON',target:path,detail:error instanceof Error?error.message:String(error)});
    return {};
  }
}

function addIssue(issues:Issue[],code:string,target:string,detail?:string){
  issues.push(detail?{code,target,detail}:{code,target});
}

test('v55 golden manifest is exact, internally consistent, and machine-auditable',()=>{
  assert.equal(manifest.schemaVersion,1);
  assert.equal(manifest.id,'chat6.final-player-facing.golden.v54');
  assert.equal(manifest.status,'FINAL_EXPECTATION_POST_INTEGRATION_REQUIRED');

  const requiredLoc=manifest.localization.required as Record<string,any>;
  const retainedLoc=manifest.localization.retainedCompatibility as Record<string,any>;
  const forbiddenLoc=manifest.localization.forbidden as string[];
  const requiredPresentation=manifest.presentation.required as Record<string,any>;
  const d48=manifest.presentation.d48;

  assert.equal(Object.keys(requiredLoc).length,343);
  assert.equal(manifest.counts.orderedLocalizationOperations,344);
  assert.equal(forbiddenLoc.length,17);
  assert.equal(Object.keys(retainedLoc).length,9);
  assert.equal(Object.keys(requiredPresentation).length,127);
  assert.equal(d48.allowedSlots.length,17);
  assert.equal(d48.assets.length,4);
  assert.equal(manifest.ui.strongMetaModal.semanticHunks.length,7);
  assert.equal(manifest.d42NightPreservation.localizationKeys.length,110);
  assert.equal(manifest.d42NightPreservation.presentationSlots.length,12);

  for(const [key,row] of Object.entries(requiredLoc)){
    assert.ok(pairComplete((row as any).value),key+' must have RU/EN');
  }
  for(const [key,row] of Object.entries(retainedLoc)){
    assert.ok(pairComplete((row as any).value),key+' historical compatibility must have RU/EN');
  }

  const requiredLocKeys=new Set(Object.keys(requiredLoc));
  for(const key of forbiddenLoc)assert.equal(requiredLocKeys.has(key),false,key+' cannot be both required and forbidden');
  for(const key of Object.keys(retainedLoc))assert.equal(requiredLocKeys.has(key),false,key+' historical compatibility cannot duplicate the operation set');

  const activity=manifest.activityNetworkFinalAuthority;
  assert.deepEqual(requiredLoc[activity.key].value,activity.finalValue);
  assert.deepEqual(requiredLoc[activity.key].predecessorValue,activity.predecessorValue);
  assert.equal(activity.finalValue.ru,'Контакты связывают разрозненные направления в единое рабочее пространство.');
  assert.equal(activity.finalValue.en,'The contacts tie disconnected routes into one practical working network.');

  const allowedSlots=new Set<string>(d48.allowedSlots);
  const byAssetUnion=new Set<string>();
  for(const asset of d48.assets){
    const slots=d48.allowedSlotsByAsset[asset] as string[];
    assert.ok(Array.isArray(slots)&&slots.length>0,asset+' must own at least one Palace slot');
    for(const slot of slots){
      byAssetUnion.add(slot);
      assert.ok(
        slot.startsWith('job/palace/')||slot.startsWith('ending/palace/')||slot.startsWith('location/town/palace/'),
        slot+' must be Palace-only'
      );
      assert.equal(requiredPresentation[slot].value.static.src,asset,slot+' final D48 source');
    }
  }
  assert.deepEqual(sorted(byAssetUnion),sorted(allowedSlots));

  for(const slot of d48.invitationNeutralSlots){
    assert.equal(allowedSlots.has(slot),false,slot+' invitation cannot be a D48 target');
    assert.equal(requiredPresentation[slot].value.static.src,'assets/stage-town.svg',slot+' invitation final source');
  }

  const d42Slots=new Set(manifest.d42NightPreservation.presentationSlots);
  assert.equal(d42Slots.size,12);
  for(const slot of d42Slots)assert.ok(requiredPresentation[slot],slot+' D42 slot must survive in final manifest');
});

test('v55 final assembled target satisfies the golden manifest', {skip:!FINAL_TARGET}, ()=>{
  const issues:Issue[]=[];
  const localizationDoc=readJson('content/localization.json',issues);
  const presentationDoc=readJson('content/presentation.json',issues);
  const definitions=readJson('content/definitions.json',issues);
  const localization=localizationDoc.strings??{};
  const presentation=presentationDoc.slots??{};

  for(const [key,row] of Object.entries(manifest.localization.required as Record<string,any>)){
    const expected=(row as any).value;
    if(!(key in localization)){
      addIssue(issues,'MISSING_REQUIRED_LOCALIZATION',key);
      continue;
    }
    const actual=localization[key];
    if(!pairComplete(actual))addIssue(issues,'RU_EN_PARITY_MISSING',key);
    if(!same(actual,expected)){
      if((row as any).predecessorValue!==undefined&&same(actual,(row as any).predecessorValue)){
        addIssue(issues,'WRONG_PREDECESSOR_VALUE',key,'accepted predecessor remains instead of final authority');
      }else{
        addIssue(issues,'THIRD_VALUE_CONFLICT',key,'value is neither the frozen final nor an accepted predecessor');
      }
    }
  }

  for(const [key,row] of Object.entries(manifest.localization.retainedCompatibility as Record<string,any>)){
    if(!(key in localization)){
      addIssue(issues,'MISSING_HISTORICAL_COMPATIBILITY',key);
      continue;
    }
    if(!pairComplete(localization[key]))addIssue(issues,'RU_EN_PARITY_MISSING',key);
    if(!same(localization[key],(row as any).value)){
      addIssue(issues,'HISTORICAL_COMPATIBILITY_CONFLICT',key);
    }
  }

  for(const key of manifest.localization.forbidden as string[]){
    if(key in localization)addIssue(issues,'FORBIDDEN_LOCALIZATION_TARGET',key);
  }

  for(const [slot,row] of Object.entries(manifest.presentation.required as Record<string,any>)){
    const expected=(row as any).value;
    if(!(slot in presentation)){
      addIssue(issues,'MISSING_REQUIRED_PRESENTATION_SLOT',slot);
      continue;
    }
    const actual=presentation[slot];
    if(!same(actual,expected)){
      if((row as any).predecessorValue!==undefined&&same(actual,(row as any).predecessorValue)){
        addIssue(issues,'WRONG_PREDECESSOR_PRESENTATION',slot,'accepted Palace v19 predecessor remains instead of D48 final');
      }else{
        addIssue(issues,'THIRD_VALUE_PRESENTATION_CONFLICT',slot);
      }
    }

    const staticMedia=actual?.static;
    if(staticMedia?.kind==='image'){
      const altKey=staticMedia.altKey;
      if(typeof altKey!=='string'||!altKey.endsWith('.alt')){
        addIssue(issues,'MISSING_ALT_KEY',slot);
      }else{
        const captionKey=altKey.slice(0,-4)+'.caption';
        if(!pairComplete(localization[altKey]))addIssue(issues,'MISSING_ALT_CAPTION_PAIR',altKey,'alt RU/EN missing');
        if(!pairComplete(localization[captionKey]))addIssue(issues,'MISSING_ALT_CAPTION_PAIR',captionKey,'caption RU/EN missing');
      }
    }
  }

  for(const slot of manifest.presentation.deleteTargets as string[]){
    if(slot in presentation)addIssue(issues,'FORBIDDEN_RETIRED_PRESENTATION',slot);
  }
  for(const slot of manifest.presentation.retiredAbsentTargets as string[]){
    if(slot in presentation)addIssue(issues,'FORBIDDEN_RETIRED_PRESENTATION',slot);
  }

  const endings=Array.isArray(definitions.endings)?definitions.endings:[];
  const endingIds=new Set(endings.map((ending:any)=>ending?.id).filter((id:any)=>typeof id==='string'));
  for(const id of manifest.retiredSurfaces.tavern.forbiddenEndingDefinitionIds as string[]){
    if(endingIds.has(id))addIssue(issues,'RETIRED_ENDING_DEFINITION_PRESENT',id);
  }
  for(const id of manifest.retiredSurfaces.lumberStayVitality.forbiddenEndingDefinitionIds as string[]){
    if(endingIds.has(id))addIssue(issues,'RETIRED_ENDING_DEFINITION_PRESENT',id);
  }
  for(const reward of manifest.retiredSurfaces.lumberStayVitality.forbiddenEndingRewardIds as string[]){
    if(endings.some((ending:any)=>ending?.reward===reward))addIssue(issues,'RETIRED_VITALITY_REWARD_PRESENT',reward);
  }

  const d48=manifest.presentation.d48;
  const d48Assets=new Set<string>(d48.assets);
  const d48Allowed=new Set<string>(d48.allowedSlots);
  const assetDir='assets/presentation';
  if(!existsSync(assetDir)){
    addIssue(issues,'MISSING_D48_ASSET_DIRECTORY',assetDir);
  }else{
    const actualPalaceFiles=sorted(readdirSync(assetDir).filter(name=>/^palace-.*\.svg$/i.test(name)).map(name=>assetDir+'/'+name));
    if(!same(actualPalaceFiles,sorted(d48Assets)))addIssue(issues,'PALACE_D48_ASSET_SET_DRIFT',assetDir);
  }

  for(const asset of d48Assets){
    if(!existsSync(asset)){
      addIssue(issues,'MISSING_D48_ASSET',asset);
      continue;
    }
    const source=readFileSync(asset,'utf8');
    if(!/viewBox="0 0 1200 675"/.test(source))addIssue(issues,'D48_ASSET_GEOMETRY_REGRESSION',asset);
    if(/<script\b/i.test(source)||/<image\b/i.test(source)||/<text\b/i.test(source)||/\b(?:href|xlink:href)\s*=/i.test(source)||/url\(\s*https?:/i.test(source)){
      addIssue(issues,'D48_ASSET_SOURCE_FIREWALL_REGRESSION',asset);
    }
  }

  for(const [slot,value] of Object.entries(presentation)){
    for(const asset of d48Assets){
      if(JSON.stringify(value).includes(asset)&&!d48Allowed.has(slot)){
        addIssue(issues,'PALACE_D48_LEAKAGE',slot,asset);
      }
    }
  }

  for(const slot of d48Allowed){
    const media=presentation[slot]?.static;
    if(!media)continue;
    const altKey=media.altKey;
    if(typeof altKey==='string'&&pairComplete(localization[altKey])&&media.alt!==localization[altKey].en){
      addIssue(issues,'D48_ALT_EN_MISMATCH',slot,altKey);
    }
  }

  const appPath='src/ui/app.ts';
  if(!existsSync(appPath)){
    addIssue(issues,'MISSING_TARGET_FILE',appPath);
  }else{
    const app=readFileSync(appPath,'utf8');
    for(const hunk of manifest.ui.strongMetaModal.semanticHunks as any[]){
      for(const token of hunk.requiredTokens??[]){
        if(!app.includes(token))addIssue(issues,'UI_SEMANTIC_HUNK_MISSING',hunk.id,token);
      }
      for(const token of hunk.forbiddenTokens??[]){
        if(app.includes(token))addIssue(issues,'RAW_MODAL_INTERNAL_ID_REGRESSION',hunk.id,token);
      }
    }
    for(const token of manifest.retiredSurfaces.lumberStayVitality.historicalUiRequiredTokens as string[]){
      if(!app.includes(token))addIssue(issues,'LUMBER_HISTORY_UI_REGRESSION',token,'required historical display seam missing');
    }
    for(const token of manifest.retiredSurfaces.lumberStayVitality.historicalUiForbiddenTokens as string[]){
      if(app.includes(token))addIssue(issues,'LUMBER_HISTORY_UI_REGRESSION',token,'retired ending is routed as live presentation');
    }
  }

  for(const [panel,row] of Object.entries(manifest.ui.strongMetaModal.modalAccessibleNames.expected as Record<string,any>)){
    const key=(row as any).localizationKey;
    const expected=(row as any).value;
    if(!(key in localization)){
      addIssue(issues,'MODAL_LOCALIZATION_MISSING',panel,key);
      continue;
    }
    if(!pairComplete(localization[key]))addIssue(issues,'RU_EN_PARITY_MISSING',key);
    if(!same(localization[key],expected))addIssue(issues,'MODAL_LOCALIZATION_MISMATCH',panel,key);
  }

  assert.deepEqual(
    issues,
    [],
    'final player-facing golden issues:\n'+issues.map(issue=>issue.code+' '+issue.target+(issue.detail?' — '+issue.detail:'')).join('\n')
  );
});

import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {existsSync,readFileSync} from 'node:fs';

const CONTRACT='tests/fixtures/final-player-facing-cross-contract-v63.json';
const GOLDEN='tests/fixtures/final-player-facing-golden-v54.json';
const SMOKE='tests/fixtures/final-ui-accessibility-smoke-v60.json';
const SAVE='tests/fixtures/final-save-migration-golden-v57.json';
const OPS='../../../docs/tasks/CHAT4_D46_D47_LEGACY_GOLDEN_OPERATIONS_v53.json';
const GATE='../../../docs/tasks/CHAT4_D46_D47_LEGACY_GOLDEN_GATE_v54.json';
const FINAL=process.env.FINAL_PLAYER_FACING_CROSS_CONTRACT_TARGET==='1';

const contract=JSON.parse(readFileSync(CONTRACT,'utf8')) as any;
const golden=JSON.parse(readFileSync(GOLDEN,'utf8')) as any;
const smoke=JSON.parse(readFileSync(SMOKE,'utf8')) as any;
const save=JSON.parse(readFileSync(SAVE,'utf8')) as any;
const ops=JSON.parse(readFileSync(OPS,'utf8')) as any;
const gate=JSON.parse(readFileSync(GATE,'utf8')) as any;

type Issue={code:string;target:string;detail?:string};
const same=(a:unknown,b:unknown)=>JSON.stringify(a)===JSON.stringify(b);
const sorted=(v:Iterable<string>)=>[...v].sort();
const pair=(v:any)=>!!v&&typeof v.ru==='string'&&v.ru.trim()&&typeof v.en==='string'&&v.en.trim();
const blob=(t:string)=>createHash('sha1').update(Buffer.from('blob '+Buffer.byteLength(t,'utf8')+'\0')).update(t).digest('hex');
const op=(id:string)=>ops.operations.find((x:any)=>x.id===id);
const sc=(id:string)=>save.cases.find((x:any)=>x.id===id);
const ss=(id:string)=>smoke.surfaces.find((x:any)=>x.id===id);
function read(path:string,issues:Issue[]){if(!existsSync(path)){issues.push({code:'MISSING_TARGET_FILE',target:path});return {};}try{return JSON.parse(readFileSync(path,'utf8'));}catch(e){issues.push({code:'INVALID_TARGET_JSON',target:path,detail:String(e)});return {};}}
function add(a:Issue[],code:string,target:string,detail?:string){a.push(detail?{code,target,detail}:{code,target});}

test('v64 accepted closure contracts agree',()=>{
  assert.equal(contract.schemaVersion,1);
  assert.equal(contract.id,'chat6.final-player-facing.cross-contract.v63');
  assert.equal(contract.staticAudit.verdict,'PASS');
  assert.deepEqual(contract.staticAudit.contradictions,[]);
  assert.equal(contract.consistencyMatrix.length,9);
  assert.ok(contract.consistencyMatrix.every((x:any)=>x.verdict==='AGREE'));

  // Authoritative source hash reconstructs EXACTLY after reversing only Leader-approved RU expected values.
  const adjusted=JSON.parse(readFileSync(GOLDEN,'utf8')) as any;
  assert.equal(adjusted.leaderAdjudication?.document,'mindy-successor/docs/tasks/LEADER1_STAGE5_EXACT_KEY_DISPOSITION_2026-10-08.md');
  assert.deepEqual(adjusted.leaderAdjudication?.keys,[
    'unlock.secret-debt.paid-freedom.earned-reserve-match.label',
    'unlock.secret-debt.takeover.network-retainer.label'
  ]);
  for(const [key,frozenRu,acceptedRu] of [
    ['unlock.secret-debt.paid-freedom.earned-reserve-match.label','Паритет заработанного резерва','Сопоставление заработанного резерва'],
    ['unlock.secret-debt.takeover.network-retainer.label','Сетевой гонорар','Сетевое содержание']
  ] as const){
    assert.equal(adjusted.localization.required[key].value.ru,acceptedRu);
    assert.equal(adjusted.localization.required[key].value.en,golden.localization.required[key].value.en);
    adjusted.localization.required[key].value.ru=frozenRu;
  }
  delete adjusted.leaderAdjudication;
  assert.equal(blob(JSON.stringify(adjusted,null,2)+'\n'),'bc8617be68825543ed7617e9dd5c7d915f6b0e14','no other Golden v54 deviation');
  assert.equal(blob(readFileSync(SMOKE,'utf8')),'62f1b14b1f6890b4641c2acb2cd26860c8b99ed8');
  assert.equal(blob(readFileSync(SAVE,'utf8')),'6ad4ed97ec6058960f90c6b6b80edfda0b9a6279');
  assert.equal(blob(readFileSync(OPS,'utf8')),'17282cf11436d54d49915f44ed84de56a0eebf7c');
  assert.equal(blob(readFileSync(GATE,'utf8')),'dae0b2bf197f66c1b1fe834e643caf541c6ef4c7');

  assert.equal(save.cases.length,23);
  assert.equal(save.contentPresentationSaveNeutrality.mechanicalMutationAllowed,false);
  assert.ok(sc('case-23').stopConditions.some((x:string)=>/content\/presentation-only tranche mutates mechanical save state/i.test(x)));

  const forbidden=new Set<string>(golden.localization.forbidden);
  const tavern=new Set<string>(golden.retiredSurfaces.tavern.historicalLocalizationKeys);
  const lumber=new Set<string>(golden.retiredSurfaces.lumberStayVitality.historicalLocalizationKeys);
  for(const k of [...tavern,...lumber])assert.equal(forbidden.has(k),false,'PLAYER_FACING_DELETE_CONFLICTS_MIGRATION_HISTORY '+k);

  assert.deepEqual(sorted(op('LUMBER_RETIRE_LIVE_LOCALIZATION').keys),sorted(golden.retiredSurfaces.lumberStayVitality.forbiddenLocalizationKeys));
  assert.deepEqual(sorted(op('LUMBER_KEEP_HISTORICAL_LOCALIZATION').keys),sorted(golden.retiredSurfaces.lumberStayVitality.historicalLocalizationKeys));
  assert.equal(op('LUMBER_RETIRE_LIVE_PRESENTATION_SLOT').slotId,'ending/lumber-stay');
  assert.equal(op('LUMBER_RETIRE_LIVE_ENDING').endingId,'lumber-stay');
  assert.equal(op('LUMBER_ADD_EXACT_LEGACY_HELPER').constants.legacyPerkId,'legacy.lumber-stay.vitality');
  assert.ok(sc('case-06').rewardOwnershipChecks.some((x:string)=>/slot-free/i.test(x)));

  for(const id of golden.retiredSurfaces.tavern.forbiddenEndingDefinitionIds)assert.ok(sc('case-05').stableIds.includes(id));

  const d42=ss('d42-night-player-facing');
  assert.deepEqual(sorted(Object.keys(d42.expectedLocalization)),sorted(golden.d42NightPreservation.localizationKeys));
  assert.deepEqual(sorted(Object.keys(d42.expectedPresentation)),sorted(golden.d42NightPreservation.presentationSlots));

  const activity=ss('activity-network-v36-ending');
  assert.deepEqual(activity.expectedLocalization[golden.activityNetworkFinalAuthority.key],golden.activityNetworkFinalAuthority.finalValue);
  assert.notDeepEqual(activity.expectedLocalization[golden.activityNetworkFinalAuthority.key],golden.activityNetworkFinalAuthority.predecessorValue);

  const palace=ss('palace-invitation-progression-confrontation-endings');
  const d48=ss('palace-d48-media-accessibility-firewall');
  assert.equal(d48.expectedMedia.assets.length,4);
  assert.equal(d48.expectedMedia.allowedSlots.length,17);
  assert.ok(palace.requiredEndingDefinitionIds.includes('ending.palace.return-home'));
  assert.ok(palace.expectedLocalization['ui.palace.returnHome.explicitCommit']);
  assert.ok(sc('case-15').forbiddenInferences.some((x:string)=>/auto-commit Return Home/i.test(x)));

  const selector=ss('character-creation-strong-meta-selector');
  const automatic=ss('strong-meta-automatic-source-method');
  assert.equal(selector.expectedPresentation.maxKeystone,1);
  assert.equal(selector.expectedPresentation.maxSpecialists,2);
  assert.equal(automatic.expectedPresentation.automaticKnowledgeSlotFree,true);
  assert.ok(save.strongMetaSeparationRequired.some((x:string)=>/activeHardWorkPackages separate/i.test(x)));
  assert.ok(save.strongMetaSeparationRequired.some((x:string)=>/legacy\.lumber-stay\.vitality slot-free/i.test(x)));
  assert.ok(gate.mandatoryAssertions.some((a:any)=>a.id==='A13'&&/zero Strong Meta slots/i.test(a.assert)));
  assert.ok(gate.mandatoryAssertions.some((a:any)=>a.id==='A27'&&/capacities\/snapshot\/runtime are unchanged/i.test(a.assert)));

  const raw=/\b(?:ending|unlock|action|event|presentation|relationship|job|legacy)\.[a-z0-9_.-]+\b/i;
  for(const k of [...tavern,...lumber]){
    const v=golden.localization.required[k]?.value??golden.localization.retainedCompatibility[k]?.value;
    assert.ok(pair(v),'REQUIRED_HISTORICAL_LABEL_DELETED '+k);
    assert.equal(raw.test(v.ru)||raw.test(v.en),false,'RAW_INTERNAL_ID_FALLBACK '+k);
  }
});

test('v64 assembled target satisfies player-facing cross-contract fences',{skip:!FINAL},()=>{
  const issues:Issue[]=[];
  const loc=(read('content/localization.json',issues) as any).strings??{};
  const pres=(read('content/presentation.json',issues) as any).slots??{};
  const defs=read('content/definitions.json',issues) as any;
  const endings=Array.isArray(defs.endings)?defs.endings:[];
  const endingIds=new Set(endings.map((x:any)=>x?.id).filter((x:any)=>typeof x==='string'));
  const app=existsSync('src/ui/app.ts')?readFileSync('src/ui/app.ts','utf8'):'';
  const strong=existsSync('src/core/strongMeta.ts')?readFileSync('src/core/strongMeta.ts','utf8'):'';
  if(!app)add(issues,'MISSING_TARGET_FILE','src/ui/app.ts');
  if(!strong)add(issues,'MISSING_TARGET_FILE','src/core/strongMeta.ts');

  for(const k of golden.localization.forbidden as string[])if(k in loc)add(issues,'RETIRED_OR_DELETED_VISIBLE_KEY_RETURNED',k);
  for(const k of [...golden.retiredSurfaces.tavern.historicalLocalizationKeys,...golden.retiredSurfaces.lumberStayVitality.historicalLocalizationKeys] as string[])if(!pair(loc[k]))add(issues,'REQUIRED_HISTORICAL_LABEL_DELETED',k);

  for(const id of [...golden.retiredSurfaces.tavern.forbiddenEndingDefinitionIds,...golden.retiredSurfaces.lumberStayVitality.forbiddenEndingDefinitionIds] as string[])if(endingIds.has(id))add(issues,'RETIRED_LIVE_SURFACE_REINTRODUCED',id);
  for(const reward of golden.retiredSurfaces.lumberStayVitality.forbiddenEndingRewardIds as string[])if(endings.some((x:any)=>x?.reward===reward))add(issues,'RETIRED_LIVE_SURFACE_REINTRODUCED',reward);
  for(const slot of [...golden.presentation.deleteTargets,...golden.presentation.retiredAbsentTargets] as string[])if(slot in pres)add(issues,'RETIRED_LIVE_SURFACE_REINTRODUCED',slot);

  for(const k of golden.d42NightPreservation.localizationKeys as string[])if(!same(loc[k],golden.localization.required[k]?.value))add(issues,'D42_PRECEDENCE_CONFLICT',k);
  for(const s of golden.d42NightPreservation.presentationSlots as string[])if(!same(pres[s],golden.presentation.required[s]?.value))add(issues,'D42_PRECEDENCE_CONFLICT',s);

  const a=golden.activityNetworkFinalAuthority;
  if(!same(loc[a.key],a.finalValue))add(issues,same(loc[a.key],a.predecessorValue)?'ACTIVITY_V17_PREDECESSOR_RETURNED':'ACTIVITY_PRECEDENCE_CONFLICT',a.key);

  const allowed=new Set<string>(golden.presentation.d48.allowedSlots);
  for(const s of golden.presentation.d48.allowedSlots as string[])if(!same(pres[s],golden.presentation.required[s]?.value))add(issues,'D48_PRECEDENCE_CONFLICT',s);
  for(const [s,v] of Object.entries(pres))for(const asset of golden.presentation.d48.assets as string[])if(JSON.stringify(v).includes(asset)&&!allowed.has(s))add(issues,'D48_MEDIA_LEAKED',s,asset);

  for(const id of ['ending.palace.service-life','ending.palace.court-power','ending.palace.inner-truth','ending.palace.return-home'])if(!endingIds.has(id))add(issues,'PALACE_EXPLICIT_ENDING_MISSING',id);
  if(!pair(loc['ui.palace.returnHome.explicitCommit']))add(issues,'PALACE_RETURN_HOME_EXPLICIT_COPY_MISSING','ui.palace.returnHome.explicitCommit');
  if(!pres['ending/palace/return-home'])add(issues,'PALACE_RETURN_HOME_PRESENTATION_MISSING','ending/palace/return-home');

  if(!app.includes('data-strong-meta-automatic-knowledge="true"'))add(issues,'AUTOMATIC_KNOWLEDGE_REPRESENTATION_MISSING','Strong Meta');
  if(/data-strong-meta-(?:keystone|specialist)=[^\n>]*source-method/i.test(app))add(issues,'AUTOMATIC_KNOWLEDGE_SELECTABLE','Source Method');
  if(!strong.includes('STRONG_META_KEYSTONE_CAPACITY=1'))add(issues,'STRONG_META_CAPACITY_CONFLICT','Keystone');
  if(!strong.includes('STRONG_META_SPECIALIST_CAPACITY=2'))add(issues,'STRONG_META_CAPACITY_CONFLICT','Specialist');
  if(!app.includes('aria-label="\${esc(panelAccessibleName(panel))}"'))add(issues,'LOCALIZED_MODAL_ARIA_MISSING','generic-dialog');
  if(app.includes('aria-label="\${esc(panel)}"'))add(issues,'RAW_INTERNAL_ID_FALLBACK','generic-dialog');

  assert.deepEqual(issues,[],'cross-contract issues:\n'+issues.map(x=>x.code+' '+x.target+(x.detail?' — '+x.detail:'')).join('\n'));
});

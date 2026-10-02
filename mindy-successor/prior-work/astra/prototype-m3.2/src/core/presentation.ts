import {z} from 'zod';
import {loadCatalog} from './content.ts';
import type {Catalog} from './schema.ts';
import {SCHOOL_COURSES} from './school.ts';

const source=z.string().max(3_000_000).refine(
  s=>/^assets\/[a-zA-Z0-9/_-]+\.(svg|png|jpg|jpeg|webp|gif|mp4|webm)$/.test(s)||/^data:image\/(png|jpeg|webp|gif);base64,[A-Za-z0-9+/]+={0,2}$/.test(s),
  'Только локальный assets/ путь или загруженное изображение PNG/JPEG/WebP/GIF.'
);
const gifSource=source.refine(
  s=>/^assets\/[a-zA-Z0-9/_-]+\.gif$/.test(s)||/^data:image\/gif;base64,[A-Za-z0-9+/]+={0,2}$/.test(s),
  'Primary presentation media должен быть GIF.'
);
const staticSource=source.refine(
  s=>/^assets\/[a-zA-Z0-9/_-]+\.(svg|png|jpg|jpeg|webp)$/.test(s)||/^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/]+={0,2}$/.test(s),
  'Static fallback должен быть SVG/PNG/JPEG/WebP.'
);
const presentationIdSchema=z.string().min(1).max(240).regex(/^[a-z0-9][a-z0-9/._-]*$/,'Некорректный presentationId.');
const legacyMediaOverrideSchema=z.object({
  kind:z.enum(['image','gif','video']),
  src:source,
  alt:z.string().min(1).max(300)
}).strict();
const localizedAltKey=z.string().min(1).max(240).regex(/^[a-z0-9][a-z0-9._-]*$/,'Некорректный localization alt key.');
const gifOverrideSchema=z.object({
  kind:z.literal('gif'),
  src:gifSource,
  alt:z.string().min(1).max(300),
  altKey:localizedAltKey.optional()
}).strict();
const staticOverrideSchema=z.object({
  kind:z.literal('image'),
  src:staticSource,
  alt:z.string().min(1).max(300),
  altKey:localizedAltKey.optional()
}).strict();
const poolCandidateKeySchema=z.string().min(1).max(120).regex(/^[a-z0-9][a-z0-9._-]*$/,'Некорректный media candidate key.');
const poolCandidateSchema=z.object({
  key:poolCandidateKeySchema,
  kind:z.literal('gif'),
  src:gifSource,
  alt:z.string().min(1).max(300),
  altKey:localizedAltKey.optional(),
  weight:z.number().finite().positive().optional()
}).strict();
const mediaPoolSchema=z.object({
  version:z.number().int().min(1).max(1000).default(1),
  ordering:z.enum(['ordered','unordered']).default('ordered'),
  selectionPolicy:z.enum(['unweighted','weighted']).default('unweighted'),
  candidates:z.array(poolCandidateSchema).min(3).max(5)
}).strict().superRefine((pool,ctx)=>{
  const keys=new Set<string>();
  for(let i=0;i<pool.candidates.length;i++){
    const key=pool.candidates[i]!.key;
    if(keys.has(key))ctx.addIssue({code:'custom',path:['candidates',i,'key'],message:`Duplicate media candidate key ${key}.`});
    keys.add(key);
  }
});
const slotOverrideSchema=z.object({
  primary:gifOverrideSchema.optional(),
  pool:mediaPoolSchema.optional(),
  static:staticOverrideSchema.optional(),
  fallbackId:presentationIdSchema.optional()
}).strict().superRefine((slot,ctx)=>{
  if(slot.primary&&slot.pool)ctx.addIssue({code:'custom',path:['pool'],message:'presentation slot cannot define both primary and pool.'});
});

export const presentationSchema=z.object({
  version:z.literal(1),
  texts:z.record(z.string(),z.string().min(1).max(5000)),
  media:z.record(z.string(),legacyMediaOverrideSchema),
  slots:z.record(presentationIdSchema,slotOverrideSchema).optional()
}).strict();

export type Presentation=z.infer<typeof presentationSchema>;
export type PresentationSlotOverride=z.infer<typeof slotOverrideSchema>;
export type PresentationMediaKind='image'|'gif'|'video';

export interface PresentationSlot {
  id:string;
  label:string;
  baseMediaIds:string[];
  fallbackId?:string;
}

export interface ResolvedPresentationMedia {
  kind:PresentationMediaKind;
  src:string;
  alt:string;
  altKey?:string;
  slotId:string;
  source:'override-primary'|'override-pool'|'override-static'|'catalog';
  mediaId?:string;
  candidateKey?:string;
  weight?:number;
  poolVersion?:number;
}

export interface ResolvedPresentation {
  requestedId:string;
  candidates:ResolvedPresentationMedia[];
  selected?:ResolvedPresentationMedia;
  textOnly:boolean;
  diagnostics:string[];
}

export const emptyPresentation=():Presentation=>({version:1,texts:{},media:{}});

const jobIds=new Set(['tavern','lumber','hunt','hunter','guard','satyr-maid','undead-farm','artist-geisha','assassin','merchant','prostitute']);
const clean=(value:string)=>value.toLowerCase().replace(/[^a-z0-9_-]+/g,'-').replace(/^-+|-+$/g,'')||'default';
const pathParts=(value:string)=>value.toLowerCase().split(/[./]+/).map(clean).filter(Boolean);
const semanticPath=(value:string)=>pathParts(value).join('/');
const scenePath=(sceneId:string)=>{
  const path=semanticPath(sceneId)||'default';
  return path==='default'||path.endsWith('/default')?path:`${path}/default`;
};
const actionRoot=(actionId:string)=>pathParts(actionId)[0]??'default';
const sameIds=(a:string[],b:string[])=>a.length===b.length&&a.every((id,i)=>id===b[i]);

function jobIdForAction(actionId:string){
  const root=actionRoot(actionId);
  return jobIds.has(root)?root:null;
}
function schoolTrackForAction(actionId:string){
  const parts=pathParts(actionId);
  if(parts[0]==='school')return parts.slice(1).join('-')||'general';
  const legacy=parts[0]??'';
  return legacy.endsWith('-class')?legacy.slice(0,-6):null;
}
function actionPresentationId(actionId:string,sceneId:string){
  const jobId=jobIdForAction(actionId);
  if(jobId)return `job/${jobId}/shift/${scenePath(sceneId)}`;
  const root=actionRoot(actionId);
  if(root==='forest-search')return `activity/forest/route/${scenePath(sceneId)}`;
  const track=schoolTrackForAction(actionId);
  if(track)return `school/${track}/lesson/${scenePath(sceneId)}`;
  if(root==='rest'||root==='rent-room')return `night/${root}/${scenePath(sceneId)}`;
  return `location/town/${semanticPath(actionId)}/${scenePath(sceneId)}`;
}

export function presentationIdForAction(cat:Catalog,actionId:string,mediaIds:string[]=[]){
  const action=cat.definitions.actions.find(a=>a.id===actionId);
  const scenes=action?.scenes??[];
  const scene=scenes.find(s=>sameIds(s.media,mediaIds))
    ??scenes.find(s=>s.media.some(id=>mediaIds.includes(id)))
    ??scenes.find(s=>s.id==='default')
    ??scenes[0];
  return actionPresentationId(actionId,scene?.id??'default');
}

export function presentationIdForActionResult(cat:Catalog,actionId:string,mediaIds:string[]=[]){
  const action=cat.definitions.actions.find(a=>a.id===actionId);
  const scenes=action?.scenes??[];
  const scene=scenes.find(s=>sameIds(s.media,mediaIds))
    ??scenes.find(s=>s.media.some(id=>mediaIds.includes(id)))
    ??scenes.find(s=>s.id==='default')
    ??scenes[0];
  const jobId=jobIdForAction(actionId);
  if(jobId){
    const targetShaped=pathParts(actionId)[1]==='shift';
    return `job/${jobId}/result/${targetShaped?'default':(semanticPath(scene?.id??'default')||'default')}`;
  }
  return actionPresentationId(actionId,scene?.id??'default');
}

export function presentationIdForActivityRoute(cat:Catalog,activityId:string,routeId:string|null|undefined){
  const activity=cat.definitions.activities?.find(item=>item.id===activityId);
  const slug=pathParts(activityId).at(-1)??'activity';
  const fallback=`activity/${slug}/route/default`;
  if(!activity||!routeId)return fallback;
  return activity.options.some(option=>option.setRoute===routeId)
    ?`activity/${slug}/route/${clean(routeId)}`
    :fallback;
}

export function presentationIdForEvent(cat:Catalog,eventId:string,variantId:string){
  const event=cat.events.find(e=>e.id===eventId);
  const sourceDomain=event?.sourceDomain;
  const domain=sourceDomain?clean(sourceDomain):'';
  if(domain&&(cat.definitions.careers??[]).some(c=>c.id===sourceDomain)){
    return `job/${domain}/event/${clean(eventId)}/${clean(variantId)}`;
  }
  if(domain&&(cat.definitions.relationships??[]).some(r=>r.id===sourceDomain)){
    return `relationship/${domain}/${clean(eventId)}/${clean(variantId)}`;
  }
  if(domain.includes('forest')){
    return `activity/forest/${clean(eventId)}/${clean(variantId)}`;
  }
  return `location/town/event/${clean(eventId)}/${clean(variantId)}`;
}

export const UNDEAD_FARM_PRESENTATION_STAGES=[
  'new-hand','reliable-helper','keeper-of-process','veteran',
  'research','successor','external-anomaly','outcome-ready'
] as const;

export const UNDEAD_FARM_CAREER_EVENT_IDS=[
  'undead-farm.career.first-shift',
  'undead-farm.career.keeper-of-process',
  'undead-farm.career.veteran',
  'undead-farm.career.research',
  'undead-farm.career.successor',
  'undead-farm.career.external-anomaly',
  'undead-farm.career.outcome-ready'
] as const;

export const UNDEAD_FARM_PRODUCTION_EVENT_IDS=[
  'undead-farm.production.first-output',
  'undead-farm.production.prepare-delivery',
  'undead-farm.production.preserve-sample',
  'undead-farm.sample.kit-issued'
] as const;

export const UNDEAD_FARM_RELATIONSHIP_EVENT_IDS=[
  'undead-farm.keeper.intro',
  'undead-farm.keeper.trust',
  'undead-farm.keeper.request',
  'undead-farm.keeper.successor-reaction',
  'undead-farm.night.keeper-request'
] as const;

export const UNDEAD_FARM_NIGHT_EVENT_IDS=[
  'undead-farm.night.process-notes'
] as const;

export const UNDEAD_FARM_SCHOOL_EVENT_IDS=[
  'undead-farm.school.arcana-research',
  'undead-farm.school.management-records'
] as const;

export const UNDEAD_FARM_ACTIVITY_EVENT_IDS=[
  'undead-farm.activity.forest-return'
] as const;

export const UNDEAD_FARM_CRISIS_EVENT_IDS=[
  'undead-farm.crisis.supply-labor-containment'
] as const;

export const UNDEAD_FARM_RESOURCE_IDS=[
  'farm_produce',
  'farm_unstable_specimen',
  'farm_preserved_specimen',
  'farm_delivery_input'
] as const;

export const UNDEAD_FARM_ENDING_IDS=[
  'ending.undead-farm.hard-work',
  'ending.undead-farm.research-farmer',
  'ending.undead-farm.successor'
] as const;

export function presentationIdForUndeadFarmStage(stage:string){
  return `job/undead-farm/stage/${clean(stage)}`;
}

export function presentationIdForUndeadFarmCareerEvent(eventId:string){
  return `job/undead-farm/event/${clean(eventId)}/default`;
}

export function presentationIdForUndeadFarmRelationshipEvent(eventId:string){
  return `relationship/${clean('undead-farm.keeper')}/${clean(eventId)}/default`;
}

export function presentationIdForUndeadFarmResource(itemId:string){
  return `job/undead-farm/resource/${clean(itemId)}`;
}

export const SATYR_MAID_PRESENTATION_STAGES=[
  'new-maid','floor-rhythm','known-face','house-regular','veteran-service',
  'house-power','personal-network','boundaries','outcome-ready'
] as const;

export const SATYR_MAID_CAREER_EVENT_IDS=[
  'satyr-maid.career.first-shift',
  'satyr-maid.career.known-face',
  'satyr-maid.career.house-regular',
  'satyr-maid.career.veteran-service',
  'satyr-maid.career.house-power',
  'satyr-maid.career.personal-network',
  'satyr-maid.career.boundaries',
  'satyr-maid.career.outcome-ready',
  'satyr-maid.staff-debrief.night'
] as const;

export const SATYR_MAID_RELATIONSHIP_EVENT_IDS=[
  'satyr-maid.recurring-guest.intro',
  'satyr-maid.recurring-guest.service',
  'satyr-maid.recurring-guest.night',
  'satyr-maid.recurring-guest.request',
  'satyr-maid.recurring-guest.return'
] as const;

export const SATYR_MAID_SCHOOL_EVENT_IDS=[
  'satyr-maid.school.rhetoric',
  'satyr-maid.school.management',
  'satyr-maid.school.boundaries'
] as const;

export const SATYR_MAID_CRISIS_EVENT_IDS=[
  'satyr-maid.crisis.house-strain'
] as const;

export const SATYR_MAID_COMPLEX_ENDING_IDS=[
  'ending.satyr-maid.house-power',
  'ending.satyr-maid.boundary-mastery'
] as const;

export function presentationIdForSatyrMaidCareerEvent(eventId:string){
  return `job/satyr-maid/event/${clean(eventId)}/default`;
}

export function presentationIdForSatyrMaidRelationshipEvent(eventId:string){
  return `relationship/${clean('satyr-maid.recurring-guest')}/${clean(eventId)}/default`;
}

export function presentationIdForSatyrMaidStage(stage:string){
  return `job/satyr-maid/stage/${clean(stage)}`;
}

export const HUNTER_PRESENTATION_STAGES=[
  'novice','tracker','recognized-hunter','veteran',
  'master-hunter','warden','legend','outcome-ready'
] as const;

export const HUNTER_CAREER_EVENT_IDS=[
  'hunter.career.first-shift',
  'hunter.career.recognized-hunter',
  'hunter.career.expedition-qualified',
  'hunter.career.veteran-ready',
  'hunter.career.veteran',
  'hunter.career.master-hunter',
  'hunter.career.warden',
  'hunter.career.legend',
  'hunter.career.outcome-ready'
] as const;

export const HUNTER_RELATIONSHIP_EVENT_IDS=[
  'hunter.relationship.intro',
  'hunter.relationship.trust',
  'hunter.relationship.conflict-open',
  'hunter.relationship.conflict-resolve',
  'hunter.relationship.companion'
] as const;

export const HUNTER_CLUE_EVENT_IDS=[
  'hunter.clues.forest-trail',
  'hunter.clues.lumber-truth',
  'hunter.clues.tavern-rumour',
  'hunter.clues.farm-sample'
] as const;

export const HUNTER_ITEM_EVENT_IDS=[
  'hunter.items.preserve-return',
  'hunter.items.rough-route-return'
] as const;

export const HUNTER_ROUTE_EVENT_IDS=[
  'hunter.routes.master-ready',
  'hunter.routes.warden-ready',
  'hunter.routes.legend-contract',
  'hunter.routes.legend-return'
] as const;

export const HUNTER_SCHOOL_EVENT_IDS=[
  'hunter.school.field-craft'
] as const;

export const HUNTER_ITEM_IDS=[
  'rope_kit',
  'field_preservation_kit'
] as const;

export const HUNTER_RELATIONSHIP_STAGES=[
  'introduced',
  'professional-trust',
  'conflict-open',
  'companion-ready',
  'route-resolved'
] as const;

export const HUNTER_STATUS_IDS=[
  'forest-clue',
  'tavern-clue',
  'farm-clue',
  'lumber-clue',
  'school-field-craft',
  'master-ready',
  'warden-ready',
  'legend-ready',
  'rare-contract-active',
  'refusal-respected',
  'companion-ready'
] as const;

export const HUNTER_EXPEDITION_ROUTES=[
  'local-route',
  'rough-route',
  'rare-route'
] as const;

export const HUNTER_EXPEDITION_OUTCOMES=[
  'success',
  'escape',
  'failure'
] as const;

export function presentationIdForHunterStage(stage:string){
  return `job/hunter/stage/${clean(stage)}`;
}

export function presentationIdForHunterRelationshipStage(stage:string){
  return `relationship/hunter-senior-guide/stage/${clean(stage)}`;
}

export function presentationIdForHunterItem(itemId:string){
  return `job/hunter/item/${clean(itemId)}`;
}

export function presentationIdForHunterState(stateId:string){
  return `job/hunter/state/${clean(stateId)}`;
}

export const TAVERN_PRESENTATION_STAGES=[
  'new-hand','trusted-worker','house-node','veteran-service',
  'innkeeper','information-broker','sanctuary','outcome-ready'
] as const;

export const TAVERN_CAREER_EVENT_IDS=[
  'tavern.career.first-shift',
  'tavern.career.house-node',
  'tavern.career.veteran-service',
  'tavern.career.innkeeper',
  'tavern.career.information-broker',
  'tavern.career.sanctuary',
  'tavern.career.outcome-ready'
] as const;

export const TAVERN_SCHOOL_EVENT_IDS=[
  'tavern.school.records',
  'tavern.school.broker',
  'tavern.school.etiquette',
  'tavern.school.arcana'
] as const;

export const TAVERN_RELATIONSHIP_EVENT_IDS=[
  'tavern.recurring-traveler.intro',
  'tavern.recurring-traveler.trust',
  'tavern.recurring-traveler.request',
  'tavern.recurring-traveler.confidentiality'
] as const;

export const TAVERN_NIGHT_EVENT_IDS=[
  'tavern.recurring-traveler.night',
  'tavern.house-notes.night'
] as const;

export const TAVERN_INFORMATION_EVENT_IDS=[
  'tavern.information.rumour-route'
] as const;

export const TAVERN_ACCESS_EVENT_IDS=[
  'tavern.access.staff-key',
  'tavern.access.guest-ledger'
] as const;

export const TAVERN_HOUSING_EVENT_IDS=[
  'tavern.housing.meal-in-kind'
] as const;

export const TAVERN_ACTIVITY_EVENT_IDS=[
  'tavern.activity.forest-return'
] as const;

export const TAVERN_CRISIS_EVENT_IDS=[
  'tavern.crisis.occupancy-supply-confidentiality'
] as const;

export const TAVERN_NIGHT_CHOICE_IDS=[
  'tavern.night.traveler-request',
  'tavern.night.house-notes'
] as const;

export const TAVERN_RELATIONSHIP_STAGES=[
  'introduced','trusted','night-request','request-resolved','confidentiality-resolved'
] as const;

export const TAVERN_PRESENTATION_STATE_IDS=[
  'staff-room-access',
  'room-pressure',
  'supply-pressure',
  'guest-ledger',
  'traveler-rumour',
  'rumour-confirmed',
  'information-routing',
  'confidentiality-kept',
  'refusal-respected'
] as const;

export const TAVERN_ENDING_IDS=[
  'tavern-stay',
  'tavern-guild',
  'tavern-court',
  'ending.tavern.hard-work'
] as const;

export function presentationIdForTavernStage(stage:string){
  return `job/tavern/stage/${clean(stage)}`;
}

export function presentationIdForTavernEvent(eventId:string){
  return `job/tavern/event/${clean(eventId)}/default`;
}

export function presentationIdForTavernNightChoice(choiceId:string){
  return `night/tavern/${clean(choiceId)}`;
}

export function presentationIdForTavernRelationshipRoot(){
  return 'relationship/tavern-recurring-traveler/default';
}

export function presentationIdForTavernRelationshipStage(stage:string){
  return `relationship/tavern-recurring-traveler/stage/${clean(stage)}`;
}

export function presentationIdForTavernState(stateId:string){
  return `job/tavern/state/${clean(stateId)}`;
}

export const GUARD_PRESENTATION_STAGES=[
  'recruit','trusted-guard','senior-guard','veteran','officer',
  'reform-order','network','major-case','outcome-ready'
] as const;

export const GUARD_CAREER_EVENT_IDS=[
  'guard.career.first-shift',
  'guard.career.senior',
  'guard.career.duty-breadth',
  'guard.career.veteran-ready',
  'guard.career.choose-route',
  'guard.career.choose-major-case',
  'guard.career.outcome-ready'
] as const;

export const GUARD_RELATIONSHIP_EVENT_IDS=[
  'guard.relationship.intro',
  'guard.relationship.trust',
  'guard.relationship.conflict-open',
  'guard.relationship.conflict-resolve',
  'guard.relationship.case-support'
] as const;

export const GUARD_CITY_EVENT_IDS=[
  'guard.city.dispute',
  'guard.city.crowd-pressure',
  'guard.city.suspicious-pass',
  'guard.city.poverty-response',
  'guard.city.formal-report'
] as const;

export const GUARD_ACCESS_EVENT_IDS=[
  'guard.access.badge',
  'guard.access.sealed-pass',
  'guard.access.evidence-ledger'
] as const;

export const GUARD_CROSS_SYSTEM_EVENT_IDS=[
  'guard.cross.tavern-receipt'
] as const;

export const GUARD_ROUTE_EVENT_IDS=[
  'guard.crisis.market-gate-pressure',
  'guard.routes.officer-ready',
  'guard.routes.reform-ready',
  'guard.routes.network-ready',
  'guard.routes.major-case-ready'
] as const;

export const GUARD_SCHOOL_EVENT_IDS=[] as const;

export const GUARD_RELATIONSHIP_STAGES=[
  'introduced','professional-trust','conflict-open','cooperation-ready','route-resolved'
] as const;

export const GUARD_ITEM_IDS=[
  'guard_badge','guard_sealed_pass'
] as const;

export const GUARD_STATUS_IDS=[
  'city-dispute-resolved',
  'crowd-pressure-resolved',
  'duty-report-evidence',
  'cargo-pass-evidence',
  'poverty-response-recorded',
  'tavern-evidence-known',
  'veteran-ready',
  'officer-ready',
  'reform-ready',
  'network-ready',
  'major-case-thread',
  'major-case-ready',
  'crisis-resolved',
  'refusal-respected',
  'partner-case-support'
] as const;

export function presentationIdForGuardStage(stage:string){
  return `job/guard/stage/${clean(stage)}`;
}

export function presentationIdForGuardRelationshipStage(stage:string){
  return `relationship/guard-partner/stage/${clean(stage)}`;
}

export function presentationIdForGuardItem(itemId:string){
  return `job/guard/item/${clean(itemId)}`;
}

export function presentationIdForGuardState(stateId:string){
  return `job/guard/state/${clean(stateId)}`;
}

export const MERCHANT_PRESENTATION_STAGES=[
  'stall-hand','independent-trader','networked-merchant','veteran',
  'merchant-house','speculator-smuggler','patron-of-routes','outcome-ready'
] as const;

export const MERCHANT_RELATIONSHIP_STAGES=[
  'introduced','professional-trust','conflict-open','utility-ready','route-resolved'
] as const;

export const MERCHANT_TRADE_EVENT_IDS=[
  'merchant.trade.appraisal',
  'merchant.trade.records',
  'merchant.trade.delivery',
  'merchant.trade.shortage'
] as const;

export const MERCHANT_TRADE_STATUS_IDS=[
  'appraisal-recorded',
  'manifest-verified',
  'delivery-recorded',
  'shortage-handled',
  'risk-accepted'
] as const;

export const MERCHANT_POVERTY_STATUS_IDS=[
  'low-liquidity-handled',
  'poverty-response-recorded'
] as const;

export const MERCHANT_ITEM_IDS=[
  'merchant_appraisal_scales',
  'merchant_manifest_case',
  'merchant_sample_kit'
] as const;

export const MERCHANT_SCHOOL_EVENT_IDS=[] as const;

export const MERCHANT_CROSS_SYSTEM_EVENT_IDS=[
  'merchant.cross.lumber-route',
  'merchant.cross.farm-sample',
  'merchant.cross.hunter-return',
  'merchant.cross.tavern-rumour',
  'merchant.cross.guard-pass'
] as const;

export const MERCHANT_ADVANCED_STATUS_IDS=[
  'veteran-ready',
  'crisis-resolved',
  'merchant-house-ready',
  'speculator-route-ready',
  'patron-route-ready',
  'outcome-ready'
] as const;

export const MERCHANT_PUBLIC_ENDING_IDS=[
  'ending.merchant.hard-work'
] as const;

export function presentationIdForMerchantStage(stage:string){
  return `job/merchant/stage/${clean(stage)}`;
}

export function presentationIdForMerchantRelationshipStage(stage:string){
  return `relationship/merchant-supplier/stage/${clean(stage)}`;
}

export function presentationIdForMerchantState(stateId:string){
  return `job/merchant/state/${clean(stateId)}`;
}

export function presentationIdForMerchantItem(itemId:string){
  return `job/merchant/item/${clean(itemId)}`;
}

export const ARTIST_GEISHA_PRESENTATION_STAGES=[
  'novice','performer','recognized-artist','veteran',
  'master-artist','patron-network','court-invitation','outcome-ready'
] as const;

export const ARTIST_GEISHA_RELATIONSHIP_STAGES=[
  'introduced','professional-trust','conflict-open','utility-ready','route-resolved'
] as const;

export const ARTIST_GEISHA_ITEM_IDS=[
  'artist_formal_attire','artist_performance_kit','artist_invitation_token'
] as const;

export const ARTIST_GEISHA_NIGHT_CHOICE_IDS=[
  'artist-geisha.night.rehearsal',
  'artist-geisha.night.salon',
  'artist-geisha.night.mentor-review'
] as const;

export const ARTIST_GEISHA_ADVANCED_STATUS_IDS=[
  'veteran-ready',
  'master-artist-ready',
  'patron-network-ready',
  'court-invitation-ready',
  'outcome-ready'
] as const;

export const ARTIST_GEISHA_SCHOOL_EVENT_IDS=[] as const;

export const ARTIST_GEISHA_PUBLIC_ENDING_IDS=[
  'ending.artist-geisha.hard-work'
] as const;

export function presentationIdForArtistGeishaStage(stage:string){
  return `job/artist-geisha/stage/${clean(stage)}`;
}

export function presentationIdForArtistGeishaRelationshipStage(stage:string){
  return `relationship/artist-geisha-mentor/stage/${clean(stage)}`;
}

export function presentationIdForArtistGeishaItem(itemId:string){
  return `job/artist-geisha/item/${clean(itemId)}`;
}

export function presentationIdForArtistGeishaState(stateId:string){
  return `job/artist-geisha/state/${clean(stateId)}`;
}

export function presentationIdForArtistGeishaNightChoice(choiceId:string){
  return `night/artist-geisha/${clean(choiceId)}`;
}

export function presentationIdForEnding(endingId:string){
  const parts=pathParts(endingId);
  if(parts[0]==='ending')parts.shift();
  return `ending/${parts.join('/')||'default'}`;
}

export function textFields(cat:Catalog){
  const fields:{key:string;label:string;value:string;set:(s:string)=>void}[]=[];
  const add=(key:string,label:string,obj:Record<string,unknown>,field:string)=>fields.push({key,label,value:String(obj[field]),set:s=>{obj[field]=s;}});
  for(const a of cat.definitions.actions)for(const k of ['label','description'])add(`action/${a.id}/${k}`,`${a.label} · ${k}`,a,k);
  for(const a of cat.definitions.actions)for(const v of a.scenes??[])add(`action/${a.id}/scene/${v.id}`,`${a.label} · постановка ${v.id}`,v,'text');
  for(const e of cat.definitions.endings)for(const k of ['title','description','epilogue'])add(`ending/${e.id}/${k}`,`${e.title} · ${k}`,e,k);
  for(const e of cat.events){
    add(`event/${e.id}/title`,`${e.title} · заголовок`,e,'title');
    for(const v of e.variants)add(`event/${e.id}/variant/${v.id}`,`${e.title} · ${v.id}`,v,'text');
    for(const c of e.choices)for(const k of ['label','text'])add(`event/${e.id}/choice/${c.id}/${k}`,`${e.title} · ${c.id} · ${k}`,c,k);
  }
  return fields;
}

export function presentationSlots(cat:Catalog):PresentationSlot[]{
  const slots=new Map<string,PresentationSlot>();
  const add=(slot:PresentationSlot)=>{
    const previous=slots.get(slot.id);
    if(previous){
      previous.baseMediaIds=[...new Set([...previous.baseMediaIds,...slot.baseMediaIds])];
      return;
    }
    slots.set(slot.id,{...slot,baseMediaIds:[...new Set(slot.baseMediaIds)]});
  };

  add({
    id:'location/town/default',
    label:'Город · центральная сцена',
    baseMediaIds:cat.media.some(m=>m.id==='stage.town')?['stage.town']:[]
  });

  for(const action of cat.definitions.actions){
    for(const scene of action.scenes??[]){
      add({
        id:actionPresentationId(action.id,scene.id),
        label:`${action.label} · ${scene.id}`,
        baseMediaIds:scene.media,
        fallbackId:'location/town/default'
      });
      if(jobIdForAction(action.id)){
        add({
          id:presentationIdForActionResult(cat,action.id,scene.media),
          label:`${action.label} · результат · ${scene.id}`,
          baseMediaIds:scene.media,
          fallbackId:actionPresentationId(action.id,scene.id)
        });
      }
    }
  }

  // Stage and resource surfaces are Presentation-owned semantic views over
  // real persisted career/item identities. Event and ending slots are generated
  // only from the live catalog below so C2-143 cannot pass on reserved IDs.
  for(const stage of UNDEAD_FARM_PRESENTATION_STAGES){
    add({id:presentationIdForUndeadFarmStage(stage),label:`Undead Farm · stage · ${stage}`,baseMediaIds:[],fallbackId:'job/undead-farm/result/default'});
  }
  for(const itemId of UNDEAD_FARM_RESOURCE_IDS){
    add({id:presentationIdForUndeadFarmResource(itemId),label:`Undead Farm · resource · ${itemId}`,baseMediaIds:[],fallbackId:'job/undead-farm/result/default'});
  }

  // Stage surfaces consume persisted production career state. Event and ending
  // surfaces below are intentionally generated only from the live catalog so
  // C2-131 cannot pass on reserved/preparation IDs alone.
  for(const stage of SATYR_MAID_PRESENTATION_STAGES){
    add({
      id:presentationIdForSatyrMaidStage(stage),
      label:`Satyr Maid · stage · ${stage}`,
      baseMediaIds:[],
      fallbackId:'job/satyr-maid/result/default'
    });
  }

  // Tavern stage/Night/relationship/status surfaces are presentation-owned.
  // Tavern event slots are intentionally generated only from the live catalog.
  for(const stage of TAVERN_PRESENTATION_STAGES){
    add({
      id:presentationIdForTavernStage(stage),
      label:`Tavern · stage · ${stage}`,
      baseMediaIds:[],
      fallbackId:'job/tavern/result/default'
    });
  }
  for(const choiceId of TAVERN_NIGHT_CHOICE_IDS){
    add({
      id:presentationIdForTavernNightChoice(choiceId),
      label:`Tavern · Night · ${choiceId}`,
      baseMediaIds:[],
      fallbackId:'job/tavern/result/default'
    });
  }
  add({
    id:presentationIdForTavernRelationshipRoot(),
    label:'Tavern · recurring traveler · default',
    baseMediaIds:[],
    fallbackId:'job/tavern/result/default'
  });
  for(const stage of TAVERN_RELATIONSHIP_STAGES){
    add({
      id:presentationIdForTavernRelationshipStage(stage),
      label:`Tavern · recurring traveler · ${stage}`,
      baseMediaIds:[],
      fallbackId:presentationIdForTavernRelationshipRoot()
    });
  }
  for(const stateId of TAVERN_PRESENTATION_STATE_IDS){
    add({
      id:presentationIdForTavernState(stateId),
      label:`Tavern · state · ${stateId}`,
      baseMediaIds:[],
      fallbackId:'job/tavern/result/default'
    });
  }

  const hunterCareer=(cat.definitions.careers??[]).find(item=>item.id==='hunter');
  if(hunterCareer){
    for(const stage of HUNTER_PRESENTATION_STAGES){
      if(hunterCareer.stages.includes(stage)){
        add({
          id:presentationIdForHunterStage(stage),
          label:`Hunter · stage · ${stage}`,
          baseMediaIds:[],
          fallbackId:'job/hunter/result/default'
        });
      }
    }
  }

  const hunterRelationship=(cat.definitions.relationships??[]).find(item=>item.id==='hunter.senior-guide');
  if(hunterRelationship){
    for(const stage of HUNTER_RELATIONSHIP_STAGES){
      if(hunterRelationship.stages.includes(stage)){
        add({
          id:presentationIdForHunterRelationshipStage(stage),
          label:`Hunter · senior guide · ${stage}`,
          baseMediaIds:[],
          fallbackId:'job/hunter/result/default'
        });
      }
    }
  }

  for(const itemId of HUNTER_ITEM_IDS){
    if((cat.definitions.itemDefinitions??[]).some(item=>item.id===itemId)){
      add({
        id:presentationIdForHunterItem(itemId),
        label:`Hunter · item · ${itemId}`,
        baseMediaIds:[],
        fallbackId:'job/hunter/result/default'
      });
    }
  }

  const hunterRuntimeText=JSON.stringify({
    career:hunterCareer,
    relationship:hunterRelationship,
    events:cat.events.filter(event=>event.sourceDomain==='hunter'),
    activities:(cat.definitions.activities??[]).filter(activity=>activity.id==='hunter.expedition')
  });
  const hunterStateBackings:Record<(typeof HUNTER_STATUS_IDS)[number],boolean>={
    'forest-clue':hunterRuntimeText.includes('forest-clue-known'),
    'tavern-clue':hunterRuntimeText.includes('tavern-clue-known'),
    'farm-clue':hunterRuntimeText.includes('farm-clue-known'),
    'lumber-clue':hunterRuntimeText.includes('lumber-clue-known'),
    'school-field-craft':hunterRuntimeText.includes('school-field-craft-ready'),
    'master-ready':hunterRuntimeText.includes('master-route-ready'),
    'warden-ready':hunterRuntimeText.includes('warden-route-ready'),
    'legend-ready':hunterRuntimeText.includes('legend-route-ready'),
    'rare-contract-active':hunterRuntimeText.includes('rare-contract-active'),
    'refusal-respected':hunterRuntimeText.includes('refusal-respected'),
    'companion-ready':hunterRuntimeText.includes('companion-ready')
  };
  for(const stateId of HUNTER_STATUS_IDS){
    if(hunterStateBackings[stateId]){
      add({
        id:presentationIdForHunterState(stateId),
        label:`Hunter · state · ${stateId}`,
        baseMediaIds:[],
        fallbackId:'job/hunter/result/default'
      });
    }
  }

  const guardCareer=(cat.definitions.careers??[]).find(item=>item.id==='guard');
  if(guardCareer){
    for(const stage of GUARD_PRESENTATION_STAGES){
      if(guardCareer.stages.includes(stage)){
        add({
          id:presentationIdForGuardStage(stage),
          label:`Guard · stage · ${stage}`,
          baseMediaIds:[],
          fallbackId:'job/guard/result/default'
        });
      }
    }
  }

  const guardRelationship=(cat.definitions.relationships??[]).find(item=>item.id==='guard.partner');
  if(guardRelationship){
    for(const stage of GUARD_RELATIONSHIP_STAGES){
      if(guardRelationship.stages.includes(stage)){
        add({
          id:presentationIdForGuardRelationshipStage(stage),
          label:`Guard · partner · ${stage}`,
          baseMediaIds:[],
          fallbackId:'job/guard/result/default'
        });
      }
    }
  }

  for(const itemId of GUARD_ITEM_IDS){
    if((cat.definitions.itemDefinitions??[]).some(item=>String(item.id)===itemId)){
      add({
        id:presentationIdForGuardItem(itemId),
        label:`Guard · item · ${itemId}`,
        baseMediaIds:[],
        fallbackId:'job/guard/result/default'
      });
    }
  }

  const guardRuntimeText=JSON.stringify({
    career:guardCareer,
    relationship:guardRelationship,
    events:cat.events.filter(event=>event.sourceDomain==='guard')
  });
  const guardStateBackings:Record<(typeof GUARD_STATUS_IDS)[number],boolean>={
    'city-dispute-resolved':guardRuntimeText.includes('city-dispute-resolved'),
    'crowd-pressure-resolved':guardRuntimeText.includes('crowd-pressure-resolved'),
    'duty-report-evidence':guardRuntimeText.includes('duty-report-evidence'),
    'cargo-pass-evidence':guardRuntimeText.includes('cargo-pass-evidence'),
    'poverty-response-recorded':guardRuntimeText.includes('poverty-response-recorded'),
    'tavern-evidence-known':guardRuntimeText.includes('tavern-evidence-known'),
    'veteran-ready':guardRuntimeText.includes('veteran-ready'),
    'officer-ready':guardRuntimeText.includes('officer-route-ready'),
    'reform-ready':guardRuntimeText.includes('reform-route-ready'),
    'network-ready':guardRuntimeText.includes('network-route-ready'),
    'major-case-thread':guardRuntimeText.includes('major-case-thread-ready'),
    'major-case-ready':guardRuntimeText.includes('major-case-ready'),
    'crisis-resolved':guardRuntimeText.includes('crisis-resolved'),
    'refusal-respected':guardRuntimeText.includes('refusal-respected'),
    'partner-case-support':guardRuntimeText.includes('partner-case-support')||guardRuntimeText.includes('case-support-ready')
  };
  for(const stateId of GUARD_STATUS_IDS){
    if(guardStateBackings[stateId]){
      add({
        id:presentationIdForGuardState(stateId),
        label:`Guard · state · ${stateId}`,
        baseMediaIds:[],
        fallbackId:'job/guard/result/default'
      });
    }
  }

  const merchantCareer=(cat.definitions.careers??[]).find(item=>item.id==='merchant');
  if(merchantCareer){
    for(const stage of MERCHANT_PRESENTATION_STAGES){
      if(merchantCareer.stages.includes(stage)){
        add({
          id:presentationIdForMerchantStage(stage),
          label:`Merchant · stage · ${stage}`,
          baseMediaIds:[],
          fallbackId:'job/merchant/result/default'
        });
      }
    }
  }

  const merchantRelationship=(cat.definitions.relationships??[]).find(item=>item.id==='merchant.supplier');
  if(merchantRelationship){
    for(const stage of MERCHANT_RELATIONSHIP_STAGES){
      if(merchantRelationship.stages.includes(stage)){
        add({
          id:presentationIdForMerchantRelationshipStage(stage),
          label:`Merchant · supplier · ${stage}`,
          baseMediaIds:[],
          fallbackId:'job/merchant/result/default'
        });
      }
    }
  }

  for(const itemId of MERCHANT_ITEM_IDS){
    if((cat.definitions.itemDefinitions??[]).some(item=>String(item.id)===itemId)){
      add({
        id:presentationIdForMerchantItem(itemId),
        label:`Merchant · item · ${itemId}`,
        baseMediaIds:[],
        fallbackId:'job/merchant/result/default'
      });
    }
  }

  const merchantRuntimeText=JSON.stringify({
    career:merchantCareer,
    relationship:merchantRelationship,
    items:(cat.definitions.itemDefinitions??[]).filter(item=>MERCHANT_ITEM_IDS.includes(String(item.id) as (typeof MERCHANT_ITEM_IDS)[number])),
    events:cat.events.filter(event=>event.sourceDomain==='merchant')
  });
  const merchantTradeStateBackings:Record<(typeof MERCHANT_TRADE_STATUS_IDS)[number],boolean>={
    'appraisal-recorded':merchantRuntimeText.includes('appraisal-recorded'),
    'manifest-verified':merchantRuntimeText.includes('manifest-verified'),
    'delivery-recorded':merchantRuntimeText.includes('delivery-recorded'),
    'shortage-handled':merchantRuntimeText.includes('shortage-handled'),
    'risk-accepted':merchantRuntimeText.includes('risk-accepted')
  };
  for(const stateId of MERCHANT_TRADE_STATUS_IDS){
    if(merchantTradeStateBackings[stateId]){
      add({
        id:presentationIdForMerchantState(stateId),
        label:`Merchant · trade state · ${stateId}`,
        baseMediaIds:[],
        fallbackId:'job/merchant/result/default'
      });
    }
  }

  const merchantPovertyStateBackings:Record<(typeof MERCHANT_POVERTY_STATUS_IDS)[number],boolean>={
    'low-liquidity-handled':merchantRuntimeText.includes('low-liquidity-handled'),
    'poverty-response-recorded':merchantRuntimeText.includes('poverty-response-recorded')
  };
  for(const stateId of MERCHANT_POVERTY_STATUS_IDS){
    if(merchantPovertyStateBackings[stateId]){
      add({
        id:presentationIdForMerchantState(stateId),
        label:`Merchant · liquidity state · ${stateId}`,
        baseMediaIds:[],
        fallbackId:'job/merchant/result/default'
      });
    }
  }

  const merchantAdvancedStateBackings:Record<(typeof MERCHANT_ADVANCED_STATUS_IDS)[number],boolean>={
    'veteran-ready':merchantRuntimeText.includes('veteran-ready'),
    'crisis-resolved':merchantRuntimeText.includes('crisis-resolved'),
    'merchant-house-ready':merchantRuntimeText.includes('merchant-house-ready'),
    'speculator-route-ready':merchantRuntimeText.includes('speculator-route-ready'),
    'patron-route-ready':merchantRuntimeText.includes('patron-route-ready'),
    'outcome-ready':merchantRuntimeText.includes('outcome-ready')
  };
  for(const stateId of MERCHANT_ADVANCED_STATUS_IDS){
    if(merchantAdvancedStateBackings[stateId]){
      add({
        id:presentationIdForMerchantState(stateId),
        label:`Merchant · readiness · ${stateId}`,
        baseMediaIds:[],
        fallbackId:'job/merchant/result/default'
      });
    }
  }

  const artistGeishaCareer=(cat.definitions.careers??[]).find(item=>item.id==='artist-geisha');
  if(artistGeishaCareer){
    for(const stage of ARTIST_GEISHA_PRESENTATION_STAGES){
      if(artistGeishaCareer.stages.includes(stage)){
        add({
          id:presentationIdForArtistGeishaStage(stage),
          label:`Artist House · stage · ${stage}`,
          baseMediaIds:[],
          fallbackId:'job/artist-geisha/result/default'
        });
      }
    }
  }

  const artistGeishaRelationship=(cat.definitions.relationships??[]).find(item=>item.id==='artist-geisha.mentor');
  if(artistGeishaRelationship){
    for(const stage of ARTIST_GEISHA_RELATIONSHIP_STAGES){
      if(artistGeishaRelationship.stages.includes(stage)){
        add({
          id:presentationIdForArtistGeishaRelationshipStage(stage),
          label:`Artist House · mentor · ${stage}`,
          baseMediaIds:[],
          fallbackId:'job/artist-geisha/result/default'
        });
      }
    }
  }

  for(const itemId of ARTIST_GEISHA_ITEM_IDS){
    if((cat.definitions.itemDefinitions??[]).some(item=>String(item.id)===itemId)){
      add({
        id:presentationIdForArtistGeishaItem(itemId),
        label:`Artist House · item · ${itemId}`,
        baseMediaIds:[],
        fallbackId:'job/artist-geisha/result/default'
      });
    }
  }

  for(const choiceId of ARTIST_GEISHA_NIGHT_CHOICE_IDS){
    if((cat.definitions.nightChoices??[]).some(choice=>choice.id===choiceId)){
      add({
        id:presentationIdForArtistGeishaNightChoice(choiceId),
        label:`Artist House · Night · ${choiceId}`,
        baseMediaIds:[],
        fallbackId:'job/artist-geisha/result/default'
      });
    }
  }

  const artistGeishaRuntimeText=JSON.stringify({
    career:artistGeishaCareer,
    relationship:artistGeishaRelationship,
    items:(cat.definitions.itemDefinitions??[]).filter(item=>ARTIST_GEISHA_ITEM_IDS.includes(String(item.id) as (typeof ARTIST_GEISHA_ITEM_IDS)[number])),
    nightChoices:(cat.definitions.nightChoices??[]).filter(choice=>ARTIST_GEISHA_NIGHT_CHOICE_IDS.includes(choice.id as (typeof ARTIST_GEISHA_NIGHT_CHOICE_IDS)[number])),
    events:cat.events.filter(event=>event.sourceDomain==='artist-geisha')
  });
  const artistGeishaAdvancedStateBackings:Record<(typeof ARTIST_GEISHA_ADVANCED_STATUS_IDS)[number],boolean>={
    'veteran-ready':artistGeishaRuntimeText.includes('veteran-ready'),
    'master-artist-ready':artistGeishaRuntimeText.includes('master-artist-ready'),
    'patron-network-ready':artistGeishaRuntimeText.includes('patron-network-ready'),
    'court-invitation-ready':artistGeishaRuntimeText.includes('court-invitation-ready'),
    'outcome-ready':artistGeishaRuntimeText.includes('outcome-ready')
  };
  for(const stateId of ARTIST_GEISHA_ADVANCED_STATUS_IDS){
    if(artistGeishaAdvancedStateBackings[stateId]){
      add({
        id:presentationIdForArtistGeishaState(stateId),
        label:`Artist House · readiness · ${stateId}`,
        baseMediaIds:[],
        fallbackId:'job/artist-geisha/result/default'
      });
    }
  }

  for(const event of cat.events){
    const tavernFallback=event.sourceDomain==='tavern'
      ?'job/tavern/result/default'
      :event.sourceDomain==='tavern.recurring-traveler'
       ?presentationIdForTavernRelationshipRoot()
       :event.sourceDomain==='guard'
        ?'job/guard/result/default'
        :event.sourceDomain==='merchant'
         ?'job/merchant/result/default'
         :event.sourceDomain==='artist-geisha'
          ?'job/artist-geisha/result/default'
          :'location/town/default';
    for(const variant of event.variants){
      add({
        id:presentationIdForEvent(cat,event.id,variant.id),
        label:`${event.title} · ${variant.id}`,
        baseMediaIds:variant.media,
        fallbackId:tavernFallback
      });
    }
  }

  for(const course of SCHOOL_COURSES){
    add({
      id:course.presentationId,
      label:`${course.label} · lesson`,
      baseMediaIds:cat.media.some(m=>m.id==='stage.school')?['stage.school']:[],
      fallbackId:'location/town/default'
    });
  }

  for(const activity of cat.definitions.activities??[]){
    const slug=pathParts(activity.id).at(-1)??'activity';
    const routeId=`activity/${slug}/route/default`;
    add({
      id:routeId,
      label:`${activity.label} · route`,
      baseMediaIds:cat.media.some(m=>m.id==='stage.hunt')?['stage.hunt']:[],
      fallbackId:'location/town/default'
    });
    for(const specificRoute of [...new Set(activity.options.map(option=>option.setRoute).filter((value):value is string=>!!value))]){
      add({
        id:`activity/${slug}/route/${clean(specificRoute)}`,
        label:`${activity.label} · route · ${specificRoute}`,
        baseMediaIds:[],
        fallbackId:routeId
      });
    }
    for(const result of activity.results){
      add({
        id:`activity/${slug}/return/${result.outcome}`,
        label:`${activity.label} · ${result.outcome}`,
        baseMediaIds:cat.media.some(m=>m.id==='stage.hunt')?['stage.hunt']:[],
        fallbackId:routeId
      });
    }
  }

  // Presentation-owned full-roster Hard Work semantic surface. These IDs do not
  // create ending gameplay/state; they keep media/accessibility ready for the
  // ordinary career IDs already present in the production catalog.
  for(const career of cat.definitions.careers??[]){
    const careerId=clean(career.id);
    const resultId=`job/${careerId}/result/default`;
    add({
      id:`ending/${careerId}/hard-work`,
      label:`${career.label} · Hard Work · финал`,
      baseMediaIds:[],
      fallbackId:careerId==='lumber'?'location/town/default':slots.has(resultId)?resultId:'location/town/default'
    });
  }

  for(const ending of cat.definitions.endings){
    add({
      id:presentationIdForEnding(ending.id),
      label:`${ending.title} · финал`,
      baseMediaIds:[],
      fallbackId:'location/town/default'
    });
  }

  return [...slots.values()].sort((a,b)=>a.id.localeCompare(b.id));
}

function validateSlotOverrides(cat:Catalog,patch:Presentation){
  const slots=presentationSlots(cat);
  const known=new Map(slots.map(slot=>[slot.id,slot]));
  for(const [id,override] of Object.entries(patch.slots??{})){
    if(!known.has(id))throw new Error(`Неизвестный presentationId ${id}`);
    if(override.fallbackId&&!known.has(override.fallbackId))throw new Error(`Неизвестный fallback presentationId ${override.fallbackId}`);
  }

  const state=new Map<string,0|1|2>();
  const visit=(id:string,trail:string[])=>{
    const mark=state.get(id)??0;
    if(mark===2)return;
    if(mark===1)throw new Error(`Цикл presentation fallback: ${[...trail,id].join(' -> ')}`);
    state.set(id,1);
    const slot=known.get(id)!;
    const next=patch.slots?.[id]?.fallbackId??slot.fallbackId;
    if(next)visit(next,[...trail,id]);
    state.set(id,2);
  };
  for(const id of known.keys())visit(id,[]);
}

export function applyPresentation(base:Catalog,input:unknown):Catalog{
  const patch=presentationSchema.parse(input);
  // Rebuild shared references: events must be the same objects as pack.events.
  const cat=loadCatalog(structuredClone(base.definitions),structuredClone(base.packs));
  const fields=new Map(textFields(cat).map(f=>[f.key,f]));
  for(const [key,value] of Object.entries(patch.texts)){
    const field=fields.get(key);if(!field)throw new Error(`Неизвестное текстовое поле ${key}`);field.set(value);
  }
  // Revalidate text lengths/required labels. Presentation cannot change conditions/effects/IDs.
  const checked=loadCatalog(cat.definitions,cat.packs);
  for(const [id,asset] of Object.entries(patch.media)){
    const media=checked.media.find(m=>m.id===id);if(!media)throw new Error(`Неизвестное медиа ${id}`);
    if(asset.src.startsWith('data:')&&asset.kind==='video')throw new Error('Для видео нужен локальный путь assets/.');
    Object.assign(media,asset);
  }
  validateSlotOverrides(checked,patch);
  return checked;
}

function stablePresentationHash(value:string){
  let hash=2166136261;
  for(let i=0;i<value.length;i++){
    hash^=value.charCodeAt(i);
    hash=Math.imul(hash,16777619);
  }
  return hash>>>0;
}

export function selectPresentationPoolIndex(
  candidates:ReadonlyArray<{weight?:number}>,
  input:{presentationId:string;occurrenceKey?:string;poolVersion?:number;selectionPolicy?:'unweighted'|'weighted'}
){
  if(!candidates.length)return -1;
  const seed=stablePresentationHash(`${input.presentationId}|${input.occurrenceKey??input.presentationId}|v${input.poolVersion??1}`);
  if(input.selectionPolicy==='weighted'){
    const weights=candidates.map(candidate=>candidate.weight??1);
    const total=weights.reduce((sum,weight)=>sum+weight,0);
    let ticket=(seed/4294967296)*total;
    for(let i=0;i<weights.length;i++){
      ticket-=weights[i]!;
      if(ticket<0)return i;
    }
    return weights.length-1;
  }
  return seed%candidates.length;
}

function mediaCandidates(
  cat:Catalog,
  slot:PresentationSlot,
  override:PresentationSlotOverride|undefined,
  animationsEnabled:boolean,
  occurrenceKey?:string
){
  const result:ResolvedPresentationMedia[]=[];
  const push=(candidate:ResolvedPresentationMedia)=>result.push(candidate);

  const base=slot.baseMediaIds.map(id=>cat.media.find(m=>m.id===id)).filter((m):m is Catalog['media'][number]=>!!m);
  if(animationsEnabled&&override?.primary){
    push({...override.primary,slotId:slot.id,source:'override-primary'});
    if(override.static)push({...override.static,slotId:slot.id,source:'override-static'});
  }
  if(animationsEnabled&&override?.pool){
    const pool=override.pool;
    const selected=selectPresentationPoolIndex(pool.candidates,{
      presentationId:slot.id,
      occurrenceKey,
      poolVersion:pool.version,
      selectionPolicy:pool.selectionPolicy
    });
    const order=selected<0?[]:[
      pool.candidates[selected]!,
      ...pool.candidates.filter((_,index)=>index!==selected)
    ];
    for(const candidate of order){
      push({
        kind:'gif',
        src:candidate.src,
        alt:candidate.alt,
        altKey:candidate.altKey,
        slotId:slot.id,
        source:'override-pool',
        candidateKey:candidate.key,
        weight:candidate.weight,
        poolVersion:pool.version
      });
    }
    if(override.static)push({...override.static,slotId:slot.id,source:'override-static'});
  }
  if(animationsEnabled){
    for(const m of base.filter(m=>m.kind==='gif'))push({kind:m.kind,src:m.src,alt:m.alt,slotId:slot.id,source:'catalog',mediaId:m.id});
  }
  if(!override?.primary&&!override?.pool&&override?.static)push({...override.static,slotId:slot.id,source:'override-static'});
  if(!animationsEnabled&&override?.static)push({...override.static,slotId:slot.id,source:'override-static'});
  for(const m of base.filter(m=>m.kind==='image'))push({kind:m.kind,src:m.src,alt:m.alt,slotId:slot.id,source:'catalog',mediaId:m.id});
  if(animationsEnabled){
    for(const m of base.filter(m=>m.kind==='video'))push({kind:m.kind,src:m.src,alt:m.alt,slotId:slot.id,source:'catalog',mediaId:m.id});
  }
  return result;
}

export function resolvePresentation(cat:Catalog,input:unknown,presentationId:string,options:{animationsEnabled?:boolean;occurrenceKey?:string}={}):ResolvedPresentation{
  const patch=presentationSchema.parse(input);
  validateSlotOverrides(cat,patch);
  const animationsEnabled=options.animationsEnabled??true;
  const slots=presentationSlots(cat);
  const byId=new Map(slots.map(slot=>[slot.id,slot]));
  const diagnostics:string[]=[];
  let current=byId.get(presentationId);
  if(!current){
    diagnostics.push(`Неизвестный presentationId ${presentationId}; использован безопасный fallback.`);
    current=byId.get('location/town/default');
  }

  const candidates:ResolvedPresentationMedia[]=[];
  const seenSlots=new Set<string>();
  while(current&&!seenSlots.has(current.id)){
    seenSlots.add(current.id);
    candidates.push(...mediaCandidates(cat,current,patch.slots?.[current.id],animationsEnabled,options.occurrenceKey));
    const fallbackId=patch.slots?.[current.id]?.fallbackId??current.fallbackId;
    current=fallbackId?byId.get(fallbackId):undefined;
  }

  const unique:ResolvedPresentationMedia[]=[];
  const keys=new Set<string>();
  for(const candidate of candidates){
    const key=`${candidate.kind}|${candidate.src}`;
    if(keys.has(key))continue;
    keys.add(key);unique.push(candidate);
  }

  return {
    requestedId:presentationId,
    candidates:unique,
    selected:unique[0],
    textOnly:unique.length===0,
    diagnostics
  };
}

import { z } from 'zod';

export const stats = ['strength','endurance','dexterity','reason','magic','creativity','wits','charm','sociability','manners','grooming','sexuality'] as const;
export const legacyStats = ['strength','endurance','dexterity','perception','intelligence','magic','empathy','persuasion','composure','organization','lust'] as const;
export const legacyExtras = ['health','stress','debt','work','lessons','alchemy','trust'] as const;
export const resourceMetrics = ['money','energy'] as const;
export const targetResources = ['money'] as const;
export const metrics = [...new Set([...stats,...legacyStats,...legacyExtras,...resourceMetrics])] as readonly string[];
export const seasons = ['spring','summer','autumn','winter'] as const;
export const housing = ['room','hostel','shelter'] as const;
export const targetHousing = ['normal','cheap','street'] as const;
export const unlocks = ['guild','scholar','calendar','host','mediator','court','vitality'] as const;
export const items = ['herb','tonic','scales','reinforced_axe','rope_kit','field_preservation_kit','old_boundary_token','farm_produce','farm_unstable_specimen','farm_preserved_specimen','farm_delivery_input','tavern_staff_key','guard_badge','guard_sealed_pass','merchant_appraisal_scales','merchant_manifest_case','merchant_sample_kit','artist_formal_attire','artist_performance_kit','artist_invitation_token'] as const;

export type Stat = typeof stats[number];
export type ResourceId = typeof targetResources[number];
export type LegacyMetric = typeof metrics[number];
export type Metric = LegacyMetric;
export type CompareOp = 'gte'|'lte'|'eq';

export type Condition =
  // Target v2 leaves.
  | {kind:'stat';stat:Stat;op:CompareOp;value:number}
  | {kind:'resource';resource:ResourceId;op:CompareOp;value:number}
  | {kind:'itemCount';id:string;op:CompareOp;count:number}
  | {kind:'itemCapability';capability:string;present:boolean}
  | {kind:'calendarYear';op:CompareOp;value:number}
  | {kind:'calendarSeason';value:typeof seasons[number]}
  | {kind:'calendarDayInYear';op:CompareOp;value:number}
  | {kind:'calendarElapsedDays';op:CompareOp;value:number}
  | {kind:'housingTier';value:typeof targetHousing[number]}
  | {kind:'schoolCounter';track:string;counter:string;op:CompareOp;value:number}
  | {kind:'careerStage';career:string;stage:string}
  | {kind:'careerShifts';career:string;op:CompareOp;value:number}
  | {kind:'careerCounter';career:string;counter:string;op:CompareOp;value:number}
  | {kind:'careerFact';career:string;fact:string;present:boolean}
  | {kind:'careerChoice';career:string;choice:string;value:string}
  | {kind:'questStage';quest:string;stage:string}
  | {kind:'questCounter';quest:string;counter:string;op:CompareOp;value:number}
  | {kind:'questFact';quest:string;fact:string;present:boolean}
  | {kind:'questChoice';quest:string;choice:string;value:string}
  | {kind:'relationshipStage';relationship:string;stage:string}
  | {kind:'relationshipCounter';relationship:string;counter:string;op:CompareOp;value:number}
  | {kind:'relationshipFact';relationship:string;fact:string;present:boolean}
  | {kind:'relationshipChoice';relationship:string;choice:string;value:string}
  | {kind:'worldFact';fact:string;present:boolean}
  | {kind:'metaUnlock';unlock:string;present:boolean}
  | {kind:'metaEndingCompleted';ending:string;present:boolean}
  | {kind:'metaHardWork';career:string;present:boolean}
  // M3.2 migration leaves. Do not author new target content with these.
  | {kind:'metric';key:Metric;op:CompareOp;value:number}
  | {kind:'visits';action:string;value:number}
  | {kind:'flag';key:string;value:boolean}
  | {kind:'season';value:typeof seasons[number]}
  | {kind:'housing';value:typeof housing[number]}
  | {kind:'unlock';value:string}
  | {kind:'item';id:typeof items[number];count:number}
  // Logic.
  | {kind:'all'|'any';conditions:Condition[]}
  | {kind:'not';condition:Condition};

const id = z.string().regex(/^[a-z][a-z0-9_.-]{1,79}$/);
const semanticPresentationId = z.string().min(1).max(240).regex(/^[a-z0-9][a-z0-9/._-]*$/);
const rewardId = z.union([id,z.string().regex(/^hardWork:[a-z][a-z0-9_.-]{1,79}$/)]);
const textId = z.string().min(1).max(120);
const n = z.number().int().min(0).max(1_000_000);
const signed = z.number().int().min(-1_000_000).max(1_000_000);
const compareOp = z.enum(['gte','lte','eq']);
const metricEnum = z.enum(metrics as [string,...string[]]);

export const conditionSchema: z.ZodType<Condition> = z.lazy(()=>z.union([
  z.object({kind:z.literal('stat'),stat:z.enum(stats),op:compareOp,value:n}).strict(),
  z.object({kind:z.literal('resource'),resource:z.enum(targetResources),op:compareOp,value:n}).strict(),
  z.object({kind:z.literal('itemCount'),id:id,op:compareOp,count:n}).strict(),
  z.object({kind:z.literal('itemCapability'),capability:id,present:z.boolean()}).strict(),
  z.object({kind:z.literal('calendarYear'),op:compareOp,value:n.max(4)}).strict(),
  z.object({kind:z.literal('calendarSeason'),value:z.enum(seasons)}).strict(),
  z.object({kind:z.literal('calendarDayInYear'),op:compareOp,value:n.max(40)}).strict(),
  z.object({kind:z.literal('calendarElapsedDays'),op:compareOp,value:n.max(159)}).strict(),
  z.object({kind:z.literal('housingTier'),value:z.enum(targetHousing)}).strict(),
  z.object({kind:z.literal('schoolCounter'),track:id,counter:id,op:compareOp,value:n}).strict(),
  z.object({kind:z.literal('careerStage'),career:id,stage:id}).strict(),
  z.object({kind:z.literal('careerShifts'),career:id,op:compareOp,value:n}).strict(),
  z.object({kind:z.literal('careerCounter'),career:id,counter:id,op:compareOp,value:n}).strict(),
  z.object({kind:z.literal('careerFact'),career:id,fact:id,present:z.boolean()}).strict(),
  z.object({kind:z.literal('careerChoice'),career:id,choice:id,value:textId}).strict(),
  z.object({kind:z.literal('questStage'),quest:id,stage:id}).strict(),
  z.object({kind:z.literal('questCounter'),quest:id,counter:id,op:compareOp,value:n}).strict(),
  z.object({kind:z.literal('questFact'),quest:id,fact:id,present:z.boolean()}).strict(),
  z.object({kind:z.literal('questChoice'),quest:id,choice:id,value:textId}).strict(),
  z.object({kind:z.literal('relationshipStage'),relationship:id,stage:id}).strict(),
  z.object({kind:z.literal('relationshipCounter'),relationship:id,counter:id,op:compareOp,value:n}).strict(),
  z.object({kind:z.literal('relationshipFact'),relationship:id,fact:id,present:z.boolean()}).strict(),
  z.object({kind:z.literal('relationshipChoice'),relationship:id,choice:id,value:textId}).strict(),
  z.object({kind:z.literal('worldFact'),fact:id,present:z.boolean()}).strict(),
  z.object({kind:z.literal('metaUnlock'),unlock:id,present:z.boolean()}).strict(),
  z.object({kind:z.literal('metaEndingCompleted'),ending:id,present:z.boolean()}).strict(),
  z.object({kind:z.literal('metaHardWork'),career:id,present:z.boolean()}).strict(),

  z.object({kind:z.literal('metric'),key:metricEnum,op:compareOp,value:n}).strict(),
  z.object({kind:z.literal('visits'),action:id,value:n}).strict(),
  z.object({kind:z.literal('flag'),key:id,value:z.boolean()}).strict(),
  z.object({kind:z.literal('season'),value:z.enum(seasons)}).strict(),
  z.object({kind:z.literal('housing'),value:z.enum(housing)}).strict(),
  z.object({kind:z.literal('unlock'),value:id}).strict(),
  z.object({kind:z.literal('item'),id:z.enum(items),count:n}).strict(),

  z.object({kind:z.enum(['all','any']),conditions:z.array(conditionSchema).min(1).max(32)}).strict(),
  z.object({kind:z.literal('not'),condition:conditionSchema}).strict()
]));

const statDelta=z.object({stat:z.enum(stats),delta:z.number().int().min(-100).max(100)}).strict();

export const effectSchema = z.discriminatedUnion('kind',[
  // Target v2 effects.
  z.object({kind:z.literal('modifyStat'),stat:z.enum(stats),delta:z.number().int().min(-100).max(100)}).strict(),
  z.object({kind:z.literal('modifyResource'),resource:z.enum(targetResources),delta:signed}).strict(),
  z.object({kind:z.literal('modifyEnergy'),delta:z.number().int().min(-100).max(100)}).strict(),
  z.object({kind:z.literal('addItem'),id:id,count:z.number().int().min(1).max(100)}).strict(),
  z.object({kind:z.literal('removeItem'),id:id,count:z.number().int().min(1).max(100)}).strict(),
  z.object({kind:z.literal('setHousing'),value:z.enum(targetHousing)}).strict(),

  z.object({kind:z.literal('incrementSchoolCounter'),track:id,counter:id,amount:z.number().int().min(-1000).max(1000)}).strict(),

  z.object({kind:z.literal('incrementCareerCounter'),career:id,counter:id,amount:z.number().int().min(-1000).max(1000)}).strict(),
  z.object({kind:z.literal('addCareerFact'),career:id,fact:id}).strict(),
  z.object({kind:z.literal('setCareerChoice'),career:id,choice:id,value:textId}).strict(),
  z.object({kind:z.literal('advanceCareer'),career:id,transition:id}).strict(),

  z.object({kind:z.literal('incrementQuestCounter'),quest:id,counter:id,amount:z.number().int().min(-1000).max(1000)}).strict(),
  z.object({kind:z.literal('addQuestFact'),quest:id,fact:id}).strict(),
  z.object({kind:z.literal('setQuestChoice'),quest:id,choice:id,value:textId}).strict(),
  z.object({kind:z.literal('advanceQuest'),quest:id,transition:id}).strict(),

  z.object({kind:z.literal('incrementRelationshipCounter'),relationship:id,counter:id,amount:z.number().int().min(-1000).max(1000)}).strict(),
  z.object({kind:z.literal('addRelationshipFact'),relationship:id,fact:id}).strict(),
  z.object({kind:z.literal('setRelationshipChoice'),relationship:id,choice:id,value:textId}).strict(),
  z.object({kind:z.literal('advanceRelationship'),relationship:id,transition:id}).strict(),

  z.object({kind:z.literal('addWorldFact'),fact:id}).strict(),
  z.object({kind:z.literal('removeWorldFact'),fact:id}).strict(),
  z.object({
    kind:z.literal('addNextDayModifier'),
    energyDelta:z.number().int().min(-10).max(10).default(0),
    statEffects:z.array(statDelta).max(12).default([]),
    tag:id.optional()
  }).strict(),

  // M3.2 migration effects.
  z.object({kind:z.literal('metric'),key:metricEnum,delta:z.number().int().min(-1000).max(1000)}).strict(),
  z.object({kind:z.literal('flag'),key:id,value:z.boolean()}).strict(),
  z.object({kind:z.literal('item'),id:z.enum(items),delta:z.number().int().min(-10).max(10)}).strict(),
  z.object({kind:z.literal('housing'),value:z.enum(housing)}).strict()
]);
export type Effect = z.infer<typeof effectSchema>;

const machineTransitionSchema=z.object({
  id,
  from:z.array(id).min(1).max(16),
  to:id,
  conditions:z.array(conditionSchema).max(32),
  effects:z.array(effectSchema).max(24).default([])
}).strict();
export const machineDefinitionSchema=z.object({
  id,
  label:z.string().min(1).max(150),
  initialStage:id,
  stages:z.array(id).min(1).max(64),
  transitions:z.array(machineTransitionSchema).max(128)
}).strict();
export type MachineDefinition=z.infer<typeof machineDefinitionSchema>;

const capabilityReads=z.object({
  stats:z.array(z.enum(stats)).optional(),
  resources:z.array(z.enum(targetResources)).optional(),
  inventory:z.array(id).optional(),
  itemCapabilities:z.array(id).optional(),
  calendar:z.boolean().optional(),
  housing:z.boolean().optional(),
  schoolTracks:z.array(id).optional(),
  careers:z.array(id).optional(),
  quests:z.array(id).optional(),
  relationships:z.array(id).optional(),
  activities:z.array(id).optional(),
  worldFacts:z.array(id).optional(),
  meta:z.array(z.enum(['unlock','endingCompleted','hardWork'])).optional()
}).strict();
const capabilityWrites=z.object({
  stats:z.array(z.enum(stats)).optional(),
  resources:z.array(z.enum(targetResources)).optional(),
  inventory:z.array(id).optional(),
  energy:z.boolean().optional(),
  housing:z.boolean().optional(),
  careers:z.array(id).optional(),
  quests:z.array(id).optional(),
  relationships:z.array(id).optional(),
  worldFacts:z.array(id).optional(),
  nextDay:z.boolean().optional()
}).strict();
const capabilitiesSchema=z.object({reads:capabilityReads,writes:capabilityWrites}).strict();

export const priorityClasses=['terminal','ending_committed','forced','scheduled_mandatory','critical_progression','normal_progression','optional_world','notification'] as const;
export type PriorityClass=typeof priorityClasses[number];

export const reactionTriggerSchema=z.discriminatedUnion('kind',[
  z.object({kind:z.literal('creationCompleted')}).strict(),
  z.object({kind:z.literal('actionCompleted'),action:id.optional()}).strict(),
  z.object({kind:z.literal('choiceResolved'),event:id.optional()}).strict(),
  z.object({kind:z.literal('statChanged'),stat:z.enum(stats)}).strict(),
  z.object({kind:z.literal('resourceChanged'),resource:z.enum(targetResources)}).strict(),
  z.object({kind:z.literal('energyChanged')}).strict(),
  z.object({kind:z.literal('calendarAdvanced')}).strict(),
  z.object({kind:z.literal('dayStarted')}).strict(),
  z.object({kind:z.literal('nightPhase'),point:z.enum(['before_lodging','after_lodging','after_choice'])}).strict(),
  z.object({kind:z.literal('nightChoiceCompleted'),choice:id}).strict(),
  z.object({kind:z.literal('activityResult'),activity:id,outcome:z.enum(['success','escape','failure']).optional(),result:id.optional()}).strict(),
  z.object({kind:z.literal('careerCounterChanged'),career:id,counter:id.optional()}).strict(),
  z.object({kind:z.literal('careerTransition'),career:id}).strict(),
  z.object({kind:z.literal('careerFactAdded'),career:id,fact:id.optional()}).strict(),
  z.object({kind:z.literal('questCounterChanged'),quest:id,counter:id.optional()}).strict(),
  z.object({kind:z.literal('questTransition'),quest:id}).strict(),
  z.object({kind:z.literal('questFactAdded'),quest:id,fact:id.optional()}).strict(),
  z.object({kind:z.literal('relationshipCounterChanged'),relationship:id,counter:id.optional()}).strict(),
  z.object({kind:z.literal('relationshipTransition'),relationship:id}).strict(),
  z.object({kind:z.literal('relationshipFactAdded'),relationship:id,fact:id.optional()}).strict(),
  z.object({kind:z.literal('worldFactAdded'),fact:id}).strict(),
  z.object({kind:z.literal('endingEligible'),ending:id.optional()}).strict(),
  z.object({kind:z.literal('endingCommitted'),ending:id}).strict()
]);
export type ReactionTrigger=z.infer<typeof reactionTriggerSchema>;

export type ReactionFact =
  | {kind:'creationCompleted'}
  | {kind:'actionCompleted';action:string}
  | {kind:'choiceResolved';event:string;choice:string}
  | {kind:'statChanged';stat:Stat;from:number;to:number}
  | {kind:'resourceChanged';resource:ResourceId;from:number;to:number}
  | {kind:'energyChanged';from:number;to:number}
  | {kind:'calendarAdvanced';from:number;to:number}
  | {kind:'dayStarted';day:number}
  | {kind:'nightPhase';point:'before_lodging'|'after_lodging'|'after_choice'}
  | {kind:'nightChoiceCompleted';choice:string}
  | {kind:'activityResult';activity:string;outcome:'success'|'escape'|'failure';result:string}
  | {kind:'careerCounterChanged';career:string;counter:string;from:number;to:number}
  | {kind:'careerTransition';career:string;from:string;to:string}
  | {kind:'careerFactAdded';career:string;fact:string}
  | {kind:'questCounterChanged';quest:string;counter:string;from:number;to:number}
  | {kind:'questTransition';quest:string;from:string;to:string}
  | {kind:'questFactAdded';quest:string;fact:string}
  | {kind:'relationshipCounterChanged';relationship:string;counter:string;from:number;to:number}
  | {kind:'relationshipTransition';relationship:string;from:string;to:string}
  | {kind:'relationshipFactAdded';relationship:string;fact:string}
  | {kind:'worldFactAdded';fact:string}
  | {kind:'endingEligible';ending:string}
  | {kind:'endingCommitted';ending:string};

const deliverySchema=z.object({
  policy:z.enum(['live','latched','scheduled']).default('live'),
  expiresAfterDays:z.number().int().min(1).max(160).optional()
}).strict().default({policy:'live'});

const nightPolicySchema=z.object({
  intercept:z.enum(['before_lodging','after_lodging','after_choice']),
  suppressLodgingPayment:z.boolean().default(false),
  suppressVoluntaryMenu:z.boolean().default(false),
  consumesNight:z.boolean().default(false)
}).strict();

const media = z.object({
  id,
  kind:z.enum(['image','gif','video']),
  src:z.string().regex(/^assets\/[a-zA-Z0-9/_-]+\.(svg|png|webp|gif|mp4|webm)$/),
  alt:z.string().min(1).max(300)
}).strict();
const variant = z.object({id,text:z.string().min(10).max(5000),conditions:z.array(conditionSchema),media:z.array(id).max(6)}).strict();
const choice = z.object({id,label:z.string().min(1).max(160),text:z.string().max(3000),media:z.array(id).max(6).optional(),conditions:z.array(conditionSchema),effects:z.array(effectSchema).max(24)}).strict();
export const eventSchema = z.object({
  id,
  title:z.string().min(1).max(150),
  sourceDomain:id.optional(),
  trigger:z.array(id).default([]),
  reactionTriggers:z.array(reactionTriggerSchema).max(32).default([]),
  priorityClass:z.enum(priorityClasses).default('normal_progression'),
  priority:n,
  blocking:z.boolean().default(true),
  delivery:deliverySchema,
  nightPolicy:nightPolicySchema.optional(),
  chance:z.object({base:z.number().min(0).max(1),stat:metricEnum,perPoint:z.number().min(0).max(1),max:z.number().min(0).max(1)}).strict().optional(),
  cooldownDays:n,variantCooldownDays:n,maxShows:n.min(1),
  conditions:z.array(conditionSchema),variants:z.array(variant).min(1).max(10),
  choices:z.array(choice).min(1).max(5)
}).strict();
export type StoryEvent=z.infer<typeof eventSchema>;

export const packSchema=z.object({
  schemaVersion:z.literal(1),
  id,
  reads:z.array(id),
  writes:z.array(id),
  capabilities:capabilitiesSchema.optional(),
  media:z.array(media),
  events:z.array(eventSchema)
}).strict();
export type Pack=z.infer<typeof packSchema>;

export const itemDefinitionSchema=z.object({
  id:z.enum(items),
  label:z.string().min(1).max(150),
  capabilities:z.array(id).max(16).default([])
}).strict();
export type ItemDefinition=z.infer<typeof itemDefinitionSchema>;

const wageSchema=z.object({base:n,weights:z.array(z.object({stat:metricEnum,factor:z.number().min(0).max(10)}).strict()).max(5)}).strict();
export const actionSchema=z.object({
  id,label:z.string(),description:z.string(),cost:z.object({money:n,energy:n}).strict(),
  conditions:z.array(conditionSchema),effects:z.array(effectSchema),mode:z.enum(['normal','brew','story']),
  scenes:z.array(variant).min(1).optional(),wage:wageSchema.optional(),
  seasonal:z.object({spring:z.array(effectSchema),summer:z.array(effectSchema),autumn:z.array(effectSchema),winter:z.array(effectSchema)}).strict().optional()
}).strict();
export type Action=z.infer<typeof actionSchema>;

export const lodgingSchema=z.object({
  id,
  label:z.string().min(1).max(120),
  housing:z.enum(targetHousing),
  moneyCost:n.max(1_000_000),
  conditions:z.array(conditionSchema).max(24).default([]),
  effects:z.array(effectSchema).max(24).default([]),
  nextDayEffects:z.array(statDelta).max(12).default([]),
  nextDayEnergyDelta:z.number().int().min(-10).max(10).default(0)
}).strict();
export type LodgingDefinition=z.infer<typeof lodgingSchema>;

export const nightChoiceSchema=z.object({
  id,
  label:z.string().min(1).max(120),
  conditions:z.array(conditionSchema).max(24).default([]),
  effects:z.array(effectSchema).max(24).default([]),
  nextDayEffects:z.array(statDelta).max(12).default([]),
  nextDayEnergyDelta:z.number().int().min(-10).max(10).default(0)
}).strict();
export type NightChoiceDefinition=z.infer<typeof nightChoiceSchema>;

export const activityOutcomes=['success','escape','failure'] as const;
export type ActivityOutcome=typeof activityOutcomes[number];

const counterActivityConfigSchema=z.object({
  initialEndurance:z.number().int().min(1).max(1000),
  advanceEnduranceCost:z.number().int().min(1).max(1000),
  successAtProgress:z.number().int().min(1).max(1000),
  failAtEndurance:z.number().int().min(0).max(1000)
}).strict();

const activityOptionSchema=z.object({
  id,
  label:z.string().min(1).max(150),
  category:id,
  conditions:z.array(conditionSchema).max(24).default([]),
  progressDelta:z.number().int().min(0).max(1000).default(0),
  enduranceCost:z.number().int().min(0).max(1000).default(0),
  setRoute:id.optional()
}).strict();

const activityResultDefinitionSchema=z.object({
  id,
  outcome:z.enum(activityOutcomes),
  effects:z.array(effectSchema).max(24).default([])
}).strict();

export const activityDefinitionSchema=z.object({
  id,
  label:z.string().min(1).max(150),
  version:z.number().int().min(1).max(1000),
  entryConditions:z.array(conditionSchema).max(32).default([]),
  entryEnergyCost:z.number().int().min(0).max(10),
  resumePolicy:z.enum(['allowed','checkpoint_only','forbidden']),
  timePolicy:z.enum(['same_day','advances_calendar_on_exit','can_advance_days_internally']),
  failurePolicy:z.enum(['exit_to_day','exit_to_night','terminal']),
  adapter:z.literal('counter.v1'),
  adapterConfig:counterActivityConfigSchema,
  options:z.array(activityOptionSchema).max(64).default([]),
  results:z.array(activityResultDefinitionSchema).min(3).max(3)
}).strict();
export type ActivityDefinition=z.infer<typeof activityDefinitionSchema>;

const counterActivityStateSchema=z.object({
  progress:z.number().int().min(0).max(1_000_000),
  endurance:z.number().int().min(0).max(1_000_000),
  steps:z.number().int().min(0).max(1_000_000),
  lastRoll:z.number().min(0).max(1).nullable(),
  routeId:id.nullable().default(null),
  resolvedOptionIds:z.array(id).max(128).default([])
}).strict();

export const activityEnvelopeSchema=z.object({
  activityId:id,
  definitionVersion:z.number().int().min(1).max(1000),
  adapter:z.literal('counter.v1'),
  status:z.enum(['active','resolving']),
  startedDay:n.max(159),
  entryEnergyCommitted:z.literal(true),
  optionModelVersion:z.number().int().min(0).max(1).default(0),
  internalState:counterActivityStateSchema,
  rngState:z.number().int().min(0).max(4294967295),
  checkpoint:id,
  accumulatedRewards:z.array(effectSchema).max(64),
  emittedFacts:z.array(id).max(64)
}).strict();
export type ActivityEnvelope=z.infer<typeof activityEnvelopeSchema>;

export const ordinaryHardWorkCareers=['lumber','satyr-maid','undead-farm','tavern','hunter','guard','merchant','artist-geisha','assassin','prostitute'] as const;
export type OrdinaryHardWorkCareer=typeof ordinaryHardWorkCareers[number];

export const metaRewardSchema=z.discriminatedUnion('kind',[
  z.object({kind:z.literal('unlock'),rewardId:rewardId,unlock:id}).strict(),
  z.object({kind:z.literal('hardWork'),rewardId:rewardId,career:z.enum(ordinaryHardWorkCareers)}).strict()
]);
export type MetaReward=z.infer<typeof metaRewardSchema>;

export const endingSchema=z.object({
  id,
  title:z.string(),
  description:z.string(),
  conditions:z.array(conditionSchema),
  reward:id,
  metaRewards:z.array(metaRewardSchema).max(16).optional(),
  epilogue:z.string()
}).strict();
export const definitionsSchema=z.object({
  version:z.literal('0.1.0'),
  flags:z.array(id),
  actions:z.array(actionSchema),
  endings:z.array(endingSchema),
  careers:z.array(machineDefinitionSchema).optional(),
  quests:z.array(machineDefinitionSchema).optional(),
  relationships:z.array(machineDefinitionSchema).optional(),
  itemDefinitions:z.array(itemDefinitionSchema).default([]),
  lodgings:z.array(lodgingSchema).default([]),
  nightChoices:z.array(nightChoiceSchema).default([]),
  activities:z.array(activityDefinitionSchema).default([])
}).strict();
export type Definitions=z.infer<typeof definitionsSchema>;

const progressionStatRecord = z.object(Object.fromEntries(stats.map(k=>[k,z.number().int().min(0).max(100)])) as Record<Stat,ReturnType<typeof z.number>>).strict();
const historyEntry=z.object({count:n,lastDay:n,variants:z.record(z.string(),n)}).strict();
const legacyMetricRecord=z.record(z.string(),z.number().int().min(0).max(1_000_000));
const inventoryRecord=z.record(z.string(),n);

export const characterSchema=z.object({
  stats:progressionStatRecord,
  lust:z.number().int().min(0).max(100),
  creation:z.object({remaining:n.max(10),allocated:z.partialRecord(z.enum(stats),n),complete:z.boolean()}).strict(),
  conditions:z.record(z.string(),z.unknown())
}).strict();

export const calendarSchema=z.object({elapsedDays:n.max(159)}).strict();
export const dayStateSchema=z.object({
  energyCurrent:z.number().int().min(0).max(100),
  nextDayModifiers:z.object({energyDelta:z.number().int().min(-100).max(100),statEffects:z.array(statDelta).max(24),tags:z.array(id).max(32)}).strict(),
  optionalOfferIds:z.array(id).max(64),
  scheduledEventIds:z.array(id).max(64)
}).strict();
export const resourceStateSchema=z.object({money:n,inventory:inventoryRecord}).strict();
export const housingStateSchema=z.object({current:z.enum(targetHousing),paidForCurrentNight:z.boolean()}).strict();

const careerState=z.object({stage:id,shifts:n,counters:z.record(z.string(),n),choices:z.record(z.string(),z.string()),facts:z.array(id)}).strict();
const questState=z.object({stage:id,counters:z.record(z.string(),n),choices:z.record(z.string(),z.string()),facts:z.array(id)}).strict();
const relationshipState=z.object({stage:id,counters:z.record(z.string(),n),choices:z.record(z.string(),z.string()),facts:z.array(id)}).strict();
const schoolTrackState=z.object({
  trackId:id,
  counters:z.record(z.string(),n),
  facts:z.array(id),
  milestones:z.array(id),
  certificates:z.array(id),
  choices:z.record(z.string(),z.string())
}).strict();
export const schoolProgressionStateSchema=z.object({tracks:z.record(z.string(),schoolTrackState)}).strict();
export const progressionStateSchema=z.object({
  careers:z.record(z.string(),careerState),
  quests:z.record(z.string(),questState),
  relationships:z.record(z.string(),relationshipState),
  school:schoolProgressionStateSchema.default({tracks:{}}),
  worldFacts:z.array(id)
}).strict();

const pendingSceneSchema=z.object({
  eventId:id,
  variantId:id,
  presentationId:semanticPresentationId.optional(),
  reactionEpochId:id.optional(),
  allowedChoiceIds:z.array(id).max(16).optional()
}).strict();
const queuedEventInstanceSchema=z.object({
  instanceId:id,
  eventId:id,
  variantId:id,
  allowedChoiceIds:z.array(id).max(16),
  kind:z.enum(['latched','scheduled','optional']),
  createdDay:n.max(159),
  expiresDay:n.max(159).optional(),
  reactionEpochId:id
}).strict();
const reactionStateSchema=z.object({
  epochCounter:n,
  currentEpochId:id.nullable(),
  attemptedEventIds:z.array(id).max(256),
  cascadeDepth:n.max(16),
  queued:z.array(queuedEventInstanceSchema).max(64)
}).strict();
const eventChoicePresentationRefSchema=z.object({kind:z.literal('eventChoice'),eventId:id,choiceId:id}).strict();
const lastActionSchema=z.object({id,title:z.string(),text:z.string(),media:z.array(id),presentationId:semanticPresentationId.optional(),outcomeRef:eventChoicePresentationRefSchema.optional(),deltas:z.record(z.string(),z.number())}).strict();
export const nightFlowStateSchema=z.object({
  phase:z.enum(['PreLodgingForcedCheck','LodgingResolution','PostLodgingForcedCheck','VoluntaryNightChoice','NightEventResolution','NextDayModifiersFinalized','CalendarAdvance','StartDay']),
  startedDay:n.max(159),
  selectedLodgingId:id.nullable(),
  lodgingPaymentCommitted:z.boolean(),
  selectedNightChoiceId:id.nullable(),
  suppressLodgingPayment:z.boolean(),
  suppressVoluntaryMenu:z.boolean(),
  consumesNight:z.boolean(),
  calendarAdvanceCommitted:z.boolean(),
  currentIntercept:z.enum(['before_lodging','after_lodging','after_choice']).nullable(),
  handledEventIds:z.array(id).max(32)
}).strict();
export const flowStateSchema=z.object({
  pendingScene:pendingSceneSchema.nullable(),
  reaction:reactionStateSchema.default({epochCounter:0,currentEpochId:null,attemptedEventIds:[],cascadeDepth:0,queued:[]}),
  night:nightFlowStateSchema.nullable(),
  activity:activityEnvelopeSchema.nullable(),
  lastAction:lastActionSchema.nullable()
}).strict();

const runResultSchema=z.object({
  resultId:id,
  endingId:id,
  transactionId:id,
  completedAtDay:n.max(159),
  firstCompletion:z.boolean(),
  appliedMetaRewardIds:z.array(rewardId).max(32)
}).strict();
export const endingStateSchema=z.object({eligible:z.array(id),committed:id.nullable(),result:runResultSchema.nullable()}).strict();
export const rngStateSchema=z.object({state:z.number().int().min(0).max(4294967295)}).strict();
export const historyStateSchema=z.object({
  eventHistory:z.record(z.string(),historyEntry),
  actionCounts:z.record(id,n),
  dayActionCount:n.max(1000),
  journal:z.array(z.string().max(6000)).max(160),
  journalRefs:z.array(eventChoicePresentationRefSchema.nullable()).max(160).default([])
}).strict();

export const legacyCompatSchema=z.object({
  source:z.literal('m3.2'),
  metrics:legacyMetricRecord,
  flags:z.record(z.string(),z.boolean()),
  originalLimitDays:n.optional()
}).strict();

export const runSchema=z.object({
  id:z.string().min(1).max(100),
  status:z.enum(['active','ending_committed','ended','expired']),
  calendar:calendarSchema,
  character:characterSchema,
  resources:resourceStateSchema,
  dayState:dayStateSchema,
  housingState:housingStateSchema,
  progression:progressionStateSchema,
  endings:endingStateSchema,
  flow:flowStateSchema,
  rngState:rngStateSchema,
  historyState:historyStateSchema,
  legacyCompat:legacyCompatSchema.optional()
}).strict();

export const metaSchema=z.object({
  profileVersion:n.min(1),
  completedEndings:z.array(id),
  unlocks:z.array(id),
  ruleModifiers:z.record(z.string(),z.unknown()),
  hardWorkProgress:z.array(id),
  persistentChoices:z.record(z.string(),z.unknown()),
  activeLegacyPerks:z.array(id).max(16),
  appliedResultTransactions:z.array(id).max(10_000).default([]),
  runsStarted:n.min(1),
  runsCompleted:n
}).strict();

export const saveSchema=z.object({schemaVersion:z.literal(4),contentVersion:z.string().min(1).max(80),run:runSchema,meta:metaSchema}).strict();

type SaveCore=z.infer<typeof saveSchema>;
type RunCore=SaveCore['run'];
type MetaCore=SaveCore['meta'];

export type LegacyMetricView=Record<string,number>;
export interface LegacyRunFacade {
  day:number;
  slot:number;
  readonly limitDays:number;
  housing:typeof housing[number];
  metrics:LegacyMetricView;
  flags:Record<string,boolean>;
  inventory:Record<string,number>;
  creation:RunCore['character']['creation'];
  rng:number;
  lastAction:RunCore['flow']['lastAction'];
  actionCounts:RunCore['historyState']['actionCounts'];
  history:RunCore['historyState']['eventHistory'];
  pending:RunCore['flow']['pendingScene'];
  availableEndings:string[];
  acceptedEnding:string|null;
  journal:string[];
}
export interface LegacyMetaFacade { completed:string[]; lives:number; }
export type Run=RunCore & LegacyRunFacade;
export type Meta=MetaCore & LegacyMetaFacade;
export type Save=Omit<SaveCore,'run'|'meta'> & {run:Run;meta:Meta};
export interface Catalog {definitions:Definitions;packs:Pack[];events:StoryEvent[];media:Pack['media']}

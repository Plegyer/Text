import { z } from 'zod';

export const stats = ['strength','endurance','dexterity','reason','magic','creativity','wits','charm','sociability','manners','grooming','sexuality'] as const;
export const legacyStats = ['strength','endurance','dexterity','perception','intelligence','magic','empathy','persuasion','composure','organization','lust'] as const;
export const legacyExtras = ['health','stress','debt','work','lessons','alchemy','trust'] as const;
export const resourceMetrics = ['money','energy'] as const;
export const metrics = [...new Set([...stats,...legacyStats,...legacyExtras,...resourceMetrics])] as readonly string[];
export const seasons = ['spring','summer','autumn','winter'] as const;
export const housing = ['room','hostel','shelter'] as const;
export const targetHousing = ['normal','cheap','street'] as const;
export const unlocks = ['guild','scholar','calendar','host','mediator','court','vitality'] as const;
export const items = ['herb','tonic','scales'] as const;
export type Stat = typeof stats[number];
export type LegacyMetric = typeof metrics[number];
export type Metric = LegacyMetric;

export type Condition =
  | {kind:'metric';key:Metric;op:'gte'|'lte'|'eq';value:number}
  | {kind:'visits';action:string;value:number}
  | {kind:'flag';key:string;value:boolean}
  | {kind:'season';value:typeof seasons[number]}
  | {kind:'housing';value:typeof housing[number]}
  | {kind:'unlock';value:string}
  | {kind:'item';id:typeof items[number];count:number}
  | {kind:'all'|'any';conditions:Condition[]}
  | {kind:'not';condition:Condition};

const id = z.string().regex(/^[a-z][a-z0-9_.-]{1,79}$/);
const n = z.number().int().min(0).max(1_000_000);
const metricEnum = z.enum(metrics as [string,...string[]]);

export const conditionSchema: z.ZodType<Condition> = z.lazy(()=>z.union([
  z.object({kind:z.literal('metric'),key:metricEnum,op:z.enum(['gte','lte','eq']),value:n}).strict(),
  z.object({kind:z.literal('visits'),action:id,value:n}).strict(),
  z.object({kind:z.literal('flag'),key:id,value:z.boolean()}).strict(),
  z.object({kind:z.literal('season'),value:z.enum(seasons)}).strict(),
  z.object({kind:z.literal('housing'),value:z.enum(housing)}).strict(),
  z.object({kind:z.literal('unlock'),value:id}).strict(),
  z.object({kind:z.literal('item'),id:z.enum(items),count:n}).strict(),
  z.object({kind:z.enum(['all','any']),conditions:z.array(conditionSchema).min(1).max(16)}).strict(),
  z.object({kind:z.literal('not'),condition:conditionSchema}).strict()
]));

export const effectSchema = z.discriminatedUnion('kind',[
  z.object({kind:z.literal('metric'),key:metricEnum,delta:z.number().int().min(-1000).max(1000)}).strict(),
  z.object({kind:z.literal('flag'),key:id,value:z.boolean()}).strict(),
  z.object({kind:z.literal('item'),id:z.enum(items),delta:z.number().int().min(-10).max(10)}).strict(),
  z.object({kind:z.literal('housing'),value:z.enum(housing)}).strict()
]);
export type Effect = z.infer<typeof effectSchema>;

const media = z.object({
  id,
  kind:z.enum(['image','gif','video']),
  src:z.string().regex(/^assets\/[a-zA-Z0-9/_-]+\.(svg|png|webp|gif|mp4|webm)$/),
  alt:z.string().min(1).max(300)
}).strict();
const variant = z.object({id,text:z.string().min(10).max(5000),conditions:z.array(conditionSchema),media:z.array(id).max(6)}).strict();
const choice = z.object({id,label:z.string().min(1).max(160),text:z.string().max(3000),media:z.array(id).max(6).optional(),conditions:z.array(conditionSchema),effects:z.array(effectSchema).max(12)}).strict();
export const eventSchema = z.object({
  id,title:z.string().min(1).max(150),trigger:z.array(id).min(1),priority:n,
  chance:z.object({base:z.number().min(0).max(1),stat:metricEnum,perPoint:z.number().min(0).max(1),max:z.number().min(0).max(1)}).strict().optional(),
  cooldownDays:n,variantCooldownDays:n,maxShows:n.min(1),
  conditions:z.array(conditionSchema),variants:z.array(variant).min(1).max(10),
  choices:z.array(choice).min(1).max(5)
}).strict();
export type StoryEvent=z.infer<typeof eventSchema>;
export const packSchema=z.object({
  schemaVersion:z.literal(1),id,reads:z.array(id),writes:z.array(id),
  media:z.array(media),events:z.array(eventSchema)
}).strict();
export type Pack=z.infer<typeof packSchema>;
const wageSchema=z.object({base:n,weights:z.array(z.object({stat:metricEnum,factor:z.number().min(0).max(10)}).strict()).max(5)}).strict();
export const actionSchema=z.object({
  id,label:z.string(),description:z.string(),cost:z.object({money:n,energy:n}).strict(),
  conditions:z.array(conditionSchema),effects:z.array(effectSchema),mode:z.enum(['normal','brew','story']),
  scenes:z.array(variant).min(1).optional(),wage:wageSchema.optional(),
  seasonal:z.object({spring:z.array(effectSchema),summer:z.array(effectSchema),autumn:z.array(effectSchema),winter:z.array(effectSchema)}).strict().optional()
}).strict();
export type Action=z.infer<typeof actionSchema>;
export const endingSchema=z.object({id,title:z.string(),description:z.string(),conditions:z.array(conditionSchema),reward:id,epilogue:z.string()}).strict();
export const definitionsSchema=z.object({version:z.literal('0.1.0'),flags:z.array(id),actions:z.array(actionSchema),endings:z.array(endingSchema)}).strict();
export type Definitions=z.infer<typeof definitionsSchema>;

const progressionStatRecord = z.object(Object.fromEntries(stats.map(k=>[k,z.number().int().min(0).max(100)])) as Record<Stat,ReturnType<typeof z.number>>).strict();
const historyEntry=z.object({count:n,lastDay:n,variants:z.record(z.string(),n)}).strict();
const legacyMetricRecord=z.record(z.string(),z.number().int().min(0).max(1_000_000));
const inventoryRecord=z.record(z.string(),n);
const statDelta=z.object({stat:z.enum(stats),delta:z.number().int().min(-100).max(100)}).strict();

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
export const progressionStateSchema=z.object({
  careers:z.record(z.string(),careerState),
  quests:z.record(z.string(),questState),
  relationships:z.record(z.string(),relationshipState),
  worldFacts:z.array(id)
}).strict();

const pendingSceneSchema=z.object({eventId:id,variantId:id,presentationId:id.optional()}).strict();
const lastActionSchema=z.object({id,title:z.string(),text:z.string(),media:z.array(id),deltas:z.record(z.string(),z.number())}).strict();
export const flowStateSchema=z.object({
  pendingScene:pendingSceneSchema.nullable(),
  night:z.record(z.string(),z.unknown()).nullable(),
  activity:z.record(z.string(),z.unknown()).nullable(),
  lastAction:lastActionSchema.nullable()
}).strict();

const runResultSchema=z.object({endingId:id,transactionId:id,completedAtDay:n.max(159)}).strict();
export const endingStateSchema=z.object({eligible:z.array(id),committed:id.nullable(),result:runResultSchema.nullable()}).strict();
export const rngStateSchema=z.object({state:z.number().int().min(0).max(4294967295)}).strict();
export const historyStateSchema=z.object({
  eventHistory:z.record(z.string(),historyEntry),
  actionCounts:z.record(id,n),
  dayActionCount:n.max(1000),
  journal:z.array(z.string().max(6000)).max(160)
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
  day:dayStateSchema,
  housing:housingStateSchema,
  progression:progressionStateSchema,
  endings:endingStateSchema,
  flow:flowStateSchema,
  rng:rngStateSchema,
  history:historyStateSchema,
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
  runsStarted:n.min(1),
  runsCompleted:n
}).strict();

export const saveSchema=z.object({schemaVersion:z.literal(4),contentVersion:z.string().min(1).max(80),run:runSchema,meta:metaSchema}).strict();

type SaveCore=z.infer<typeof saveSchema>;
type RunCore=SaveCore['run'];
type MetaCore=SaveCore['meta'];

export type LegacyMetricView=Record<string,number>;
export interface LegacyRunFacade {
  slot:number;
  readonly limitDays:number;
  metrics:LegacyMetricView;
  flags:Record<string,boolean>;
  inventory:Record<string,number>;
  creation:RunCore['character']['creation'];
  lastAction:RunCore['flow']['lastAction'];
  actionCounts:RunCore['history']['actionCounts'];
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

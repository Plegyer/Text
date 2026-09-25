import { z } from 'zod';

export const stats = ['strength','endurance','dexterity','perception','intelligence','magic','empathy','persuasion','composure','organization','lust'] as const;
export const metrics = [...stats,'money','energy','health','stress','debt','work','lessons','alchemy','trust'] as const;
export const seasons = ['spring','summer','autumn','winter'] as const;
export const housing = ['room','hostel','shelter'] as const;
export const unlocks = ['guild','scholar','calendar','host','mediator','court','vitality'] as const;
export const items = ['herb','tonic','scales'] as const;
export type Metric = typeof metrics[number];
export type Condition =
  | {kind:'metric';key:Metric;op:'gte'|'lte'|'eq';value:number}
  | {kind:'visits';action:string;value:number}
  | {kind:'flag';key:string;value:boolean}
  | {kind:'season';value:typeof seasons[number]}
  | {kind:'housing';value:typeof housing[number]}
  | {kind:'unlock';value:typeof unlocks[number]}
  | {kind:'item';id:typeof items[number];count:number}
  | {kind:'all'|'any';conditions:Condition[]}
  | {kind:'not';condition:Condition};
const id = z.string().regex(/^[a-z][a-z0-9_.-]{1,79}$/);
const n = z.number().int().min(0).max(1_000_000);
export const conditionSchema: z.ZodType<Condition> = z.lazy(()=>z.union([
  z.object({kind:z.literal('metric'),key:z.enum(metrics),op:z.enum(['gte','lte','eq']),value:n}).strict(),
  z.object({kind:z.literal('visits'),action:id,value:n}).strict(),
  z.object({kind:z.literal('flag'),key:id,value:z.boolean()}).strict(),
  z.object({kind:z.literal('season'),value:z.enum(seasons)}).strict(),
  z.object({kind:z.literal('housing'),value:z.enum(housing)}).strict(),
  z.object({kind:z.literal('unlock'),value:z.enum(unlocks)}).strict(),
  z.object({kind:z.literal('item'),id:z.enum(items),count:n}).strict(),
  z.object({kind:z.enum(['all','any']),conditions:z.array(conditionSchema).min(1).max(16)}).strict(),
  z.object({kind:z.literal('not'),condition:conditionSchema}).strict()
]));
export const effectSchema = z.discriminatedUnion('kind',[
  z.object({kind:z.literal('metric'),key:z.enum(metrics),delta:z.number().int().min(-1000).max(1000)}).strict(),
  z.object({kind:z.literal('flag'),key:id,value:z.boolean()}).strict(),
  z.object({kind:z.literal('item'),id:z.enum(items),delta:z.number().int().min(-10).max(10)}).strict(),
  z.object({kind:z.literal('housing'),value:z.enum(housing)}).strict()
]);
export type Effect = z.infer<typeof effectSchema>;
const media = z.object({id,kind:z.enum(['image','gif','video']),src:z.string().regex(/^assets\/[a-zA-Z0-9/_-]+\.(svg|png|webp|gif|mp4|webm)$/),alt:z.string().min(1).max(300)}).strict();
const variant = z.object({id,text:z.string().min(10).max(5000),conditions:z.array(conditionSchema),media:z.array(id).max(6)}).strict();
const choice = z.object({id,label:z.string().min(1).max(160),text:z.string().max(3000),media:z.array(id).max(6).optional(),conditions:z.array(conditionSchema),effects:z.array(effectSchema).max(12)}).strict();
export const eventSchema = z.object({
  id,title:z.string().min(1).max(150),trigger:z.array(id).min(1),priority:n,
  chance:z.object({base:z.number().min(0).max(1),stat:z.enum(stats),perPoint:z.number().min(0).max(1),max:z.number().min(0).max(1)}).strict().optional(),
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
const wageSchema=z.object({base:n,weights:z.array(z.object({stat:z.enum(stats),factor:z.number().min(0).max(10)}).strict()).max(5)}).strict();
export const actionSchema=z.object({id,label:z.string(),description:z.string(),cost:z.object({money:n,energy:n}).strict(),conditions:z.array(conditionSchema),effects:z.array(effectSchema),mode:z.enum(['normal','brew','story']),scenes:z.array(variant).min(1).optional(),wage:wageSchema.optional(),seasonal:z.object({spring:z.array(effectSchema),summer:z.array(effectSchema),autumn:z.array(effectSchema),winter:z.array(effectSchema)}).strict().optional()}).strict();
export type Action=z.infer<typeof actionSchema>;
export const endingSchema=z.object({id,title:z.string(),description:z.string(),conditions:z.array(conditionSchema),reward:z.enum(unlocks),epilogue:z.string()}).strict();
export const definitionsSchema=z.object({version:z.literal('0.1.0'),flags:z.array(id),actions:z.array(actionSchema),endings:z.array(endingSchema)}).strict();
export type Definitions=z.infer<typeof definitionsSchema>;
const metricRecord = z.object(Object.fromEntries(metrics.map(k=>[k,n])) as Record<Metric,typeof n>).strict();
const historyEntry=z.object({count:n,lastDay:n,variants:z.record(z.string(),n)}).strict();
export const runSchema=z.object({
  id:z.string().min(1).max(100),day:n.max(559),slot:n.max(1000),limitDays:z.union([z.literal(448),z.literal(560)]),
  status:z.enum(['active','ended','expired']),housing:z.enum(housing),metrics:metricRecord,
  flags:z.record(z.string(),z.boolean()),inventory:z.object({herb:n,tonic:n,scales:n}).strict(),
  creation:z.object({remaining:n.max(10),allocated:z.partialRecord(z.enum(stats),n),complete:z.boolean()}).strict(),
  rng:z.number().int().min(0).max(4294967295),
  lastAction:z.object({id,title:z.string(),text:z.string(),media:z.array(id),deltas:z.record(z.string(),z.number())}).strict().nullable(),
  actionCounts:z.record(id,n),
  history:z.record(z.string(),historyEntry),
  pending:z.object({eventId:id,variantId:id}).strict().nullable(),
  availableEndings:z.array(id),acceptedEnding:id.nullable(),
  journal:z.array(z.string().max(6000)).max(80)
}).strict();
export const metaSchema=z.object({unlocks:z.array(z.enum(unlocks)),completed:z.array(id),lives:n.min(1)}).strict();
export const saveSchema=z.object({schemaVersion:z.literal(3),contentVersion:z.literal('0.1.0'),run:runSchema,meta:metaSchema}).strict();
export type Run=z.infer<typeof runSchema>;
export type Meta=z.infer<typeof metaSchema>;
export type Save=z.infer<typeof saveSchema>;
export interface Catalog {definitions:Definitions;packs:Pack[];events:StoryEvent[];media:Pack['media']}

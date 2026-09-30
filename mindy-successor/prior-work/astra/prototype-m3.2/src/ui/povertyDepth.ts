export type PovertyDepthLookupEntry={
  eventId:string;
  variantId:string;
  orderedDepthLocalizationKeys:readonly string[];
  coreFallbackLocalizationKey:string;
};

const basePovertyDepthLookupEntries=[
  {
    "eventId": "poverty-street-production.helpful-summer",
    "variantId": "default",
    "orderedDepthLocalizationKeys": [
      "presentation.poverty.depth.poverty-street-production-helpful-summer.default.a.text",
      "presentation.poverty.depth.poverty-street-production-helpful-summer.default.b.text"
    ],
    "coreFallbackLocalizationKey": "event.poverty-street-production.helpful-summer.variant.default.text"
  },
  {
    "eventId": "poverty-street-production.neutral-autumn",
    "variantId": "default",
    "orderedDepthLocalizationKeys": [],
    "coreFallbackLocalizationKey": "event.poverty-street-production.neutral-autumn.variant.default.text"
  },
  {
    "eventId": "poverty-street-production.pressure-winter",
    "variantId": "default",
    "orderedDepthLocalizationKeys": [
      "presentation.poverty.depth.poverty-street-production-pressure-winter.default.a.text",
      "presentation.poverty.depth.poverty-street-production-pressure-winter.default.b.text"
    ],
    "coreFallbackLocalizationKey": "event.poverty-street-production.pressure-winter.variant.default.text"
  },
  {
    "eventId": "poverty-street-production-v2.helpful-summer-shade",
    "variantId": "market-closing",
    "orderedDepthLocalizationKeys": [
      "presentation.poverty.depth.poverty-street-production-v2-helpful-summer-shade.market-closing.a.text"
    ],
    "coreFallbackLocalizationKey": "event.poverty-street-production-v2.helpful-summer-shade.variant.market-closing.text"
  },
  {
    "eventId": "poverty-street-production-v2.helpful-summer-shade",
    "variantId": "late-shade",
    "orderedDepthLocalizationKeys": [
      "presentation.poverty.depth.poverty-street-production-v2-helpful-summer-shade.late-shade.b.text"
    ],
    "coreFallbackLocalizationKey": "event.poverty-street-production-v2.helpful-summer-shade.variant.late-shade.text"
  },
  {
    "eventId": "poverty-street-production-v2.neutral-autumn-crossing",
    "variantId": "drizzle",
    "orderedDepthLocalizationKeys": [],
    "coreFallbackLocalizationKey": "event.poverty-street-production-v2.neutral-autumn-crossing.variant.drizzle.text"
  },
  {
    "eventId": "poverty-street-production-v2.neutral-autumn-crossing",
    "variantId": "dry-arcade",
    "orderedDepthLocalizationKeys": [],
    "coreFallbackLocalizationKey": "event.poverty-street-production-v2.neutral-autumn-crossing.variant.dry-arcade.text"
  },
  {
    "eventId": "poverty-street-production-v2.pressure-winter-wind",
    "variantId": "crosswind",
    "orderedDepthLocalizationKeys": [
      "presentation.poverty.depth.poverty-street-production-v2-pressure-winter-wind.crosswind.a.text"
    ],
    "coreFallbackLocalizationKey": "event.poverty-street-production-v2.pressure-winter-wind.variant.crosswind.text"
  },
  {
    "eventId": "poverty-street-production-v2.pressure-winter-wind",
    "variantId": "long-gusts",
    "orderedDepthLocalizationKeys": [
      "presentation.poverty.depth.poverty-street-production-v2-pressure-winter-wind.long-gusts.b.text"
    ],
    "coreFallbackLocalizationKey": "event.poverty-street-production-v2.pressure-winter-wind.variant.long-gusts.text"
  },
  {
    "eventId": "poverty-cheap-production.shared-quiet-autumn",
    "variantId": "default",
    "orderedDepthLocalizationKeys": [
      "presentation.poverty.depth.poverty-cheap-production-shared-quiet-autumn.default.a.text",
      "presentation.poverty.depth.poverty-cheap-production-shared-quiet-autumn.default.b.text"
    ],
    "coreFallbackLocalizationKey": "event.poverty-cheap-production.shared-quiet-autumn.variant.default.text"
  },
  {
    "eventId": "poverty-cheap-production-v2.shared-room-seasons",
    "variantId": "spring-window",
    "orderedDepthLocalizationKeys": [
      "presentation.poverty.depth.poverty-cheap-production-v2-shared-room-seasons.spring-window.a.text"
    ],
    "coreFallbackLocalizationKey": "event.poverty-cheap-production-v2.shared-room-seasons.variant.spring-window.text"
  },
  {
    "eventId": "poverty-cheap-production-v2.shared-room-seasons",
    "variantId": "summer-heat",
    "orderedDepthLocalizationKeys": [
      "presentation.poverty.depth.poverty-cheap-production-v2-shared-room-seasons.summer-heat.b.text"
    ],
    "coreFallbackLocalizationKey": "event.poverty-cheap-production-v2.shared-room-seasons.variant.summer-heat.text"
  },
  {
    "eventId": "poverty-cheap-production-v2.shared-room-seasons",
    "variantId": "winter-stove",
    "orderedDepthLocalizationKeys": [
      "presentation.poverty.depth.poverty-cheap-production-v2-shared-room-seasons.winter-stove.c.text"
    ],
    "coreFallbackLocalizationKey": "event.poverty-cheap-production-v2.shared-room-seasons.variant.winter-stove.text"
  },
  {
    "eventId": "poverty-cheap-production-v2.shared-room-seasons",
    "variantId": "shared-room",
    "orderedDepthLocalizationKeys": [
      "presentation.poverty.depth.poverty-cheap-production-v2-shared-room-seasons.shared-room.d.text"
    ],
    "coreFallbackLocalizationKey": "event.poverty-cheap-production-v2.shared-room-seasons.variant.shared-room.text"
  },
  {
    "eventId": "poverty-recovery-production.small-coin-help",
    "variantId": "default",
    "orderedDepthLocalizationKeys": [
      "presentation.poverty.depth.poverty-recovery-production-small-coin-help.default.a.text",
      "presentation.poverty.depth.poverty-recovery-production-small-coin-help.default.b.text"
    ],
    "coreFallbackLocalizationKey": "event.poverty-recovery-production.small-coin-help.variant.default.text"
  },
  {
    "eventId": "poverty-recovery-production.short-cleanup",
    "variantId": "default",
    "orderedDepthLocalizationKeys": [
      "presentation.poverty.depth.poverty-recovery-production-short-cleanup.default.a.text",
      "presentation.poverty.depth.poverty-recovery-production-short-cleanup.default.b.text"
    ],
    "coreFallbackLocalizationKey": "event.poverty-recovery-production.short-cleanup.variant.default.text"
  },
  {
    "eventId": "poverty-recovery-production.herb-bundle",
    "variantId": "default",
    "orderedDepthLocalizationKeys": [
      "presentation.poverty.depth.poverty-recovery-production-herb-bundle.default.a.text",
      "presentation.poverty.depth.poverty-recovery-production-herb-bundle.default.b.text"
    ],
    "coreFallbackLocalizationKey": "event.poverty-recovery-production.herb-bundle.variant.default.text"
  },
  {
    "eventId": "poverty-pressure-production.cold-rain",
    "variantId": "default",
    "orderedDepthLocalizationKeys": [
      "presentation.poverty.depth.poverty-pressure-production-cold-rain.default.a.text",
      "presentation.poverty.depth.poverty-pressure-production-cold-rain.default.b.text"
    ],
    "coreFallbackLocalizationKey": "event.poverty-pressure-production.cold-rain.variant.default.text"
  },
  {
    "eventId": "poverty-pressure-production.noisy-loading",
    "variantId": "default",
    "orderedDepthLocalizationKeys": [
      "presentation.poverty.depth.poverty-pressure-production-noisy-loading.default.a.text",
      "presentation.poverty.depth.poverty-pressure-production-noisy-loading.default.b.text"
    ],
    "coreFallbackLocalizationKey": "event.poverty-pressure-production.noisy-loading.variant.default.text"
  },
  {
    "eventId": "poverty-pressure-production.muddy-splash",
    "variantId": "default",
    "orderedDepthLocalizationKeys": [
      "presentation.poverty.depth.poverty-pressure-production-muddy-splash.default.a.text",
      "presentation.poverty.depth.poverty-pressure-production-muddy-splash.default.b.text"
    ],
    "coreFallbackLocalizationKey": "event.poverty-pressure-production.muddy-splash.variant.default.text"
  }
] as const satisfies readonly PovertyDepthLookupEntry[];

const acceptedPovertyDepthAdditions=[
  ['poverty-pressure-production.cold-rain','default','presentation.poverty.depth.poverty-pressure-production-cold-rain.default.f.text'],
  ['poverty-cheap-production-v2.shared-room-seasons','spring-window','presentation.poverty.depth.poverty-cheap-production-v2-shared-room-seasons.spring-window.f.text'],
  ['poverty-street-production.helpful-summer','default','presentation.poverty.depth.poverty-street-production-helpful-summer.default.f.text'],
  ['poverty-street-production-v2.helpful-summer-shade','late-shade','presentation.poverty.depth.poverty-street-production-v2-helpful-summer-shade.late-shade.f.text'],
  ['poverty-cheap-production-v2.shared-room-seasons','summer-heat','presentation.poverty.depth.poverty-cheap-production-v2-shared-room-seasons.summer-heat.f.text'],
  ['poverty-street-production-v2.neutral-autumn-crossing','drizzle','presentation.poverty.depth.poverty-street-production-v2-neutral-autumn-crossing.drizzle.f.text'],
  ['poverty-cheap-production.shared-quiet-autumn','default','presentation.poverty.depth.poverty-cheap-production-shared-quiet-autumn.default.f.text'],
  ['poverty-street-production.pressure-winter','default','presentation.poverty.depth.poverty-street-production-pressure-winter.default.f.text'],
  ['poverty-street-production-v2.pressure-winter-wind','crosswind','presentation.poverty.depth.poverty-street-production-v2-pressure-winter-wind.crosswind.f.text'],
  ['poverty-cheap-production-v2.shared-room-seasons','winter-stove','presentation.poverty.depth.poverty-cheap-production-v2-shared-room-seasons.winter-stove.f.text'],
  ['poverty-recovery-production.small-coin-help','default','presentation.poverty.depth.poverty-recovery-production-small-coin-help.default.f.text'],
  ['poverty-recovery-production.short-cleanup','default','presentation.poverty.depth.poverty-recovery-production-short-cleanup.default.f.text'],
  ['poverty-recovery-production.herb-bundle','default','presentation.poverty.depth.poverty-recovery-production-herb-bundle.default.f.text'],
  ['poverty-street-production.helpful-summer','default','presentation.poverty.depth.poverty-street-production-helpful-summer.default.g.text'],
  ['poverty-street-production-v2.helpful-summer-shade','market-closing','presentation.poverty.depth.poverty-street-production-v2-helpful-summer-shade.market-closing.g.text'],
  ['poverty-street-production-v2.helpful-summer-shade','late-shade','presentation.poverty.depth.poverty-street-production-v2-helpful-summer-shade.late-shade.g.text']
] as const;

const acceptedPovertyDepthV5Additions=[
  ['poverty-pressure-production.cold-rain','default','presentation.poverty.housing-depth-v5.street.spring.cold-rain.text'],
  ['poverty-street-production-v2.helpful-summer-shade','late-shade','presentation.poverty.housing-depth-v5.street.summer.late-shade.text'],
  ['poverty-street-production-v2.neutral-autumn-crossing','dry-arcade','presentation.poverty.housing-depth-v5.street.autumn.dry-arcade.text'],
  ['poverty-street-production-v2.pressure-winter-wind','long-gusts','presentation.poverty.housing-depth-v5.street.winter.long-gusts.text'],
  ['poverty-cheap-production-v2.shared-room-seasons','spring-window','presentation.poverty.housing-depth-v5.cheap.spring.window.text'],
  ['poverty-cheap-production-v2.shared-room-seasons','summer-heat','presentation.poverty.housing-depth-v5.cheap.summer.heat.text'],
  ['poverty-cheap-production.shared-quiet-autumn','default','presentation.poverty.housing-depth-v5.cheap.autumn.shared-quiet.text'],
  ['poverty-cheap-production-v2.shared-room-seasons','winter-stove','presentation.poverty.housing-depth-v5.cheap.winter.stove.text'],
  ['poverty-recovery-production.small-coin-help','default','presentation.poverty.recovery-depth-v5.small-coin.breathing-room.text'],
  ['poverty-recovery-production.short-cleanup','default','presentation.poverty.recovery-depth-v5.cleanup.one-step.text'],
  ['poverty-recovery-production.herb-bundle','default','presentation.poverty.recovery-depth-v5.herb.useful-buffer.text'],
  ['poverty-cheap-production-v2.shared-room-seasons','spring-window','presentation.poverty.recovery-depth-v5.shared-room.spring-breathing-space.text'],
  ['poverty-cheap-production.shared-quiet-autumn','default','presentation.poverty.recovery-depth-v5.shared-room.autumn-routine.text'],
  ['poverty-street-production.neutral-autumn','default','presentation.poverty.recovery-depth-v5.street.autumn-no-milestone.text']
] as const;

export const povertyDepthLookupEntries:readonly PovertyDepthLookupEntry[]=basePovertyDepthLookupEntries.map(entry=>{
  const extra=acceptedPovertyDepthAdditions
    .concat(acceptedPovertyDepthV5Additions)
    .filter(([eventId,variantId])=>eventId===entry.eventId&&variantId===entry.variantId)
    .map(([, ,localizationKey])=>localizationKey);
  return extra.length?{...entry,orderedDepthLocalizationKeys:[...entry.orderedDepthLocalizationKeys,...extra]}:entry;
});

const byPair=new Map<string,PovertyDepthLookupEntry>(
  povertyDepthLookupEntries.map(entry=>[`${entry.eventId}|${entry.variantId}`,entry] as const)
);

export function povertyPendingLocalizationKey(
  eventId:string,
  variantId:string,
  showCount:number
):string|null{
  const entry=byPair.get(`${eventId}|${variantId}`);
  if(!entry)return null;
  const candidates=entry.orderedDepthLocalizationKeys;
  if(!candidates.length)return entry.coreFallbackLocalizationKey;
  const index=Math.max(Math.trunc(showCount)-1,0)%candidates.length;
  return candidates[index]??entry.coreFallbackLocalizationKey;
}

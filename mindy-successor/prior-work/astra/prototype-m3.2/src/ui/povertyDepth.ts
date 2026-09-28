export const POVERTY_DEPTH_KEYS = {
  "poverty-cheap-production.shared-quiet-autumn::default": [
    "presentation.poverty.depth.poverty-cheap-production-shared-quiet-autumn.default.a.text",
    "presentation.poverty.depth.poverty-cheap-production-shared-quiet-autumn.default.b.text"
  ],
  "poverty-cheap-production-v2.shared-room-seasons::shared-room": [
    "presentation.poverty.depth.poverty-cheap-production-v2-shared-room-seasons.shared-room.d.text"
  ],
  "poverty-cheap-production-v2.shared-room-seasons::spring-window": [
    "presentation.poverty.depth.poverty-cheap-production-v2-shared-room-seasons.spring-window.a.text"
  ],
  "poverty-cheap-production-v2.shared-room-seasons::summer-heat": [
    "presentation.poverty.depth.poverty-cheap-production-v2-shared-room-seasons.summer-heat.b.text"
  ],
  "poverty-cheap-production-v2.shared-room-seasons::winter-stove": [
    "presentation.poverty.depth.poverty-cheap-production-v2-shared-room-seasons.winter-stove.c.text"
  ],
  "poverty-pressure-production.cold-rain::default": [
    "presentation.poverty.depth.poverty-pressure-production-cold-rain.default.a.text",
    "presentation.poverty.depth.poverty-pressure-production-cold-rain.default.b.text"
  ],
  "poverty-pressure-production.muddy-splash::default": [
    "presentation.poverty.depth.poverty-pressure-production-muddy-splash.default.a.text",
    "presentation.poverty.depth.poverty-pressure-production-muddy-splash.default.b.text"
  ],
  "poverty-pressure-production.noisy-loading::default": [
    "presentation.poverty.depth.poverty-pressure-production-noisy-loading.default.a.text",
    "presentation.poverty.depth.poverty-pressure-production-noisy-loading.default.b.text"
  ],
  "poverty-recovery-production.herb-bundle::default": [
    "presentation.poverty.depth.poverty-recovery-production-herb-bundle.default.a.text",
    "presentation.poverty.depth.poverty-recovery-production-herb-bundle.default.b.text"
  ],
  "poverty-recovery-production.short-cleanup::default": [
    "presentation.poverty.depth.poverty-recovery-production-short-cleanup.default.a.text",
    "presentation.poverty.depth.poverty-recovery-production-short-cleanup.default.b.text"
  ],
  "poverty-recovery-production.small-coin-help::default": [
    "presentation.poverty.depth.poverty-recovery-production-small-coin-help.default.a.text",
    "presentation.poverty.depth.poverty-recovery-production-small-coin-help.default.b.text"
  ],
  "poverty-street-production.helpful-summer::default": [
    "presentation.poverty.depth.poverty-street-production-helpful-summer.default.a.text",
    "presentation.poverty.depth.poverty-street-production-helpful-summer.default.b.text"
  ],
  "poverty-street-production.pressure-winter::default": [
    "presentation.poverty.depth.poverty-street-production-pressure-winter.default.a.text",
    "presentation.poverty.depth.poverty-street-production-pressure-winter.default.b.text"
  ],
  "poverty-street-production-v2.helpful-summer-shade::late-shade": [
    "presentation.poverty.depth.poverty-street-production-v2-helpful-summer-shade.late-shade.b.text"
  ],
  "poverty-street-production-v2.helpful-summer-shade::market-closing": [
    "presentation.poverty.depth.poverty-street-production-v2-helpful-summer-shade.market-closing.a.text"
  ],
  "poverty-street-production-v2.pressure-winter-wind::crosswind": [
    "presentation.poverty.depth.poverty-street-production-v2-pressure-winter-wind.crosswind.a.text"
  ],
  "poverty-street-production-v2.pressure-winter-wind::long-gusts": [
    "presentation.poverty.depth.poverty-street-production-v2-pressure-winter-wind.long-gusts.b.text"
  ]
} as const;

export function povertyDepthKey(eventId:string,variantId:string,showCount:number):string|null{
 const keys=POVERTY_DEPTH_KEYS[`${eventId}::${variantId}` as keyof typeof POVERTY_DEPTH_KEYS];
 if(!keys?.length)return null;
 const index=Math.max(showCount-1,0)%keys.length;
 return keys[index]??null;
}

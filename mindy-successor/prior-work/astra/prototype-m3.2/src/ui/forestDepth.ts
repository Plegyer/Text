export type ForestDepthSeason='spring'|'summer'|'autumn'|'winter';

const FOREST_ROUTE_DEPTH_KEYS={
  'logging-road':{
    spring:'presentation.activity.forest.logging-road-depth.spring.meltwater.text',
    summer:'presentation.activity.forest.logging-road-depth.summer.cut-branches.text',
    autumn:'presentation.activity.forest.logging-road-depth.autumn.leaf-ruts.text',
    winter:'presentation.activity.forest.logging-road-depth.winter.frozen-ruts.text'
  },
  'old-boundary':{
    spring:'presentation.activity.forest.old-boundary-depth.spring.wet-stones.text',
    summer:'presentation.activity.forest.old-boundary-depth.summer.hidden-markers.text',
    autumn:'presentation.activity.forest.old-boundary-depth.autumn.marker-line.text',
    winter:'presentation.activity.forest.old-boundary-depth.winter.stone-line.text'
  }
} as const;

export function forestRouteDepthLocalizationKey(
  routeId:string|null,
  season:ForestDepthSeason
):string|null{
  if(routeId!=='logging-road'&&routeId!=='old-boundary')return null;
  return FOREST_ROUTE_DEPTH_KEYS[routeId][season];
}

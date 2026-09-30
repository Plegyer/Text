type ForestSeason='spring'|'summer'|'autumn'|'winter';

const routeDepth:Readonly<Record<string,Readonly<Record<ForestSeason,string>>>>={
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
};

const resultDepth:Readonly<Record<string,readonly string[]>>={
  'forest-result-content-v1.success':[
    'presentation.activity.forest.success-depth.clear-pattern.text',
    'presentation.activity.forest.success-depth.route-record.text'
  ],
  'forest-result-content-v1.escape':[
    'presentation.activity.forest.escape-depth.partial-notes.text',
    'presentation.activity.forest.escape-depth.unfinished-route.text'
  ],
  'forest-result-content-v1.failure':[
    'presentation.activity.forest.failure-depth.no-confirmation.text',
    'presentation.activity.forest.failure-depth.not-escape.text'
  ]
};

export function forestRouteDepthLocalizationKey(routeId:string|null,season:ForestSeason):string|null{
  if(!routeId)return null;
  return routeDepth[routeId]?.[season]??null;
}

export function forestResultDepthLocalizationKey(eventId:string,showCount:number):string|null{
  const keys=resultDepth[eventId];
  if(!keys?.length)return null;
  const index=Math.max(Math.trunc(showCount)-1,0)%keys.length;
  return keys[index]??null;
}

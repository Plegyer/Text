type ForestSeason='spring'|'summer'|'autumn'|'winter';

const routeDepth:Readonly<Record<string,Partial<Record<ForestSeason,string>>>>={
  'logging-road':{
    spring:'presentation.activity.forest.depth.route.logging-road.spring.text',
    summer:'presentation.activity.forest.depth.route.logging-road.summer.text'
  },
  'old-boundary':{
    autumn:'presentation.activity.forest.depth.route.old-boundary.autumn.text',
    winter:'presentation.activity.forest.depth.route.old-boundary.winter.text'
  }
};

const resultDepth:Readonly<Record<string,readonly string[]>>={
  'forest-result-content-v1.success':[
    'presentation.activity.forest.depth.result.success.clear-route.text',
    'presentation.activity.forest.depth.result.success.work-notes.text'
  ],
  'forest-result-content-v1.escape':[
    'presentation.activity.forest.depth.result.escape.weather-turn.text',
    'presentation.activity.forest.depth.result.escape.marker-return.text'
  ],
  'forest-result-content-v1.failure':[
    'presentation.activity.forest.depth.result.failure.spent-endurance.text',
    'presentation.activity.forest.depth.result.failure.route-lost.text'
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

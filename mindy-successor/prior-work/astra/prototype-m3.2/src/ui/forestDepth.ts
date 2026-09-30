type ForestSeason='spring'|'summer'|'autumn'|'winter';

const routeDepth:Readonly<Record<string,Readonly<Partial<Record<ForestSeason,readonly string[]>>>>>={
  'logging-road':{
    spring:[
      'presentation.activity.forest.logging-road-v2.spring.wheelwash.text',
      'presentation.activity.forest.logging-road-v2.spring.fresh-cuts.text'
    ],
    summer:[
      'presentation.activity.forest.logging-road-v2.summer.dust.text',
      'presentation.activity.forest.logging-road-v2.summer.side-clearing.text'
    ],
    autumn:['presentation.activity.forest.logging-road-v2.autumn.soft-ruts.text'],
    winter:['presentation.activity.forest.logging-road-v2.winter.hard-track.text']
  },
  'old-boundary':{
    spring:[
      'presentation.activity.forest.old-boundary-v2.spring.moss-line.text',
      'presentation.activity.forest.old-boundary-v2.spring.runoff-stones.text'
    ],
    summer:['presentation.activity.forest.old-boundary-v2.summer.low-marks.text'],
    autumn:['presentation.activity.forest.old-boundary-v2.autumn.open-line.text'],
    winter:[
      'presentation.activity.forest.old-boundary-v2.winter.drift-gap.text',
      'presentation.activity.forest.old-boundary-v2.winter.bare-trunks.text'
    ]
  }
};

const resultDepth:Readonly<Record<string,readonly string[]>>={
  'forest-result-content-v1.success':[
    'presentation.activity.forest.success-aftermath-v2.evidence-order.text',
    'presentation.activity.forest.success-aftermath-v2.confirmed-thread.text'
  ],
  'forest-result-content-v1.escape':[
    'presentation.activity.forest.escape-failure-v2.escape.notes-held-back.text',
    'presentation.activity.forest.escape-failure-v2.escape.no-claim.text'
  ],
  'forest-result-content-v1.failure':[
    'presentation.activity.forest.escape-failure-v2.failure.conflicting-signs.text',
    'presentation.activity.forest.escape-failure-v2.failure.no-state.text'
  ]
};

export function forestRouteDepthLocalizationKey(
  routeId:string|null,
  season:ForestSeason,
  steps:number
):string|null{
  if(!routeId)return null;
  const keys=routeDepth[routeId]?.[season];
  if(!keys?.length)return null;
  const index=Math.max(Math.trunc(steps)-1,0)%keys.length;
  return keys[index]??null;
}

export function forestResultDepthLocalizationKey(eventId:string,showCount:number):string|null{
  const keys=resultDepth[eventId];
  if(!keys?.length)return null;
  const index=Math.max(Math.trunc(showCount)-1,0)%keys.length;
  return keys[index]??null;
}

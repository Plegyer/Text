import type {Catalog,Save} from '../core/schema.ts';
import {calendar,meets} from '../core/engine.ts';

const CAPABILITIES=['cross_rough_route','preserve_specimen','cut_heavy_wood','enter_old_boundary'] as const;

function hasCapability(state:Save,catalog:Catalog,capability:string){
  return meets({kind:'itemCapability',capability,present:true},state,catalog);
}
function hasWorldFact(state:Save,fact:string){
  return state.run.progression.worldFacts.includes(fact);
}
function hasCareerFact(state:Save,career:string,fact:string){
  return state.run.progression.careers[career]?.facts.includes(fact)??false;
}
function variant(state:Save){
  const activity=state.run.flow.activity;
  if(!activity)return 1;
  const roll=activity.internalState.lastRoll??activity.rngState/4294967296;
  return roll<0.5?1:2;
}
function routeNarrative(route:string,season:string,v:number,token:boolean){
  if(route==='logging-road')return `presentation.activity.forest.route.logging-road.${season}.v${v}.text`;
  if(route==='hunter-trail'&&(season==='summer'||season==='autumn'))return `presentation.activity.forest.route.hunter-trail.${season}.v${v}.text`;
  if(route==='old-boundary'&&token)return `presentation.activity.forest.route.old-boundary.token.v${v}.text`;
  return `presentation.activity.forest.entry.${route}.text`;
}

export function forestActivityNarrativeKey(state:Save,catalog:Catalog):string|null{
  const activity=state.run.flow.activity;
  if(!activity||activity.activityId!=='lumber.forest')return null;
  const checkpoint=activity.checkpoint;
  const season=calendar(state.run.calendar.elapsedDays).season;
  const v=variant(state);
  const cap=(id:string)=>hasCapability(state,catalog,id);
  const school=hasWorldFact(state,'forest.school-field-notes');
  const surveyed=hasCareerFact(state,'lumber','forest-route-surveyed');
  const equipment=CAPABILITIES.some(cap);

  if(checkpoint==='entry'){
    const prepCount=Number(surveyed)+Number(school)+Number(equipment);
    if(prepCount>=2)return `presentation.activity.forest.entry.prep.combined.v${v}.text`;
    if(surveyed)return `presentation.activity.forest.entry.prep.career.v${v}.text`;
    if(school)return `presentation.activity.forest.entry.prep.school.v${v}.text`;
    if(equipment)return `presentation.activity.forest.entry.prep.equipment.v${v}.text`;
    return 'presentation.activity.forest.entry.default.text';
  }

  if(checkpoint.startsWith('forest.route.')){
    return routeNarrative(activity.internalState.routeId??'',season,v,cap('enter_old_boundary'));
  }
  if(checkpoint.startsWith('counter.step.')){
    return routeNarrative(activity.internalState.routeId??'',season,v,cap('enter_old_boundary'));
  }

  const key=(context:string,solution:string)=>`presentation.activity.forest.challenge.${context}.${solution}.v${v}.text`;
  switch(checkpoint){
    case 'forest.challenge.logging-navigation':
      return key('logging-navigation',surveyed?'career':'reason');
    case 'forest.challenge.logging-spring-mud':
      return key('logging-spring-mud',cap('cross_rough_route')?'rope':'strength');
    case 'forest.challenge.logging-summer-deadfall':
      return key('logging-summer-deadfall',cap('cut_heavy_wood')?'axe':'strength');
    case 'forest.challenge.logging-autumn-deadfall':
      return key('logging-autumn-deadfall',cap('cut_heavy_wood')?'axe':'endurance');
    case 'forest.challenge.logging-winter-ruts':
      return key('logging-winter-ruts',cap('cross_rough_route')?'rope':'dexterity');
    case 'forest.challenge.logging-preserve-sample':
      return key('logging-preserve-sample','kit');
    case 'forest.challenge.hunter-navigation':
      return key('hunter-navigation',school?'school':'wits');
    case 'forest.challenge.hunter-rough-crossing':
      return key('hunter-rough-crossing',cap('cross_rough_route')?'rope':'dexterity');
    case 'forest.challenge.hunter-preserve-sample':
      return key('hunter-preserve-sample','kit');
    case 'forest.challenge.boundary-interpretation':
      return key('boundary-interpretation',school?'school':state.run.character.stats.magic>=3?'magic':'reason');
    case 'forest.challenge.boundary-rough-crossing':
      return key('boundary-rough-crossing',cap('cross_rough_route')?'rope':'dexterity');
    case 'forest.challenge.boundary-preserve-sample':
      return key('boundary-preserve-sample','kit');
    default:
      return routeNarrative(activity.internalState.routeId??'',season,v,cap('enter_old_boundary'));
  }
}

import rawPresentation from '../../content/hard-work-new-start-presentation-v2.fixture.json' with {type:'json'};

import {palaceNewStartQualified} from '../core/hardWorkMeta.ts';
import {hardWorkPackageDefinitions} from '../core/hardWorkPackageCatalog.ts';
import {ordinaryHardWorkCareers,type OrdinaryHardWorkCareer,type ProgressionStatCap,type Stat} from '../core/schema.ts';

export type HardWorkUiLocale='ru'|'en';

type CommonCopy={
  sectionTitle:string;
  sectionDescription:string;
  earlyAccessTitle:string;
  earlyAccessBody:string;
  packageEffectsTitle:string;
  selectedState:string;
  unselectedState:string;
  noneEarned:string;
  palaceRequirement:string;
  palaceProgress:string;
  cap100:string;
  cap200:string;
  lustLabel:string;
};

type PackageCopy={title:string};

const source=rawPresentation as {
  version:number;
  status:string;
  surface:string;
  common:Record<HardWorkUiLocale,CommonCopy>;
  packages:Record<OrdinaryHardWorkCareer,Record<HardWorkUiLocale,PackageCopy>>;
};

function replaceTokens(text:string,values:Record<string,string|number>){
  return Object.entries(values).reduce((out,[key,value])=>out.replaceAll(`{${key}}`,String(value)),text);
}

function ordinaryOnly(values:readonly string[]):OrdinaryHardWorkCareer[]{
  const allowed=new Set<string>(ordinaryHardWorkCareers);
  return values.filter((value):value is OrdinaryHardWorkCareer=>allowed.has(value));
}

export function hardWorkNewStartCopy(locale:HardWorkUiLocale):CommonCopy{
  return source.common[locale];
}

export function earnedHardWorkPackageIds(earned:readonly string[]):OrdinaryHardWorkCareer[]{
  const set=new Set(ordinaryOnly(earned));
  return ordinaryHardWorkCareers.filter(career=>set.has(career));
}

export function activeHardWorkPackageIds(active:readonly string[]):OrdinaryHardWorkCareer[]{
  const set=new Set(ordinaryOnly(active));
  return ordinaryHardWorkCareers.filter(career=>set.has(career));
}

export function hardWorkPackageEffectLabels(
  career:OrdinaryHardWorkCareer,
  locale:HardWorkUiLocale,
  statLabel:(stat:Stat)=>string
):string[]{
  const definition=hardWorkPackageDefinitions.find(item=>item.career===career);
  if(!definition)throw new Error(`Missing Hard Work package definition: ${career}`);
  const effects=definition.statBonuses.map(bonus=>`${statLabel(bonus.stat)} +${bonus.amount}`);
  if(definition.lustBonus!==undefined)effects.push(`${source.common[locale].lustLabel} +${definition.lustBonus}`);
  return effects;
}

export function hardWorkPackageCardModel(input:Readonly<{
  career:OrdinaryHardWorkCareer;
  selected:boolean;
  locale:HardWorkUiLocale;
  statLabel:(stat:Stat)=>string;
}>){
  const copy=source.common[input.locale];
  const title=source.packages[input.career][input.locale].title;
  const effects=hardWorkPackageEffectLabels(input.career,input.locale,input.statLabel);
  const stateText=input.selected?copy.selectedState:copy.unselectedState;
  return {
    career:input.career,
    title,
    effects,
    selected:input.selected,
    stateText,
    ariaLabel:`${title}. ${stateText} ${copy.earlyAccessBody} ${copy.packageEffectsTitle}: ${effects.join(', ')}`
  };
}

export function hardWorkNewStartSummary(input:Readonly<{
  earned:readonly string[];
  active:readonly string[];
  locale:HardWorkUiLocale;
  progressionStatCap:ProgressionStatCap;
}>){
  const copy=source.common[input.locale];
  const earned=earnedHardWorkPackageIds(input.earned);
  const active=activeHardWorkPackageIds(input.active).filter(career=>earned.includes(career));
  return {
    earned,
    active,
    palaceQualified:palaceNewStartQualified({earnedHardWork:earned,activePackages:active}),
    palaceRequirement:copy.palaceRequirement,
    palaceProgress:replaceTokens(copy.palaceProgress,{earned:earned.length,active:active.length}),
    capText:input.progressionStatCap===200?copy.cap200:copy.cap100,
    copy
  };
}

export function validateHardWorkNewStartPresentationSource():void{
  if(source.version!==2||source.surface!=='new-start-plus')throw new Error('Unexpected Hard Work New Start+ presentation source.');
  for(const locale of ['ru','en'] as const){
    const common=source.common[locale];
    for(const [key,value] of Object.entries(common))if(!String(value).trim())throw new Error(`Missing Hard Work presentation copy: ${locale}.${key}`);
    if(/stats? (are|is) doubled/i.test(common.cap200)||/характеристик[аи]? удва/i.test(common.cap200))throw new Error('Cap-200 copy must describe a maximum, not doubled stats.');
  }
  const keys=Object.keys(source.packages);
  if(keys.length!==ordinaryHardWorkCareers.length)throw new Error('Hard Work presentation source must cover all ordinary careers.');
  for(const career of ordinaryHardWorkCareers){
    for(const locale of ['ru','en'] as const)if(!source.packages[career]?.[locale]?.title?.trim())throw new Error(`Missing package title: ${career}.${locale}`);
  }
}

validateHardWorkNewStartPresentationSource();

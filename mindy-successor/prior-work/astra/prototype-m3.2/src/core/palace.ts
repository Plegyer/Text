import {palaceNewStartQualified} from './hardWorkMeta.ts';
import {stats,type Save,type Stat} from './schema.ts';

export const PALACE_D23_QUALIFIED_FACT='palace.d23-qualified';
export const PALACE_ACCESS_FACT='palace.access-granted';
export const PALACE_TRUE_ENDING_STAT_THRESHOLD=91;

export const palaceCap200Copy={
  ru:'Максимум каждой из 12 характеристик развития становится 200 вместо 100; сами значения не умножаются.',
  en:'The maximum of each of the 12 progression stats becomes 200 instead of 100; the values themselves are not multiplied.'
} as const;

export function palaceD23Qualified(s:Save):boolean{
  return palaceNewStartQualified({
    earnedHardWork:s.meta.hardWorkProgress,
    activePackages:s.run.character.creation.activeHardWorkPackages
  });
}

export function markPalaceCreationQualification(s:Save):boolean{
  const qualified=palaceD23Qualified(s);
  const facts=s.run.progression.worldFacts;
  const index=facts.indexOf(PALACE_D23_QUALIFIED_FACT);
  if(qualified&&index<0)facts.push(PALACE_D23_QUALIFIED_FACT);
  if(!qualified&&index>=0)facts.splice(index,1);
  return qualified;
}

export function palaceHasAccess(s:Save):boolean{
  return s.run.progression.worldFacts.includes(PALACE_ACCESS_FACT);
}

export function palaceTrueEndingStatsReady(values:Readonly<Record<Stat,number>>):boolean{
  return stats.every(stat=>values[stat]>=PALACE_TRUE_ENDING_STAT_THRESHOLD);
}

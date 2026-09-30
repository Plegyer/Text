export type SchoolNightStudyReactionBinding={titleKey:string;bodyKey:string};

export const SCHOOL_NIGHT_STUDY_REACTIONS:Readonly<Record<string,SchoolNightStudyReactionBinding>>={
  'school.night_study.literacy_and_numbers.reason':{titleKey:'school.night_exact.literacy_and_numbers_reason.title',bodyKey:'school.night_exact.literacy_and_numbers_reason.body'},
  'school.night_study.literacy_and_numbers.wits':{titleKey:'school.night_exact.literacy_and_numbers_wits.title',bodyKey:'school.night_exact.literacy_and_numbers_wits.body'},
  'school.night_study.arcana.magic':{titleKey:'school.night_exact.arcana_magic.title',bodyKey:'school.night_exact.arcana_magic.body'},
  'school.night_study.arcana.reason':{titleKey:'school.night_exact.arcana_reason.title',bodyKey:'school.night_exact.arcana_reason.body'},
  'school.night_study.arcana.creativity':{titleKey:'school.night_exact.arcana_creativity.title',bodyKey:'school.night_exact.arcana_creativity.body'},
  'school.night_study.rhetoric_and_social.charm':{titleKey:'school.night_exact.rhetoric_and_social_charm.title',bodyKey:'school.night_exact.rhetoric_and_social_charm.body'},
  'school.night_study.rhetoric_and_social.sociability':{titleKey:'school.night_exact.rhetoric_and_social_sociability.title',bodyKey:'school.night_exact.rhetoric_and_social_sociability.body'},
  'school.night_study.rhetoric_and_social.wits':{titleKey:'school.night_exact.rhetoric_and_social_wits.title',bodyKey:'school.night_exact.rhetoric_and_social_wits.body'},
  'school.night_study.etiquette_and_presentation.manners':{titleKey:'school.night_exact.etiquette_and_presentation_manners.title',bodyKey:'school.night_exact.etiquette_and_presentation_manners.body'},
  'school.night_study.etiquette_and_presentation.grooming':{titleKey:'school.night_exact.etiquette_and_presentation_grooming.title',bodyKey:'school.night_exact.etiquette_and_presentation_grooming.body'},
  'school.night_study.etiquette_and_presentation.charm':{titleKey:'school.night_exact.etiquette_and_presentation_charm.title',bodyKey:'school.night_exact.etiquette_and_presentation_charm.body'},
  'school.night_study.field_craft.dexterity':{titleKey:'school.night_exact.field_craft_dexterity.title',bodyKey:'school.night_exact.field_craft_dexterity.body'},
  'school.night_study.field_craft.wits':{titleKey:'school.night_exact.field_craft_wits.title',bodyKey:'school.night_exact.field_craft_wits.body'},
  'school.night_study.field_craft.creativity':{titleKey:'school.night_exact.field_craft_creativity.title',bodyKey:'school.night_exact.field_craft_creativity.body'},
  'school.night_study.physical_training.strength':{titleKey:'school.night_exact.physical_training_strength.title',bodyKey:'school.night_exact.physical_training_strength.body'},
  'school.night_study.physical_training.endurance':{titleKey:'school.night_exact.physical_training_endurance.title',bodyKey:'school.night_exact.physical_training_endurance.body'},
  'school.night_study.physical_training.dexterity':{titleKey:'school.night_exact.physical_training_dexterity.title',bodyKey:'school.night_exact.physical_training_dexterity.body'},
  'school.night_study.arts_and_performance.creativity':{titleKey:'school.night_exact.arts_and_performance_creativity.title',bodyKey:'school.night_exact.arts_and_performance_creativity.body'},
  'school.night_study.arts_and_performance.charm':{titleKey:'school.night_exact.arts_and_performance_charm.title',bodyKey:'school.night_exact.arts_and_performance_charm.body'},
  'school.night_study.arts_and_performance.sociability':{titleKey:'school.night_exact.arts_and_performance_sociability.title',bodyKey:'school.night_exact.arts_and_performance_sociability.body'},
  'school.night_study.arts_and_performance.dexterity':{titleKey:'school.night_exact.arts_and_performance_dexterity.title',bodyKey:'school.night_exact.arts_and_performance_dexterity.body'},
  'school.night_study.body_confidence.sexuality':{titleKey:'school.night_exact.body_confidence_sexuality.title',bodyKey:'school.night_exact.body_confidence_sexuality.body'},
  'school.night_study.body_confidence.grooming':{titleKey:'school.night_exact.body_confidence_grooming.title',bodyKey:'school.night_exact.body_confidence_grooming.body'},
  'school.night_study.body_confidence.endurance':{titleKey:'school.night_exact.body_confidence_endurance.title',bodyKey:'school.night_exact.body_confidence_endurance.body'}
};

export function schoolNightStudyReactionBinding(choiceId:string|null|undefined):SchoolNightStudyReactionBinding|undefined{
  if(!choiceId)return undefined;
  return SCHOOL_NIGHT_STUDY_REACTIONS[choiceId];
}

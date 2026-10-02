import type {Catalog,Effect,NightChoiceDefinition,ReactionFact,Save,Stat} from './schema.ts';

export const SCHOOL_ACTION_ID='school' as const;
export const SCHOOL_LESSON_ENERGY_COST=1 as const;
export const SCHOOL_NIGHT_STUDY_STAT_GAIN=2 as const;
export const SCHOOL_NIGHT_STUDY_NEXT_DAY_ENERGY_DELTA=-1 as const;
export const SCHOOL_BODY_CONFIDENCE_LUST_GAIN=2 as const;

export const SCHOOL_COURSE_IDS=[
  'school.course.literacy_and_numbers',
  'school.course.arcana',
  'school.course.rhetoric_and_social',
  'school.course.etiquette_and_presentation',
  'school.course.field_craft',
  'school.course.physical_training',
  'school.course.arts_and_performance',
  'school.course.body_confidence'
] as const;

export type SchoolCourseId=typeof SCHOOL_COURSE_IDS[number];

export interface SchoolStatEffect {
  stat:Stat;
  amount:number;
}

export interface SchoolCourse {
  id:SchoolCourseId;
  trackId:string;
  sourceKey:string;
  label:string;
  tuition:number;
  energyCost:typeof SCHOOL_LESSON_ENERGY_COST;
  statEffects:readonly SchoolStatEffect[];
  lustGain?:number;
  presentationId:string;
}

export const SCHOOL_COURSES:readonly SchoolCourse[]=[
  {
    id:'school.course.literacy_and_numbers',
    trackId:'school.track.literacy_and_numbers',
    sourceKey:'LiteracyAndNumbers',
    label:'Literacy & Numbers',
    tuition:300,
    energyCost:SCHOOL_LESSON_ENERGY_COST,
    statEffects:[
      {stat:'reason',amount:4},
      {stat:'wits',amount:2}
    ],
    presentationId:'school/literacy-and-numbers/lesson/default'
  },
  {
    id:'school.course.arcana',
    trackId:'school.track.arcana',
    sourceKey:'Arcana',
    label:'Arcana',
    tuition:500,
    energyCost:SCHOOL_LESSON_ENERGY_COST,
    statEffects:[
      {stat:'magic',amount:4},
      {stat:'reason',amount:4},
      {stat:'creativity',amount:2}
    ],
    presentationId:'school/arcana/lesson/default'
  },
  {
    id:'school.course.rhetoric_and_social',
    trackId:'school.track.rhetoric_and_social',
    sourceKey:'RhetoricAndSocial',
    label:'Rhetoric & Social',
    tuition:300,
    energyCost:SCHOOL_LESSON_ENERGY_COST,
    statEffects:[
      {stat:'charm',amount:3},
      {stat:'sociability',amount:3},
      {stat:'wits',amount:2}
    ],
    presentationId:'school/rhetoric-and-social/lesson/default'
  },
  {
    id:'school.course.etiquette_and_presentation',
    trackId:'school.track.etiquette_and_presentation',
    sourceKey:'EtiquetteAndPresentation',
    label:'Etiquette & Presentation',
    tuition:400,
    energyCost:SCHOOL_LESSON_ENERGY_COST,
    statEffects:[
      {stat:'manners',amount:3},
      {stat:'grooming',amount:3},
      {stat:'charm',amount:2}
    ],
    presentationId:'school/etiquette-and-presentation/lesson/default'
  },
  {
    id:'school.course.field_craft',
    trackId:'school.track.field_craft',
    sourceKey:'FieldCraft',
    label:'Field Craft',
    tuition:400,
    energyCost:SCHOOL_LESSON_ENERGY_COST,
    statEffects:[
      {stat:'dexterity',amount:3},
      {stat:'wits',amount:3},
      {stat:'creativity',amount:2}
    ],
    presentationId:'school/field-craft/lesson/default'
  },
  {
    id:'school.course.physical_training',
    trackId:'school.track.physical_training',
    sourceKey:'PhysicalTraining',
    label:'Physical Training',
    tuition:400,
    energyCost:SCHOOL_LESSON_ENERGY_COST,
    statEffects:[
      {stat:'strength',amount:3},
      {stat:'endurance',amount:3},
      {stat:'dexterity',amount:2}
    ],
    presentationId:'school/physical-training/lesson/default'
  },
  {
    id:'school.course.arts_and_performance',
    trackId:'school.track.arts_and_performance',
    sourceKey:'ArtsAndPerformance',
    label:'Arts & Performance',
    tuition:500,
    energyCost:SCHOOL_LESSON_ENERGY_COST,
    statEffects:[
      {stat:'creativity',amount:3},
      {stat:'charm',amount:3},
      {stat:'sociability',amount:2},
      {stat:'dexterity',amount:2}
    ],
    presentationId:'school/arts-and-performance/lesson/default'
  },
  {
    id:'school.course.body_confidence',
    trackId:'school.track.body_confidence',
    sourceKey:'BodyConfidence',
    label:'Body Confidence',
    tuition:400,
    energyCost:SCHOOL_LESSON_ENERGY_COST,
    statEffects:[
      {stat:'sexuality',amount:3},
      {stat:'grooming',amount:3},
      {stat:'endurance',amount:2}
    ],
    lustGain:SCHOOL_BODY_CONFIDENCE_LUST_GAIN,
    presentationId:'school/body-confidence/lesson/default'
  }
];

const COURSE_BY_ID=new Map<SchoolCourseId,SchoolCourse>(SCHOOL_COURSES.map(course=>[course.id,course]));

export function isSchoolCourseId(value:string):value is SchoolCourseId {
  return (SCHOOL_COURSE_IDS as readonly string[]).includes(value);
}

export function getSchoolCourse(id:SchoolCourseId):SchoolCourse {
  const course=COURSE_BY_ID.get(id);
  if(!course)throw new Error(`Unknown School course: ${id}`);
  return course;
}

export function schoolDirectCoverage():Stat[] {
  return [...new Set(SCHOOL_COURSES.flatMap(course=>course.statEffects.map(effect=>effect.stat)))].sort() as Stat[];
}

export function schoolLessonEffects(id:SchoolCourseId):Effect[] {
  const course=getSchoolCourse(id);
  const lustEffects:Effect[]=course.lustGain
    ?[{kind:'metric',key:'lust',delta:course.lustGain}]
    :[];
  return [
    {kind:'modifyResource',resource:'money',delta:-course.tuition},
    {kind:'modifyEnergy',delta:-course.energyCost},
    ...course.statEffects.map(effect=>({kind:'modifyStat' as const,stat:effect.stat,delta:effect.amount})),
    ...lustEffects,
    {kind:'incrementSchoolCounter' as const,track:course.trackId,counter:'lessons_completed',amount:1}
  ];
}

export function assertSchoolLessonAvailable(input:Save,course:SchoolCourse){
  if(input.run.status!=='active')throw new Error('School lesson requires an active run.');
  if(!input.run.character.creation.complete)throw new Error('Finish character creation before School.');
  if(!input.run.flags['story.arrived'])throw new Error('Finish the arrival before School.');
  if(input.run.flow.pendingScene||input.run.flow.night||input.run.flow.activity)throw new Error('Finish the current scene, Night flow, or Activity before School.');
  if(input.run.resources.money<course.tuition)throw new Error('Not enough money for School tuition.');
  if(input.run.dayState.energyCurrent<course.energyCost)throw new Error('Not enough current-day Energy for School.');
}

function schoolReactionFacts(before:Save,after:Save,course:SchoolCourse):ReactionFact[] {
  const facts:ReactionFact[]=[{kind:'actionCompleted',action:SCHOOL_ACTION_ID}];
  for(const effect of course.statEffects){
    const from=before.run.character.stats[effect.stat];
    const to=after.run.character.stats[effect.stat];
    if(from!==to)facts.push({kind:'statChanged',stat:effect.stat,from,to});
  }
  const moneyFrom=before.run.resources.money;
  const moneyTo=after.run.resources.money;
  if(moneyFrom!==moneyTo)facts.push({kind:'resourceChanged',resource:'money',from:moneyFrom,to:moneyTo});
  const energyFrom=before.run.dayState.energyCurrent;
  const energyTo=after.run.dayState.energyCurrent;
  if(energyFrom!==energyTo)facts.push({kind:'energyChanged',from:energyFrom,to:energyTo});
  for(const ending of after.run.endings.eligible){
    if(!before.run.endings.eligible.includes(ending))facts.push({kind:'endingEligible',ending});
  }
  return facts;
}

export interface SchoolRuntimeAdapter {
  applyEffects(input:Save,effects:Effect[],cat:Catalog):Save;
  register?(input:Save,cat:Catalog):void;
  resolveReactions(
    input:Save,
    facts:ReactionFact[],
    cat:Catalog,
    options?:{newEpoch?:boolean}
  ):{state:Save;trace:unknown};
}

export function executeSchoolLesson(
  input:Save,
  courseId:SchoolCourseId,
  cat:Catalog,
  runtime:SchoolRuntimeAdapter
){
  const course=getSchoolCourse(courseId);
  assertSchoolLessonAvailable(input,course);
  const paid=runtime.applyEffects(input,schoolLessonEffects(courseId),cat);
  paid.run.historyState.actionCounts[SCHOOL_ACTION_ID]=Math.min(1_000_000,(paid.run.historyState.actionCounts[SCHOOL_ACTION_ID]??0)+1);
  paid.run.historyState.dayActionCount=Math.min(1000,paid.run.historyState.dayActionCount+1);
  const deltas:Record<string,number>={};
  for(const effect of course.statEffects){
    const before=input.run.character.stats[effect.stat];
    const after=paid.run.character.stats[effect.stat];
    if(before!==after)deltas[effect.stat]=after-before;
  }
  const lustDelta=paid.run.character.lust-input.run.character.lust;
  if(lustDelta)deltas.lust=lustDelta;
  deltas.money=paid.run.resources.money-input.run.resources.money;
  deltas.energy=paid.run.dayState.energyCurrent-input.run.dayState.energyCurrent;
  paid.run.flow.lastAction={
    id:SCHOOL_ACTION_ID,
    title:course.label,
    text:`School lesson completed: ${course.label}.`,
    media:cat.media.some(media=>media.id==='stage.school')?['stage.school']:[],
    presentationId:course.presentationId,
    deltas
  };
  paid.run.historyState.journal.push(`School: ${course.label}. Tuition ${course.tuition}; Energy -${course.energyCost}.`);
  paid.run.historyState.journalRefs.push(null);
  paid.run.historyState.journal=paid.run.historyState.journal.slice(-160);
  paid.run.historyState.journalRefs=paid.run.historyState.journalRefs.slice(-160);
  runtime.register?.(paid,cat);
  const reactionFacts=schoolReactionFacts(input,paid,course);
  const resolved=runtime.resolveReactions(paid,reactionFacts,cat,{newEpoch:true});
  return {
    state:resolved.state,
    course,
    reactionFacts,
    resolverTrace:resolved.trace
  };
}

export function schoolNightStudyChoice(courseId:SchoolCourseId,stat:Stat):NightChoiceDefinition {
  const course=getSchoolCourse(courseId);
  if(!course.statEffects.some(effect=>effect.stat===stat)){
    throw new Error(`Stat ${stat} is not supported by School track ${course.trackId}.`);
  }
  const slug=course.id.slice('school.course.'.length);
  return {
    id:`school.night_study.${slug}.${stat}`,
    label:`Night study: ${course.label} — ${stat}`,
    conditions:[],
    effects:[
      {kind:'modifyStat',stat,delta:SCHOOL_NIGHT_STUDY_STAT_GAIN},
      {kind:'incrementSchoolCounter',track:course.trackId,counter:'night_study_sessions',amount:1}
    ],
    nextDayEffects:[],
    nextDayEnergyDelta:SCHOOL_NIGHT_STUDY_NEXT_DAY_ENERGY_DELTA
  };
}


export function schoolNightStudyChoices():NightChoiceDefinition[] {
  return SCHOOL_COURSES.flatMap(course=>
    course.statEffects.map(effect=>schoolNightStudyChoice(course.id,effect.stat))
  );
}

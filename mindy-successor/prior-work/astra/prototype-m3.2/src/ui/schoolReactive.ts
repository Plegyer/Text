import type {SchoolCourseId} from '../core/school.ts';

export interface SchoolTeacherReactionBinding {
  courseId:SchoolCourseId;
  teacherContentId:string;
  bodyKey:string;
}

export const SCHOOL_TEACHER_REACTION_BINDINGS:Readonly<Record<SchoolCourseId,SchoolTeacherReactionBinding>>={
  'school.course.literacy_and_numbers':{
    courseId:'school.course.literacy_and_numbers',
    teacherContentId:'school.teacher.mara-fen',
    bodyKey:'school.transfer.teacher.mara_fen.body'
  },
  'school.course.arcana':{
    courseId:'school.course.arcana',
    teacherContentId:'school.teacher.ilyra-venn',
    bodyKey:'school.transfer.teacher.ilyra_venn.body'
  },
  'school.course.rhetoric_and_social':{
    courseId:'school.course.rhetoric_and_social',
    teacherContentId:'school.teacher.cassian-reed',
    bodyKey:'school.transfer.teacher.cassian_reed.body'
  },
  'school.course.etiquette_and_presentation':{
    courseId:'school.course.etiquette_and_presentation',
    teacherContentId:'school.teacher.eliane-marrow',
    bodyKey:'school.transfer.teacher.eliane_marrow.body'
  },
  'school.course.field_craft':{
    courseId:'school.course.field_craft',
    teacherContentId:'school.teacher.rowan-pike',
    bodyKey:'school.transfer.teacher.rowan_pike.body'
  },
  'school.course.physical_training':{
    courseId:'school.course.physical_training',
    teacherContentId:'school.teacher.tovan-kest',
    bodyKey:'school.transfer.teacher.tovan_kest.body'
  },
  'school.course.arts_and_performance':{
    courseId:'school.course.arts_and_performance',
    teacherContentId:'school.teacher.nessa-lark',
    bodyKey:'school.transfer.teacher.nessa_lark.body'
  },
  'school.course.body_confidence':{
    courseId:'school.course.body_confidence',
    teacherContentId:'school.teacher.sera-vey',
    bodyKey:'school.transfer.teacher.sera_vey.body'
  }
};

export function schoolTeacherReactionBinding(courseId:SchoolCourseId):SchoolTeacherReactionBinding{
  return SCHOOL_TEACHER_REACTION_BINDINGS[courseId];
}

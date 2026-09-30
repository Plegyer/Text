import type {SchoolCourseId} from '../core/school.ts';

export type SchoolTeacherReactionBinding={
  courseId:SchoolCourseId;
  teacherContentId:string;
  bodyKey:string;
};

export const SCHOOL_TEACHER_REACTION_BINDINGS:Readonly<Record<SchoolCourseId,SchoolTeacherReactionBinding>>={
  'school.course.literacy_and_numbers':{
    courseId:'school.course.literacy_and_numbers',
    teacherContentId:'school.teacher.mara-fen',
    bodyKey:'school.teacher_response_v2.mara_fen.lesson_success.body'
  },
  'school.course.arcana':{
    courseId:'school.course.arcana',
    teacherContentId:'school.teacher.ilyra-venn',
    bodyKey:'school.teacher_response_v2.ilyra_venn.lesson_success.body'
  },
  'school.course.rhetoric_and_social':{
    courseId:'school.course.rhetoric_and_social',
    teacherContentId:'school.teacher.cassian-reed',
    bodyKey:'school.teacher_response_v2.cassian_reed.lesson_success.body'
  },
  'school.course.etiquette_and_presentation':{
    courseId:'school.course.etiquette_and_presentation',
    teacherContentId:'school.teacher.eliane-marrow',
    bodyKey:'school.teacher_response_v2.eliane_marrow.lesson_success.body'
  },
  'school.course.field_craft':{
    courseId:'school.course.field_craft',
    teacherContentId:'school.teacher.rowan-pike',
    bodyKey:'school.teacher_response_v2.rowan_pike.lesson_success.body'
  },
  'school.course.physical_training':{
    courseId:'school.course.physical_training',
    teacherContentId:'school.teacher.tovan-kest',
    bodyKey:'school.teacher_response_v2.tovan_kest.lesson_success.body'
  },
  'school.course.arts_and_performance':{
    courseId:'school.course.arts_and_performance',
    teacherContentId:'school.teacher.nessa-lark',
    bodyKey:'school.teacher_response_v2.nessa_lark.lesson_success.body'
  },
  'school.course.body_confidence':{
    courseId:'school.course.body_confidence',
    teacherContentId:'school.teacher.sera-vey',
    bodyKey:'school.teacher_response_v2.sera_vey.lesson_success.body'
  }
};

export function schoolTeacherReactionBinding(courseId:SchoolCourseId):SchoolTeacherReactionBinding{
  return SCHOOL_TEACHER_REACTION_BINDINGS[courseId];
}

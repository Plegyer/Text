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
    bodyKey:'school.teacher.late_career.mara_fen.transfer.body'
  },
  'school.course.arcana':{
    courseId:'school.course.arcana',
    teacherContentId:'school.teacher.ilyra-venn',
    bodyKey:'school.teacher.late_career.ilyra_venn.transfer.body'
  },
  'school.course.rhetoric_and_social':{
    courseId:'school.course.rhetoric_and_social',
    teacherContentId:'school.teacher.cassian-reed',
    bodyKey:'school.teacher.late_career.cassian_reed.transfer.body'
  },
  'school.course.etiquette_and_presentation':{
    courseId:'school.course.etiquette_and_presentation',
    teacherContentId:'school.teacher.eliane-marrow',
    bodyKey:'school.teacher.late_career.eliane_marrow.transfer.body'
  },
  'school.course.field_craft':{
    courseId:'school.course.field_craft',
    teacherContentId:'school.teacher.rowan-pike',
    bodyKey:'school.teacher.late_career.rowan_pike.transfer.body'
  },
  'school.course.physical_training':{
    courseId:'school.course.physical_training',
    teacherContentId:'school.teacher.tovan-kest',
    bodyKey:'school.teacher.late_career.tovan_kest.transfer.body'
  },
  'school.course.arts_and_performance':{
    courseId:'school.course.arts_and_performance',
    teacherContentId:'school.teacher.nessa-lark',
    bodyKey:'school.teacher.late_career.nessa_lark.transfer.body'
  },
  'school.course.body_confidence':{
    courseId:'school.course.body_confidence',
    teacherContentId:'school.teacher.sera-vey',
    bodyKey:'school.teacher.late_career.sera_vey.transfer.body'
  }
};

export function schoolTeacherReactionBinding(courseId:SchoolCourseId):SchoolTeacherReactionBinding{
  return SCHOOL_TEACHER_REACTION_BINDINGS[courseId];
}

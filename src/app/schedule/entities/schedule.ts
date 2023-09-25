import { DateTime } from 'luxon';
import { z } from 'zod';

export interface Lesson {
  id?: string;
  studyPlaceId?: string;
  primaryColor: string;
  journalCellColor?: string;
  secondaryColor?: string;
  endDate: DateTime;
  startDate: DateTime;
  lessonIndex: number;
  subject: string;
  group: string;
  teacher: string;
  room: string;
  type?: string;
  title?: string;
  homework?: string;
  description?: string;
  isGeneral?: boolean;
}

export interface ScheduleInfo {
  studyPlaceInfo: StudyPlaceInfo;
  type: string;
  typeName: string;
  startDate: DateTime;
  endDate: DateTime;

  indexes: number[];
  minLessonIndex: number;
  maxLessonIndex: number;

  daysNumber: number;
}

export interface Schedule {
  lessons: Lesson[];
  cells: Cell[];
  info: ScheduleInfo;
}

export interface Cell {
  startDate: DateTime;
  endDate: DateTime;
  lessonIndex: number;
  lessons: Lesson[];
}

export interface StudyPlaceInfo {
  id: string,
  title: string
}

export const ScheduleSchema = z.object({
  lessons: z.array(z.object({
    id: z.string(),
    studyPlaceId: z.string(),
    endDate: z.string().datetime().transform(dt => DateTime.fromISO(dt)),
    startDate: z.string().datetime().transform(dt => DateTime.fromISO(dt)),
    primaryColor: z.string(),
    secondaryColor: z.string(),
    lessonIndex: z.number(),
    subject: z.string(),
    group: z.string(),
    teacher: z.string(),
    room: z.string(),
    isGeneral: z.boolean(),
  })).or(z.null()),
  info: z.object({
    endDate: z.string().datetime().transform(dt => DateTime.fromISO(dt)),
    startDate: z.string().datetime().transform(dt => DateTime.fromISO(dt)),
    studyPlaceInfo: z.object({
      id: z.string(),
    }),
    type: z.string(),
    typeName: z.string(),
  }),
});
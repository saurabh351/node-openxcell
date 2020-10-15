import { ClassroomInterface } from './classroom.interface';
import { SubjectInterface } from './subject.interface';

export interface ProfessorClassRoomInterface {
  classRoomId: string;
  schedule: [];
}

export interface ProfessorInterface {
  id: string;
  name: string;
  subjects: SubjectInterface[];
  classRooms?: ClassroomInterface[];
}

export interface ProfessorFullDetailInterface {
  id: string;
  name: string;
  subjects: number[];
  classRooms?: ProfessorClassRoomInterface[];
}

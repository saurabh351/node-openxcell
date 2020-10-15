import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import {
  CLASS_ROOM_WEEK_MAX_HOUR_LIMIT,
  PROFESSOR_MAX_DAY_HOUR_LIMIT,
  PROFESSOR_MAX_WEEK_HOUR_LIMIT,
} from '../common/config/general';
import {
  AssignClassRoomToProfessorDto,
  ProfessorDetachFromClassRoomToDto,
} from './dto/assign-class-room-to-professor.dto';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { TimeTableFilterDto } from './dto/time-table-filter.dto';
import { ProfessorClassRoom } from './professor-class-room.entity';
import { ProfessorSubject } from './professor-subject.entity';
import { Professor } from './professor.entity';

@Injectable()
export class ProfessorsService {
  constructor(
    @InjectRepository(Professor)
    private repository: Repository<Professor>,
    @InjectRepository(ProfessorClassRoom)
    private professorClassRoomRepository: Repository<ProfessorClassRoom>,
    @InjectRepository(ProfessorSubject)
    private professorSubjectRepository: Repository<ProfessorSubject>,
  ) {
  }

  async findAll(): Promise<Professor[]> {
    const professors = await this.repository.find();
    for (const professor of professors) {
      professor.subjects = await this.professorSubjectRepository.find({
        professor_id: professor.id,
      });
    }
    return professors;
  }

  async syncSubjects(id: number, subjectIds: number[], isUpdate = true) {
    if (isUpdate) {
      await this.deleteProfessorSubjects(id);
    }

    if (subjectIds) {
      const professorSubjects: ProfessorSubject[] = subjectIds.map((subjectId: number) => {
        const professorSubject = new ProfessorSubject();
        professorSubject.professor_id = id;
        professorSubject.subject_id = subjectId;
        return professorSubject;
      });

      await this.professorSubjectRepository.save(professorSubjects);
      return professorSubjects;
    }
    return [];
  }

  async update(id: number, dto: CreateProfessorDto): Promise<Professor> {
    const model = await this.findOne(id);
    model.name = dto.name;
    await this.repository.save(model);
    if (dto.subjects) {
      model.subjects = await this.syncSubjects(model.id, dto.subjects);
    }
    return model;
  }

  async create(dto: CreateProfessorDto): Promise<Professor> {
    const model = this.repository.create();
    model.name = dto.name;
    await this.repository.save(model);
    if (dto.subjects) {
      model.subjects = await this.syncSubjects(model.id, dto.subjects, false);
    }
    return model;
  }

  async findOne(professorId: number): Promise<Professor> {
    const model = await this.repository.findOneOrFail(professorId);
    model.subjects = await this.professorSubjectRepository.find({
      professor_id: professorId,
    });
    return model;
  }

  async deleteProfessorSubjects(id: number) {
    const result = await this.professorSubjectRepository.delete({
      professor_id: id,
    });
    return result.affected > 0;
  }

  async deleteProfessorClassRooms(id: number) {
    const result = await this.professorClassRoomRepository.update({
      professor_id: id,
    }, {
      professor_id: null,
    });
    return result.affected > 0;
  }

  async delete(id: number): Promise<boolean> {
    const model = await this.repository.delete(id);
    await this.deleteProfessorClassRooms(id);
    await this.deleteProfessorSubjects(id);
    return model.affected > 0;
  }

  async getDayAndWeekClassRoomHourCount(professorId: number, classRoomId: number, dayId: number) {
    const { weekHour } = await getRepository(ProfessorClassRoom)
      .createQueryBuilder('p')
      .select('COUNT(p.id)', 'weekHour')
      .where('p.professor_id = :professor_id', { professor_id: professorId })
      // .andWhere('p.class_room_id = :class_room_id', { class_room_id: classRoomId })
      .getRawOne();

    const { dayHour } = await getRepository(ProfessorClassRoom)
      .createQueryBuilder('p')
      .select('COUNT(p.id)', 'dayHour')
      .where('p.professor_id = :professor_id', { professor_id: professorId })
      // .andWhere('p.class_room_id = :class_room_id', { class_room_id: classRoomId })
      .andWhere('p.day_id = :day_id', { day_id: dayId })
      .getRawOne();

    const { classRoomTotalHour } = await getRepository(ProfessorClassRoom)
      .createQueryBuilder('p')
      .select('COUNT(p.id)', 'classRoomTotalHours')
      .where('p.professor_id != 0')
      .andWhere('p.class_room_id = :class_room_id', { class_room_id: classRoomId })
      .getRawOne();

    return {
      weekHour: Number(weekHour),
      dayHour: Number(dayHour),
      classRoomTotalHour: Number(classRoomTotalHour),
    };
  }

  async attachToClassRoom(dto: AssignClassRoomToProfessorDto): Promise<boolean> {
    const model = await this.repository.findOneOrFail(dto.professor_id);
    try {
      await this.professorSubjectRepository.findOneOrFail({
        where: {
          subject_id: dto.subject_id,
          professor_id: dto.professor_id,
        },
      });
    } catch (e) {
      throw new HttpException('Professor subject is Invalid', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const { dayHour, weekHour, classRoomTotalHour } = await this.getDayAndWeekClassRoomHourCount(
      dto.professor_id,
      dto.class_room_id,
      dto.day_id,
    );

    if ((weekHour + 1) > PROFESSOR_MAX_WEEK_HOUR_LIMIT) {
      throw new HttpException(
        `Professor weekly lecture limit(${PROFESSOR_MAX_WEEK_HOUR_LIMIT}) reached.`,
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }

    if ((dayHour + 1) > PROFESSOR_MAX_DAY_HOUR_LIMIT) {
      throw new HttpException(
        `Professor daily lecture limit(${PROFESSOR_MAX_DAY_HOUR_LIMIT}) reached.`,
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }

    if ((classRoomTotalHour + 1) > CLASS_ROOM_WEEK_MAX_HOUR_LIMIT) {
      throw new HttpException(
        `Class room max lecture limit(${CLASS_ROOM_WEEK_MAX_HOUR_LIMIT}) reached.`,
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }

    const result = await this.professorClassRoomRepository.update({
      time_slot_id: dto.time_slot_id,
      day_id: dto.day_id,
      class_room_id: dto.class_room_id,
    }, {
      professor_id: model.id,
      subject_id: dto.subject_id,
    });
    return result.affected > 0;
  }

  async detachFromClassRoom(dto: ProfessorDetachFromClassRoomToDto): Promise<boolean> {
    const result = await this.professorClassRoomRepository.update({
      time_slot_id: dto.time_slot_id,
      day_id: dto.day_id,
      class_room_id: dto.class_room_id,
    }, {
      professor_id: null,
      subject_id: null,
    });
    return result.affected > 0;
  }

  async getTimeTable(dto: TimeTableFilterDto): Promise<ProfessorClassRoom[]> {
    return await this.professorClassRoomRepository.find(dto);
  }
}

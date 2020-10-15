import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, getManager, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { TIME_SLOTS, WEEK_DAYS } from '../common/config/week-data';
import { ProfessorClassRoom } from '../professors/professor-class-room.entity';
import { ClassRoom } from './class-room.entity';
import { CreateClassRoomDto } from './dto/create-class-room.dto';

@Injectable()
export class ClassRoomService {
  constructor(
    @InjectRepository(ClassRoom)
    private repository: Repository<ClassRoom>,
    @InjectRepository(ProfessorClassRoom)
    private professorClassRoomRepository: Repository<ProfessorClassRoom>,
  ) {
  }

  async findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    return this.repository.findOneOrFail(id);
  }

  async update(id: number, dto: CreateClassRoomDto) {
    const entityManager = getManager();
    const model = await this.repository.findOneOrFail(id);
    model.name = dto.name;
    await entityManager.save(model);
    return model;
  }

  async delete(id: number) {
    const model = await this.repository.delete(id);
    const timetableResult = await getConnection()
      .createQueryBuilder()
      .delete()
      .from(ProfessorClassRoom)
      .where('class_room_id = :class_room_id', { class_room_id: id })
      .execute();
    return timetableResult.affected > 0 || model.affected > 0;
  }

  async create(dto: CreateClassRoomDto) {
    const model = this.repository.create();
    model.name = dto.name;
    await this.repository.save(model);

    const timetable: QueryDeepPartialEntity<ProfessorClassRoom>[] = [];

    for (let i = 0; i < WEEK_DAYS.length; i++) {
      for (let j = 0; j < TIME_SLOTS.length; j++) {
        timetable.push({
          class_room_id: model.id,
          day_id: WEEK_DAYS[i].id,
          time_slot_id: TIME_SLOTS[j].id,
        });
      }
    }

    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(ProfessorClassRoom)
      .values(timetable)
      .execute();
    return model;
  }
}

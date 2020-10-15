import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';
import { CreateClassRoomDto } from '../class-room/dto/create-class-room.dto';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { Subject } from './subject.entity';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject)
    private repository: Repository<Subject>,
  ) {
  }

  async findAll(): Promise<Subject[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<Subject> {
    return this.repository.findOneOrFail(id);
  }

  async create(dto: CreateSubjectDto): Promise<Subject> {
    const model = this.repository.create();
    model.name = dto.name;
    await this.repository.save(model);
    return model;
  }

  async update(id: number, dto: CreateClassRoomDto) {
    const entityManager = getManager();
    const model = await this.repository.findOneOrFail(id);
    model.name = dto.name;
    await entityManager.save(model);
    return model;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected > 0;
  }
}

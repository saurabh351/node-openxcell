import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import {
  AssignClassRoomToProfessorDto,
  ProfessorDetachFromClassRoomToDto,
} from './dto/assign-class-room-to-professor.dto';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { TimeTableFilterDto } from './dto/time-table-filter.dto';
import { ProfessorClassRoom } from './professor-class-room.entity';
import { Professor } from './professor.entity';
import { ProfessorsService } from './professors.service';

@Controller('professors')
export class ProfessorsController {
  constructor(private service: ProfessorsService) {
  }

  @Get()
  async findAll(): Promise<Professor[]> {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Professor> {
    return this.service.findOne(id);
  }

  @Post()
  async addOne(@Body() dto: CreateProfessorDto): Promise<Professor> {
    return await this.service.create(dto);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: number): Promise<{ isDeleted: boolean }> {
    const isDeleted = await this.service.delete(id);
    return {
      isDeleted,
    };
  }

  @Patch(':id')
  async updateOne(@Param('id') id: number, @Body() dto: CreateProfessorDto): Promise<Professor> {
    return await this.service.update(id, dto);
  }

  @Post('attach-class-room')
  async attachToClassRoom(@Body() dto: AssignClassRoomToProfessorDto): Promise<{ isAttached: boolean }> {
    const isAttached = await this.service.attachToClassRoom(dto);
    return { isAttached };
  }

  @Post('detach-class-room')
  async detachFromClassRoom(@Body() dto: ProfessorDetachFromClassRoomToDto): Promise<{ isDetached: boolean }> {
    const isDetached = await this.service.detachFromClassRoom(dto);
    return { isDetached };
  }

  @Post('timetable')
  async getTimeTable(@Body() dto: TimeTableFilterDto): Promise<ProfessorClassRoom[]> {
    return this.service.getTimeTable(dto);
  }
}

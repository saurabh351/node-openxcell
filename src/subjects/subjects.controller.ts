import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { Subject } from './subject.entity';
import { SubjectsService } from './subjects.service';

@Controller('subjects')
export class SubjectsController {
  constructor(private service: SubjectsService) {
  }

  @Get()
  async findAll(): Promise<Subject[]> {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Subject> {
    return this.service.findOne(id);
  }

  @Post()
  async addOne(@Body() dto: CreateSubjectDto): Promise<Subject> {
    return this.service.create(dto);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: number): Promise<{ isDeleted: boolean }> {
    const isDeleted = await this.service.delete(id);
    return {
      isDeleted,
    };
  }

  @Patch(':id')
  async updateOne(@Param('id') id: number, @Body() dto: CreateSubjectDto): Promise<Subject> {
    return this.service.update(id, dto);
  }
}

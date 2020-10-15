import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ClassRoom } from './class-room.entity';
import { ClassRoomService } from './class-room.service';
import { CreateClassRoomDto } from './dto/create-class-room.dto';

@Controller('class-room')
export class ClassRoomController {
  constructor(private readonly service: ClassRoomService) {}

  @Get()
  async findAll(): Promise<ClassRoom[]> {
    return await this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ClassRoom> {
    return await this.service.findOne(id);
  }

  @Post()
  async addOne(@Body() dto: CreateClassRoomDto): Promise<ClassRoom> {
    return await this.service.create(dto);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: number): Promise<{isDeleted : boolean}> {
    const isDeleted: boolean =  await this.service.delete(id);
    return {
      isDeleted
    }
  }

  @Patch(':id')
  async updateOne(@Param('id') id: number, @Body() dto: CreateClassRoomDto): Promise<ClassRoom> {
    return await this.service.update(id, dto);
  }
}


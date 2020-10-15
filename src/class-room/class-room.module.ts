import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessorClassRoom } from '../professors/professor-class-room.entity';
import { ClassRoomController } from './class-room.controller';
import { ClassRoom } from './class-room.entity';
import { ClassRoomService } from './class-room.service';

@Module({
  imports : [
    TypeOrmModule.forFeature([ClassRoom, ProfessorClassRoom]),
  ],
  controllers : [ClassRoomController],
  providers: [
    ClassRoomService,
  ],
  exports : [
    ClassRoomService
  ]
})
export class ClassRoomModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessorClassRoom } from './professor-class-room.entity';
import { ProfessorSubject } from './professor-subject.entity';
import { Professor } from './professor.entity';
import { ProfessorsController } from './professors.controller';
import { ProfessorsService } from './professors.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Professor, ProfessorClassRoom, ProfessorSubject]),
  ],
  controllers: [ProfessorsController],
  providers: [
    ProfessorsService,
  ],
  exports : [
    ProfessorsService
  ]
})
export class ProfessorsModule {
}

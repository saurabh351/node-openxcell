import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClassRoomModule } from './class-room/class-room.module';
import { ConfigDataModule } from './config-data/config-data.module';
import { ProfessorsModule } from './professors/professors.module';
import { SubjectsModule } from './subjects/subjects.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ConfigDataModule,
    ProfessorsModule,
    ClassRoomModule,
    SubjectsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}

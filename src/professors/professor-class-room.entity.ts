import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('professor_class_rooms')
@Index(['professor_id', 'class_room_id', 'day_id', 'time_slot_id'], { unique: true })
@Index(['class_room_id', 'day_id', 'time_slot_id'], { unique: true })
export class ProfessorClassRoom {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id: number;

  @Column({nullable: true, type : 'bigint', unsigned : true, default : 0})
  professor_id?: number;

  @Column({type : 'bigint', unsigned : true})
  class_room_id: number;

  @Column({type : 'int'})
  day_id: number;

  @Column({type : 'int'})
  time_slot_id: number;

  @Column({nullable: true, type : 'bigint', unsigned : true, default : 0})
  subject_id?: number;
}

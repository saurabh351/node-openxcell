import { Column, Entity, PrimaryGeneratedColumn, Table } from 'typeorm';

@Entity('class_rooms')
export class ClassRoom {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  name: string;
}

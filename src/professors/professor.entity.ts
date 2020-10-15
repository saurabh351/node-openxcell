import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ProfessorSubject } from './professor-subject.entity';

@Entity('professors')
export class Professor {
  @PrimaryGeneratedColumn({type: 'bigint'})
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  name: string;

  subjects?: ProfessorSubject[];
}

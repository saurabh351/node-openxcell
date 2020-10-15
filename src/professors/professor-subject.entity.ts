import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('professor_subjects')
export class ProfessorSubject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type : 'bigint', unsigned : true})
  professor_id: number;

  @Column({type : 'bigint', unsigned : true})
  subject_id: number;
}

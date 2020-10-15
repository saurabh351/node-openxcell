import { IsNotEmpty } from 'class-validator';

export class AssignClassRoomToProfessorDto {
  @IsNotEmpty()
  readonly professor_id: number;

  readonly id?: number;

  @IsNotEmpty()
  readonly class_room_id: number;

  @IsNotEmpty()
  readonly subject_id: number;

  @IsNotEmpty()
  readonly time_slot_id: number;

  @IsNotEmpty()
  readonly day_id: number;
}

export class ProfessorDetachFromClassRoomToDto {
  @IsNotEmpty()
  readonly professor_id: number;

  @IsNotEmpty()
  readonly class_room_id: number;

  @IsNotEmpty()
  readonly time_slot_id: number;

  @IsNotEmpty()
  readonly day_id: number;
}

import { IsNotEmpty } from 'class-validator';

export class CreateProfessorDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly subjects: number[];
}

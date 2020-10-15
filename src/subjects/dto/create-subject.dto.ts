import { IsNotEmpty } from 'class-validator';

export class CreateSubjectDto {
  @IsNotEmpty()
  readonly name: string;
}

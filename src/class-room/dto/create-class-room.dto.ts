import { IsNotEmpty } from 'class-validator';

export class CreateClassRoomDto {
  @IsNotEmpty()
  readonly name: string;
}

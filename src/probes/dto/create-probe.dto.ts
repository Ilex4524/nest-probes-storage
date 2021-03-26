import { IsNotEmpty } from 'class-validator';

export class CreateProbeDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
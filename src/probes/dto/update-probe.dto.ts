import { ProbeTag } from '../enums/probe-tag.enum';
import { IsNotEmpty, IsEnum } from 'class-validator';

export class UpdateProbeDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsEnum(ProbeTag)
  tag: ProbeTag;
}
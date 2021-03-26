import { IsOptional, IsNotEmpty } from "class-validator";

export class FilterProbesDto {
  @IsOptional()
  @IsNotEmpty()
  search: string;
}
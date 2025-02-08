/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCarDto {
  @IsNotEmpty()
  @IsString()
  property_name!: string;

  @IsNotEmpty()
  property_value!: string;
}

/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsString } from 'class-validator';

export class CarDto {
  @IsNotEmpty()
  @IsString()
  readonly id!: number;

  @IsNotEmpty()
  @IsString()
  readonly brand!: string;
  @IsNotEmpty()
  @IsString()
  readonly color!: string;
  @IsNotEmpty()
  @IsString()
  readonly model!: string;
}

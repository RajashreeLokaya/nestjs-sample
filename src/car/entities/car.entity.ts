/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  brand!: string;

  @Column()
  color!: string;

  @Column()
  model!: string;
}

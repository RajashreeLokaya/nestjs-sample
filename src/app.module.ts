import { Module } from '@nestjs/common';
import { CarModule } from './car/car.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './car/entities/car.entity';

@Module({
  imports: [
    CarModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'test',
      database: 'testDatabase',
      entities: [Car],
      synchronize: true, // Auto-creates tables (disable in production)
    }),
  ],
})
export class AppModule {}

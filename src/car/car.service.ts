/* eslint-disable @typescript-eslint/require-await */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CARS } from './cars.mock';
import { CarDto } from './car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from './entities/car.entity';
@Injectable()
export class CarService {
  private cars = CARS;
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
  ) {}
  // eslint-disable-next-line @typescript-eslint/require-await
  public async getCars() {
    console.log('hit');
    return await this.carRepository.find();
  }

  public async addCar(carData: CarDto): Promise<Car> {
    const newCar = this.carRepository.create(carData); // Create entity instance
    return await this.carRepository.save(newCar); // Insert into DB
  }

  public async getCarById(id: number): Promise<CarDto> {
    // const carId = Number(id);
    const car = await this.carRepository.findOneBy({ id });
    if (!car) {
      throw new NotFoundException(`Car with ID ${id} not found`);
    }
    return Object.assign(new CarDto(), car); // Convert entity to DTO
  }

  public async deleteCarById(id: number): Promise<{ message: string }> {
    const result = await this.carRepository.delete(id);
    console.log(result);
    if (result.affected === 0) {
      throw new NotFoundException(`Car with ID ${id} not found`);
    }

    return { message: `Car with ID ${id} deleted successfully` };
  }

  public async updateCardById(
    id: number,
    property_name: string,
    property_value: string,
  ): Promise<any> {
    // const carId = Number(id);
    const car = await this.carRepository.findOneBy({ id });
    if (!car) {
      throw new NotFoundException(`Car with ID ${id} not found`);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    (car as any)[property_name] = property_value;
    return await this.carRepository.save(car);
  }
}

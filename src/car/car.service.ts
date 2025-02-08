/* eslint-disable @typescript-eslint/require-await */
import { HttpException, Injectable } from '@nestjs/common';
import { CARS } from './cars.mock';
import { CarDto } from './car.dto';
@Injectable()
export class CarService {
  private cars = CARS;
  // eslint-disable-next-line @typescript-eslint/require-await
  public getCars() {
    return this.cars;
  }
  public addCar(carData: CarDto): Promise<any> {
    return new Promise((resolve) => {
      this.cars.push(carData);
      return resolve(this.cars);
    });
    // console.log('carData ', this.cars);
  }

  public getCarById(id: number): Promise<CarDto> {
    const carId = Number(id);
    return new Promise((resolve) => {
      const car = this.cars.find((car) => car.id === carId);
      console.log('------------------------------------');
      console.log('carId ', carId);
      console.log(' this.cars -->', this.cars);

      console.log(' car   ', car);

      if (!car) {
        throw new HttpException('Not Found@@@@', 404);
      }
      return resolve(Object.assign(new CarDto(), car));
    });
  }
  public deleteCarById(id: number): Promise<CarDto> {
    const carId = Number(id);
    return new Promise((resolve) => {
      const index = this.cars.findIndex((car) => car.id === carId);
      if (index === -1) {
        throw new HttpException('Not Found', 404);
      }
      this.cars.splice(index, 1);
      return resolve(Object.assign(new CarDto(), this.cars));
    });
  }

  public updateCardById(
    id: number,
    property_name: string,
    property_value: string,
  ): Promise<any> {
    const carId = Number(id);
    return new Promise((resolve) => {
      const index = this.cars.findIndex((car) => car.id === carId);
      if (index === -1) {
        throw new HttpException('Not Found', 404);
      }
      this.cars[index][property_name] = property_value;
      return resolve(this.cars);
    });
  }
}

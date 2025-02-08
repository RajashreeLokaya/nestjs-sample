import { Test, TestingModule } from '@nestjs/testing';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { CarDto } from './car.dto';
import { HttpException } from '@nestjs/common';

describe('CarController', () => {
  let carController: CarController;
  let carService: CarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarController],
      providers: [
        {
          provide: CarService,
          useValue: {
            getCars: jest.fn().mockResolvedValue([
              {
                id: 1,
                brand: 'BMW',
                model: 'camry',
                color: 'red',
              },
            ]),
            addCar: jest.fn().mockImplementation((car: CarDto) => {
              return Promise.resolve({ ...car });
            }),
            getCarById: jest.fn().mockImplementation((id: number) => {
              return Promise.resolve({
                id,
                brand: 'Toyota',
                model: 'Corolla',
                color: 'blue',
              });
            }),
            deleteCarById: jest.fn().mockImplementation((id: number) => {
              return Promise.resolve({
                id,
                brand: 'Toyota',
                model: 'Corolla',
                color: 'blue',
              });
            }),
          },
        },
      ],
    }).compile();

    carController = module.get<CarController>(CarController);
    carService = module.get<CarService>(CarService);
  });

  it('should be defined', () => {
    expect(carController).toBeDefined();
  });

  it('should return an array of cars', async () => {
    // eslint-disable-next-line @typescript-eslint/await-thenable
    const result = await carController.getCars();
    expect(result).toEqual([
      {
        id: 1,
        brand: 'BMW',
        model: 'camry',
        color: 'red',
      },
    ]);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(carService.getCars).toHaveBeenCalledTimes(1);
  });
  it('should add a car and return it', async () => {
    const newCar: CarDto = {
      id: 2,
      brand: 'Toyota',
      model: 'Corolla',
      color: 'blue',
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const result = await carController.addCard(newCar);
    expect(result).toEqual(expect.objectContaining(newCar));
  });
  it('should return a car by ID', async () => {
    const carId = 2;
    const result = await carController.getCarById(carId);
    expect(result).toEqual({
      id: carId,
      brand: 'Toyota',
      model: 'Corolla',
      color: 'blue',
    });
  });
  it('should delete a car by ID ', async () => {
    const carId = 2;
    const result = await carController.deleteCarById(carId);
    expect(result).toEqual({
      id: carId,
      brand: 'Toyota',
      model: 'Corolla',
      color: 'blue',
    });
  });

  it('should throw a 404 error if car is not found for deletion', async () => {
    jest.spyOn(carService, 'deleteCarById').mockImplementation(() => {
      throw new HttpException('Not Found', 404);
    });

    await expect(carController.deleteCarById(99)).rejects.toThrow(
      HttpException,
    );
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(carService.deleteCarById).toHaveBeenCalledWith(99);
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { CarService } from './car.service'; // Update with the correct path
import { CarRepository } from './car.repository'; // Update with the correct path

describe('CarService', () => {
  let carService: CarService;
  let carRepository: jest.Mocked<CarRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarService,
        {
          provide: CarRepository,
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    carService = module.get<CarService>(CarService);
    carRepository = module.get<CarRepository>(CarRepository);
  });

  it('should call carRepository.find()', async () => {
    carRepository.find.mockResolvedValue([]);

    await carService.getCars();

    expect(carRepository.find).toHaveBeenCalledTimes(1);
  });

  it('should return an array of cars', async () => {
    const mockCars = [
      { id: 1, make: 'Toyota', model: 'Camry' },
      { id: 2, make: 'Honda', model: 'Civic' },
    ];
    carRepository.find.mockResolvedValue(mockCars);

    const result = await carService.getCars();

    expect(result).toEqual(mockCars);
  });

  it('should handle errors gracefully', async () => {
    carRepository.find.mockRejectedValue(new Error('Database error'));

    await expect(carService.getCars()).rejects.toThrow('Database error');
  });
});

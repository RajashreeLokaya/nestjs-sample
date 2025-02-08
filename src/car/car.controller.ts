import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CarService } from './car.service';
import { CarDto } from './car.dto';
import { UpdateCarDto } from './updateCarDto.dto';

@Controller('car')
export class CarController {
  constructor(private carService: CarService) {}

  @Get()
  public getCars() {
    return this.carService.getCars();
  }
  @Post()
  public async addCard(@Body() car: CarDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await this.carService.addCar(car);
  }

  @Get(':id')
  public async getCarById(@Param('id') id: number) {
    return await this.carService.getCarById(id);
  }

  @Delete(':id')
  public async deleteCarById(@Param('id') id: number) {
    return await this.carService.deleteCarById(id);
  }

  @Put(':id')
  public async updateCarById(
    @Param('id') id: number,
    @Query() query: UpdateCarDto,
  ) {
    const propertyName = query.property_name;
    const propertyValue = query.property_value;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.carService.updateCardById(id, propertyName, propertyValue);
  }
}

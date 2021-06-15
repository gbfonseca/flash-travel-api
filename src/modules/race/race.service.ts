import { CalculateRaceDto } from './dto/calculate-race-dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RaceService {
  private pricePerKm = 3;
  private fuelPrice = 2;

  calculateDto(calculateRaceDto: CalculateRaceDto): number {
    const { distance } = calculateRaceDto;
    const racePrice = distance * this.pricePerKm + this.fuelPrice;

    return racePrice;
  }
}

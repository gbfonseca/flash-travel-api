import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { CalculateRaceDto } from './dto/calculate-race-dto';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RaceService } from './race.service';

@Controller('race')
export class RaceController {
  constructor(private readonly raceService: RaceService) {}

  @Post('calculate-race')
  @UseGuards(JwtAuthGuard)
  calculateRace(@Body() calculateRaceDto: CalculateRaceDto): {
    race_price: number;
  } {
    return {
      race_price: this.raceService.calculateDto(calculateRaceDto),
    };
  }
}

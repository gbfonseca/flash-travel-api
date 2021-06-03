import { Module } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { DriversController } from './drivers.controller';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { DriversRepository } from './drivers.repository';

@Module({
  controllers: [DriversController],
  providers: [DriversService],
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([DriversRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
})
export class DriversModule {}

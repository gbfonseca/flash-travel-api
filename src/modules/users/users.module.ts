import { PassportModule } from '@nestjs/passport';
import { UserRepository } from './users.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MulterModule.register({
      dest: '../tmp/uploads',
    }),
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}

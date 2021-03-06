import { Body, Controller, Post } from '@nestjs/common';
import { CreateDriverDto } from '../drivers/dto/create-driver.dto';
import { Driver } from '../drivers/entities/driver.entity';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { User } from '../users/users.entity';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dtos/credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.authService.signUp(createUserDto);
  }

  @Post('/signin')
  async signIn(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ token: string; user: User }> {
    return await this.authService.signIn(createUserDto);
  }

  @Post('/driver/signup')
  async driverSignUp(
    @Body() createDriverDto: CreateDriverDto,
  ): Promise<Driver> {
    return await this.authService.driverSignUp(createDriverDto);
  }

  @Post('/driver/signin')
  async driverSignIn(
    @Body() credentialsDto: CredentialsDto,
  ): Promise<{ token: string; driver: Driver }> {
    return await this.authService.driverSignIn(credentialsDto);
  }
}

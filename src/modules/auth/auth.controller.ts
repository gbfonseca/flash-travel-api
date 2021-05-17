import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { User } from '../users/users.entity';
import { AuthService } from './auth.service';

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
}

import { Controller } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './users.repository';

@Controller('users')
export class UsersController {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}
}

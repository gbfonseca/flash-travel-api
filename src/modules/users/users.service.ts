import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  async uploadProfileImage(file: Express.Multer.File, user: User) {
    return await this.userRepository.uploadProfileImage(file, user);
  }
}

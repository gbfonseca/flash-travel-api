import { UserRole } from './user-role.enum';
import { CreateUserDto } from './dtos/create-user.dto';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './users.entity';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CredentialsDto } from '../auth/dtos/credentials.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(
    createuserDto: CreateUserDto,
    role: UserRole,
  ): Promise<User> {
    const { name, username, email, password, phone } = createuserDto;

    const user = this.create();
    user.name = name;
    user.username = username;
    user.email = email;
    user.role = role;
    user.phone = phone;
    user.confirmationToken = crypto.randomBytes(32).toString('hex');
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
      delete user.password;
      delete user.salt;
      return user;
    } catch (error) {
      if (error.code.toString() === '23505') {
        throw new ConflictException('Endereço de email já está em uso.');
      } else {
        throw new InternalServerErrorException('Error ao cadastrar usuário.');
      }
    }
  }

  async checkCredentials(credentialsDto: CredentialsDto) {
    const { email, password } = credentialsDto;
    const user = await this.findOne({ email });

    if (user && (await user.checkPassword(password))) {
      delete user.password;
      delete user.salt;
      delete user.confirmationToken;
      delete user.recoverToken;
      return user;
    } else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    const passwordHashed = bcrypt.hash(password, salt);
    return passwordHashed;
  }
}

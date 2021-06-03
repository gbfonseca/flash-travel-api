import { CreateDriverDto } from './../drivers/dto/create-driver.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserRepository } from '../users/users.repository';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { User } from '../users/users.entity';
import { UserRole } from '../users/user-role.enum';
import { CredentialsDto } from './dtos/credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { DriversRepository } from '../drivers/drivers.repository';
import { Driver } from '../drivers/entities/driver.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    @InjectRepository(DriversRepository)
    private driversRepository: DriversRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.password !== createUserDto.passwordConfirmation) {
      throw new UnprocessableEntityException('As senhas não conferem.');
    } else {
      return await this.userRepository.createUser(createUserDto, UserRole.USER);
    }
  }

  async signIn(
    credentialsDto: CredentialsDto,
  ): Promise<{ token: string; user: User }> {
    const user = await this.userRepository.checkCredentials(credentialsDto);

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const jwtPayload = {
      id: user.id,
    };

    const token = await this.jwtService.sign(jwtPayload);

    return {
      token,
      user,
    };
  }

  async driverSignUp(createDriverDto: CreateDriverDto): Promise<Driver> {
    if (createDriverDto.password !== createDriverDto.passwordConfirmation) {
      throw new UnprocessableEntityException('As senhas não conferem.');
    } else {
      return await this.driversRepository.createDriver(
        createDriverDto,
        UserRole.DRIVER,
      );
    }
  }

  async driverSignIn(
    credentialsDto: CredentialsDto,
  ): Promise<{ token: string; driver: Driver }> {
    const driver = await this.driversRepository.checkCredentials(
      credentialsDto,
    );

    if (!driver) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const jwtPayload = {
      id: driver.id,
    };

    const token = this.jwtService.sign(jwtPayload);

    return {
      token,
      driver,
    };
  }
}

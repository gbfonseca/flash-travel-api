import { CredentialsDto } from './../auth/dtos/credentials.dto';
import { UserRole } from './../users/user-role.enum';
import { EntityRepository, Repository } from 'typeorm';
import { CreateDriverDto } from './dto/create-driver.dto';
import { Driver } from './entities/driver.entity';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { BankAccount } from '../bank-account/entities/bank-account.entity';

@EntityRepository(Driver)
export class DriversRepository extends Repository<Driver> {
  async createDriver(
    createDriver: CreateDriverDto,
    role: UserRole,
  ): Promise<Driver> {
    const {
      name,
      username,
      email,
      password,
      phone,
      cpf,
      account_agency,
      account_bank,
      account_number,
      account_type,
    } = createDriver;

    const bank_account = BankAccount.create();
    bank_account.account_agency = account_agency;
    bank_account.account_bank = account_bank;
    bank_account.account_number = account_number;
    bank_account.account_type = account_type;
    await bank_account.save();

    const driver = Driver.create();
    driver.name = name;
    driver.username = username;
    driver.email = email;
    driver.phone = phone;
    driver.cpf = cpf;
    driver.image_url = null;
    driver.role = role;
    driver.confirmationToken = crypto.randomBytes(32).toString('hex');
    driver.salt = await bcrypt.genSalt();
    driver.password = await this.hashPassword(password, driver.salt);
    driver.bank_acount = bank_account;
    try {
      await driver.save();
      delete driver.confirmationToken;
      delete driver.salt;
      delete driver.password;
      return driver;
    } catch (error) {
      if (error.code.toString() === '23505') {
        throw new ConflictException('Endereço de email já está em uso.');
      } else {
        throw new InternalServerErrorException('Error ao cadastrar usuário.');
      }
    }
  }

  async checkCredentials(credentialsDto: CredentialsDto): Promise<Driver> {
    const { email, password } = credentialsDto;

    const driver = await Driver.findOne({ email });

    if (driver && driver.checkPassword(password)) {
      delete driver.password;
      delete driver.confirmationToken;
      delete driver.salt;
      delete driver.recoverToken;
      return driver;
    } else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    const passwordHashed = bcrypt.hash(password, salt);
    return passwordHashed;
  }
}

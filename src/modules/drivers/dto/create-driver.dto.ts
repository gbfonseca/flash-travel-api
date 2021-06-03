import { CreateUserDto } from 'src/modules/users/dtos/create-user.dto';

export class CreateDriverDto extends CreateUserDto {
  cpf: string;
  account_bank: string;
  account_number: string;
  account_agency: string;
  account_type: string;
}

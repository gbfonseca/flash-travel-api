import { BankAccount } from 'src/modules/bank-account/entities/bank-account.entity';
import { User } from 'src/modules/users/users.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class Driver extends User {
  @Column({ nullable: false, type: 'varchar', length: 11 })
  cpf: string;

  @OneToOne(() => BankAccount)
  @JoinColumn()
  bank_acount: BankAccount;
}

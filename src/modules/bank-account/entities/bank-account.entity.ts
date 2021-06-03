import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BankAccount extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar' })
  account_bank: string;

  @Column({ nullable: false, type: 'varchar' })
  account_number: string;

  @Column({ nullable: false, type: 'varchar' })
  account_agency: string;

  @Column({ nullable: false, type: 'varchar' })
  account_type: string;
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { DriversModule } from './modules/drivers/drivers.module';
import { BankAccountModule } from './modules/bank-account/bank-account.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'tmp', 'uploads'),
    }),
    UsersModule,
    AuthModule,
    DriversModule,
    BankAccountModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

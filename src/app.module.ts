import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { DriversModule } from './modules/drivers/drivers.module';
import { BankAccountModule } from './modules/bank-account/bank-account.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configs/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        entities: configService.get('database.entities'),
        synchronize: configService.get('database.synchronize'),
        url: `postgresql://${configService.get(
          'database.type',
        )}:${configService.get(
          'database.password',
        )}@localhost:${configService.get('database.port')}/${configService.get(
          'database.database',
        )}`,
      }),
      inject: [ConfigService],
    }),
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

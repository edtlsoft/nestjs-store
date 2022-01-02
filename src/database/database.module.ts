import { Module, Global } from '@nestjs/common';
import { Client } from 'pg';
import { ConfigType } from '@nestjs/config';
import config from '../config/config';
import { TypeOrmModule } from '@nestjs/typeorm';

const API_KEY = '123456';
const API_KEY_PROD = '123456-secure';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, host, name, password, port } = configService.database;

        return {
          type: 'postgres',
          host,
          port,
          username: user,
          password,
          database: name,
          entities: [],
          synchronize: false,
          autoLoadEntities: true,
        };
      },
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'PG_CLIENT',
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, host, name, password, port } = configService.database;
        const client = new Client({
          host,
          user,
          password,
          database: name,
          port,
        });

        client.connect();

        return client;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['API_KEY', 'PG_CLIENT', TypeOrmModule],
})
export class DatabaseModule {}

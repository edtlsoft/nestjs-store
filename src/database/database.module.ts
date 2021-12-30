import { Module, Global } from '@nestjs/common';
import { Client } from 'pg';
import { ConfigType } from '@nestjs/config';
import config from '../config/config';

const API_KEY = '123456';
const API_KEY_PROD = '123456-secure';

@Global()
@Module({
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
  exports: ['API_KEY', 'PG_CLIENT'],
})
export class DatabaseModule {}

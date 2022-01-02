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
          type: 'mysql',
          host,
          port,
          username: user,
          password,
          database: name,
          entities: [],
          synchronize: true,
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
      useFactory: () => {
        const client = new Client({
          host: 'localhost',
          user: 'root',
          password: 'PostgresDbPassword',
          database: 'nestjs_store',
          port: 5432,
        });

        try {
          client.connect();
        } catch (error) {
          console.log(error);
        }

        return client;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['API_KEY', 'PG_CLIENT', TypeOrmModule],
})
export class DatabaseModule {}

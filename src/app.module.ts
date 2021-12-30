import * as Joi from 'joi';
import { lastValueFrom } from 'rxjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule, HttpService } from '@nestjs/axios';
import { Client } from 'pg';

import config from './config';
import { AppService } from './app.service';
import { environments } from './environments';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { PaymentsModule } from './payments/payments.module';
import { DatabaseModule } from './database/database.module';
import { ProductsModule } from './products/products.module';

const client = new Client({
  host: 'localhost',
  user: 'root',
  password: 'PostgresDbPassword',
  database: 'nestjs_store',
  port: 5432,
});

(async () => {
  try {
    await client.connect();
  } catch (error) {
    console.log(error);
  }
})();

client.query('SELECT * FROM tasks', (err, res) => {
  console.log(err);
  console.log(res.rows);
});

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV ?? 'dev'],
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.number().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
      }),
    }),
    UsersModule,
    ProductsModule,
    PaymentsModule,
    HttpModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'TASKS',
      useFactory: async (http: HttpService) => {
        const tasks = await lastValueFrom(
          http.get('https://jsonplaceholder.typicode.com/todos'),
        );

        return tasks.data;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}

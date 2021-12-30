import * as Joi from 'joi';
import { lastValueFrom } from 'rxjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule, HttpService } from '@nestjs/axios';

import config from './config/config';
import { AppService } from './app.service';
import { environments } from './environments';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { PaymentsModule } from './payments/payments.module';
import { DatabaseModule } from './database/database.module';
import { ProductsModule } from './products/products.module';
import configSchema from './config/configSchema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV ?? 'dev'],
      load: [config],
      isGlobal: true,
      validationSchema: configSchema,
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

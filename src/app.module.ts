import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentsModule } from './payments/payments.module';
import { HttpModule, HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
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

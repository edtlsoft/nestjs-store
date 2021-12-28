import { ProductsModule } from './../products/products.module';
import { Module } from '@nestjs/common';

import { CustomerController } from './controllers/customers/customers.controller';
import { CustomersService } from './services/customers/customers.service';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';

@Module({
  imports: [ProductsModule],
  controllers: [CustomerController, UsersController],
  providers: [CustomersService, UsersService],
})
export class UsersModule {}

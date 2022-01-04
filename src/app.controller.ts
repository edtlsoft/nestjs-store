import { ApiKeyGuard } from './auth/guards/api-key.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/tasks')
  @UseGuards(ApiKeyGuard)
  getTasks() {
    return this.appService.getTasks();
  }
}

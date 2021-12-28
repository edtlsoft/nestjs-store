import { ConfigType } from '@nestjs/config';
import { Inject, Injectable } from '@nestjs/common';
import config from './config';

@Injectable()
export class AppService {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    @Inject('TASKS') private tasks: any[],
  ) {}

  getHello(): string {
    return (
      'Hello World!' +
      this.configService.apiKey +
      '--' +
      this.configService.database.name
    );
  }
}

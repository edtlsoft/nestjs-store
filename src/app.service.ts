import { ConfigService } from '@nestjs/config';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    private configService: ConfigService,
    @Inject('TASKS') private tasks: any[],
  ) {}

  getHello(): string {
    return 'Hello World!' + this.configService.get('API_KEY');
  }
}

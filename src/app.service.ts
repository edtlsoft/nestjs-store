import { Client } from 'pg';
import { ConfigType } from '@nestjs/config';
import { Inject, Injectable } from '@nestjs/common';
import config from './config/config';

@Injectable()
export class AppService {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    @Inject('TASKS') private tasks: any[],
    @Inject('PG_CLIENT') private clientPg: Client,
  ) {}

  getHello(): string {
    return (
      'Hello World!' +
      this.configService.apiKey +
      '--' +
      this.configService.database.name
    );
  }

  getTasks() {
    return new Promise((resolve, reject) => {
      this.clientPg.query('SELECT * FROM tasks', (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res.rows);
      });
    });
  }
}

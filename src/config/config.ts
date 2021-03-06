import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    postgresUrl: process.env.DATABASE_URL,
    database: {
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      name: process.env.DATABASE_NAME,
      port: parseInt(process.env.DATABASE_PORT),
    },
    apiKey: process.env.API_KEY,
    jwtSecret: process.env.JWT_SECRET,
  };
});

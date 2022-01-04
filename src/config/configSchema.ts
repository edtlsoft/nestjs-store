import * as Joi from 'joi';

export default Joi.object({
  API_KEY: Joi.string().required(),
  DATABASE_HOST: Joi.string().required(),
  DATABASE_USER: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_PORT: Joi.number().required(),
});

import { Sequelize } from 'sequelize-typescript'
import dotenv from 'dotenv';
import { models } from '../models';

dotenv.config();

const dbName = process.env.DATABASE || '';
const dbUser = process.env.DATABASE_USER || '';
const dbPassword = process.env.DATABASE_PASSWORD || '';
const dbHost = process.env.DATABASE_HOST || '';

export const sequelize = new Sequelize({
  database: dbName,
  dialect: 'postgres',
  username: dbUser,
  password: dbPassword,
  host: dbHost,
  models: Object.values(models),
  logging: false,
});

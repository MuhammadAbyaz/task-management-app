import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Task } from '../task/entity/task.entity';
import * as path from 'path';

config({ path: '.env.local' });

const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: configService.get('DATABASE_URL'),
  entities: [Task],
  migrations: [path.join(__dirname, '/migrations/*.{js,ts}')],
  migrationsTableName: 'migrations',
  ssl: {
    rejectUnauthorized: false,
  },
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;

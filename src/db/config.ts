import { type TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, type DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Task } from 'src/domain/entities/task.entity';

export const getDataSourceOptions = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  url: configService.get('DATABASE_URL'),
  database: 'task-management-app',
  type: 'postgres',
  entities: [Task],
  ssl: {
    rejectUnauthorized: false,
  },
  synchronize: true,
});

export default new DataSource({
  url: process.env.DATABASE_URL,
  database: 'task-management-app',
  type: 'postgres',
  entities: [Task],
  ssl: {
    rejectUnauthorized: false,
  },
  synchronize: true,
} as DataSourceOptions);

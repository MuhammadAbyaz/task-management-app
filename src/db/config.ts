import { type TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Task } from 'src/task/entity/task.entity';
import { User } from 'src/auth/entity/user.entity';

export const getDataSourceOptions = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  url: configService.get('DATABASE_URL'),
  database: 'task-management-app',
  type: 'postgres',
  entities: [Task, User],
  migrations: [__dirname + '/migrations/**/*.{js,ts}'],
  migrationsTableName: 'migrations',
  ssl: {
    rejectUnauthorized: false,
  },
  synchronize: false,
});

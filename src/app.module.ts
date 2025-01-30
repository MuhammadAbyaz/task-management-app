import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TasksModule } from './task/task.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDataSourceOptions } from './db/config';
@Module({
  imports: [
    TasksModule,
    ConfigModule.forRoot({
      envFilePath: '.env.local',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        getDataSourceOptions(configService),
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

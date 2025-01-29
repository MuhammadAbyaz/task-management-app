import { Module } from '@nestjs/common';
import { TaskService } from 'src/domain/services/task.service';
import { TaskController } from 'src/presentation/controllers/task.controller';

@Module({ controllers: [TaskController], providers: [TaskService] })
export class TasksModule {}

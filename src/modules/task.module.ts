import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/domain/entities/task.entity';
import { TaskService } from 'src/domain/services/task.service';
import { TaskController } from 'src/presentation/controllers/task.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TasksModule {}

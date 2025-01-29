import { IsNotEmpty } from 'class-validator';
import { TaskStatus } from 'src/domain/entities/task.entity';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  status: TaskStatus = TaskStatus.IN_PROGRESS;
}

import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TaskStatus } from 'src/task/entity/task.entity';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsEnum(TaskStatus)
  status: TaskStatus = TaskStatus.IN_PROGRESS;
}

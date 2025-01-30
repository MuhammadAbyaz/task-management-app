import { IsEnum, IsNotEmpty } from 'class-validator';
import { TaskStatus } from 'src/task/entity/task.entity';

export class UpdateStatusDto {
  @IsEnum(TaskStatus)
  @IsNotEmpty()
  status: TaskStatus;
}

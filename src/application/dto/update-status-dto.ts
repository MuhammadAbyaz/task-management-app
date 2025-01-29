import { IsEnum } from 'class-validator';
import { TaskStatus } from 'src/domain/entities/task.entity';

export class UpdateStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}

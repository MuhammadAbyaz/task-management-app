import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from 'src/domain/entities/task.entity';

export class GetTaskFilterDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;
}

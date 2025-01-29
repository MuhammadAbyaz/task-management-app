import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from 'src/application/dto/create-task-dto';
import { GetTaskFilterDto } from 'src/application/dto/get-task-filter-dto';
import { TaskService } from 'src/domain/services/task.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('/')
  getAll(@Query() filters: GetTaskFilterDto): object {
    const response = {
      tasks: this.taskService.getAll(filters),
      status: HttpStatus.OK,
    };
    return response;
  }

  @Get('/:id')
  get(@Param('id') id: string): object {
    return { task: this.taskService.get(id), status: HttpStatus.OK };
  }

  @Post('/')
  create(@Body() createTaskDto: CreateTaskDto): object {
    return {
      task: this.taskService.create(createTaskDto),
      status: HttpStatus.CREATED,
    };
  }

  @Delete('/:id')
  delete(@Param('id') id: string): object {
    return {
      task: this.taskService.delete(id),
      status: HttpStatus.OK,
    };
  }

  @Patch('/:id')
  update(@Param('id') id: string): object {
    return {
      task: this.taskService.update(id),
      status: HttpStatus.OK,
    };
  }
}

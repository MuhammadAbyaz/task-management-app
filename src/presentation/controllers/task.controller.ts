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
import { UpdateStatusDto } from 'src/application/dto/update-status-dto';
import { TaskService } from 'src/domain/services/task.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('/')
  async getAll(@Query() filters: GetTaskFilterDto): Promise<object> {
    const response = {
      tasks: await this.taskService.getAll(filters),
      status: HttpStatus.OK,
    };
    return response;
  }

  @Get('/:id')
  async get(@Param('id') id: string): Promise<object> {
    return { task: await this.taskService.get(id), status: HttpStatus.OK };
  }

  @Post('/')
  async create(@Body() createTaskDto: CreateTaskDto): Promise<object> {
    return {
      task: await this.taskService.create(createTaskDto),
      status: HttpStatus.CREATED,
    };
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<object> {
    return {
      task: await this.taskService.delete(id),
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

  @Patch('/:id')
  updateStatus(@Param('id') id: string, @Body() status: UpdateStatusDto) {
    return {
      task: this.taskService.updateStatus(id, status),
      status: HttpStatus.OK,
    };
  }
}

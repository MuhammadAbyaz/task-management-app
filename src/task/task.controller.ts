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
  UseGuards,
} from '@nestjs/common';
import { CreateTaskDto } from 'src/task/dtos/create-task-dto';
import { GetTaskFilterDto } from 'src/task/dtos/get-task-filter-dto';
import { UpdateStatusDto } from 'src/task/dtos/update-status-dto';
import { TaskService } from './task.service';
import { UpdateTaskDto } from './dtos/update-task-dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/entity/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('/')
  async getAll(
    @Query() filters: GetTaskFilterDto,
    @GetUser() user: User,
  ): Promise<object> {
    const response = {
      tasks: await this.taskService.getAll(filters, user),
      status: HttpStatus.OK,
    };
    return response;
  }

  @Get('/:id')
  async get(@Param('id') id: string, @GetUser() user: User): Promise<object> {
    return {
      task: await this.taskService.get(id, user),
      status: HttpStatus.OK,
    };
  }

  @Post('/')
  async create(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<object> {
    return {
      task: await this.taskService.create(createTaskDto, user),
      status: HttpStatus.CREATED,
    };
  }

  @Delete('/:id')
  async delete(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<object> {
    return {
      task: await this.taskService.delete(id, user),
      status: HttpStatus.OK,
    };
  }

  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body() updatedTask: UpdateTaskDto,
  ): Promise<object> {
    const task = await this.taskService.update(id, updatedTask);
    return {
      task,
      status: HttpStatus.OK,
    };
  }

  @Patch('/:id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() status: UpdateStatusDto,
    @GetUser() user: User,
  ) {
    return {
      task: await this.taskService.updateStatus(id, status, user),
      status: HttpStatus.OK,
    };
  }
}

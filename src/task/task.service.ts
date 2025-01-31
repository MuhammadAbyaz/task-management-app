import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from 'src/task/dtos/create-task-dto';
import { GetTaskFilterDto } from 'src/task/dtos/get-task-filter-dto';
import { UpdateStatusDto } from 'src/task/dtos/update-status-dto';
import { Repository } from 'typeorm';
import { Task } from './entity/task.entity';
import { UpdateTaskDto } from './dtos/update-task-dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async getAll(filters: GetTaskFilterDto): Promise<Array<Task>> {
    const { search, status } = filters;
    const query = this.taskRepository.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status: status });
    }

    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        {
          search: `%${search}%`,
        },
      );
    }
    const tasks = await query.getMany();
    return tasks;
  }

  async get(id: string): Promise<Task> {
    const found = await this.taskRepository.findOne({ where: { id: id } });
    if (!found) throw new NotFoundException();
    return found;
  }

  async create(task: CreateTaskDto): Promise<Task> {
    return await this.taskRepository.save(task);
  }

  async delete(id: string): Promise<object> {
    const found = await this.taskRepository.findOne({ where: { id: id } });
    if (!found) throw new NotFoundException();
    const res = await this.taskRepository.delete(id);
    if (res.affected === 0) throw new InternalServerErrorException();
    return found;
  }

  async update(id: string, updatedTask: UpdateTaskDto): Promise<Task> {
    if (!updatedTask || Object.keys(updatedTask).length === 0) {
      throw new BadRequestException();
    }

    const found = await this.taskRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException();
    }

    const updateData: Partial<Task> = {};
    if (updatedTask.title !== undefined) {
      updateData.title = updatedTask.title;
    }
    if (updatedTask.description !== undefined) {
      updateData.description = updatedTask.description;
    }

    const result = await this.taskRepository.update(id, updateData);
    if (!result.affected) {
      throw new InternalServerErrorException();
    }

    return (await this.taskRepository.findOne({ where: { id } })) as Task;
  }

  async updateStatus(id: string, updateStatus: UpdateStatusDto): Promise<Task> {
    const found = await this.taskRepository.findOne({ where: { id: id } });
    if (!found) throw new NotFoundException();
    if (!updateStatus) throw new BadRequestException();
    const res = await this.taskRepository.update(id, {
      status: updateStatus.status,
    });
    if (!res.affected) throw new InternalServerErrorException();
    const updated = await this.taskRepository.findOne({ where: { id: id } });
    return updated as Task;
  }
}

import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from 'src/application/dto/create-task-dto';
import { GetTaskFilterDto } from 'src/application/dto/get-task-filter-dto';
import { UpdateStatusDto } from 'src/application/dto/update-status-dto';
import { Task } from '../entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async getAll(filters: GetTaskFilterDto): Promise<Array<Task>> {
    console.log(filters);
    return await this.taskRepository.find();
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

  update(id: string): object {
    return { id };
  }

  updateStatus(id: string, status: UpdateStatusDto): object {
    return { id, status };
  }
}

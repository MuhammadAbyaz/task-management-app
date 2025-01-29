import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from 'src/application/dto/create-task-dto';
import { GetTaskFilterDto } from 'src/application/dto/get-task-filter-dto';

@Injectable()
export class TaskService {
  getAll(filters: GetTaskFilterDto): Array<object> {
    console.log(filters);
    return [{ id: 1, title: 'Do Something', priority: 'High' }];
  }

  get(id: string): object {
    return { id };
  }

  create(task: CreateTaskDto): object {
    return task;
  }

  delete(id: string): object {
    return { id };
  }

  update(id: string): object {
    return { id };
  }
}

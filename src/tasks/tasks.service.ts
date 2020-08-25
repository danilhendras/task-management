import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import TaskRepository from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import Task from './task.entity';
import { DeleteResult } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async getTasks(
    filterDTO: GetTasksFilterDTO,
  ): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDTO);
  }

  async getTaskByID(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(
        `Task with ID: ${id} not found`,
      );
    }

    return found;
  }

  async createTask(
    createTaskDTO: CreateTaskDTO,
  ): Promise<Task> {
    return this.taskRepository.createTask(createTaskDTO);
  }

  async updateTaskStatus(
    id: number,
    status: TaskStatus,
  ): Promise<Task> {
    const task = await this.getTaskByID(id);
    task.status = status;
    await task.save();
    return task;
  }

  async deleteTask(id: number): Promise<number> {
    const result = await this.taskRepository.delete({
      id,
    });

    if (result.affected === 0) {
      throw new NotFoundException(
        `Task with ID: ${id} not found`,
      );
    }

    return 200;
  }
}

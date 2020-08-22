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

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  // getTasksFiltered(filterDTO: GetTasksFilterDTO): Task[] {
  //   const { status, search } = filterDTO;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter(task => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter(
  //       task =>
  //         task.title.includes(search) || task.description.includes(search),
  //     );
  //   }
  //   return tasks;
  // }

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

  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   const theTask = this.getTaskByID(id);
  //   theTask.status = status;
  //   return theTask;
  // }
  // deleteTask(id: string): Task {
  //   const theTask = this.getTaskByID(id);
  //   const taskIndex = this.tasks.findIndex(task => task.id === id);
  //   this.tasks.splice(taskIndex, 1);
  //   return theTask;
  // }
}

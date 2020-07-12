import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v1 as uuid } from "uuid";
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilter } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(queryFilter: GetTasksFilter): Task[] {
    const { status, search } = queryFilter;
    let tasks = this.getAllTasks();

    if(status)
      tasks = tasks.filter(item => item.status === status);
    
    if(search) {
      tasks = tasks.filter(item => 
        item.title.includes(search) ||
        item.description.includes(search)
      );
    }

    return tasks;
  }

  getTaskById(id: string): Task {
    const found = this.tasks.find(task => task.id === id);

    if(!found) throw new NotFoundException(`Cannot find task with ID: ${id}`);

    return found;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  updateTaskStatusById(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }

  deleteTaskById(id: string): Task {
    const itemIndex = this.tasks.findIndex(item => item.id === id);

    return this.tasks.splice(itemIndex, 1)[0];
  }
}

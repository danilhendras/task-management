import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskByID(id: string): Task {
    const theTask = this.tasks.find(task => task.id === id);
    return theTask;
  }

  createTask(createTaskDTO: CreateTaskDTO): Task {
    const { title, description } = createTaskDTO;

    const newTask: Task = {
      id: uuidv4(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(newTask);
    return newTask;
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const theTask = this.getTaskByID(id);
    theTask.status = status;

    return theTask;
  }

  deleteTask(id: string): Task {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    const theTask = this.tasks[taskIndex];
    this.tasks.splice(taskIndex, 1);

    return theTask;
  }
}

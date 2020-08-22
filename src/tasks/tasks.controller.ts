import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import Task from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // @Get()
  // getTasks(@Query(ValidationPipe) filterDTO: GetTasksFilterDTO): Task[] {
  //   if (Object.keys(filterDTO).length) {
  //     return this.tasksService.getTasksFiltered(filterDTO);
  //   }

  //   return this.tasksService.getAllTasks();
  // }

  @Get('/:id')
  getTaskByID(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Task> {
    return this.tasksService.getTaskByID(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(
    @Body() createTaskDTO: CreateTaskDTO,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDTO);
  }

  // @Patch('/:id/status')
  // updateTaskStatus(
  //   @Param('id') id: string,
  //   @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  // ): Task {
  //   return this.tasksService.updateTaskStatus(id, status);
  // }

  @Delete('/:id')
  deleteTask(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<number> {
    return this.tasksService.deleteTask(id);
  }
}

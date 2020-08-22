import { Repository, EntityRepository } from 'typeorm';
import Task from './task.entity';
import { CreateTaskDTO } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';

@EntityRepository(Task)
class TaskRepository extends Repository<Task> {
  async createTask(
    createTaskDTO: CreateTaskDTO,
  ): Promise<Task> {
    const { title, description } = createTaskDTO;
    const newTask = new Task();

    newTask.title = title;
    newTask.description = description;
    newTask.status = TaskStatus.OPEN;
    await newTask.save();

    return newTask;
  }
}

export default TaskRepository;

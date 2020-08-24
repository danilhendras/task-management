import { Repository, EntityRepository } from 'typeorm';
import Task from './task.entity';
import { CreateTaskDTO } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';

@EntityRepository(Task)
class TaskRepository extends Repository<Task> {
  async getTasks(
    filterDTO: GetTasksFilterDTO,
  ): Promise<Task[]> {
    const { status, search } = filterDTO;
    const query = this.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(task.title LIKE :search OR task.description LIKE :search)',
        { search: `%${search}%` },
      );
    }

    const tasks = query.getMany();
    return tasks;
  }

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

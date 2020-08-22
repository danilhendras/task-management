import { Repository, EntityRepository } from 'typeorm';
import Task from './task.entity';

@EntityRepository(Task)
class TaskRepository extends Repository<Task> {}

export default TaskRepository;

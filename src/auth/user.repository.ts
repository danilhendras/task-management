import { Repository, EntityRepository } from 'typeorm';
import User from './user.entity';

@EntityRepository(User)
class UserRepository extends Repository<User> {}

export default UserRepository;

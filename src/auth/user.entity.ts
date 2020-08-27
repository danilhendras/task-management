import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import Task from 'src/tasks/task.entity';

@Entity()
@Unique(['username'])
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @OneToMany(
    type => Task,
    task => task.user,
    { eager: true },
  )
  tasks: Task[];

  async validateUserPassword(
    password: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}

export default User;

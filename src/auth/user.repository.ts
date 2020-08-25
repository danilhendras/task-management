import { Repository, EntityRepository } from 'typeorm';
import User from './user.entity';
import AuthCredentialsDTO from './dto/auth-credentials.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
class UserRepository extends Repository<User> {
  async signUp(
    authCredentialsDTO: AuthCredentialsDTO,
  ): Promise<void> {
    const { username, password } = authCredentialsDTO;

    const salt = await bcrypt.genSalt();

    const hashedPassword = await this.hashPassword(
      password,
      salt,
    );

    const user = new User();
    user.username = username;
    user.password = hashedPassword;
    user.salt = salt;

    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  private async hashPassword(
    password: string,
    salt: string,
  ): Promise<string> {
    return await bcrypt.hash(password, salt);
  }
}

export default UserRepository;

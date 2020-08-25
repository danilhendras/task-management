import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import UserRepository from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import AuthCredentialsDTO from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async signUp(
    authCredentialsDTO: AuthCredentialsDTO,
  ): Promise<void> {
    return this.userRepository.signUp(authCredentialsDTO);
  }

  async login(
    authCredentialsDTO: AuthCredentialsDTO,
  ): Promise<void> {
    const found = await this.userRepository.validateUserPassword(
      authCredentialsDTO,
    );

    if (!found) {
      throw new UnauthorizedException(
        'Invalid credentials',
      );
    }
  }
}

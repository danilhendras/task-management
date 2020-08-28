import {
  Injectable,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import UserRepository from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import AuthCredentialsDTO from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import JwtPayload from './jwt-payload.interface';

@Injectable()
export class AuthService {
  private logger = new Logger();

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(
    authCredentialsDTO: AuthCredentialsDTO,
  ): Promise<void> {
    return this.userRepository.signUp(authCredentialsDTO);
  }

  async login(
    authCredentialsDTO: AuthCredentialsDTO,
  ): Promise<{ accessToken: string }> {
    const username = await this.userRepository.validateUserPassword(
      authCredentialsDTO,
    );

    if (!username) {
      throw new UnauthorizedException(
        'Invalid credentials',
      );
    }

    const payload: JwtPayload = { username };
    const accessToken = await this.jwtService.signAsync(
      payload,
    );
    this.logger.debug(
      `Generated JWT Token with payload: ${JSON.stringify(
        payload,
      )}`,
    );

    return { accessToken };
  }
}

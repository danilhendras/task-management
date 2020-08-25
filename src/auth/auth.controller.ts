import {
  Controller,
  Post,
  Body,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import AuthCredentialsDTO from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(
    @Body(ValidationPipe)
    authCredentialsDTO: AuthCredentialsDTO,
  ): Promise<void> {
    this.authService.signUp(authCredentialsDTO);
  }
}

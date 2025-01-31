import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials-dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/register')
  async register(@Body() authCredentialDto: AuthCredentialsDto): Promise<void> {
    return await this.authService.register(authCredentialDto);
  }

  @Post('/login')
  async login(
    @Body() authCredentials: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return await this.authService.login(authCredentials);
  }
}

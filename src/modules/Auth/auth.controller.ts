import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@ApiTags('login')
@Controller('auth')
export class AuthController {

  constructor(
    private authServise: AuthService
  ) { }

  @Post('/register')
  async register(@Body() body: LoginDto) {
    return this.authServise.signOn(body.email, body.password)
  }

  @Post('/login')
  async login(@Body() body: LoginDto) {
    return this.authServise.signIn(body.email, body.password)
  }

}

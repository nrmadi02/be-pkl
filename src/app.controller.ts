import { AuthService } from './auth/auth.service';
import { Body, Controller, Get, Post, Request, UseGuards, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { LoginUserDto } from './dto/Auth/LoginDto';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
@ApiTags('auth')
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(
    @Request() req,
    @Body() loginUserDto: LoginUserDto
  ) {
    const access_token = await this.authService.login(req.user)
    return {
      code: HttpStatus.OK,
      message: "Login berhasil",
      data: req.user,
      access_token: access_token
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }

}

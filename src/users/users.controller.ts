import { Controller, Get, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(){
    const allUsers = await this.usersService.findAll()
    return {
      code: 200,
      message: "berhasil ambil data users",
      data: allUsers
    }
  }
}

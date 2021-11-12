import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
  ClassSerializerInterceptor,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService,
              private authService:AuthService ) {}
  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    this.authService.signup(body.email, body.password);
  }
  @Post('/signin')
  signin(@Body() body: CreateUserDto) {
    this.authService.signin(body.email, body.password);
  }
  @Get()
  findAll(@Query('email') email:string) {
    return this.userService.find(email);
  }
  //@Serialize(UserDto)
  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(parseInt(id));
  }
  @Patch('/:id')
  update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(parseInt(id), body);
  }
  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(parseInt(id));
  }
}

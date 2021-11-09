import {Body, Controller,Delete,Get,Param,Patch,Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto'


@Controller('auth')
export class UsersController {
    constructor(private userService:UsersService){}
    @Post('/signup')
    createUser(@Body() body:CreateUserDto){
        this.userService.create(body.email,body.password);
    }
    @Get()
    findAll(){
       return this.userService.find();
    }
}

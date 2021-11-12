import { Injectable,BadRequestException, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes,scrypt as _scrypt } from "crypto";
import { promisify } from "util";
import { buffer } from "stream/consumers";

const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService{

    constructor(private userService:UsersService){}

    async signup(email:string,password:string){
        //see if email is in use
        const users = await this.userService.find(email);

        if(users.length)
        {
            throw new BadRequestException('Email is in use');
        }
        
        //Hash the user password
        //Genarate a salt
        const salt = randomBytes(8).toString('hex');
        //has the salt and hash the password togather
        const hash =( await scrypt(password,salt,32)) as Buffer;
        // join the hash result and the salt togather
         const result = salt+'.'+hash.toString('hex');
        //Create new user
        const user = await this.userService.create(email,result);
        //return the user
        return user;
    }
    async signin(email:string,password:string){
        const [user] = await this.userService.find(email);
        if(!user){
            throw new NotFoundException('user not found');
        }
        const [salt,storedHash] = user.password.split('.');
        const hash = await scrypt(password,salt,32) as Buffer;
        if(storedHash!==hash.toString('hex')){
            throw new BadRequestException('Bad password');
        }
    }

}
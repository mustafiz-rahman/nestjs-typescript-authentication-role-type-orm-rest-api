import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';



@Injectable()
export class UsersService {
    
    constructor(@InjectRepository(User) private repo:Repository<User>){ }

    create(email:string,password:string){
        const user = this.repo.create({email,password});
        return this.repo.save(user);
    }
    find(){
        
        return this.repo.find();
    }
    findOne(id:number){
        return this.repo.findOne(id);
    }
    async update(id:number,atters:Partial<User>){
        const user = await this.findOne(id);
        if(!user){
            throw new Error('User not found'); 
        }
        Object.assign(user,atters);
        return this.repo.save(user);
    }
}

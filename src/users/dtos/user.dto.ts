import { Expose } from "class-transformer";

export class UserDto{
    @Expose()
    id:number;
    
    email:string;
}
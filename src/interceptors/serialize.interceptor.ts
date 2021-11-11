import { UseInterceptors,NestInterceptor,ExecutionContext,CallHandler, ClassSerializerInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { plainToClass } from "class-transformer";
import { UserDto } from "src/users/dtos/user.dto";
import { User } from "src/users/user.entity";

interface ClassConstructor{
    new (...args:any[]):{}
}

export function Serialize(dto:any){
    return UseInterceptors(new SerializerInterceptor(dto));
}
export class SerializerInterceptor implements NestInterceptor{
    constructor(private dto:any){}

    intercept(context: ExecutionContext,handler:CallHandler):Observable<any>{
       

        return handler.handle().pipe(
            map((data:any)=>{
               return plainToClass(this.dto,User,{
                   excludeExtraneousValues:true
               });
            }),
        )
    }

}
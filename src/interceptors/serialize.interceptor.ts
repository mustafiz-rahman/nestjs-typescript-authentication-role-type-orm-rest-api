import { UseInterceptors,NestInterceptor,ExecutionContext,CallHandler, ClassSerializerInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { plainToClass } from "class-transformer";


export class SerializerInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext,handler:CallHandler):Observable<any>{
        console.log('I am runnging before the handler',context);

        return handler.handle().pipe(
            map((data:any)=>{
                console.log("i am runnig before response",data)
            }),
        )
    }

}
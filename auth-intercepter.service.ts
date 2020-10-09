import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { take, exhaustMap } from 'rxjs/operators';
import { AuthenticateService } from './authenticate.service';

@Injectable()
export class AuthInterCeptorService implements HttpInterceptor{

    constructor(private aun:AuthenticateService){}

    intercept(req:HttpRequest<any>,next:HttpHandler){

    return this.aun.user.pipe(take(1),exhaustMap(user=>{
      if(!user){
        //const myrequest=req.clone({setHeaders:{auh:'vinod'}})
        return next.handle(req)
      }
        const modifiedReq=req.clone({params:new HttpParams().set('auth',user.token)})
        return next.handle(modifiedReq);
      }))
    }
}

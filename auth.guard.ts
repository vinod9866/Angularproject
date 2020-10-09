import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthenticateService } from './authenticate.service';


@Injectable({providedIn:'root'})
export class AuthGuard implements CanActivate{

  constructor(private aun:AuthenticateService,private router:Router){};

  canActivate(route:ActivatedRouteSnapshot,router:RouterStateSnapshot):
  boolean| UrlTree|Promise<boolean>| UrlTree |Observable<boolean| UrlTree>{
    return this.aun.user.pipe(take(1), map(user=>{
      const isAuth= !!user;
      if(isAuth){
        return true;
      }
      return this.router.createUrlTree(['/auth'])
    }))
  }
}

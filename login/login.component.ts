import { Component, ChangeDetectorRef, Inject } from '@angular/core';
import { NbLoginComponent, NbAuthService, NB_AUTH_OPTIONS } from '@nebular/auth';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'console';

import { AuthenticateService } from '../authenticate.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
})
export class NgxLoginComponent extends NbLoginComponent {

  usererror=null;
  isLoading=false;

  constructor(private aun:AuthenticateService,service: NbAuthService,@Inject(NB_AUTH_OPTIONS) protected options, cd: ChangeDetectorRef, routes: Router){
    super(service, options, cd, routes);}

  login(){};
  mylogin(form:NgForm){
    if(!form.valid){
        return;
    }
    this.isLoading=!this.isLoading;
    const username =form.value.email;
    const password =form.value.password;
    const check = form.value.rememberMe;
    //console.log(form.value);

    this.usererror=null;
    this.aun.authLogin(username,password,check).subscribe(res=>{
      this.isLoading=!this.isLoading
      this.router.navigate(['/pages/dashboard'])
      console.log(res)
    },errormsg=>{
      this.isLoading=!this.isLoading;
      console.log(errormsg);
      this.usererror=errormsg;
    })

    form.reset();
  }
}

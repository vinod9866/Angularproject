import { Component, Inject, ChangeDetectorRef, OnInit, Input } from '@angular/core';
import { NbRegisterComponent, NbAuthService, NB_AUTH_OPTIONS } from '@nebular/auth';
import { Router } from '@angular/router';

import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { AuthenticateService } from '../authenticate.service';
import { from } from 'rxjs';

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
})
export class NgxRegisterComponent extends NbRegisterComponent implements OnInit{

  signUpform:FormGroup;
  constructor(private aun:AuthenticateService,service: NbAuthService,@Inject(NB_AUTH_OPTIONS) protected options, cd: ChangeDetectorRef, router: Router){
     super(service,options,cd,router)}

  ngOnInit() {
  }

  register(){};
  usererror=null;
  successmsg=null;
  isLoading=false;

  myregister(form:NgForm){
    console.log('form registered successfully') // console msg

      if(!form.valid){
          return;
      }

      const username =form.value.fullName;
      const email = form.value.email
      const password =form.value.password;

      console.log(form.value);
      this.isLoading=!this.isLoading;
      this.usererror=null;
      this.successmsg=null;

      this.aun.authRegister(username,email,password).subscribe(res=>{
        this.isLoading=!this.isLoading;
        this.successmsg="Account activation link has been sent to you email !";
        this.user='';
      },errormsg=>{
        this.usererror=errormsg;
        this.isLoading=!this.isLoading;
      })

    }



  }


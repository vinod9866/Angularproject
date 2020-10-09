import {  NbResetPasswordComponent } from '@nebular/auth';
import { Component, Inject, ChangeDetectorRef, OnInit } from '@angular/core';
import {  NB_AUTH_OPTIONS, NbAuthService } from '@nebular/auth';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthenticateService } from '../authenticate.service';


@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
})
export class NgxResetPasswordComponent extends NbResetPasswordComponent implements OnInit{

  constructor(private authService:AuthenticateService,private route:ActivatedRoute,service: NbAuthService,@Inject(NB_AUTH_OPTIONS) protected options, cd: ChangeDetectorRef, router: Router){
    super(service,options,cd,router)
  }
  usererror=null;
  token:any=null;
  showForm=false;
  showLogin=false;
  successmsg=null;
  isLoading=false;

  ngOnInit(){
    this.route.params.subscribe(params=>{
      console.log(params);
      this.token=params.token; // need to validate the token length
      if(this.token!=null){
        this.showForm=!this.showForm;
      }
    })
}

  resetPassword(form:NgForm){

    this.isLoading=!this.isLoading;
    console.log('form reset successfully');
    if(!form.valid){
        return;
    }
    const password=form.value.password;
    this.usererror=null;
    this.authService.authResetPassword(password,this.token).subscribe(
      res=>{
        console.log(res);
        this.showForm=!this.showForm; // form display
        this.showLogin=!this.showLogin; // to show login link
        this.isLoading=!this.isLoading; // to stop spinner

        this.successmsg="password has been changed successfully!";
        form.reset();

      },errormsg=>{
        this.isLoading=!this.isLoading; // to stop spinner
        console.log(errormsg);
        this.usererror=errormsg;
        form.reset();
      }
    );


  }
}

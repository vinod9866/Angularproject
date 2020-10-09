import { Component, Inject, ChangeDetectorRef } from '@angular/core';
import { NbRegisterComponent, NbRequestPasswordComponent, NB_AUTH_OPTIONS, NbAuthService } from '@nebular/auth';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthenticateService } from '../authenticate.service';
import { NbActiveDescendantKeyManagerFactoryService } from '@nebular/theme/components/cdk/a11y/descendant-key-manager';

@Component({
  selector: 'ngx-request-password',
  templateUrl: './request-password.component.html',
})
export class NgxRequestPasswordComponent extends NbRequestPasswordComponent {
  constructor(private authService:AuthenticateService,service: NbAuthService,@Inject(NB_AUTH_OPTIONS) protected options, cd: ChangeDetectorRef, router: Router){
    super(service,options,cd,router)
  }
  usererror=null;
  successmsg=null;
  isLoading=false;
  requestPassword(form:NgForm){
        this.isLoading=!this.isLoading
        if(!form.valid){
          return;
        }
        console.log(form.value);
        this.usererror=null;
        this.successmsg=null;

        const email=form.value.email;
        this.authService.authReqPassword(email).subscribe(res=>{
          this.isLoading=!this.isLoading;
          console.log(res);         // without res the error msg cant be showed
          this.successmsg="email has been sent with password reset link :)";
          form.reset();
        },
            errormsg=>{
            this.isLoading=!this.isLoading;
            console.log(errormsg);
            this.usererror=errormsg;
          }
        );






  }

}

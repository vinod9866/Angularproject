import {Component, OnInit} from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { error } from 'console';
import { AuthenticateService } from '../authenticate.service';

@Component({
  selector:'check-user',
  templateUrl:'./register.check.html'
})
export class RegistrationCheck implements OnInit{

  token:any=null
  errmsg:null;
  constructor(private aun:AuthenticateService,private route:ActivatedRoute,private router:Router){}

  ngOnInit(){
      this.route.params.subscribe(params=>{
        console.log(params);
        this.token=params.token;
        if(this.token!=null){
          this.check();
        }
      })
  }

  check(){
    console.log('checking token!');
    if(this.token!=null){
      this.aun.activateUser(this.token).subscribe(res=>{
          this.router.navigate(['/pages']);
          console.log(res);
      },errormsg=>{
          this.errmsg=errormsg;
          console.log(errormsg);
      })

  }
  }

}

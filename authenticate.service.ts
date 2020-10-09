import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.datamodel';
import { Router } from '@angular/router';

export interface UserResponseData{
  username:string,
  email:string,
  token:string,
  expires:string
}

@Injectable({providedIn:'root'})

export class AuthenticateService{

    user = new BehaviorSubject<User>(null);

    private tokenExpirationTimer:any;


    constructor(private http:HttpClient,private router:Router){}

    authLogin(user:string,password:string,remember:boolean){
      return this.http.post<UserResponseData>("http://128.199.23.251:8000/user/auth/login/",// Api url for login aunthentication
        {
          username:user,
          password:password,
        }).pipe(catchError(this.handleError),// sending error to get which error msg it is
          tap(resData=>{
            this.handleAunthentication(
              resData.username,
              resData.email,
              resData.token,
              +resData.expires)
          }))
    }

    authRegister(username:string,email:string,password:string){
      return this.http.post<UserResponseData>("http://128.199.23.251:8000/user/auth/reg/", // Api url for registering aunthentication
       {
            username:username,
            email:email,
            password:password
       }).pipe(catchError(this.handleError),// handling error with handleError method
       tap(resData=>{
         console.log(resData);
        // this.handleAunthentication(
        //   resData.email,
        //   resData.token,
        //   +resData.expires)
      }));
    }

    activateUser(tokenId:any){
      return this.http.post<UserResponseData>("http://128.199.23.251:8000/user/auth/url/",{token:tokenId})
      .pipe(catchError(this.handleError),
      tap(res=>{
        this.handleAunthentication(
          res.username,
          res.email,
          res.token,
          +res.expires);
      })
      )
    }//need to use pipe for login directly

    authReqPassword(email:string){ // request password sending email
        return this.http.post("http://128.199.23.251:8000/user/auth/reset/",{email:email}).
        pipe(catchError(this.handleError));
    }

    authResetPassword(password:string,token:any){   // reset password
      return this.http.post("http://128.199.23.251:8000/user/auth/set/",
      {password:password,token:token
      }).
      pipe(catchError(this.handleError));
    }


    // getting user Authentication data && adding expirein time
    //private below
     handleAunthentication(username:string,email:string,token:string,expires:number){
      const expirationDate= new Date(new Date().getTime()+ expires * 1000);
      const user = new User(
        username,
        email,
        token,
        expirationDate);
        this.user.next(user);
        this.autoLogout(expires*1000);
        localStorage.setItem('userData',JSON.stringify(user))
    }

    // error msg handling
    private handleError(errorRes:HttpErrorResponse){
      console.log(errorRes.error.errormsg);
      let errormsg='An unknown error occured :( Try again later';
      if(!errorRes.error)     // !errorRes.error.error
        return throwError(errormsg);
      switch (errorRes.error.errormsg){
        case 'EMAIL_EXISTS':
          errormsg='email already exists!'
          break;
        case 'EMAIL_NOT_FOUND':
          errormsg='email does not exist!'
          break;
        case 'INVALID_PSWD':
          errormsg='Inavalid Password!'
          break;
        case 'USER_EXISTS':
          errormsg="Username has already taken!"
          break;
        case 'USER_NOT_FOUND':
          errormsg='Invalid Username!'
          break;
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
          errormsg='TOO_MANY_ATTEMPTS_TRY_LATER'
          break;
        case 'EXPIRED_TOKEN':
          errormsg='Token Expired! '
          break;
        case 'INVALID_TOKEN':
          errormsg="Invalid Token!"
          break;
        case 'SPACE_NOT_ALLOWED':
          errormsg="Password should not contain spaces!"
          break;
        case 'SPECIAL_CHARS_NOT_ALLOWED':
          errormsg="Username should contain alphabets & numbers only!"
          break;
        case 'DECODE_ERROR':
        errormsg="Invalid Token!"
          break;
        case 'ACCOUNT_NOT_ACTIVATED':
          errormsg="Account not activated!"
          break;
        case 'PASSWORD_ALREADY_RESET':
          errormsg="token already used!"
          break;


      }
      return throwError(errormsg);
    }

    // logout the user * note :have to add in header component
    logout(){
      this.user.next(null);
      this.router.navigate(['/auth']);

       //localStorage.clear(); to remove all data in broswer local storage
    localStorage.removeItem('userData'); // for auto logout
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer=null;
    }

    autoLogout(expirationDuration: number){
      console.log(expirationDuration);
     this.tokenExpirationTimer= setTimeout(()=>{
        this.logout();
      },expirationDuration);

    }

    autoLogin(){   // insert this method into app.component.ts
      const userData:{
        username:string,
        email:string,
        _token:string,
        _tokenExpirationDate:string; }= JSON.parse(localStorage.getItem('userData')) ;

        if(!userData){
        return;
      }
      const loadedUser = new User(
        userData.username,
        userData.email,
        userData._token,
        new Date( userData._tokenExpirationDate)
        );

      if(loadedUser.token){
        this.user.next(loadedUser);
        const expirationDuration= new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();

        this.autoLogout(expirationDuration);
      }

  }
}

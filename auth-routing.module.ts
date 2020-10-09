import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxLoginComponent } from './login/login.component';
import { NgxRegisterComponent } from './register/register.component';
import { NgxRequestPasswordComponent } from './request-password/request-password.component';
import { NgxResetPasswordComponent } from './reset-password/reset-password.component';
import { RegistrationCheck } from './registrationactivate/register.check';
import { LayoutComponent } from './authLayout/Layout.component';

export const routes: Routes = [
  // .. here goes our components routes
  {
    path: '',
    component:LayoutComponent,//NbAuthComponent,
    children:[
      {
        path:'login',
        component:NgxLoginComponent
      },
      {
        path:'register',
        component:NgxRegisterComponent
      },
      {
        path:'request-password',
        component:NgxRequestPasswordComponent
      },
      {
        path:'reset-password/:token',
        component:NgxResetPasswordComponent,
      },
      {
        path:'activate-user/:token',
        component:RegistrationCheck
      },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NgxAuthRoutingModule {
}

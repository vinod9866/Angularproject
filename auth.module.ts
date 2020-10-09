import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgxAuthRoutingModule } from './auth-routing.module';
import { NbAuthModule } from '@nebular/auth';

import {NgxLoginComponent} from './login/login.component'
import {NgxRegisterComponent} from './register/register.component'
import { NgxRequestPasswordComponent } from './request-password/request-password.component';
import { NgxResetPasswordComponent } from './reset-password/reset-password.component';

import { RegistrationCheck } from './registrationactivate/register.check';
import { NbThemeModule, NbIconModule } from '@nebular/theme';
import { NbSidebarModule, NbLayoutModule, NbSidebarService } from '@nebular/theme';

import {ThemeModule} from '../@theme/theme.module'
import {
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule,
  NbCardModule,
} from '@nebular/theme';
import { from } from 'rxjs';
import { LoadingSpinner } from './spinner/loading.component';
import { LayoutComponent} from './authLayout/Layout.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NgxAuthRoutingModule,

    NbAuthModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbSidebarModule, NbLayoutModule,
    NbCardModule,ThemeModule,NbIconModule
  ],
  declarations: [
    NgxLoginComponent,NgxRegisterComponent,NgxRequestPasswordComponent,NgxResetPasswordComponent,

    // ... here goes our new components
    RegistrationCheck,LoadingSpinner,LayoutComponent
  ],
  providers:[ NbSidebarService]
})
export class NgxAuthModule {
}

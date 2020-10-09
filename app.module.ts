/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Ng2SmartTableModule} from 'ng2-smart-table';
import { FormsModule,ReactiveFormsModule} from '@angular/forms'

// import { NbLoginComponent } from '@nebular/auth/components/login/login.component'


//vinod

import {NbPasswordAuthStrategy,NbAuthModule} from '@nebular/auth'
// import {Vinod} from '@nebular/auth'
//vinod

import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import { AuthInterCeptorService } from './auth/auth-intercepter.service';
import { from } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ThemeModule.forRoot(),
    Ng2SmartTableModule,
    FormsModule,
    ReactiveFormsModule,

    ThemeModule,
    //vinod

    //vinod

    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
  ],
  providers:[{provide:HTTP_INTERCEPTORS,useClass:AuthInterCeptorService,multi:true}],
  bootstrap: [AppComponent],
})
export class AppModule {
}

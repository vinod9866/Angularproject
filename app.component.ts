/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { AuthenticateService } from './auth/authenticate.service';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private analytics: AnalyticsService,private aun:AuthenticateService) {
  }

  ngOnInit() {
    this.analytics.trackPageViews();

    //auto login
    this.aun.autoLogin();
  }
}

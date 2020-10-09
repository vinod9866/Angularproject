import { Component } from '@angular/core';
import { NbAuthComponent } from '@nebular/auth';

@Component({
    selector: 'auth',
    styleUrls: ['./Layout.component.scss'],
    template: `
    <nb-layout>
      <nb-layout-column>
        <nb-card>
          <nb-card-body>
            <nb-auth-block>
              <router-outlet></router-outlet>
            </nb-auth-block>
          </nb-card-body>
        </nb-card>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class LayoutComponent extends NbAuthComponent {
}

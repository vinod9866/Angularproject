import { ExtraOptions, RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: 'pages',
    canActivate:[AuthGuard],
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
  },
  {
    path: 'auth',
    loadChildren:() => import ('./auth/auth.module').then(m=> m.NgxAuthModule),

  },

  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth/login' },
];

// const config: ExtraOptions = {
//   useHash: false,
// };

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule],
})
export class AppRoutingModule {
}

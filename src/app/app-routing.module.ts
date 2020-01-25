import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckTutorial } from './providers/check-tutorial.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tutorial',
    pathMatch: 'full'
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule)
  },
  {
    path: 'support',
    loadChildren: () => import('./pages/support/support.module').then(m => m.SupportModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignUpModule)
  },
  {
    path: 'app',
    loadChildren: () => import('./pages/tabs-page/tabs-page.module').then(m => m.TabsModule)
  },
  {
    path: 'tutorial',
    loadChildren: () => import('./pages/tutorial/tutorial.module').then(m => m.TutorialModule),
    canLoad: [CheckTutorial]
  },  {
    path: 'schools',
    loadChildren: () => import('./pages/schools/schools.module').then( m => m.SchoolsPageModule)
  },
  {
    path: 'school',
    loadChildren: () => import('./pages/school/school.module').then( m => m.SchoolPageModule)
  },
  {
    path: 'user-profile',
    loadChildren: () => import('./pages/user-profile/user-profile.module').then( m => m.UserProfilePageModule)
  },
  {
    path: 'platform',
    loadChildren: () => import('./demos/platform/platform.module').then( m => m.PlatformPageModule)
  },
  {
    path: 'cards',
    loadChildren: () => import('./demos/cards/cards.module').then( m => m.CardsPageModule)
  },
  {
    path: 'grid',
    loadChildren: () => import('./demos/grid/grid.module').then( m => m.GridPageModule)
  },
  {
    path: 'css-utilities',
    loadChildren: () => import('./demos/css-utilities/css-utilities.module').then( m => m.CssUtilitiesPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

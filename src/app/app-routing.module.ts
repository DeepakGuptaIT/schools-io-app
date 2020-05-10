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
  },
  {
    path: 'school',
    loadChildren: () => import('./pages/school/school.module').then(m => m.SchoolPageModule)
  },
  {
    path: 'platform',
    loadChildren: () => import('./demos/platform/platform.module').then(m => m.PlatformPageModule)
  },
  {
    path: 'cards',
    loadChildren: () => import('./demos/cards/cards.module').then(m => m.CardsPageModule)
  },
  {
    path: 'grid',
    loadChildren: () => import('./demos/grid/grid.module').then(m => m.GridPageModule)
  },
  {
    path: 'css-utilities',
    loadChildren: () => import('./demos/css-utilities/css-utilities.module').then(m => m.CssUtilitiesPageModule)
  },
  {
    path: 'animation',
    loadChildren: () => import('./demos/animation/animation.module').then(m => m.AnimationPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'subject',
    loadChildren: () => import('./pages/subject/subject.module').then(m => m.SubjectPageModule)
  },
  {
    path: 'code',
    loadChildren: () => import('./demos/code/code.module').then(m => m.CodePageModule)
  },
  {
    path: 'material-comps',
    loadChildren: () => import('./demos/material-comps/material-comps.module').then(m => m.MaterialCompsPageModule)
  },
  {
    path: 'forms',
    loadChildren: () => import('./demos/forms/forms.module').then(m => m.FormsPageModule)
  },
  {
    path: 'ionic-animation',
    loadChildren: () => import('./demos/ionic-animation/ionic-animation.module').then(m => m.IonicAnimationPageModule)
  },
  {
    path: 'ngrx-store-demo',
    loadChildren: () => import('./demos/ngrx-store-demo/ngrx-store-demo.module').then(m => m.NgrxStoreDemoPageModule)
  },
  {
    path: 'image-hover',
    loadChildren: () => import('./demos/image-hover/image-hover.module').then(m => m.ImageHoverPageModule)
  },
  {
    path: 'topics',
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/topic-list/topic-list.module').then(m => m.TopicListPageModule)
      },
      {
        path: 'topic-detail/:topicId',
        loadChildren: () => import('./pages/topic-detail/topic-detail.module').then(m => m.TopicDetailPageModule)
      }
    ]
  },
  {
    path: '**',
    loadChildren: () => import('./pages/shared/not-found/not-found.module').then(m => m.NotFoundPageModule)
  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

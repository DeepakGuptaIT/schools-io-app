import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IonicAnimationPage } from './ionic-animation.page';

const routes: Routes = [
  {
    path: '',
    component: IonicAnimationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IonicAnimationPageRoutingModule {}

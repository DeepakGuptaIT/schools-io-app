import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoadashPage } from './loadash.page';

const routes: Routes = [
  {
    path: '',
    component: LoadashPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoadashPageRoutingModule {}

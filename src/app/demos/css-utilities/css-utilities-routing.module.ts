import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CssUtilitiesPage } from './css-utilities.page';

const routes: Routes = [
  {
    path: '',
    component: CssUtilitiesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CssUtilitiesPageRoutingModule {}

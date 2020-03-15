import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaterialCompsPage } from './material-comps.page';

const routes: Routes = [
  {
    path: '',
    component: MaterialCompsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaterialCompsPageRoutingModule {}

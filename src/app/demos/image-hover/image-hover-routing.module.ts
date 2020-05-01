import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImageHoverPage } from './image-hover.page';

const routes: Routes = [
  {
    path: '',
    component: ImageHoverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImageHoverPageRoutingModule {}

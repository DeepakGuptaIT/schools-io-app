import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImageHoverPageRoutingModule } from './image-hover-routing.module';

import { ImageHoverPage } from './image-hover.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImageHoverPageRoutingModule
  ],
  declarations: [ImageHoverPage]
})
export class ImageHoverPageModule {}

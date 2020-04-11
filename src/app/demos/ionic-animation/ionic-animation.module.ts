import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IonicAnimationPageRoutingModule } from './ionic-animation-routing.module';

import { IonicAnimationPage, ModalPage } from './ionic-animation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicAnimationPageRoutingModule
  ],
  declarations: [IonicAnimationPage, ModalPage],
  entryComponents: [
    ModalPage
  ]
})
export class IonicAnimationPageModule { }

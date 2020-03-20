import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnimationPageRoutingModule } from './animation-routing.module';

import { AnimationPage } from './animation.page';
import { AnimateModule } from './../../components/animate/animate.module'
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnimateModule,
    ScrollingModule,
    AnimationPageRoutingModule
  ],
  declarations: [AnimationPage]
})
export class AnimationPageModule { }

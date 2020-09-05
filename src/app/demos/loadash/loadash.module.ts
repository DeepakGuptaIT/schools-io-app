import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoadashPageRoutingModule } from './loadash-routing.module';

import { LoadashPage } from './loadash.page';
import { MomentModule } from 'ngx-moment';
import { TopicComponentsModule } from '../../components/topic-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadashPageRoutingModule,
    MomentModule,
    TopicComponentsModule
  ],
  declarations: [LoadashPage]
})
export class LoadashPageModule { }

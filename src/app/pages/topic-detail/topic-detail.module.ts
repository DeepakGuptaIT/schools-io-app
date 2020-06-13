import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TopicDetailPageRoutingModule } from './topic-detail-routing.module';

import { TopicDetailPage } from './topic-detail.page';
import { TopicComponentsModule } from '../../components/topic-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopicDetailPageRoutingModule,
    TopicComponentsModule
  ],
  declarations: [TopicDetailPage]
})
export class TopicDetailPageModule { }

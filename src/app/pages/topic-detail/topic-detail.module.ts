import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TopicDetailPageRoutingModule } from './topic-detail-routing.module';

import { TopicDetailPage } from './topic-detail.page';
import { CodeExampleModule } from './../../components/code-example/code-example.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopicDetailPageRoutingModule,
    CodeExampleModule
  ],
  declarations: [TopicDetailPage]
})
export class TopicDetailPageModule { }

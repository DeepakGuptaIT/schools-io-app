import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CodePageRoutingModule } from './code-routing.module';
import { YoutubeModule } from './../../components/youtube/youtube.module';

import { CodePage } from './code.page';
import { TopicComponentsModule } from '../../components/topic-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CodePageRoutingModule,
    TopicComponentsModule,
    YoutubeModule
  ],
  declarations: [CodePage]
})
export class CodePageModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuizPageRoutingModule } from './quiz-routing.module';

import { QuizPage } from './quiz.page';
import { TopicComponentsModule } from '../../components/topic-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuizPageRoutingModule,
    TopicComponentsModule
  ],
  declarations: [QuizPage]
})
export class QuizPageModule { }

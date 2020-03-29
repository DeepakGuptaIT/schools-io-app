import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { FormsPageRoutingModule } from './forms-routing.module';

import { FormsPage } from './forms.page';
import { MaterialModule } from '../../ng-marerial/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormsPageRoutingModule,
    ReactiveFormsModule,
    MaterialModule

  ],
  declarations: [FormsPage]
})
export class FormsPageModule { }

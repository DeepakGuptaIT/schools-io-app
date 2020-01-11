import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchoolPageRoutingModule } from './school-routing.module';

import { SchoolPage } from './school.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    SchoolPageRoutingModule
  ],
  declarations: [SchoolPage]
})
export class SchoolPageModule {}

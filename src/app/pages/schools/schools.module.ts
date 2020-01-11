import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchoolsPageRoutingModule } from './schools-routing.module';

import { SchoolsPage } from './schools.page';
import { SchoolPage } from './../school/school.page';
import { SchoolPageModule } from './../school/school.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SchoolsPageRoutingModule,
    SchoolPageModule
  ],
  declarations: [SchoolsPage],
  entryComponents: [SchoolPage]
})
export class SchoolsPageModule { }

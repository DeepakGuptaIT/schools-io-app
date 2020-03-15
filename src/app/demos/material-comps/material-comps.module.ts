import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaterialCompsPageRoutingModule } from './material-comps-routing.module';

import { MaterialCompsPage } from './material-comps.page';
import { MaterialModule } from '../../ng-marerial/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MaterialModule,
    MaterialCompsPageRoutingModule
  ],
  declarations: [MaterialCompsPage]
})
export class MaterialCompsPageModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CssUtilitiesPageRoutingModule } from './css-utilities-routing.module';

import { CssUtilitiesPage } from './css-utilities.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CssUtilitiesPageRoutingModule
  ],
  declarations: [CssUtilitiesPage]
})
export class CssUtilitiesPageModule {}

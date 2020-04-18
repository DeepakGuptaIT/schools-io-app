import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NgrxStoreDemoPageRoutingModule } from './ngrx-store-demo-routing.module';

import { NgrxStoreDemoPage } from './ngrx-store-demo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgrxStoreDemoPageRoutingModule
  ],
  declarations: [NgrxStoreDemoPage]
})
export class NgrxStoreDemoPageModule {}

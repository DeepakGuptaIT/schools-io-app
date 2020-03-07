import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CodePageRoutingModule } from './code-routing.module';
import { CodeExampleModule } from './../../components/code-example/code-example.module';

import { CodePage } from './code.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CodePageRoutingModule,
    CodeExampleModule
  ],
  declarations: [CodePage]
})
export class CodePageModule { }

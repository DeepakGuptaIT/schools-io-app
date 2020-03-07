import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeComponent } from './../code/code.component';
import { CodeExampleComponent } from './code-example.component';
import { CopierService } from '../../providers/core/copier.service';
import { HighlightModule } from 'ngx-highlightjs';
import { IonicModule } from '@ionic/angular';

@NgModule({
    imports: [CommonModule, IonicModule, HighlightModule],
    declarations: [CodeExampleComponent, CodeComponent],
    exports: [CodeExampleComponent],
    providers: [CopierService],
    entryComponents: [CodeExampleComponent, CodeComponent]
})
export class CodeExampleModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeComponent } from './../code/code.component';
import { CodeExampleComponent } from './code-example.component';
import { NotesCardComponent } from './../notes-card/notes-card.component';
import { CopierService } from '../../providers/core/copier.service';
import { HighlightModule } from 'ngx-highlightjs';
import { IonicModule } from '@ionic/angular';

/**
 * 
 * this also contains NodeCardComponent exports
 */
@NgModule({
    imports: [CommonModule, IonicModule, HighlightModule],
    declarations: [CodeExampleComponent, CodeComponent, NotesCardComponent],
    exports: [CodeExampleComponent, NotesCardComponent],
    providers: [CopierService],
    entryComponents: [CodeExampleComponent, CodeComponent, NotesCardComponent]
})
export class CodeExampleModule { }

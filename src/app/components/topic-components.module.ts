import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeComponent } from './code/code.component';
import { CodeExampleComponent } from './code-example/code-example.component';
import { NotesCardComponent } from './notes-card/notes-card.component';
import { CopierService } from '../providers/core/copier.service';
import { HighlightModule } from 'ngx-highlightjs';
import { IonicModule } from '@ionic/angular';

/**
 * 
 * A common module for common custom components.
 */
@NgModule({
    imports: [CommonModule, IonicModule, HighlightModule],
    declarations: [CodeExampleComponent, CodeComponent, NotesCardComponent],
    exports: [CodeExampleComponent, NotesCardComponent],
    providers: [CopierService],
    entryComponents: [CodeExampleComponent, CodeComponent, NotesCardComponent]
})
export class TopicComponentsModule { }

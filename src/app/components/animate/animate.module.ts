import { NgModule } from '@angular/core';
import { AnimateComponent } from './animate.component';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
    declarations: [AnimateComponent],
    imports: [ScrollingModule],
    exports: [AnimateComponent]

})
export class AnimateModule { }
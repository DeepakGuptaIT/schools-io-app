import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { IonicModule } from '@ionic/angular';
import { YoutubeComponent } from './youtube.component'


@NgModule({
  imports: [CommonModule, IonicModule, YouTubePlayerModule],
  declarations: [YoutubeComponent],
  exports: [YoutubeComponent],
  entryComponents: [YoutubeComponent]
})
export class YoutubeModule { }

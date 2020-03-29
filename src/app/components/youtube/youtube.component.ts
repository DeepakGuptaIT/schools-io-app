import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { YouTubePlayer } from '@angular/youtube-player';

@Component({
  selector: 'youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.scss'],
})
export class YoutubeComponent implements OnInit {
  @ViewChild(YouTubePlayer, { static: true }) player: YouTubePlayer;
  @Input()
  videoId: string = "PRQCAL_RMVo";
  @Input()
  suggestedQuality: YT.SuggestedVideoQuality = "hd720";
  @Input()
  height: string = "inherit";
  @Input()
  width: string = "100%";
  @Input()
  startSeconds: string = "0";
  @Input()
  endSeconds: string;

  constructor(
  ) { }

  ngOnInit() {
    const inputs = {
      videoId: this.videoId,
      suggestedQuality: this.suggestedQuality,
      height: this.height,
      width: this.width,
      startSeconds: this.startSeconds,
      endSeconds: this.endSeconds
    }
    console.log('youtube player inputs', inputs);
    const tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    // document.body.appendChild(tag);
    console.log(this.player.getPlayerState())

  }
  onPlayerReady(event: YT.PlayerEvent) {
    console.log('player is ready');
    //below code is working
    /* setTimeout(() => {
      // play either using event  or player object
      event.target.mute();
      event.target.playVideo();
      //or use below code
      // this.player.mute();
      // this.player.playVideo();
    }, 2000); */

  }
  stateChanged(event: YT.OnStateChangeEvent) {
    console.log('player state changed', event.data);
  }

  OnPlaybackQualityChange(event: YT.OnPlaybackQualityChangeEvent) {
    console.log('new video quality', event.data);
  }


}

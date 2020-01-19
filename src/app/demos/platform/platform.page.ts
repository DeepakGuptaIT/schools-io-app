import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'platform',
  templateUrl: './platform.page.html',
  styleUrls: ['./platform.page.scss'],
})
export class PlatformPage implements OnInit {

  properties = {};

  pList: any = [
    {
      'heading': 'width',
    },
    {
      'heading': 'height',
    },
    {
      'heading': 'url'
    },
    {
      'heading': 'isLandscape',
    },
    {
      'heading': 'isPortrait',
    },
    {
      'heading': 'isDesktop'
    },
    {
      'heading': 'isMobile'
    },
    {
      'heading': 'pwa'
    },
    {
      'heading': 'android'
    }

  ];

  constructor(
    private platform: Platform
  ) { }

  ngOnInit() {
    //not needed to subscribe to get the latest width etc...
    /* this.platform.resize.subscribe(async () => {
      console.log(`Resize event detected ${this.platform.width()}`);
    }); */
  }

  async ionViewDidEnter() {
  }

  keys(p): Array<string> {
    const keys = Object.keys(p);
    keys.shift();
    return keys;
  }

  getPlatformDetail(heading: string): any {
    switch (heading) {
      case 'width':
        return this.platform.width();
      case 'height':
        return this.platform.height();
      case 'url':
        return this.platform.url();
      case 'isLandscape':
        return this.platform.isLandscape();
      case 'isPortrait':
        return this.platform.isPortrait();
      case 'isDesktop':
        return this.platform.is('desktop');
      case 'isMobile':
        return this.platform.is('mobile');
      case 'pwa':
        return this.platform.is('pwa');
      case 'android':
        return this.platform.is('android');//android

    }
  }

}

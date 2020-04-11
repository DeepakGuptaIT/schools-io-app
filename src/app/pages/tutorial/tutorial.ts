import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { MenuController, IonSlides } from '@ionic/angular';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
  styleUrls: ['./tutorial.scss'],
})
/**
 * slider doc official : https://ionicframework.com/docs/api/slides
 */
export class TutorialPage {
  showSkip = true;
  hidePrev = true;
  hideNext = false;
  swiper: any;
  slideOpts = {
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
      hideOnClick: true
    },
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },
    mousewheel: {
      invert: true,
    }

  };

  @ViewChild('slides', { static: true }) slides: IonSlides;

  constructor(
    public menu: MenuController,
    public router: Router,
    public storage: Storage
  ) { }

  startApp() {
    this.router
      .navigateByUrl('/app/tabs/home', { replaceUrl: true })
      .then(() => this.storage.set('ion_did_tutorial', true));
  }

  onSlideChangeStart(event) {
    let prom1 = this.slides.isBeginning();
    let prom2 = this.slides.isEnd();

    Promise.all([prom1, prom2]).then((data) => {
      data[0] ? this.hidePrev = true : this.hidePrev = false;
      data[1] ? (this.hideNext = true, this.showSkip = this.hideNext) : this.hideNext = false;
      this.showSkip = !this.hideNext;
    });
    /* event.target.isEnd().then(isEnd => {
      this.showSkip = !isEnd;
    });
    event.target.isStart().then(isStart => {
      this.showPrev = !isStart;
    }); */
  }
  slideNext() {
    this.slides.slideNext();
    // this.slides.startAutoplay();
  }
  slidePrev() {
    this.slides.slidePrev();
  }

  async ionViewWillEnter() {
    this.storage.get('ion_did_tutorial').then(res => {
      if (res === true) {
        this.router.navigateByUrl('/app/tabs/home', { replaceUrl: true });
      }
    });
    this.swiper = await this.slides.getSwiper();

    this.menu.enable(false);
  }

  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }
}

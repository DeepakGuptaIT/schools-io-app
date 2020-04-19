import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'animation',
  templateUrl: './animation.page.html',
  styleUrls: ['./animation.page.scss'],
  animations: [
    trigger('visibility', [
      state('visible', style({
        opacity: 1
      })),
      state('invisible', style({
        opacity: 0
      }))
    ]),
    trigger('myvisibility', [
      state('visible', style({
        opacity: 1
      })),
      state('invisible', style({
        opacity: 0
      })),
      transition('* => *', animate('.5s'))
    ])
  ]
})
//
export class AnimationPage implements OnInit {
  visibleState = 'visible';
  dark: boolean = false;
  fadeInRight = false;
  // @ViewChild('slides', { static: true }) slides: IonSlides;
  @ViewChild('myElement', { static: false }) myElem: any;
  @ViewChild('para', { static: false }) para: HTMLElement;



  constructor() {
  }

  ngOnInit() {
    const animate: Animatable = null;
  }
  animate() {
    console.log('animate')
  }
  toggleVisible() {
    this.visibleState = (this.visibleState == 'visible') ? 'invisible' : 'visible';
    console.log(this.visibleState);
  }
  animateElem() {
    this.fadeInRight = !this.fadeInRight;

  }


}

import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Animation, AnimationController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'modal-page',
  template: '<h2>I am model template</h2>'
})
export class ModalPage {

}

@Component({
  selector: 'app-ionic-animation',
  templateUrl: './ionic-animation.page.html',
  styleUrls: ['./ionic-animation.page.scss'],
})
export class IonicAnimationPage implements OnInit {
  @ViewChild('square', { static: true }) myElementRef: ElementRef;
  @ViewChild('squareA', { static: true }) squareA: ElementRef;
  @ViewChild('squareB', { static: true }) squareB: ElementRef;
  @ViewChild('squareC', { static: true }) squareC: ElementRef;
  animation: Animation;

  constructor(private animationCtrl: AnimationController,
    public modalController: ModalController) { }

  ngOnInit() {

    // .addElement(document.querySelector('.square'))//js way to select an element
    // this.animation = this.basicAnimation();
    // this.animation = this.groupedAnimation();
    this.animation = this.withHooks();


  }
  basicAnimation(): Animation {


    const animation: Animation = this.animationCtrl.create()
      .addElement(this.myElementRef.nativeElement)
      .duration(1000)
      .fromTo('transform', 'translateX(0px)', 'translateX(100px)')
      .fromTo('opacity', '1', '0.2');
    return animation;
  }
  groupedAnimation(): Animation {
    const squareA = this.animationCtrl.create()
      .addElement(this.squareA.nativeElement)
      .keyframes([
        { offset: 0, transform: 'scale(1) rotate(0)' },
        { offset: 0.5, transform: 'scale(1.2) rotate(45deg)' },
        { offset: 1, transform: 'scale(1) rotate(45deg)' }
      ]);

    const squareB = this.animationCtrl.create()
      .addElement(this.squareB.nativeElement)
      .keyframes([
        { offset: 0, transform: 'scale(1)', opacity: '1' },
        { offset: 0.5, transform: 'scale(1.2)', opacity: '0.3' },
        { offset: 1, transform: 'scale(1)', opacity: '1' }
      ]);

    const squareC = this.animationCtrl.create()
      .addElement(this.squareC.nativeElement)
      .keyframes([
        { offset: 0, transform: 'scale(1)', opacity: '0.5' },
        { offset: 0.5, transform: 'scale(0.8)', opacity: '1' },
        { offset: 1, transform: 'scale(1)', opacity: '0.5' }
      ]);

    const parent = this.animationCtrl.create()
      .duration(2000)
      .iterations(Infinity)
      .addAnimation([squareC, squareB, squareA]);
    return parent;
  }
  withHooks(): Animation {
    //Before and After Hooks
    const square = this.animationCtrl.create()
      .addElement(this.myElementRef.nativeElement)
      .duration(2000)
      .beforeStyles({
        opacity: 0.2,
        background: 'rgba(0, 0, 255, 0.5)'
      })
      .afterStyles({
        background: 'rgba(12, 12, 12, 0.5)'
      })
      .afterClearStyles(['opacity'])
      .keyframes([
        { offset: 0, transform: 'scale(1)' },
        { offset: 0.5, transform: 'scale(1.5)' },
        { offset: 1, transform: 'scale(2)' }
      ])
    return square;

  }

  async chainedAnimmation() {
    const squareA = this.animationCtrl.create()
      .addElement(this.squareA.nativeElement)
      .duration(2000)
      .direction('alternate')
      // .iterations(Infinity)
      .keyframes([
        { offset: 0, transform: 'scale(1) rotate(0)' },
        { offset: 0.5, transform: 'scale(1.2) rotate(45deg)' },
        { offset: 1, transform: 'scale(1) rotate(45deg)' }
      ]);

    const squareB = this.animationCtrl.create()
      .addElement(this.squareB.nativeElement)
      .duration(3000)
      .keyframes([
        { offset: 0, transform: 'scale(1)', opacity: '1' },
        { offset: 0.5, transform: 'scale(1.2)', opacity: '0.3' },
        { offset: 1, transform: 'scale(1)', opacity: '1' }
      ]);

    const squareC = this.animationCtrl.create()
      .addElement(this.squareC.nativeElement)
      .duration(1000)
      .keyframes([
        { offset: 0, transform: 'scale(1)', opacity: '0.5' },
        { offset: 0.5, transform: 'scale(0.8)', opacity: '1' },
        { offset: 1, transform: 'scale(1)', opacity: '0.5' }
      ]);

    await squareA.play();
    await squareB.play();
    await squareC.play();
  }

  play() {
    this.animation.play();
  }
  pause() {
    this.animation.pause();
  }
  stop() {
    this.animation.stop();
  }
  async presentModal() {
    const enterAnimation = (baseEl: any) => {
      const backdropAnimation = this.animationCtrl.create()
        .addElement(baseEl.querySelector('ion-backdrop')!)
        .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

      const wrapperAnimation = this.animationCtrl.create()
        .addElement(baseEl.querySelector('.modal-wrapper')!)
        .keyframes([
          { offset: 0, opacity: '0', transform: 'scale(0)' },
          { offset: 1, opacity: '0.99', transform: 'scale(1)' }
        ]);

      return this.animationCtrl.create()
        .addElement(baseEl)
        .easing('ease-out')
        .duration(500)
        .addAnimation([backdropAnimation, wrapperAnimation]);
    }

    const leaveAnimation = (baseEl: any) => {
      return enterAnimation(baseEl).direction('reverse');
    }

    const modal = await this.modalController.create({
      component: ModalPage,
      enterAnimation,
      leaveAnimation,
      mode: 'ios',
      cssClass: '.custom-modal'


    });
    return await modal.present();
  }


}

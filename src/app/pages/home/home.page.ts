import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonList, LoadingController, ModalController, ToastController, IonSlides } from '@ionic/angular';
import { SubjectDocument } from './../../interfaces/models/SubjectModel';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { SubjectService } from './../../providers/subject/subject.service';
import { CommonService } from './../../providers/core/common.service';
import { coverflow } from './../../constants/SlideOptions';
// import { CardComponent } from './../../components/card/card.component';
import * as _ from "lodash";

@Component({
  selector: 'home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {

  subjectList: SubjectDocument[];
  user: Observable<firebase.User>;
  toastMessage: string;
  error: any = "";
  needSubjectLoad: boolean = true;
  loading: HTMLIonLoadingElement;
  toast: HTMLIonToastElement;
  swiper: any;

  //create the options based on screen size , using platform api
  slideOpts: object = {
    spaceBetween: 10,
    centeredSlides: true,
    slidesPerView: 1.6,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    }

  };

  @ViewChild('slides', { static: true }) slides: IonSlides;

  constructor(
    private subjectService: SubjectService,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public alertController: AlertController,
    private afAuth: AngularFireAuth,
    public router: Router,
    public commonService: CommonService
  ) {
    this.user = this.afAuth.authState;
  }

  ngOnInit() {
    // reset the components here
    if (this.user)
      this.user.subscribe(e => console.log("user details from subject page", e));
  }

  async ionViewDidEnter() {
    // this.swiper = await this.slides.getSwiper();
    // this.swiper.pagination.clickable = true;
    if (!_.isEmpty(this.subjectList)) {
      this.needSubjectLoad = false;
    }
    if (this.needSubjectLoad) {
      this.loading = await this.commonService.presentLoading('Loading HomePage..');

      (await this.subjectService.getSubjectList()).subscribe(
        async (subjectList: any[]) => {
          this.subjectList = subjectList;
          console.log('subjectList', this.subjectList);
          this.toast = await this.commonService.presentToast('Subject Data Loaded successfully');
          await this.loading.dismiss();
        },
        async (error) => {
          this.commonService.handleApiError(error);
          await this.loading.dismiss();
        }
      );

    } else {
      console.log('needSubjectLoad=>', this.needSubjectLoad);
    }
  }

  onSlideChangeStart(event) {
    // console.log('slide event', event);
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  async deleteSubject(id) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Message <strong>Are you sure you want to delete ?</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: async () => {
            console.log('Confirm Okay');
            const loading = await this.loadingCtrl.create({
              message: `Deleting  Subject..`
            });
            await loading.present();
            (await this.subjectService.deleteSubject(id)).subscribe(async res => {
              console.log(res);
              this.subjectList = this.subjectList.filter(e => e.id != id);
              loading.dismiss();
              const toast = await this.toastCtrl.create({
                message: 'Subject Deleted successfully',
                // showCloseButton: true,
                position: 'bottom',
                duration: 3000
              });
              await toast.present();
            },
              async (error) => {
                loading.dismiss();
              }
            )


          }
        }
      ]
    });

    await alert.present();

  }

  async updateSubject(subject: SubjectDocument) {
    const id = subject.id;
    const modal = await this.modalCtrl.create({
      component: ``,
      componentProps: { subject: subject, isNew: false },
      animated: true,
      cssClass: 'update-subject'
    });
    await modal.present();
    const data = await modal.onWillDismiss();
    if (data.data) {
      subject = <SubjectDocument>data.data;
      this.subjectList = this.subjectList.map(e => {
        if (e.id === id)
          return subject;
        else return e;
      });

      console.log(this.subjectList.filter(e => e.id === id));
    }




  }

  async cloneSubject(subjectOriginal: SubjectDocument) {
    let subject: SubjectDocument = { ...subjectOriginal };//Object.assign({}, subjectOriginal);
    const id = subject.id;
    subject.id = "0";
    const modal = await this.modalCtrl.create({
      component: ``,
      componentProps: { subject: subject, isNew: true }
    });
    await modal.present();
    const data = await modal.onWillDismiss();
    if (data.data) {
      subject = <SubjectDocument>data.data;
      /* this.subjectList = this.subjectList.map(e => {
        if (e.id === id)
          return subject;
        else return e;
      }); */
      this.subjectList = [...this.subjectList, subject];

      console.log(this.subjectList.filter(e => e.id === id));
    }
  }

  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    // this.toast.dismiss();
  }

}

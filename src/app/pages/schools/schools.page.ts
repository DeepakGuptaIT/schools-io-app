import { Component, OnInit } from '@angular/core';
import { SchoolService } from './../../providers/school/school.service';
import { CommonService } from './../../providers/core/common.service';
import { AlertController, IonList, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { School } from './../../interfaces/school';
import { SchoolPage } from './../school/school.page';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'schools',
  templateUrl: './schools.page.html',
  styleUrls: ['./schools.page.scss'],
})
export class SchoolsPage implements OnInit {

  schoolList: School[];
  user: Observable<firebase.User>;
  toastMessage: string;
  error: any = "";
  loading: HTMLIonLoadingElement;
  toast: HTMLIonToastElement;
  status = 'ONLINE';
  isConnected = true;

  constructor(
    public schoolService: SchoolService,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public alertController: AlertController,
    private afAuth: AngularFireAuth,
    public router: Router,
    private commonService: CommonService
  ) {
    this.user = this.afAuth.authState;

  }

  ngOnInit() {
    // reset the components here
    if (this.user)
      this.user.subscribe(e => console.log("user details from school page", e));
    /* this.router.events
      .pipe(
        filter(value => value instanceof NavigationEnd),
      )
      .subscribe(event => {
        if (event.url === 'http://mypreviousUrl.com') {
          this.window.location.reload();
        }
      }); */
  }

  async ionViewDidEnter() {
    const loading = await this.loadingCtrl.create({
      message: `Loading Schools..`,
      cssClass: 'custom-loading',
      spinner: 'crescent'
    });
    await loading.present();
    // message: 'School Data Loaded successfully',
    //message: this.error ? 'School Data Loading Failed' : 'School Data Loaded successfully', //this is not working
    const toast = await this.toastCtrl.create({
      message: 'School Data Loaded successfully',
      // showCloseButton: true,
      position: 'top',
      duration: 3000
    });
    const errToast = await this.toastCtrl.create({
      message: 'School Data Loading Failed',
      // showCloseButton: true,
      position: 'top',
      duration: 3000
    });

    // await loading.onWillDismiss();
    (await this.schoolService.getSchoolList()).subscribe(
      async (schoolList: any[]) => {
        this.schoolList = schoolList;
        console.log('schoolList', this.schoolList);
        loading.dismiss();
        this.toast = toast;
        await toast.present();
      },
      async (error) => {
        this.commonService.handleApiError(error);
        this.schoolList = [];
        loading.dismiss();
        this.toast = errToast;
        await errToast.present();
      }
    )
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  async deleteSchool(id) {
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
              message: `Deleting  School..`
            });
            await loading.present();
            (await this.schoolService.deleteSchool(id)).subscribe(async res => {
              console.log(res);
              this.schoolList = this.schoolList.filter(e => e._id != id);
              loading.dismiss();
              const toast = await this.toastCtrl.create({
                message: 'School Deleted successfully',
                // showCloseButton: true,
                position: 'bottom',
                duration: 3000
              });
              await toast.present();
            },
              async (error) => {
                await loading.dismiss();
              }
            )


          }
        }
      ]
    });

    await alert.present();

  }

  async updateSchool(school: School) {
    const id = school._id;
    const modal = await this.modalCtrl.create({
      component: SchoolPage,
      componentProps: { school: school, isNew: false },
      animated: true,
      cssClass: 'update-school'
    });
    await modal.present();
    const data = await modal.onWillDismiss();
    if (data.data) {
      school = <School>data.data;
      this.schoolList = this.schoolList.map(e => {
        if (e._id === id)
          return school;
        else return e;
      });

      console.log(this.schoolList.filter(e => e._id === id));
    }




  }

  async cloneSchool(schoolOriginal: School) {
    let school: School = { ...schoolOriginal };//Object.assign({}, schoolOriginal);
    const id = school._id;
    school._id = "0";
    const modal = await this.modalCtrl.create({
      component: SchoolPage,
      componentProps: { school: school, isNew: true }
    });
    await modal.present();
    const data = await modal.onWillDismiss();
    if (data.data) {
      school = <School>data.data;
      /* this.schoolList = this.schoolList.map(e => {
        if (e._id === id)
          return school;
        else return e;
      }); */
      this.schoolList = [...this.schoolList, school];

      console.log(this.schoolList.filter(e => e._id === id));
    }




  }

  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.toast.dismiss();
  }

}

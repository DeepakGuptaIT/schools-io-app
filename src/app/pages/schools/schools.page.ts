import { Component, OnInit } from '@angular/core';
import { SchoolService } from './../../providers/school/school.service';
import { AlertController, IonList, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { School } from './../../interfaces/school';
import { SchoolPage } from './../school/school.page';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'schools',
  templateUrl: './schools.page.html',
  styleUrls: ['./schools.page.scss'],
})
export class SchoolsPage implements OnInit {

  schoolList: School[];
  user: Observable<firebase.User>;

  constructor(
    public schoolService: SchoolService,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public alertController: AlertController,
    private afAuth: AngularFireAuth
  ) {
    this.user = this.afAuth.authState;
  }

  ngOnInit() {
    // reset the components here
    if (this.user)
      this.user.subscribe(e => console.log("user details from school page", e));
  }

  async ionViewDidEnter() {
    const loading = await this.loadingCtrl.create({
      message: `Loading Schools..`,
      cssClass: 'custom-loading',
      spinner: 'crescent'
    });
    await loading.present();
    const toast = await this.toastCtrl.create({
      message: 'School Data Loaded successfully',
      showCloseButton: true,
      position: 'top',
      duration: 3000
    });

    // await loading.onWillDismiss();
    this.schoolService.getSchoolList().subscribe(async (schoolList: any[]) => {
      this.schoolList = schoolList;
      console.log('schoolList', this.schoolList);
      loading.dismiss();
      await toast.present();


    })
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  async helloFunction(id) {
    this.schoolService.helloFunction(id).subscribe(async res => {
      console.log("helloFunction", res);
    });

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
            this.schoolService.deleteSchool(id).subscribe(async res => {
              console.log(res);
              this.schoolList = this.schoolList.filter(e => e._id != id);
              loading.dismiss();
              const toast = await this.toastCtrl.create({
                message: 'School Deleted successfully',
                showCloseButton: true,
                position: 'bottom',
                duration: 3000
              });
              await toast.present();
            })


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
    let school: School = Object.assign({}, schoolOriginal);
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
      this.schoolList = this.schoolList.map(e => {
        if (e._id === id)
          return school;
        else return e;
      });

      console.log(this.schoolList.filter(e => e._id === id));
    }




  }

}

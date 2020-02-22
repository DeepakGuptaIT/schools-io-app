import { Component, OnInit } from '@angular/core';
import { AlertController, IonList, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { SubjectDocument } from './../../interfaces/models/SubjectModel';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { SubjectService } from './../../providers/subject/subject.service';

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

  constructor(
    private subjectService: SubjectService,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public alertController: AlertController,
    private afAuth: AngularFireAuth,
    public router: Router
  ) {
    this.user = this.afAuth.authState;
  }

  ngOnInit() {
    // reset the components here
    if (this.user)
      this.user.subscribe(e => console.log("user details from subject page", e));

  }

  async ionViewDidEnter() {
    const loading = await this.loadingCtrl.create({
      message: `Loading Home..`,
      cssClass: 'custom-loading',
      spinner: 'crescent'
    });
    await loading.present();
    // message: 'Subject Data Loaded successfully',
    //message: this.error ? 'Subject Data Loading Failed' : 'Subject Data Loaded successfully', //this is not working
    const toast = await this.toastCtrl.create({
      message: 'Subject Data Loaded successfully',
      // showCloseButton: true,
      position: 'top',
      duration: 3000
    });
    const errToast = await this.toastCtrl.create({
      message: 'Subject Data Loading Failed',
      // showCloseButton: true,
      position: 'top',
      duration: 3000
    });

    // await loading.onWillDismiss();
    this.subjectService.getSubjectList().subscribe(
      async (subjectList: any[]) => {
        this.subjectList = subjectList;
        console.log('subjectList', this.subjectList);
        loading.dismiss();
        await toast.present();
      },
      async (error) => {
        this.error = error;
        this.subjectList = [];
        loading.dismiss();
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
            this.subjectService.deleteSubject(id).subscribe(async res => {
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

  async updateSchool(subject: SubjectDocument) {
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

  async cloneSchool(subjectOriginal: SubjectDocument) {
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

}

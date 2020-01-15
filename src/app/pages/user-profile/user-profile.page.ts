import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../providers/core/auth.service';
import { AlertController, IonList, LoadingController, ModalController, ToastController } from '@ionic/angular';
import * as _ from "lodash";

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
  user: firebase.User = null;

  constructor(
    public authService: AuthService,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public alertController: AlertController
  ) { }

  ngOnInit() {

  }

  async ionViewDidEnter() {
    const loading = await this.loadingCtrl.create({
      message: `Loading Profile..`
    });
    await loading.present();
    if (await this.authService.isAuthenticated()) {
      console.log(!_.isEmpty(this.user));
    }
    this.authService.getCurrentUser().subscribe(user => {
      this.user = user;
      loading.dismiss();
    })
    this.authService.getCurrentUserId().subscribe(uid => {
      console.log(uid);
    })
    // this.user = await this.authService.getCurrentUser();
  }

  async logout() {
    await this.authService.signOut();
  }

}

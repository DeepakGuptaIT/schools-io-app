import { Component, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
// import { Platform } from 'ionic-angular';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage {
  login: UserOptions = { username: '', password: '', email: '' };
  submitted = false;
  user: Observable<firebase.User>;
  userProfile: any;
  USER_PROFILE = "userProfile";

  constructor(
    public userData: UserData,
    public router: Router,
    private afAuth: AngularFireAuth,
    public storage: Storage
  ) {
    this.user = this.afAuth.authState;
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.userProfile = user;
      } else {
        this.userProfile = null;
      }
    });

  }

  async ngOnInit() {
    this.userProfile = await this.getUserProfile();
    // const isLoggedIn = firebase.auth().signOut();
  }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.userData.login(this.login.username);
      this.router.navigateByUrl('/app/tabs/schedule');
    }
  }

  onSignup() {
    this.router.navigateByUrl('/signup');
  }

  async webGoogleLogin(): Promise<void> {
    try {
      // await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.afAuth.auth.signInWithPopup(provider);
      this.user.subscribe(e => console.log(e));
      console.log("google credential:", credential);
      this.userProfile = credential.user;
      this.userData.login(this.userProfile.displayName);
      this.saveUserProfile(credential.user);
      //uncomment this line later .
      // this.router.navigateByUrl('/app/tabs/schedule');

    } catch (err) {
      console.log(err)
    }
  }

  async saveUserProfile(credential: object): Promise<void> {
    const obj = {
      name: "jay"
    }
    await this.storage.set(this.USER_PROFILE, JSON.stringify(credential));
    await this.storage.set("jay", JSON.stringify(obj));
  }

  async getUserProfile(): Promise<object> {
    const data = await this.storage.get(this.USER_PROFILE);
    return JSON.parse(data);
  }



  async webFacebookLogin(): Promise<void> {
    try {
      const provider = new firebase.auth.FacebookAuthProvider();
      const credential = await this.afAuth.auth.signInWithPopup(provider);
      console.log("facebook credentials:", credential);
      this.userData.login(credential.user.displayName);
      this.router.navigateByUrl('/app/tabs/schedule');

    } catch (err) {
      console.log(err)
    }
  }

  signOut() {
    this.afAuth.auth.signOut();
    this.user.subscribe(e => console.log(e));
  }

}

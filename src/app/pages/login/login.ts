import { Component, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
// import { Platform } from 'ionic-angular';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage {
  login: UserOptions = { username: '', password: '' };
  submitted = false;
  user: Observable<firebase.User>;

  constructor(
    public userData: UserData,
    public router: Router,
    private afAuth: AngularFireAuth
  ) {
    this.user = this.afAuth.authState;
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
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.afAuth.auth.signInWithPopup(provider);
      console.log("google credential:", credential);
      this.userData.login(credential.user.displayName);
      this.router.navigateByUrl('/app/tabs/schedule');

    } catch (err) {
      console.log(err)
    }
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
  }

}

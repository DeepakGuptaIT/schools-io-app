import { Component, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { AuthService } from './../../providers/core/auth.service';
import { Platform } from '@ionic/angular';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage {
  login: UserOptions = { username: '', password: '', email: '' };
  submitted = false;
  userObservable: Observable<firebase.User>;
  user: firebase.User;

  constructor(
    public userData: UserData,
    public router: Router,
    public storage: Storage,
    public authService: AuthService,
    private platform: Platform
  ) {

  }

  async ngOnInit() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user;
      console.log("user details from login page", user)
    });
    if (this.userObservable) {
      this.userObservable.subscribe(user => {
        this.user = user;
        console.log("user details from login page", user)
      });
    }
    // this.userProfile = await this.getUserProfile();
    // const isLoggedIn = firebase.auth().signOut();
  }

  /* onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.userData.login(this.login.username);
      this.router.navigateByUrl('/app/tabs/schedule');
    }
  } */

  onSignup() {
    this.router.navigateByUrl('/signup');
  }

  async logInWithEmailId(form: NgForm): Promise<void> {
    try {
      this.submitted = true;
      if (form.valid) {
        await this.authService.emailLogin(this.login.email, this.login.password)
        //this.user = this.authService.currentUser;
      }

    } catch (err) {
      console.log(err)
    }

  }

  async signUpWithEmailId(form: NgForm): Promise<void> {
    try {
      this.submitted = true;
      if (form.valid) {
        await this.authService.emailSignUp(this.login.email, this.login.password);
        //this.user = this.authService.currentUser;
      }

    } catch (err) {
      console.log(err)
    }

  }

  async signInWithGoogle(): Promise<void> {
    try {
      await this.authService.googleLogin();
      //this.user = this.authService.currentUser;

    } catch (err) {
      console.log(err)
    }

  }

  private afterSignIn(): void {
    // Do after login stuff here, such router redirects, toast messages, etc.
    this.router.navigateByUrl('/app/tabs/schedule');
  }

  async signInWithFaceBook(): Promise<void> {
    try {
      await this.authService.facebookLogin();

    } catch (err) {
      console.log(err)
    }

  }

  async signOut() {
    await this.authService.signOut();
  }

}

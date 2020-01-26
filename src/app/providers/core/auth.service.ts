import { Injectable } from '@angular/core';
import { AngularFireAuth, } from "@angular/fire/auth";
import { AngularFireDatabase } from "@angular/fire/database";
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { Storage } from '@ionic/storage';
import * as _ from "lodash";
import { async } from '@angular/core/testing';
import { AlertController, IonList, LoadingController, ModalController, ToastController } from '@ionic/angular';



/**
 * GitHub :
 * https://gist.github.com/codediodeio/8acfd199d807b9e5725bf0c6a84344be
 */
enum EVENT_TYPE {
  LOGIN, LOGOUT, SIGNUP
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  HAS_LOGGED_IN = 'hasLoggedIn';
  IS_ADMIN_USER = 'isAdminUser';
  user: firebase.User;//this is the current User
  adminUserEmailList = ['deepak.gupta.sky@gmail.com', 'deepakguptaoptimistic@gmail.com', 'uvzdeepak789@gmail.com'];

  constructor(public router: Router, private afAuth: AngularFireAuth, private db: AngularFireDatabase, private storage: Storage, private alertController: AlertController) {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user;
    });
  }

  async isAuthenticated(): Promise<boolean> {
    const isLoggedIn = await this.storage.get(this.HAS_LOGGED_IN);
    return isLoggedIn;
  }
  async isAdminUser(): Promise<boolean> {
    const isLoggedIn = await this.storage.get(this.HAS_LOGGED_IN);
    const isAdminUser = isLoggedIn ? await this.storage.get(this.IS_ADMIN_USER) : false;
    return isAdminUser;
  }

  // Returns current user
  async getCurrentUser2(): Promise<firebase.User> {
    if (this.user && !_.isEmpty(this.user)) {
      return this.user;
    } else {
      return this.afAuth.authState.toPromise();//this is not working after user-profile page refresh
    }
  }

  getCurrentUser(): Observable<firebase.User> {
    if (this.user && !_.isEmpty(this.user)) {
      return of(this.user);
    } else {
      return this.afAuth.authState;
    }
  }

  // Returns current user UID
  getCurrentUserId(): Observable<any> {
    // const currentUser = await this.getCurrentUser();
    return this.getCurrentUser().pipe(
      map((user: firebase.User) => {
        if (!_.isEmpty(user))
          return user.uid;
        else
          return null;
      })
    )
  }

  private async socialSignIn(provider: firebase.auth.AuthProvider): Promise<firebase.auth.UserCredential> {
    let credential: firebase.auth.UserCredential = null;
    try {
      credential = await this.afAuth.auth.signInWithPopup(provider);
      if (credential && credential.user) {
        await this.afterLogIn(credential.user);
      }

    } catch (error) {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      const alert = await this.alertController.create({
        header: 'Alert',
        subHeader: 'Login Failed',
        message: errorMessage,
        buttons: ['OK']
      });
      await alert.present();
      console.error(error);
      return null;
    }
    return credential;

  }

  async googleLogin(): Promise<void> {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.socialSignIn(provider);
    this.user = credential.user;
  }
  async facebookLogin(): Promise<void> {
    const provider = new firebase.auth.FacebookAuthProvider();
    const credential = await this.socialSignIn(provider);
    // this.user = credential.user;
  }

  //// Email/Password Auth ////
  async emailSignUp(email: string, password: string): Promise<void> {
    try {
      const credential = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
      // this.user = credential.user;
      if (credential && credential.user) {
        await this.afterSignUp(credential.user);
      }

    } catch (error) {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      if (errorCode == 'auth/weak-password') {
        // alert('The password is too weak.');
        errorMessage = 'The password is too weak.';
      }
      const alertPopUp = await this.alertController.create({
        message: errorMessage,
        buttons: [
          {
            text: 'OK',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }
        ]
      });
      await alertPopUp.present();
      console.log(error);
    }
  }

  async emailLogin(email: string, password: string): Promise<void> {
    try {
      const credential = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      // this.user = credential.user;
      if (credential && credential.user) {
        await this.afterLogIn(credential.user);
      }

    } catch (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      /* if (errorCode === 'auth/wrong-password') {
        errorMessage = 
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      } */
      const alert = await this.alertController.create({
        message: errorMessage,
        buttons: [
          {
            text: 'OK',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }
        ]
      });
      await alert.present();
      console.log(error);
    }
  }

  //// Sign Out ////
  //
  async signOut(): Promise<void> {
    try {
      //INSPIRED BY ZOMATO LOG OUT
      const alert = await this.alertController.create({
        message: 'Are you sure you want to log out ?',
        buttons: [
          {
            text: 'CANCEL',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'LOG OUT',
            handler: async () => {
              await this.afAuth.auth.signOut();
              await this.storage.remove(this.HAS_LOGGED_IN);
              await this.storage.remove(this.IS_ADMIN_USER);
              this.dispatchEvent(EVENT_TYPE.LOGOUT);
              this.router.navigateByUrl('/app/tabs/schools');
            }
          }
        ]
      });
      await alert.present();
      // await this.afAuth.auth.signOut();
      // await this.storage.remove(this.HAS_LOGGED_IN);
      // await this.storage.remove(this.IS_ADMIN_USER);
      // this.dispatchEvent(EVENT_TYPE.LOGOUT);
      // this.router.navigateByUrl('/app/tabs/schools');
    } catch (error) {
      console.log("logg out error", error)
    }
  }

  //// Helpers ////

  private async updateUserData() {
    // Writes user name and email to realtime db
    // useful if your app displays information about users or for admin features
    try {
      this.getCurrentUser().subscribe(async (currentUser: firebase.User) => {
        // const currentUser: firebase.User = await this.getCurrentUser();
        let path = `users/${currentUser.uid}`; // Endpoint on firebase
        let data = {
          name: currentUser.displayName,
          email: currentUser.email
        }
        await this.db.object(path).update(data);

      })

    } catch (error) {
      console.log("logg out error", error)
    }
  }

  private async afterLogIn(user: firebase.User) {

    console.log(user);
    await this.storage.set(this.HAS_LOGGED_IN, true);
    if (this.adminUserEmailList.indexOf(user.email) != -1) {
      await this.storage.set(this.IS_ADMIN_USER, true);
    }
    this.dispatchEvent(EVENT_TYPE.LOGIN);
    // this.updateUserData();
    this.router.navigateByUrl('/app/tabs/schools');


  }

  private async afterSignUp(user: firebase.User) {
    console.log(user);
    await this.storage.set(this.HAS_LOGGED_IN, true);
    if (this.adminUserEmailList.indexOf(user.email) != -1) {
      await this.storage.set(this.IS_ADMIN_USER, true);
    }
    this.dispatchEvent(EVENT_TYPE.SIGNUP);
    this.updateUserData();
    this.router.navigateByUrl('/app/tabs/schools');
  }




  private dispatchEvent(eventType: EVENT_TYPE) {
    let dispatch: any = "";
    switch (eventType) {
      case EVENT_TYPE.LOGIN:
        return window.dispatchEvent(new CustomEvent('user:login'));
      case EVENT_TYPE.SIGNUP:
        return window.dispatchEvent(new CustomEvent('user:signup'));
      case EVENT_TYPE.LOGOUT:
        return window.dispatchEvent(new CustomEvent('user:logout'));

    }
  }

}

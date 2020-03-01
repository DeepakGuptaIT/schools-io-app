import { Injectable } from '@angular/core';
import { of, Observable, throwError, TimeoutError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from './../../../environments/environment';
import { timeout } from 'rxjs/operators';
import { AlertController, IonList, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { PlatformEnum } from './../../constants/AppConstants';
import * as _ from "lodash";


@Injectable()
export class CommonService {
  isOnline: boolean = true;
  connectionMonitor: Observable<boolean>;
  readonly IS_INTERNET_CONNECTED = 'IS_INTERNET_CONNECTED';

  constructor(
    public modalCtrl: ModalController,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public alertController: AlertController,
    public storage: Storage,
    private platform: Platform
  ) {
    this.connectionMonitor = new Observable<boolean>(observer => {
      window.addEventListener('offline', function (e) {
        observer.next(false);
      });
      window.addEventListener('online', function (e) {
        observer.next(true);
      });
    });
  }

  async getIsOnline2(): Promise<boolean> {
    const isOnline = await this.storage.get(this.IS_INTERNET_CONNECTED);
    if (isOnline == null) {
      return true;
    }
    return isOnline;

  }
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/NavigatorOnLine/Online_and_offline_events
   * navigator.onLine is a property that maintains a true/false value (true for online, false for offline).
   */

  async getIsOnline(): Promise<boolean> {
    return navigator.onLine;
  }

  async setIsOnline(isOnline: boolean) {
    this.isOnline = isOnline;
    await this.storage.set(this.IS_INTERNET_CONNECTED, isOnline);
  }
  monitor(): Observable<any> {
    return this.connectionMonitor;
  }

  async presentAlert(heading: string, message: string) {
    let alert = await this.alertController.create({
      header: heading,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentToast(message: string, duration?: number, isTop?: boolean): Promise<HTMLIonToastElement> {
    const toast = await this.toastController.create({
      message: message,
      duration: duration ? duration : 3000,
      position: isTop ? 'top' : 'bottom'
    });
    await toast.present();
    return toast;
  }

  async presentToastWithOptions(message: string, heading?: string, buttonText?: string, isTop?: boolean): Promise<HTMLIonToastElement> {
    const toast = await this.toastController.create({
      header: heading ? heading : "",
      message: message,
      position: isTop ? 'top' : 'bottom',
      buttons: [
        {
          text: buttonText ? buttonText : 'Done',
          role: 'cancel',
        }
      ]
    });
    toast.present();
    return toast;
  }

  async presentLoading(message?: string): Promise<HTMLIonLoadingElement> {
    const loading = await this.loadingController.create({
      message: message ? message : 'Please wait...'
    });
    await loading.present();
    return loading;
  }

  async dismissLoading(loader: HTMLIonLoadingElement) {
    await loader.dismiss();
  }

  getUnknownError(): Observable<never> {
    const error = {
      status: 12345,
      error: "UNKNOWN_ERROR"
    };
    const customError = new HttpErrorResponse(error);
    return throwError(customError);
  }

  getInternetFailedError(): Observable<never> {
    const error = {
      status: 1234,
      error: 1234
    };
    const customError = new HttpErrorResponse(error);
    return throwError(customError);
  }

  async handleApiError(error: HttpErrorResponse) {
    let header = `Error`;
    let errMsg = 'Error';
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      errMsg = error.error.message;
      // const customError = new HttpErrorResponse({ error: 1234 });
    } else {
      if (error.status === 1234 && error.error == 1234) {
        errMsg = "Internet is Not Connected. Please check your Network Connection.";
        // await this.presentAlert("Error", "Internet is Not Connected. Please check your Network Connection.");
      } else if (error.message == "Timeout has occurred") {
        errMsg = "Timeout has occurred.";
        // await this.presentAlert("Error", "Timeout has occurred.");
      } else if (error.status == 0 && error.statusText == "Unknown Error") {
        errMsg = `Service is down and could be under maintanenace. Please try again later.`;
      }
      else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        header = `Error : ${error.status}`;
        errMsg = `${error.error.message}`;
        console.error(`Backend returned code ${error.status}, ` + `body was: ${JSON.stringify(error.error)}`);
      }
    }
    await this.presentAlert(header, errMsg);
  };

  getPlatformDetail(key: PlatformEnum): any {
    switch (key) {
      case PlatformEnum.width:
        return this.platform.width();
      case PlatformEnum.height:
        return this.platform.height();
      case PlatformEnum.url:
        return this.platform.url();
      case PlatformEnum.isLandscape:
        return this.platform.isLandscape();
      case PlatformEnum.isPortrait:
        return this.platform.isPortrait();
      case PlatformEnum.isDesktop:
        return this.platform.is('desktop');
      case PlatformEnum.isMobile:
        return this.platform.is('mobile');
      case PlatformEnum.pwa:
        return this.platform.is('pwa');
      case PlatformEnum.android:
        return this.platform.is('android');

    }
  }
  isMobileView(): boolean {
    return this.getPlatformDetail(PlatformEnum.width) < 577;
  }
  getWidth(): any {
    return this.getPlatformDetail(PlatformEnum.width);
  }
}

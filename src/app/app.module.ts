import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnimationService } from 'css-animator';
import { Interceptor, DEFAULT_TIMEOUT } from './providers/core/interceptor';
import { CommonService } from './providers/core/common.service';
// import { GooglePlus } from '@ionic-native/google-plus'; // We'll install this in the next section

const firebaseConfig = {
  apiKey: "AIzaSyBKAQAy4yb1BpE-eoMjFg_ZRFALUhejg8U",
  authDomain: "schools-io-d0066.firebaseapp.com",
  databaseURL: "https://schools-io-d0066.firebaseio.com",
  projectId: "schools-io-d0066",
  storageBucket: "schools-io-d0066.appspot.com",
  messagingSenderId: "276194740345",
  appId: "1:276194740345:web:715ed962a8565d6f9ceca8",
  measurementId: "G-RS2ZSDQDWC"
};

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    }),
    AngularFireModule.initializeApp(firebaseConfig), // <-- firebase here
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  declarations: [AppComponent],
  providers: [
    [{ provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }],
    [{ provide: DEFAULT_TIMEOUT, useValue: 10000 }],
    InAppBrowser, SplashScreen, StatusBar, AnimationService, CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }

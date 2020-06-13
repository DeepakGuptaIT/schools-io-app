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
import { Interceptor, DEFAULT_TIMEOUT } from './providers/core/interceptor';
import { CommonService } from './providers/core/common.service';
import { HighlightModule, HIGHLIGHT_OPTIONS, HighlightOptions } from 'ngx-highlightjs';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects, effects } from './effects/app.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgxChartsModule } from '@swimlane/ngx-charts';
// import { GooglePlus } from '@ionic-native/google-plus'; // We'll install this in the next section
//test

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

/**
 * Import specific languages to avoid importing everything
 * The following will lazy load highlight.js core script (~9.6KB) + the selected languages bundle (each lang. ~1kb)
 */
export function getHighlightLanguages() {
  return {
    typescript: () => import('highlight.js/lib/languages/typescript'),
    css: () => import('highlight.js/lib/languages/css'),
    xml: () => import('highlight.js/lib/languages/xml')
  };
}
// IonicModule.forRoot({ mode: "ios" }),
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
    NgxChartsModule,
    AngularFireModule.initializeApp(firebaseConfig), // <-- firebase here
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    HighlightModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  declarations: [AppComponent],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        // languages: getHighlightLanguages(),
        lineNumbers: true
      }
    },
    [{ provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }],
    [{ provide: DEFAULT_TIMEOUT, useValue: 10000 }],
    InAppBrowser, SplashScreen, StatusBar, CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }

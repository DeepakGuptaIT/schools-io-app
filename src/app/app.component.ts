import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';

import { MenuController, Platform, ToastController } from '@ionic/angular';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Storage } from '@ionic/storage';

import { UserData } from './providers/user-data';
import { AuthService } from './providers/core/auth.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  appPages = [
    {
      title: 'Schedule',
      url: '/app/tabs/schedule',
      icon: 'calendar'
    },
    {
      title: 'Speakers',
      url: '/app/tabs/speakers',
      icon: 'contacts'
    },
    {
      title: 'Map',
      url: '/app/tabs/map',
      icon: 'map'
    },
    {
      title: 'About',
      url: '/app/tabs/about',
      icon: 'information-circle'
    },
    {
      title: 'Schools',
      url: '/schools',
      icon: 'contacts'
    }
  ];
  demoPages = [
    {
      title: 'platform',
      url: '/platform',
      icon: 'laptop'
    },
    {
      title: 'cards',
      url: '/cards',
      icon: 'card'
    }


  ]
  loggedIn = false;
  dark = false;
  isSplitPaneDisabled = false;
  showSplash = false; // <-- show animation

  constructor(
    private menu: MenuController,
    private platform: Platform,
    private router: Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private userData: UserData,
    private swUpdate: SwUpdate,
    private toastCtrl: ToastController,
    private authService: AuthService
  ) {
    this.initializeApp();
  }

  async ngOnInit() {
    this.checkLoginStatus();
    this.listenForLoginEvents();

    this.swUpdate.available.subscribe(async res => {
      const toast = await this.toastCtrl.create({
        message: 'Update available!',
        showCloseButton: true,
        position: 'bottom',
        closeButtonText: `Reload`
      });

      await toast.present();

      toast
        .onDidDismiss()
        .then(() => this.swUpdate.activateUpdate())
        .then(() => window.location.reload());
    });
  }

  initializeApp() {
    this.platform.ready().then((source) => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.getPlatformInfo();
    });
  }

  showSplashFn() {
    //call only after platform is ready
    if (this.platform.is('desktop') && !this.platform.is('pwa')) {
      this.showSplash = true;
      timer(3000).subscribe(() => this.showSplash = false) // <-- hide animation after 3s
    }
  }

  getPlatformInfo() {
    console.log("platform source " + this.platform.platforms());
    this.platform.resize.subscribe(async () => {
      console.log(`Resize event detected ${this.platform.width()}`);
    });

  }

  checkLoginStatus() {
    return this.userData.isLoggedIn().then(loggedIn => {
      return this.updateLoggedInStatus(loggedIn);
    });
  }

  updateLoggedInStatus(loggedIn: boolean) {
    setTimeout(() => {
      this.loggedIn = loggedIn;
    }, 300);
  }

  listenForLoginEvents() {
    window.addEventListener('user:login', () => {
      this.updateLoggedInStatus(true);
    });

    window.addEventListener('user:signup', () => {
      this.updateLoggedInStatus(true);
    });

    window.addEventListener('user:logout', () => {
      this.updateLoggedInStatus(false);
    });
  }

  logout() {
    this.authService.signOut().then(() => {
      return this.router.navigateByUrl('/app/tabs/schedule');
    });
  }

  openTutorial() {
    this.menu.enable(false);
    this.storage.set('ion_did_tutorial', false);
    this.router.navigateByUrl('/tutorial');
  }

  async toggleCustomMenu(toggleCustomMenu: string) {
    console.log('open custom clicked', toggleCustomMenu);
    // this.menu.enable(true, 'custom');
    const menu = await this.menu.get(toggleCustomMenu);
    const isOpen = await menu.isOpen();
    if (isOpen) {
      this.isSplitPaneDisabled = true;
      this.menu.close(toggleCustomMenu);
    } else {
      this.menu.open(toggleCustomMenu);
      this.isSplitPaneDisabled = false;
    }
  }
}

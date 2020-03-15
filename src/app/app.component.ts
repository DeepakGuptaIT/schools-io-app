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
import { CommonService } from './providers/core/common.service';

interface Page {
  title: string,
  url: string,
  icon: string
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  appPages: Page[] = [
    {
      title: 'Home',
      url: '/app/tabs/home',
      icon: 'home'
    },
    {
      title: 'Schools',
      url: '/app/tabs/schools',
      icon: 'school'
    },
    {
      title: 'About',
      url: '/app/tabs/about',
      icon: 'information-circle'
    },
  ];
  adminAppPages: Page[] = [
    {
      title: 'Schedule',
      url: '/app/tabs/schedule',
      icon: 'calendar'
    },
    {
      title: 'Speakers',
      url: '/app/tabs/speakers',
      icon: 'people'
    },
    {
      title: 'Map',
      url: '/app/tabs/map',
      icon: 'map'
    },
    {
      title: 'Signup',
      url: '/signup',
      icon: 'person-add'
    }
  ];
  demoPages: Page[] = [
    {
      title: 'Material Design',
      url: '/material-comps',
      icon: 'logo-web-component'
    },
    {
      title: 'platform',
      url: '/platform',
      icon: 'laptop'
    },
    {
      title: 'cards',
      url: '/cards',
      icon: 'card'
    },
    {
      title: 'responsive grid',
      url: '/grid',
      icon: 'grid'
    },
    {
      title: 'css-utilities',
      url: '/css-utilities',
      icon: 'logo-css3'
    },
    {
      title: 'animation',
      url: '/animation',
      icon: 'color-wand'
    },
    {
      title: 'code',
      url: '/code',
      icon: 'code-outline'
    }



  ]
  loggedIn = false;
  dark = false;
  isSplitPaneDisabled = false;
  showSplash = false; // <-- show animation
  user: firebase.User = null;
  isAdminUser: boolean = false;
  adminUserEmailList = ['deepak.gupta.sky@gmail.com', 'deepakguptaoptimistic@gmail.com', 'uvzdeepak789@gmail.com', 'gupta231296@gmail.com'];
  status = 'ONLINE';
  isConnected = true;
  appVersion: string = '15-march-2020 v3'

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
    private authService: AuthService,
    private commonService: CommonService
  ) {
    this.initializeApp();
  }

  async ngOnInit() {
    this.checkLoginStatus();
    this.listenForLoginEvents();
    this.listenNetworkConnectivity();

    this.swUpdate.available.subscribe(async res => {
      /*  const toast = await this.toastCtrl.create({
         message: 'Update available!',
         showCloseButton: true,
         position: 'bottom',
         closeButtonText: `Reload`
       }); */
      const toast = await this.toastCtrl.create({
        message: 'Update available!',
        // showCloseButton: true,
        position: 'bottom',
        // closeButtonText: `Reload`,
        duration: 3000,
        buttons: [
          {
            text: 'Reload',
            role: 'cancel'
          }
        ]

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
    if (!(this.platform.is('desktop') && !this.platform.is('pwa'))) {
      this.showSplash = true;
      timer(3000).subscribe(() => this.showSplash = false) // <-- hide animation after 3s
    }
  }

  getPlatformInfo() {
    console.log("platform source " + this.platform.platforms());
    this.platform.resize.subscribe(async () => {
      // console.log(`Resize event detected width: ${this.platform.width()} and height : ${this.platform.height()}`);
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
      if (loggedIn) {
        this.authService.getCurrentUser().subscribe(user => {
          this.user = user;
          const email = this.user.email;
          if (this.adminUserEmailList.indexOf(email) != -1) {
            this.isAdminUser = true;
          }
        })
      } else {
        this.user = null;
        this.isAdminUser = false;
      }
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

  listenNetworkConnectivity() {
    this.commonService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;
      if (this.isConnected) {
        this.status = "ONLINE";
        this.commonService.setIsOnline(true)
      }
      else {
        this.status = "OFFLINE";
        this.commonService.setIsOnline(false)
      }
      console.log('Network connection', this.status);
    });

  }

  logout() {
    this.authService.signOut().then(() => {
      //we are already navigating to schools page in the signOut Service method
      // return this.router.navigateByUrl('/app/tabs/home');
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

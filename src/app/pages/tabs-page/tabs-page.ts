import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../providers/core/auth.service';

@Component({
  templateUrl: 'tabs-page.html'
})
export class TabsPage implements OnInit {
  loggedIn = false;
  isAdminUser: boolean = false;
  constructor(
    private authService: AuthService
  ) {
  }
  async ngOnInit() {
    this.checkisAdminUser();
    this.listenForLoginEvents();


  }

  async checkisAdminUser() {
    this.isAdminUser = await this.authService.isAdminUser();
    this.loggedIn = await this.authService.isAuthenticated();
  }

  listenForLoginEvents() {
    window.addEventListener('user:logout', () => {
      this.isAdminUser = false;
      this.loggedIn = false;
    });
    window.addEventListener('user:signup', () => {
      this.loggedIn = true;
    });
    window.addEventListener('user:login', () => {
      this.loggedIn = true;
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'not-found',
  templateUrl: './not-found.page.html',
  styleUrls: ['./not-found.page.scss'],
})
export class NotFoundPage implements OnInit {
  location = 'madison';

  constructor(public router: Router, ) { }

  ngOnInit() {
  }
  async navigateToHome() {
    await this.router
      .navigateByUrl('/app/tabs/home', { replaceUrl: true });
  }

}

export const typesscriptSampleCode = `import { Component, ViewEncapsulation } from '@angular/core';
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
  ) {}
  onSignup() {
    this.router.navigateByUrl('/signup');
  }

}`;
export const cssSampleCode = `.wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.container {
  flex: 1;
  margin: 1em;
  position: relative;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}`;

export const jsSampleCode = `function myFunction(p1, p2) {
  return p1 * p2;   // The function returns the product of p1 and p2
}`;

export const scssSampleCode = `@mixin subject-card() {
    height: 100%;
    display: flex !important;
    flex-direction: column !important;
    text-align: center !important;
    justify-content: center !important;
    cursor: pointer !important;

    &:hover {
        box-shadow: 0 8px 16px var(--ion-color-medium-shade), 0 3px 6px var(--ion-color-medium-shade);
        transform: translateY(-2px);
    }
}`;

export const javaSampleCode = `class Simple{  
    public static void main(String args[]){  
     System.out.println("Hello Java");  
    }  
}  `;
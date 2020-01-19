import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserData } from '../../providers/user-data';
import * as _ from "lodash";
import { UserOptions } from '../../interfaces/user-options';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { AuthService } from './../../providers/core/auth.service';

import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, FormArray } from '@angular/forms';



@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  styleUrls: ['./signup.scss'],
})
export class SignupPage implements OnInit {
  signup: UserOptions = { username: '', password: '', email: '' };
  registerForm: FormGroup;
  submitted = false;
  passwordShown: boolean = false;
  userObservable: Observable<firebase.User>;
  user: firebase.User;

  constructor(
    public router: Router,
    public userData: UserData,
    private fb: FormBuilder,
    public storage: Storage,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ])],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      passwords: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      }, { validator: this.passwordConfirming })

    });
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
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }
  get p() {
    const passwords: FormGroup = <FormGroup>this.registerForm.controls.passwords;
    return passwords.controls;
  }

  onSignup() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    alert('SUCCESS!! :-)')

    /* if (form.valid) {
      this.userData.signup(this.signup.username);
      this.router.navigateByUrl('/app/tabs/schedule');
    } */
  }

  passwordConfirming(c: FormGroup): { passwordMismatch: boolean } {
    if (_.isEmpty(c.controls.password.errors) && _.isEmpty(c.controls.confirmPassword.errors)) {
      if (c.get('password').value !== c.get('confirmPassword').value) {
        // c.controls.confirmPassword.status = Abstract;
        return { passwordMismatch: true };
      }
    }
  }
  togglePassword() {
    this.passwordShown = !this.passwordShown;
  }

  async signUpWithEmailId(): Promise<void> {
    try {
      this.submitted = true;
      // stop here if form is invalid
      if (this.registerForm.invalid) {
        return;
      } else {
        await this.authService.emailSignUp(this.registerForm.value.email, this.registerForm.value.passwords.password);

      }
    } catch (err) {
      console.log(err)
    }

  }

  async signInWithGoogle(): Promise<void> {
    try {
      await this.authService.googleLogin();

    } catch (err) {
      console.log(err)
    }

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

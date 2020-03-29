import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserData } from '../../providers/user-data';
import * as _ from "lodash";
import { UserOptions } from '../../interfaces/user-options';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
// import { AuthService } from './../../providers/core/auth.service';

import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, FormArray } from '@angular/forms';
export enum SEGMENT { FORMS, SEGMENT }

interface Animal {
  name: string;
  sound: string;
}
/** @title Select with form field features */
@Component({
  selector: 'forms',
  templateUrl: './forms.page.html',
  styleUrls: ['./forms.page.scss'],
})
export class FormsPage implements OnInit {
  // segment: SEGMENT = SEGMENT.FORMS;
  segment = 1;
  signup: UserOptions = { username: '', password: '', email: '' };
  registerForm: FormGroup;
  submitted = false;
  passwordShown: boolean = false;
  userObservable: Observable<firebase.User>;
  user: firebase.User;
  animalControl = new FormControl('', Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  animals: Animal[] = [
    { name: 'Dog', sound: 'Woof!' },
    { name: 'Cat', sound: 'Meow!' },
    { name: 'Cow', sound: 'Moo!' },
    { name: 'Fox', sound: 'Wa-pa-pa-pa-pa-pa-pow!' },
  ];

  constructor(
    public router: Router,
    public userData: UserData,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ])]

    });

  }
  //this is important. otherwise you will get error
  get f() { return this.registerForm.controls; }

  onSignup() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    alert('SUCCESS!! :-)')
  }
  segmentChanged(event) {
    console.log(event);

  }
}

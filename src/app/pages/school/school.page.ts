import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Config, ModalController, NavParams, AlertController, LoadingController, ToastController } from '@ionic/angular';
import { School } from '../../interfaces/school';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, FormArray } from '@angular/forms';
import { SchoolService } from './../../providers/school/school.service';

@Component({
  selector: 'school',
  templateUrl: './school.page.html',
  styleUrls: ['./school.page.scss'],
})
export class SchoolPage implements OnInit {

  loginForm: FormGroup;
  isNew: boolean = true;
  schoolForm: FormGroup;
  initialSchoolFormValue: object;


  constructor(public fb: FormBuilder, public modalCtrl: ModalController,
    public navParams: NavParams,
    public schoolService: SchoolService,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public alertController: AlertController
  ) {
    console.log(navParams.get('school'));

    if (navParams.get('isNew') === false) {
      this.isNew = false;
    }

    this.schoolForm = this.fb.group({
      _id: new FormControl({ value: '', disabled: true }),
      name: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),

      ])],
      city: ['Ranchi', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),

      ])],
      type: [''],
      tagLine: ['']
    });
    this.resetSchoolForm(navParams.get('school'));
    this.initialSchoolFormValue = this.schoolForm.value;

    /* this.loginForm = this.fb.group({
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15),

      ])],
      email: ['']

    }); */
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.schoolForm.value);
    if (this.isNew) {
      this.schoolService.addSchool(this.schoolForm.value).subscribe(async res => {
        console.log(res);
        const toast = await this.toastCtrl.create({
          message: 'School Added successfully',
          // showCloseButton: true,
          position: 'bottom',
          duration: 2000
        });
        await toast.present();
        this.dismiss(res);
      })

    } else {
      this.schoolService.updateSchool(this.navParams.get('school')._id, this.schoolForm.value).subscribe(async res => {
        console.log(res);
        const toast = await this.toastCtrl.create({
          message: 'School Updated successfully',
          // showCloseButton: true,
          position: 'bottom',
          duration: 2000
        });
        await toast.present();
        this.dismiss({ ...this.schoolForm.value, _id: this.navParams.get('school')._id });
      })
    }

  }
  updateLogin() {
    this.loginForm.patchValue({
      email: 'Mony'
    })
  }

  resetSchoolForm(val?: any) {
    this.schoolForm.patchValue(val ? val : this.initialSchoolFormValue);
  }

  dismiss(data?: any) {
    // using the injected ModalController this page
    // can "dismiss" itself and pass back data
    this.modalCtrl.dismiss(data);
  }

  ngOnInit() {
  }
}

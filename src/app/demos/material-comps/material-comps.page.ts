import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'material-comps',
  templateUrl: './material-comps.page.html',
  styleUrls: ['./material-comps.page.scss'],
})
export class MaterialCompsPage implements OnInit {
  userForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

}

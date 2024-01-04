import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup,FormsModule, ReactiveFormsModule} from '@angular/forms';

import {
  MatDialogRef,
} from '@angular/material/dialog';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userFormGroup  = new FormGroup({
    password: new FormControl('',[Validators.required]),
    email : new FormControl('', [Validators.required, Validators.email]),
    capital: new FormControl('', [Validators.required, Validators.min(65200), Validators.max(464200)]),
  });

  constructor(public dialogRef: MatDialogRef<RegisterComponent>) { }

  ngOnInit(): void {
  }

}

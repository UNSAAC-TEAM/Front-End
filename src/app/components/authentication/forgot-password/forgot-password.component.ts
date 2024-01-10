import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import {RegisterComponent} from "../register/register.component";
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  userFormGroup  = new FormGroup({
    email : new FormControl('', [Validators.required, Validators.email]),
  });
  constructor(private dialog: MatDialog,public dialogRef: MatDialogRef<ForgotPasswordComponent>) { }

  ngOnInit(): void {
  }
  sendForgotPassword(){
    if (this.userFormGroup.valid) {
      let email: string = <string>this.userFormGroup.get('email')?.value;
      this.dialogRef.close(); // Cierra el dialog actual
    }
  }
}

import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RegisterComponent} from "../register/register.component";
import {ForgotPasswordComponent} from "../forgot-password/forgot-password.component";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userFormGroup  = new FormGroup({
    email : new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required]),
  });
  constructor(private dialog: MatDialog,public dialogRef: MatDialogRef<LoginComponent>) { }

  ngOnInit(): void {
  }
  forgotPassword(){
    this.dialogRef.close(); // Cierra el dialog actual
    setTimeout(() => {
      // Abre el dialog de registro
      const dialogRef = this.dialog.open(ForgotPasswordComponent, {
        width: '500px',
        // Otras configuraciones
      });
    }, 200);
  }
  registerRedirect(){
    this.dialogRef.close(); // Cierra el dialog actual
    setTimeout(() => {
      // Abre el dialog de registro
      const dialogRef = this.dialog.open(RegisterComponent, {
        width: '500px',
        // Otras configuraciones
      });
    }, 200);

  }
  login(){
    if (this.userFormGroup.valid) {
      let email: string = <string>this.userFormGroup.get('email')?.value;
      let password: string = <string>this.userFormGroup.get('password')?.value;
      this.dialogRef.close(); // Cierra el dialog actual
    }

  }
}

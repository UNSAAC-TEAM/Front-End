import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RegisterComponent} from "../register/register.component";
import {ForgotPasswordComponent} from "../forgot-password/forgot-password.component";
import {LoginDataService} from "../../../services/comunication/login/login-data.service";
import {UserAccount} from "../../../Models/User";
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
  constructor(private loginDataService: LoginDataService,private dialog: MatDialog,public dialogRef: MatDialogRef<LoginComponent>) { }

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
  getAlias(name: string|null, lastName: string|null): string|null {
    if(name!=null&&lastName!=null){
      // Obtén la primera letra de name y lastName y conviértelas a mayúsculas
      const firstLetterName = name.charAt(0).toUpperCase();
      const firstLetterLastName = lastName.charAt(0).toUpperCase();

      // Concatena las letras y devuelve el resultado
      const alias = firstLetterName + firstLetterLastName;
      return alias;
    }else {
      return null
    }
  }
  login(){
    if (this.userFormGroup.valid) {
      let email: string = <string>this.userFormGroup.get('email')?.value;
      let password: string = <string>this.userFormGroup.get('password')?.value;
      this.dialogRef.close(); // Cierra el dialog actual
      let userLogged: UserAccount= {
        id:1,
        name: "Alonso",
        lastName: "Talledo Sanchez",
        email: "diego@gmail.com",
        imageUrl: null,
        alias: null,
        isLogged: true
      }
      if(userLogged.imageUrl==null){
        userLogged.alias=this.getAlias(userLogged.name,userLogged.lastName)
      }
      this.loginDataService.userAccount=userLogged;
    }

  }
}
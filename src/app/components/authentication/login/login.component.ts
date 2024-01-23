import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RegisterComponent} from "../register/register.component";
import {ForgotPasswordComponent} from "../forgot-password/forgot-password.component";
import {LoginDataService} from "../../../services/comunication/login/login-data.service";
import {UserSession} from "../../../core/models/UserSession";
import {NgToastService} from "ng-angular-popup";
import {UserServices} from "../../../services/user.api-service";
import { jwtDecode } from "jwt-decode";
import {SessionStorageService } from 'ngx-webstorage';
import {CryptoData} from "../../../services/CryptoJs/crypto-data";

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
  constructor(private crypto: CryptoData,private sessionStorageService: SessionStorageService,private loginDataService: LoginDataService,private toast: NgToastService,private dialog: MatDialog,public dialogRef: MatDialogRef<LoginComponent>) { }

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
      new UserServices().login(email,password).then(response=>{

        let userLogged: UserSession= {
          sessionToken:response.data.token,
          name: response.data.firstName,
          lastName: response.data.lastName,
          imageUrl: response.data.imageUrl,
          alias: this.getAlias(response.data.firstName,response.data.lastName),
          isLogged: true,
          roll: response.data.roll
        }
        this.loginDataService.userAccount=userLogged;
        this.crypto.EncryptAndSetObjectToStorage(this.loginDataService.userAccount)


        this.toast.success({detail:"Inicio de sesion exitoso",summary:'Cuenta iniciada correctamente',duration:1000});
        this.dialogRef.close(); // Cierra el dialog actual
      }).catch(error=>{
        this.toast.error({detail:"ERROR",summary:'Error al iniciar sesion',sticky:true});
      })

    }

  }
}

import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {UserServices} from "../../../../services/user.api-service";
import {CryptoData} from "../../../../services/CryptoJs/crypto-data";
import {LoginDataService} from "../../../../services/comunication/login/login-data.service";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-edit-password-dialog',
  templateUrl: './edit-password-dialog.component.html',
  styleUrls: ['./edit-password-dialog.component.css']
})
export class EditPasswordDialogComponent implements OnInit {
  token=""
  userFormGroup  = new FormGroup({
    password: new FormControl('',[Validators.required]),
    repeatedPassword: new FormControl('',[Validators.required]),
  });

  constructor(private toast: NgToastService,private loginDataService: LoginDataService ,private crypto: CryptoData,private dialog: MatDialog,public dialogRef: MatDialogRef<EditPasswordDialogComponent>) { }

  ngOnInit(): void {
    this.token=this.crypto.getDecryptObjectFromStorage().sessionToken
  }

  closeDialog() {
    this.dialogRef.close();
  }

  saveNewPassword() {
    let password: string = <string>this.userFormGroup.get('password')?.value;
    let repeatedPassword: string = <string>this.userFormGroup.get('repeatedPassword')?.value;
    if (this.userFormGroup.valid){
      if(password==repeatedPassword){
        new UserServices().updateUserPassword(this.token,this.loginDataService.getUserId(this.token),password).then(response=>{
          this.toast.success({detail:"Contraseña actualizada",summary:'Contraseña actualizada exitosamente',duration:1500});
          this.dialogRef.close();
        })
      }else {
        this.toast.error({detail:"ERROR",summary:'Las contraseñas no coinciden',duration:3000});
      }
    }

  }
}

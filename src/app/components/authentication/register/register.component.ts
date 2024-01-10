import { Component, OnInit,ViewEncapsulation  } from '@angular/core';
import {FormControl, Validators, FormGroup,FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ErrorStateMatcher} from '@angular/material/core';
import {
  FormGroupDirective,
  NgForm
} from '@angular/forms';

interface Country {
  viewValue: string;
  alpha2: string;
  phone: number;
  phoneMask: string;
}
import {
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import {LoginComponent} from "../login/login.component";
import { NgToastService } from 'ng-angular-popup';
import {UserServices} from "../../../services/user.api-service";
import {RegisterModel} from "../../../core/models/RegisterModel";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  country: Country[] = [
    { viewValue: 'Peru', alpha2: 'PE', phone: 51, phoneMask: '000 000 000' },
    { viewValue: 'Argentina', alpha2: 'AR', phone: 54, phoneMask: '000 000 0000' },
    { viewValue: 'Bolivia', alpha2: 'BO', phone: 591, phoneMask: '0 0000 0000' },
    { viewValue: 'Chile', alpha2: 'CL', phone: 56, phoneMask: '0 0000 0000' },
    { viewValue: 'Colombia', alpha2: 'CO', phone: 57, phoneMask: '000 000 0000' },
    { viewValue: 'Costa Rica', alpha2: 'CR', phone: 506, phoneMask: '0000 0000' },
    { viewValue: 'Cuba', alpha2: 'CU', phone: 53, phoneMask: '00 000000000' },
    { viewValue: 'Dominican Republic', alpha2: 'DO', phone: 1, phoneMask: '(000) 000-0000' },
    { viewValue: 'Ecuador', alpha2: 'EC', phone: 593, phoneMask: '0 000 000 000' },
    { viewValue: 'El Salvador', alpha2: 'SV', phone: 503, phoneMask: '0000 0000' },
    { viewValue: 'Equatorial Guinea', alpha2: 'GQ', phone: 240, phoneMask: '000 000 000' },
    { viewValue: 'Guatemala', alpha2: 'GT', phone: 502, phoneMask: '0000 0000' },
    { viewValue: 'Honduras', alpha2: 'HN', phone: 504, phoneMask: '0000-0000' },
    { viewValue: 'Mexico', alpha2: 'MX', phone: 52, phoneMask: '000 000 0000' },
    { viewValue: 'Nicaragua', alpha2: 'NI', phone: 505, phoneMask: '0000 0000' },
    { viewValue: 'Panama', alpha2: 'PA', phone: 507, phoneMask: '0000-0000' },
    { viewValue: 'Paraguay', alpha2: 'PY', phone: 595, phoneMask: '0000 000000' },
    { viewValue: 'Spain', alpha2: 'ES', phone: 34, phoneMask: '000 00 00 00' },
    { viewValue: 'Uruguay', alpha2: 'UY', phone: 598, phoneMask: '00 000 0000' },
    { viewValue: 'Venezuela', alpha2: 'VE', phone: 58, phoneMask: '0000-0000000' },
  ];


  userFormGroup  = new FormGroup({
    name: new FormControl('',[Validators.required]),
    lastname: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
    email : new FormControl('', [Validators.required, Validators.email]),
    country: new FormControl(this.country[0], [Validators.required]),
  });
  number=""
  isNumberErrorActive=false

  isSelectBoxActive = false;
  selectedCountryPhone = '54'; // Replace with your default country phone
  selectedCountryAlpha2 = 'pe'; // Replace with your default country phone
  selectedPhoneMask="000 000 000";
  searchQuery = '';
  countries = [
    { name: 'Peru', alpha2: 'PE', phone: 51, phoneMask: '000 000 000' },
    { name: 'Argentina', alpha2: 'AR', phone: 54, phoneMask: '000 000 0000' },
    { name: 'Bolivia', alpha2: 'BO', phone: 591, phoneMask: '0 0000 0000' },
    { name: 'Chile', alpha2: 'CL', phone: 56, phoneMask: '0 0000 0000' },
    { name: 'Colombia', alpha2: 'CO', phone: 57, phoneMask: '000 000 0000' },
    { name: 'Costa Rica', alpha2: 'CR', phone: 506, phoneMask: '0000 0000' },
    { name: 'Cuba', alpha2: 'CU', phone: 53, phoneMask: '00 000000000' },
    { name: 'Dominican Republic', alpha2: 'DO', phone: 1, phoneMask: '(000) 000-0000' },
    { name: 'Ecuador', alpha2: 'EC', phone: 593, phoneMask: '0 000 000 000' },
    { name: 'El Salvador', alpha2: 'SV', phone: 503, phoneMask: '0000 0000' },
    { name: 'Equatorial Guinea', alpha2: 'GQ', phone: 240, phoneMask: '000 000 000' },
    { name: 'Guatemala', alpha2: 'GT', phone: 502, phoneMask: '0000 0000' },
    { name: 'Honduras', alpha2: 'HN', phone: 504, phoneMask: '0000-0000' },
    { name: 'Mexico', alpha2: 'MX', phone: 52, phoneMask: '000 000 0000' },
    { name: 'Nicaragua', alpha2: 'NI', phone: 505, phoneMask: '0000 0000' },
    { name: 'Panama', alpha2: 'PA', phone: 507, phoneMask: '0000-0000' },
    { name: 'Paraguay', alpha2: 'PY', phone: 595, phoneMask: '0000 000000' },
    { name: 'España', alpha2: 'ES', phone: 34, phoneMask: '000 00 00 00' },
    { name: 'Uruguay', alpha2: 'UY', phone: 598, phoneMask: '00 000 0000' },
    { name: 'Venezuela', alpha2: 'VE', phone: 58, phoneMask: '0000-0000000' },
  ];


  constructor(private toast: NgToastService,private dialog: MatDialog,public dialogRef: MatDialogRef<RegisterComponent>) { }

  ngOnInit(): void {
  }

  onCountrySelectionChange(event: any) {
    // Puedes acceder al valor seleccionado utilizando event.value
    const selectedCountry = event.value;
    this.selectedCountryAlpha2 = selectedCountry.alpha2.toString().toLowerCase();
    this.selectedCountryPhone = selectedCountry.phone.toString();
    this.selectedPhoneMask=selectedCountry.phoneMask.toString();
  }

  get filteredCountries() {
    return this.countries.filter(country =>
      country.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  toggleSelectBox() {
    this.isSelectBoxActive = !this.isSelectBoxActive;
  }

  selectOption(country: any) {
    this.selectedCountryAlpha2 = country.alpha2.toLowerCase();
    this.selectedCountryPhone = country.phone;
    this.selectedPhoneMask=country.phoneMask;
    this.isSelectBoxActive = false; // Close the dropdown after selection
  }
  getPhoneMaskLength(): number {
    return this.selectedPhoneMask.replace(/[\s-]/g, '').length;

  }
  getPhoneNumberLength(): number {
    return this.number.replace(/[\s-]/g, '').length;

  }
  onInputChangePhoneNumber(number: any){
    if(this.getPhoneNumberLength()==0 || this.getPhoneNumberLength()>this.getPhoneMaskLength()){
      this.isNumberErrorActive=true
    }
    else {
      this.isNumberErrorActive=false
    }

  }
  loginRedirect(){
    this.dialogRef.close(); // Cierra el dialog actual
    setTimeout(() => {
      // Abre el dialog de registro
      const dialogRef = this.dialog.open(LoginComponent, {
        width: '500px',
        // Otras configuraciones
      });
    }, 200);

  }
  register(){
    if (this.userFormGroup.valid) {
      if(this.getPhoneMaskLength()!=this.getPhoneNumberLength() || this.isNumberErrorActive){
        this.isNumberErrorActive=true
      }else{
        let name: string = <string>this.userFormGroup.get('name')?.value;
        let lastname: string = <string>this.userFormGroup.get('lastname')?.value;
        let email: string = <string>this.userFormGroup.get('email')?.value;
        let password: string = <string>this.userFormGroup.get('password')?.value;
        let country: Country = <Country>this.userFormGroup.get('country')?.value;
        let phoneNumber: string = "+"+country.phone+" "+this.number
        let registerModel: RegisterModel={
          name:name,
          lastName:lastname,
          email:email,
          password:password,
          country:country.viewValue.toString(),
          phoneNumber: phoneNumber,
          roll:'USER'
        }
        new UserServices().register(registerModel).then(response=>{
          console.log(response.data)
          this.toast.success({detail:"Registro exitoso",summary:'Cuenta registrada',duration:5000});
          this.loginRedirect(); // Cierra el dialog actual
        }).catch(error=>{
          this.toast.error({detail:"ERROR",summary:'Error al registrarse',sticky:true});
        })

      }

    }
  }

}

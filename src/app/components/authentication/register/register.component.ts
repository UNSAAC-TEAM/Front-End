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
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
  country: Country[] = [
    { viewValue: 'Argentina', alpha2: 'AR', phone: 54, phoneMask: '000 000 0000' },
    { viewValue: 'Brazil', alpha2: 'BR', phone: 55, phoneMask: '00 0000-0000' },
    { viewValue: 'Chile', alpha2: 'CL', phone: 56, phoneMask: '0 0000 0000' },
    { viewValue: 'Colombia', alpha2: 'CO', phone: 57, phoneMask: '000 000 0000' },
    { viewValue: 'Mexico', alpha2: 'MX', phone: 52, phoneMask: '000 000 0000' },
    { viewValue: 'Peru', alpha2: 'PE', phone: 51, phoneMask: '000 000 000' },
    { viewValue: 'Uruguay', alpha2: 'UY', phone: 598, phoneMask: '00 000 0000' },
    // Add more countries as needed
  ];

  userFormGroup  = new FormGroup({
    name: new FormControl('',[Validators.required]),
    lastname: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
    email : new FormControl('', [Validators.required, Validators.email]),
    selected : new FormControl('', [Validators.required, Validators.pattern('')]),
    country: new FormControl(this.country[5], [Validators.required]),
  });
  number=""
  isNumberErrorActive=false

  isSelectBoxActive = false;
  selectedCountryPhone = '54'; // Replace with your default country phone
  selectedCountryAlpha2 = 'pe'; // Replace with your default country phone
  selectedPhoneMask="000 000 000";
  searchQuery = '';
  countries = [
    { name: 'Argentina', alpha2: 'AR', phone: 54, phoneMask: '000 000 0000' },
    { name: 'Brazil', alpha2: 'BR', phone: 55, phoneMask: '00 0000-0000' },
    { name: 'Chile', alpha2: 'CL', phone: 56, phoneMask: '0 0000 0000' },
    { name: 'Colombia', alpha2: 'CO', phone: 57, phoneMask: '000 000 0000' },
    { name: 'Mexico', alpha2: 'MX', phone: 52, phoneMask: '000 000 0000' },
    { name: 'Peru', alpha2: 'PE', phone: 51, phoneMask: '000 000 000' },
    { name: 'Uruguay', alpha2: 'UY', phone: 598, phoneMask: '00 000 0000' },
    // Add more countries as needed
  ];


  constructor(private dialog: MatDialog,public dialogRef: MatDialogRef<RegisterComponent>) { }

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
    console.log(this.getPhoneMaskLength())
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

}

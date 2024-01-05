import { Component, OnInit,ViewEncapsulation  } from '@angular/core';
import {FormControl, Validators, FormGroup,FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {
  FormGroupDirective,
  NgForm
} from '@angular/forms';

interface Country {
  viewValue: string;
}
import {
  MatDialogRef,
} from '@angular/material/dialog';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
  userFormGroup  = new FormGroup({
    name: new FormControl('',[Validators.required]),
    lastname: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
    email : new FormControl('', [Validators.required, Validators.email]),
    selected : new FormControl('', [Validators.required, Validators.pattern('')]),
    country: new FormControl('Peru', [Validators.required]),
    capital: new FormControl('', [Validators.required, Validators.min(65200), Validators.max(464200)]),
  });
  country: Country[] = [
    { viewValue: 'Argentina' },
    { viewValue: 'Bolivia' },
    { viewValue: 'Brazil' },
    { viewValue: 'Chile' },
    { viewValue: 'Colombia' },
    { viewValue: 'Ecuador' },
    { viewValue: 'Paraguay' },
    { viewValue: 'Peru' },
    { viewValue: 'Uruguay' },
    { viewValue: 'Venezuela' }
  ];
  isSelectBoxActive = false;
  selectedCountryCode = 'pe'; // Replace with your default country code
  selectedCountryPhone = '54'; // Replace with your default country phone
  searchQuery = '';
  countries = [
    { code: '+54', name: 'Argentina', phone: 54 },
    { code: '+55', name: 'Brazil', phone: 55 },
    { code: '+56', name: 'Chile', phone: 56 },
    { code: '+57', name: 'Colombia', phone: 57 },
    { code: '+52', name: 'Mexico', phone: 52 },
    { code: '+51', name: 'Peru', phone: 51 },
    { code: '+598', name: 'Uruguay', phone: 598 },
    // Agrega más países según sea necesario
  ];


  constructor(public dialogRef: MatDialogRef<RegisterComponent>) { }

  ngOnInit(): void {
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
    this.selectedCountryCode = country.code.toLowerCase();
    this.selectedCountryPhone = country.phone;
    this.isSelectBoxActive = false; // Close the dropdown after selection
  }

}

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
  constructor(public dialogRef: MatDialogRef<RegisterComponent>) { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginDataService} from "../../../../services/comunication/login/login-data.service";
import { jwtDecode } from "jwt-decode";
import {SessionStorageService} from "ngx-webstorage";
import {UserServices} from "../../../../services/user.api-service";
import {NgToastService} from "ng-angular-popup";
import {CryptoData} from "../../../../services/CryptoJs/crypto-data";

interface Months {
  viewValue: string;
  month: number;
}

interface Country {
  viewValue: string;
  alpha2: string;
  phone: number;
  phoneMask: string;
}
interface Gender {
  viewValue: string;
  storableValue: string;
}
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {


  displayableMonths: Months[] = [
    { viewValue: 'Enero', month: 1 },
    { viewValue: 'Febrero', month: 2 },
    { viewValue: 'Marzo', month: 3 },
    { viewValue: 'Abril', month: 4 },
    { viewValue: 'Mayo', month: 5 },
    { viewValue: 'Junio', month: 6 },
    { viewValue: 'Julio', month: 7 },
    { viewValue: 'Agosto', month: 8 },
    { viewValue: 'Septiembre', month: 9 },
    { viewValue: 'Octubre', month: 10 },
    { viewValue: 'Noviembre', month: 11 },
    { viewValue: 'Diciembre', month: 12 }
  ];
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
  gender: Gender[]=[
    { viewValue: 'Masculino',storableValue: 'MALE'},
    { viewValue: 'Feminino',storableValue: 'FEMALE'},
    { viewValue: 'Otro',storableValue: 'OTHER'},
  ]
  userFormGroup  = new FormGroup({
    name: new FormControl('',[Validators.required]),
    lastname: new FormControl('',[Validators.required]),
    password: new FormControl('password',),
    email : new FormControl('', ),
    country: new FormControl(this.country[0], [Validators.required]),
    gender: new FormControl(this.gender[2], [Validators.required]),
    city: new FormControl('',[Validators.pattern(/^[a-zA-Z\s]*$/)]),
    description: new FormControl(''),
  });
  number=""
  isNumberErrorActive=false
  isSelectBoxActive = false;
  selectedCountryPhone = '51'; // Replace with your default country phone
  selectedCountryAlpha2 = 'pe'; // Replace with your default country phone
  selectedPhoneMask="000 000 000";
  searchQuery = '';
  days: number[];
  months: number[];
  years: number[];

  selectedDay: number = 1;  // Inicializar con un valor predeterminado
  selectedMonth: number = 1;
  selectedYear: number = (new Date().getFullYear())-18;
  token=""
  constructor(private crypto: CryptoData,private toast: NgToastService,private sessionStorageService: SessionStorageService,private loginDataService: LoginDataService) {
    this.days = Array.from({ length: 31 }, (_, i) => i + 1);
    this.months = Array.from({ length: 12 }, (_, i) => i + 1);
    this.years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i-18);
    this.token=this.crypto.getDecryptObjectFromStorage().sessionToken
    this.userFormGroup.patchValue({
      name: this.loginDataService.userAccount.name,
      lastname: this.loginDataService.userAccount.lastName,
      country: this.country[this.findIndexByCountryName('Peru')],

      email: jwtDecode(this.token).sub
    });
    this.setCountryInitialCodeForNumber("+51 924052944")
  }

  ngOnInit(): void {
    new UserServices().getUserById(this.loginDataService.getUserId(this.token)).then(result=>{

    })
  }

  imageReady(imageUrl: string) {
    console.log('Firebase Uploaded Image: ', imageUrl);
  }
  updateDays() {
    const daysInMonth = new Date(this.selectedYear, this.selectedMonth, 0).getDate();
    this.days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  }
  setCountryInitialCodeForNumber(completeNumber: string){
    const match = completeNumber.match(/^\+(\d+) (\d+)$/);
    if (match) {
      let code=match[1]
      let number=match[2]
      this.selectedCountryPhone=code
      this.number=number
      this.selectedCountryAlpha2=(this.country[this.findIndexByCountryCode(code)].alpha2).toLowerCase()
    }
  }
  onCountrySelectionChange(event: any) {
    // Puedes acceder al valor seleccionado utilizando event.value
    const selectedCountry = event.value;
    this.selectedCountryAlpha2 = selectedCountry.alpha2.toString().toLowerCase();
    this.selectedCountryPhone = selectedCountry.phone.toString();
    this.selectedPhoneMask=selectedCountry.phoneMask.toString();
  }

  findIndexByCountryName(countryName: string): number {
    return this.country.findIndex(country => country.viewValue === countryName);
  }
  findIndexByCountryCode(countryCode: string): number {
    return this.country.findIndex(country => country.phone.toString() === countryCode);
  }
  get filteredCountries() {
    return this.country.filter(country =>
      country.viewValue.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
  toggleSelectBox() {
    this.isSelectBoxActive = !this.isSelectBoxActive;
  }
  getPhoneMaskLength(): number {
    return this.selectedPhoneMask.replace(/[\s-]/g, '').length;

  }
  getPhoneNumberLength(): number {
    return this.number.replace(/[\s-]/g, '').length;

  }
  onInputChangePhoneNumber(numberParameter: any): void{
    const nonNumberOrSpacePattern = /[^0-9 ]/;
    if(this.number.length>=1){
      let lastNumber=(this.number[this.number.length-1])
      if (nonNumberOrSpacePattern.test(lastNumber)) {
        this.isNumberErrorActive = true;
      } else {
        if (this.getPhoneNumberLength() === 0 || this.getPhoneNumberLength() > this.getPhoneMaskLength()
        ) {
          this.isNumberErrorActive = true;
        } else {
          this.isNumberErrorActive = false;
        }
      }
    }



  }
  selectOption(country: any) {
    this.selectedCountryAlpha2 = country.alpha2.toLowerCase();
    this.selectedCountryPhone = country.phone;
    this.selectedPhoneMask=country.phoneMask;
    this.isSelectBoxActive = false; // Close the dropdown after selection
  }
  saveEditProfile(){
    if (this.userFormGroup.valid) {
      if(this.getPhoneMaskLength()!=this.getPhoneNumberLength() || this.isNumberErrorActive){
        this.isNumberErrorActive=true
      }else{
        let name: string = <string>this.userFormGroup.get('name')?.value;
        let lastname: string = <string>this.userFormGroup.get('lastname')?.value;
        let gender: Gender = <Gender>this.userFormGroup.get('gender')?.value;
        let country: Country = <Country>this.userFormGroup.get('country')?.value;
        let city: string = <string>this.userFormGroup.get('city')?.value;
        let phoneNumber: string = "+"+country.phone+" "+this.number
        let birthdate = (new Date(this.selectedYear, this.selectedMonth - 1, this.selectedDay)).toISOString() ;
        let description: string = <string>this.userFormGroup.get('description')?.value;
        let editProfileBody={
          "firstName": name,
          "lastName": lastname,
          "birthDay": birthdate,
          "country": country.viewValue,
          "city": city,
          "gender": gender.storableValue,
          "phoneNumber": phoneNumber,
          "description": description
        }
        new UserServices().updateProfileData(this.token,this.loginDataService.getUserId(this.token),editProfileBody).then(response=>{
          this.loginDataService.userAccount.name=name
          this.loginDataService.userAccount.lastName=lastname
          this.sessionStorageService.store('userSession', this.loginDataService.userAccount);
          this.toast.success({detail:"Perfil actualizado",summary:'Perfil actualizado exitosamente',duration:1000});

        }).catch(error=>{
          this.toast.error({detail:"ERROR",summary:'Error al actualizar perfil',sticky:true});
        })
      }

    }
  }
}

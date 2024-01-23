import { Component, OnInit } from '@angular/core';
import {LoginDataService} from "../../../../services/comunication/login/login-data.service";
import {UserServices} from "../../../../services/user.api-service";
import {CryptoData} from "../../../../services/CryptoJs/crypto-data";
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  imageUrl: string|null;
  token= "";
  totalCoursesSpinnerValue: number = 50;
  premiumCoursesSpinnerValue: number = 5;
  certificatedCoursesSpinnerValue: number = 1;
  description=""
  constructor(private crypto: CryptoData,public loginDataService: LoginDataService,private router: Router) {
    this.token=this.crypto.getDecryptObjectFromStorage().sessionToken
    this.imageUrl='https://i.imgur.com/tdi3NGag.jpg'
    if(this.loginDataService.userAccount.imageUrl!=null){
      this.imageUrl=this.loginDataService.userAccount.imageUrl
    }
  }

  ngOnInit(): void {
    new UserServices().getUserById(this.token,this.loginDataService.getUserId(this.token)).then(response=>{
      this.description=response.data.description
    })
  }
  redirectToEditProfile(){
    this.router.navigate(['/account/edit-profile']);

  }

}

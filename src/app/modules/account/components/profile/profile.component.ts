import { Component, OnInit } from '@angular/core';
import {LoginDataService} from "../../../../services/comunication/login/login-data.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  imageUrl = 'https://i.imgur.com/tdi3NGag.jpg';
  totalCoursesSpinnerValue: number = 50;
  premiumCoursesSpinnerValue: number = 5;
  certificatedCoursesSpinnerValue: number = 1;
  constructor(public loginDataService: LoginDataService) {
  }

  ngOnInit(): void {
  }

}

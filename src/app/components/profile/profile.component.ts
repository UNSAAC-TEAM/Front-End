import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  imageUrl = 'https://i.imgur.com/tdi3NGag.jpg';
  username= 'Diego'
  totalCoursesSpinnerValue: number = 10;
  premiumCoursesSpinnerValue: number = 5;
  certificatedCoursesSpinnerValue: number = 1;
  constructor() { }

  ngOnInit(): void {
  }

}

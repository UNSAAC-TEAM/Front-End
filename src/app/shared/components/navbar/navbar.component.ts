import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  searchText: string = '';
  isSideMenuOptionsActive: Boolean =false;

  constructor(private route: Router) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {

  }
  openSideMenuOptions(){
    this.isSideMenuOptionsActive=!this.isSideMenuOptionsActive
  }
  search(){
    console.log('Texto de búsqueda:', this.searchText);
    this.route.navigate(['/courses']);
    this.searchText=""
  }
  toggleNotifi() {
    console.log("NOTI")
  }
}

import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import {LoginComponent} from "../authentication/login/login.component";
import {RegisterComponent} from "../authentication/register/register.component";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLogged: Boolean = true;
  searchText: string = '';
  isSideMenuOptionsActive: Boolean =false;

  constructor(public dialog: MatDialog,private route: Router) { }

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
  logOut(){
    this.isLogged=!this.isLogged
    this.isSideMenuOptionsActive=false
  }
  showLoginDialog(enterAnimationDuration: string, exitAnimationDuration: string){
    this.dialog.open(LoginComponent, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,

    });
  }
  showRegisterDialog(enterAnimationDuration: string, exitAnimationDuration: string){
    this.dialog.open(RegisterComponent, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    //this.isLogged=!this.isLogged
  }
}

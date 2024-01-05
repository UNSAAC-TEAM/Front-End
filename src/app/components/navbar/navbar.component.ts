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
  isLogged: Boolean = false;
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
    //this.isLogged=!this.isLogged
  }
  showRegisterDialog(enterAnimationDuration: string, exitAnimationDuration: string){
    this.dialog.open(RegisterComponent, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
      panelClass: 'custom-dialog-panel', // Clase para el contenido del panel
      backdropClass: 'custom-dialog-backdrop', // Clase para el fondo del diálogo
    });
    //this.isLogged=!this.isLogged
  }
}

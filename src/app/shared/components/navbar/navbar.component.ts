import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog,} from '@angular/material/dialog';
import {LoginComponent} from "../../../components/authentication/login/login.component";
import {RegisterComponent} from "../../../components/authentication/register/register.component";
import {LoginDataService} from "../../../services/comunication/login/login-data.service";
import {SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLogged: Boolean = false;
  searchText: string = '';
  isSideMenuOptionsActive: Boolean =false;

  constructor(private sessionStorageService: SessionStorageService, public loginDataService: LoginDataService,public dialog: MatDialog,private route: Router) {
    this.isLogged=loginDataService.userAccount.isLogged
  }

  ngOnInit(): void {
    const userSession = this.sessionStorageService.retrieve('userSession');
    if(userSession!=null){
      this.loginDataService.userAccount=userSession;
    }
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
    this.loginDataService.userAccount.isLogged=false
    this.sessionStorageService.clear();
    this.isSideMenuOptionsActive=false
  }
  showLoginDialog(enterAnimationDuration: string, exitAnimationDuration: string){
    this.dialog.open(LoginComponent, {
      width: '570px',
      enterAnimationDuration,
      exitAnimationDuration,

    });
  }
  showRegisterDialog(enterAnimationDuration: string, exitAnimationDuration: string){
    this.dialog.open(RegisterComponent, {
      width: '540px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    //this.isLogged=!this.isLogged
  }
}

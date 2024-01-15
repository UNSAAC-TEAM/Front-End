import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog,} from '@angular/material/dialog';
import {LoginComponent} from "../../../components/authentication/login/login.component";
import {RegisterComponent} from "../../../components/authentication/register/register.component";
import {LoginDataService} from "../../../services/comunication/login/login-data.service";
import {SessionStorageService } from 'ngx-webstorage';
import {CryptoData} from "../../../services/CryptoJs/crypto-data";
import { NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLogged: Boolean = false;
  searchText: string = '';
  isSideMenuOptionsActive: Boolean =false;
  isBlogsActive: boolean = false;

  constructor(private cryptoService: CryptoData,private sessionStorageService: SessionStorageService, public loginDataService: LoginDataService,public dialog: MatDialog,private route: Router) {
    this.isLogged=loginDataService.userAccount.isLogged
  }

  ngOnInit(): void {
    let sessionStorageObject=this.cryptoService.getDecryptObjectFromStorage()

    if(sessionStorageObject!=null){
      this.loginDataService.userAccount=sessionStorageObject;
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

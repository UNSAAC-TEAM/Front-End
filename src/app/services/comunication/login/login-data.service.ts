import { Injectable } from '@angular/core';
import {UserAccount} from "../../../Models/User";
@Injectable({
  providedIn: 'root'
})
export class LoginDataService {
  userAccount: UserAccount = {
    id:null ,
    name:null,
    lastName:null,
    email:null,
    imageUrl: null,
    alias: null,
    isLogged: false
  }
  constructor() { }
}

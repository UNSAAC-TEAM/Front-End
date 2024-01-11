import { Injectable } from '@angular/core';
import {UserSession} from "../../../core/models/UserSession";
@Injectable({
  providedIn: 'root'
})
export class LoginDataService {
  userAccount: UserSession = {
    sessionToken:null ,
    name:null,
    lastName:null,
    imageUrl: null,
    alias: null,
    isLogged: false
  }
  constructor() { }
}

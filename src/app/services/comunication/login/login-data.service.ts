import { Injectable } from '@angular/core';
import {UserSession} from "../../../core/models/UserSession";
import { jwtDecode } from "jwt-decode";
interface CustomToken {
  sub: string;
  id: number;
  iat: number;
  exp: number;
}
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
  public getUserId(token: string): number{
    const decoded: CustomToken = jwtDecode(token);
    return decoded.id;
  }
}

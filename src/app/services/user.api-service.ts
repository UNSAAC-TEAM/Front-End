import http from "src/app/services/http-common";
import {RegisterModel} from "../Models/RegisterModel";
export class UserServices{
  register(user: RegisterModel){
    console.log(user)
    return http.post("auth/sign-up",{
      "username": user.email,
      "password": user.password,
      "roles": [
        user.roll
      ]
    })
  }
  login(email: string,password: string){
    return http.post("auth/sign-in",{
      "username": email,
      "password": password,
    })
  }
}

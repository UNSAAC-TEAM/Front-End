import http from "src/app/services/http-common";
import {RegisterModel} from "../core/models/RegisterModel";
export class UserServices{
  register(user: RegisterModel){
    console.log(user)
    return http.post("auth/sign-up",{
      "email": user.email,
      "password": user.password,
      "roles": [
        user.roll
      ],
      "firstName": user.name  ,
      "lastName": user.lastName,
      "country": user.country,
      "phoneNumber": user.phoneNumber
    })
  }
  login(email: string,password: string){
    return http.post("auth/sign-in",{
      "email": email,
      "password": password,
    })
  }
}

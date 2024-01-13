import http from "src/app/services/http-common";
import {RegisterModel} from "../core/models/RegisterModel";
import axios, { AxiosRequestConfig } from 'axios';
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
  updateProfilePicture(token: string,userId: number,imageUrl: string){
    return http.put("http://localhost:8080/api/v1/profile/"+userId+"/changeImageProfile",{
      "imageUrl": imageUrl
    })
  }
}

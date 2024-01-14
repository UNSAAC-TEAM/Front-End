import http from "src/app/services/http-common";
import {RegisterModel} from "../core/models/RegisterModel";
import {Injectable} from "@angular/core";
import {HttpClient,HttpHeaders} from "@angular/common/http";

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
  getUserById(userId: number){
    return http.get("profile/"+userId)
  }
  updateProfilePicture(token: string,userId: number,imageUrl: string){
    return http.put("profile/"+userId+"/changeImageProfile",{
      "imageUrl": imageUrl
    })
  }
  updateProfileData(token: string,userId: number,editProfileBody: any){
    return http.put("profile/"+userId+"/edit",editProfileBody,{ headers: {"Authorization" : `Bearer ${token}`} })
  }
  updateUserPassword(token: string,userId: number,newPassword: string){
    return http.put("user/"+userId+"/changePassword",{
      "newPassword": newPassword
    },{ headers: {"Authorization" : `Bearer ${token}`} })

  }
}

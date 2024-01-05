import http from "src/app/services/http-common";
export class UserServices{
  login(email,password){
    return http.post("auth/login",{
      "email": email,
      "password": password,
    })
  }
}

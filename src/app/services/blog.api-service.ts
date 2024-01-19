import http from "src/app/services/http-common";
import {RegisterModel} from "../core/models/RegisterModel";

import axios, { AxiosRequestConfig } from 'axios';
export class BlogApiService{

  getAllBlogs(page: number,elements: number){
    return axios.get("https://my-json-server.typicode.com/UNSAAC-TEAM/Json/currentPageBlogs")
  }
  postBlog(token: string,userId: number,blogBody: any){
    return http.post("blog/"+userId,blogBody,{ headers: {"Authorization" : `Bearer ${token}`} })
  }

}

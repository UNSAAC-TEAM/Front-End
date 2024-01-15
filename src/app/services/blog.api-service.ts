import http from "src/app/services/http-common";
import {RegisterModel} from "../core/models/RegisterModel";

import axios, { AxiosRequestConfig } from 'axios';
export class BlogApiService{

  getAllBlogs(page: number){
    return axios.get("https://my-json-server.typicode.com/UNSAAC-TEAM/Json/blogs/")
  }

}

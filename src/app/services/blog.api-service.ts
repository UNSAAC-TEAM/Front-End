import http from "src/app/services/http-common";
import {RegisterModel} from "../core/models/RegisterModel";

import axios, { AxiosRequestConfig } from 'axios';
export class BlogApiService{

  getAllBlogs(page: number,elements: number){
    return http.get("blog/get/page/?page="+page+"&itemsPerPage="+elements)
  }
  getCurrentBlogById(blogId: number){
    return http.get("blog/get/"+blogId)
  }
  getRecommendBlog(blogQuantity: number){
    return http.get("blog/get/"+blogQuantity+"/recommended")
  }
  getRecommendCourses(){
    return axios.get("https://my-json-server.typicode.com/UNSAAC-TEAM/jsonBlog/recommendedCourses")
  }
  postBlog(token: string,userId: number,blogBody: any){
    return http.post("blog/"+userId,blogBody,{ headers: {"Authorization" : `Bearer ${token}`} })
  }

}
//https://my-json-server.typicode.com/UNSAAC-TEAM/jsonBlog/currentBlog/1

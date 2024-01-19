import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CryptoData} from "../../services/CryptoJs/crypto-data";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {BlogApiService} from "../../services/blog.api-service";

interface BlogContent {
  id: number;
  authorName: string;
  label: string;
  imageUrl: string;
  title: string;
  description: string;
  content: string;
  publishDate: number;
}
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blogId: string = "";
  isBlogLoading=true
  currentBlog: BlogContent={
    id:1,
    authorName:"",
    label: "",
    imageUrl: "",
    title: "",
    description: "",
    content: "",
    publishDate: 1
  }
  constructor(private sanitizer: DomSanitizer,private crypto: CryptoData,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const encodedId = params['encryptedID'] || "";
      const decodedId = decodeURIComponent(encodedId);
      this.blogId = this.crypto.decryptPageId(decodedId);
      console.log(this.blogId)
    });
    new BlogApiService().getCurrentBlogById(parseInt(this.blogId)).then(response=>{
      this.isBlogLoading=false
      this.currentBlog=response.data
      console.log(this.currentBlog)
    })


  }

}

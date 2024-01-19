import { Component, OnInit } from '@angular/core';
import {CryptoData} from "../../services/CryptoJs/crypto-data";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {BlogApiService} from "../../services/blog.api-service";
import {LoginDataService} from "../../services/comunication/login/login-data.service";
import {ActivatedRoute, Router} from "@angular/router";

interface BlogRecommendedContent {
  id: number;
  authorName: string;
  label: string;
  imageUrl: string;
  title: string;
  description: string;
  content: string;
  publishDate: number;
}
interface CourseRecommendedContent {
  id: number;
  stars: number;
  durationInMinutes: number;
  difficulty: string;
  priceInDollars: number;
  imageUrl: string;
  title: string;
}
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blogId: string = "";
  token=""
  userId= 0;
  isBlogLoading=true
  blogArrayResponse: Array<BlogRecommendedContent>=[]
  courseArrayResponse: Array<CourseRecommendedContent>=[]
  currentBlog: BlogRecommendedContent={
    id:1,
    authorName:"",
    label: "",
    imageUrl: "",
    title: "",
    description: "",
    content: "",
    publishDate: 1
  }
  constructor(private router: Router,private sanitizer: DomSanitizer,private crypto: CryptoData,private route: ActivatedRoute,private loginDataService: LoginDataService) { }

  ngOnInit(): void {
    if(this.loginDataService.userAccount.sessionToken!=null){
      this.token=this.loginDataService.userAccount.sessionToken
      this.userId=this.loginDataService.getUserId(this.token)
      this.route.params.subscribe((params) => {
        const encodedId = params['encryptedID'] || "";
        console.log(encodedId)
        const decodedId = decodeURIComponent(encodedId);
        console.log(decodedId)
        this.blogId = this.crypto.decryptPageId(decodedId);
        console.log(this.blogId)
      });
      new BlogApiService().getCurrentBlogById(parseInt(this.blogId)).then(response=>{
        this.isBlogLoading=false
        this.currentBlog=response.data
        console.log(this.currentBlog)
      })
      new BlogApiService().getRecommendBlogByUserId(this.loginDataService.getUserId(this.loginDataService.userAccount.sessionToken)).then(response=>{
        this.blogArrayResponse=response.data
      })
      new BlogApiService().getRecommendCourses().then(response=>{
        this.courseArrayResponse=response.data
      })
    }


  }
  getDisplayableDate(date: number): string {
    const publishDate = new Date(date);

    const day = String(publishDate.getDate()).padStart(2, '0');
    const month = String(publishDate.getMonth() + 1).padStart(2, '0');
    const year = publishDate.getFullYear();

    return `${day}-${month}-${year}`;
  }
  addEllipsis(text: string): string {
    const lineHeight = 1; // Ajusta según sea necesario
    const maxLines = 150; // Ajusta según sea necesario
    const maxHeight = lineHeight * maxLines;

    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.visibility = 'hidden';
    container.style.width = '300px'; // Ajusta según sea necesario

    const textNode = document.createTextNode(text);
    container.appendChild(textNode);

    document.body.appendChild(container);

    const isOverflowing = container.offsetHeight > maxHeight;

    document.body.removeChild(container);

    if (isOverflowing) {
      return `${text.slice(0, maxHeight / lineHeight - 1)}...` ;
    }

    return text;
  }
  blogRedirect(blogId: number) {
    let encrypted = this.crypto.encryptPageId(blogId.toString());
    this.router.navigate(['/blog/' + encodeURIComponent(encrypted)]);
  }

  watchMoreBlogs() {
    this.router.navigate(['/blogs/']);
  }

  watchMoreCourses() {
    this.router.navigate(['/courses']);
  }
}

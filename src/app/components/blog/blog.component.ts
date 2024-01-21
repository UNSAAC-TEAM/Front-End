import { Component, OnInit } from '@angular/core';
import {CryptoData} from "../../services/CryptoJs/crypto-data";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {BlogApiService} from "../../services/blog.api-service";
import {LoginDataService} from "../../services/comunication/login/login-data.service";
import {ActivatedRoute, Router} from "@angular/router";

interface Star{
  content:""
}

interface BlogRecommendedContent {
  id: number;
  authorFullName: string;
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
  displayableStarArray: Array<Star>=[]
  blogArrayResponse: Array<BlogRecommendedContent>=[]
  courseArrayResponse: Array<CourseRecommendedContent>=[]
  currentBlog: BlogRecommendedContent={
    id:1,
    authorFullName:"",
    label: "",
    imageUrl: "",
    title: "",
    description: "",
    content: "",
    publishDate: 1
  }
  constructor(private router: Router,private sanitizer: DomSanitizer,private crypto: CryptoData,private route: ActivatedRoute,private loginDataService: LoginDataService) { }

  ngOnInit(): void {

      this.route.params.subscribe((params) => {
        const encodedId = params['encryptedID'] || "";
        const decodedId = decodeURIComponent(encodedId);
        this.blogId = this.crypto.decryptPageId(decodedId);
        this.getCurrentPageContent()
      });

    new BlogApiService().getRecommendBlog(3).then(response=>{
      this.blogArrayResponse=response.data
    })
    new BlogApiService().getRecommendCourses().then(response=>{
      this.courseArrayResponse=response.data
    })


  }
  getCurrentPageContent(){
    new BlogApiService().getCurrentBlogById(parseInt(this.blogId)).then(response=>{
      this.isBlogLoading=false
      this.currentBlog=response.data
    })
  }
  getDisplayableDate(date: number): string {
    const publishDate = new Date(date);

    const day = String(publishDate.getDate()).padStart(2, '0');
    const month = String(publishDate.getMonth() + 1).padStart(2, '0');
    const year = publishDate.getFullYear();

    return `${day}-${month}-${year}`;
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
  setStarNumber(stars: number): number[] {
    // Redondear al número entero más cercano y devolver un array de estrellas
    return Array(Math.round(stars)).fill(0);
  }
  returnDisplayableDuration(timeInMinutes: number): string {
    const totalMinutes = Math.floor(timeInMinutes);
    const days = Math.floor(totalMinutes / (24 * 60));
    const hours = Math.floor((totalMinutes % (24 * 60)) / 60);
    const minutes = totalMinutes % 60;

    let displayableDuration = "";

    if (days > 0) {
      displayableDuration += days.toString().padStart(2, '0') + " días ";
    }

    displayableDuration += hours.toString().padStart(2, '0') + ":" +
      minutes.toString().padStart(2, '0') + " Hrs";

    return displayableDuration;
  }
}

import { Component, OnInit } from '@angular/core';
import {BlogApiService} from "../../services/blog.api-service";
import {BlogModel} from "../../core/models/BlogModel";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginComponent} from "../authentication/login/login.component";
import {CryptoData} from "../../services/CryptoJs/crypto-data";
export interface BlogHistory{
  page: number,
  itemList: BlogModel
}
@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  elementsPerPage: number=3;
  pageNumber: number=1;
  blogArrayResponse: Array<BlogModel>=[]
  totalPageBlogsQuantity?:number
  constructor(private crypto: CryptoData,private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.pageNumber = +params['pageNumber'] || 1;
    });
    console.log(this.pageNumber,this.elementsPerPage)
    new BlogApiService().getAllBlogs(this.pageNumber,this.elementsPerPage).then(response=>{
      console.log(response.data)
      this.blogArrayResponse=response.data
      const totalElements = response.data.length;
      this.totalPageBlogsQuantity = Math.ceil(totalElements / this.elementsPerPage);
    })
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
  getDisplayableDate(date: number): string {
    const publishDate = new Date(date);

    const day = String(publishDate.getDate()).padStart(2, '0');
    const month = String(publishDate.getMonth() + 1).padStart(2, '0');
    const year = publishDate.getFullYear();

    return `${day}-${month}-${year}`;
  }
  globalPageChange(pageNumber: number){
    this.pageNumber=pageNumber
    console.log(this.pageNumber,this.elementsPerPage)
    this.blogArrayResponse=[]
    new BlogApiService().getAllBlogs(this.pageNumber,this.elementsPerPage).then(response=>{
      console.log(response.data)
      this.blogArrayResponse=response.data
      const totalElements = response.data.length;
      this.totalPageBlogsQuantity = Math.ceil(totalElements / this.elementsPerPage);
    })
    this.router.navigate(['/blogs/page/'+pageNumber]);
  }

  blogRedirect(blogId: number) {
    let encrypted = this.crypto.encryptPageId(blogId.toString());
    this.router.navigate(['/blog/' + encodeURIComponent(encrypted)]);
  }
}

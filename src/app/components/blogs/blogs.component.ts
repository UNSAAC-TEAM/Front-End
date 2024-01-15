import { Component, OnInit } from '@angular/core';
import {BlogApiService} from "../../services/blog.api-service";
import {BlogModel} from "../../core/models/BlogModel";

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  currentPage=1
  blogArrayResponse: Array<BlogModel>=[]
  constructor() { }

  ngOnInit(): void {
    new BlogApiService().getAllBlogs(this.currentPage).then(response=>{
      this.blogArrayResponse=response.data
    })
  }
  addEllipsis(text: string): string {
    const lineHeight = 1; // Ajusta según sea necesario
    const maxLines = 130; // Ajusta según sea necesario
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

}

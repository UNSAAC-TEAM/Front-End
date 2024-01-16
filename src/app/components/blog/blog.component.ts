import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CryptoData} from "../../services/CryptoJs/crypto-data";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface BlogContent {
  id: number;
  author: string;
  label: string;
  imageUrl: string;
  title: string;
  description: string;
  content: string; // Usaremos SafeHtml para contenido HTML seguro
  publishDate: number;
}
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blogId: string = "";

  constructor(private sanitizer: DomSanitizer,private crypto: CryptoData,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const encodedId = params['encryptedID'] || "";
      const decodedId = decodeURIComponent(encodedId);
      this.blogId = this.crypto.decryptPageId(decodedId);
      console.log(this.blogId)
    });

  }

}

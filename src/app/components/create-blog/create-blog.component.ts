import {Component, inject, OnInit} from '@angular/core'
import {finalize} from "rxjs/operators";

import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {getDownloadURL, ref, uploadBytes} from "@angular/fire/storage";
import firebase from "firebase/compat";
import storage = firebase.storage;
import {FormControl, FormGroup, Validators} from "@angular/forms";

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
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})

export class CreateBlogComponent implements OnInit {
  blogFormGroup  = new FormGroup({
    title: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
  });
  blogContent?: BlogContent
  constructor(private sanitizer: DomSanitizer) { }
  htmlContent='';
  newHtmlContent=''
  isBlogEmpty=false
  ngOnInit(): void {
  }

  safeHTML() {
    const editorHtml: string = this.htmlContent;
    const structuredContent: BlogContent = {
      id:1,
      author: "Diego Talledo",
      label: "BIM",
      imageUrl: "https://www.ulima.edu.pe/sites/default/files/styles/600x300/public/news/img/agenda-biminfraestructura-jun2021.jpg?itok=Lz1BhcAY",
      title: "Avances de implementación BIM en el Sector Público 2023",
      description: "En la última década, la adopción de la metodología BIM ha experimentado un crecimiento significativo en América Latina marcando una transformación clave en el sector de la construcción. Se exploran los avances notables y los esfuerzos estratégicos realizados por diversos países de la región para integrar BIM en proyectos del sector público. A través de casos específicos, se examinará el impacto de la implementación de BIM en diferentes contextos latinoamericanos, así como las proyecciones y desafíos que definen la actual travesía de la región hacia la modernización y la digitalización en el ámbito de la construcción.",
      content: editorHtml,
      publishDate: 1053234000000
    };
    const jsonStructuredContent = JSON.stringify(structuredContent);
    this.blogContent= JSON.parse(jsonStructuredContent);
    console.log(this.blogContent)
  }
  getHTML() {
    if(this.blogContent!=null){
      this.newHtmlContent = this.blogContent.content;
    }
  }
  descriptionOnType() {
    let description: string = <string>this.blogFormGroup.get('description')?.value;
    if(description.length==0){
      this.isBlogEmpty=true
    }else {
      this.isBlogEmpty=false
    }
    // Tu lógica aquí...
    console.log('Escribiendo en la descripción');
  }
}


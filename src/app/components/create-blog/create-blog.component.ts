import {Component, inject, OnInit} from '@angular/core'
import {finalize} from "rxjs/operators";
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {getDownloadURL, ref, uploadBytes} from "@angular/fire/storage";
import firebase from "firebase/compat";
import storage = firebase.storage;
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";


import { EventEmitter,  Input, NgZone,  Output} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {CropperDialogResult} from "../blog-cropper-dialog/blog-cropper-dialog.component";
import { filter } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Subscription } from 'rxjs';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {LoginDataService} from "../../services/comunication/login/login-data.service";
import { jwtDecode } from "jwt-decode";
import {SessionStorageService} from "ngx-webstorage";
import {NgToastService} from "ng-angular-popup";
import {BlogCropperDialogComponent} from "../blog-cropper-dialog/blog-cropper-dialog.component";

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
  imageSelected=false
  blogFormGroup  = new FormGroup({
    title: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
  });
  blogContent?: BlogContent
  private subscription: Subscription
  imagePath = new BehaviorSubject('');
  @Input() set path(val: string) {
    this.imagePath.next(val);
  }
  get placeholder() {
    return 'https://placehold.co/555X315';
  }
  blobResponse:Blob=new Blob()
  croppedImageURL = new BehaviorSubject<string | undefined>(undefined);
  croppedImage = new BehaviorSubject<any | undefined>(undefined);

  get imageSource() {
    if(this.imageSelected){
      return this.croppedImage
    }else {
      return this.placeholder
    }
    //return this.croppedImage.value ?? this.placeholder;
  }

  uploading = new BehaviorSubject(false);

  dialog = inject(MatDialog);

  fileSelected(event: any) {
    const file = event.target?.files[0];
    if (file) {
      const dialogRef = this.dialog.open(BlogCropperDialogComponent, {
        data: {
          image: file,
          width: 555,
          height: 315,
        },
        width: '555',
      });

      dialogRef
        .afterClosed()
        .pipe(filter((result) => !!result))
        .subscribe((result: CropperDialogResult) => {
          this.croppedImage=result.safeUrl
          this.imageSelected=true
          this.blobResponse=result.blob
          //this.uploadImage();//cuando se cierra ahi recien se puede subir la imagen
        });
    }
  }

  @Output() imageReady = new EventEmitter<string>();
  constructor(private toast: NgToastService,private sessionStorageService: SessionStorageService,private storage: AngularFireStorage,public loginDataService: LoginDataService,
              private sanitizer: DomSanitizer) {
    this.subscription = this.croppedImageURL.subscribe(value => {
      if (value) {
        this.imageReady.emit(value);
      }
    });
    this.subscription=this.croppedImage.subscribe(value => {
      if(value){
        this.imageReady.emit(value)
      }
    })
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  htmlContent='';
  newHtmlContent=''
  isBlogEmpty=false
  zone = inject(NgZone);

  async uploadImage() {
    if(this.imageSelected){
      const filePath = "blogPicture/blog.png";
      const storageRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, this.blobResponse);

      // Espera a que la tarea de carga se complete
      await uploadTask;

      // Luego obtén la URL de descarga
      const downloadUrl = await storageRef.getDownloadURL().toPromise();

      this.croppedImageURL.next(downloadUrl);

      console.log(downloadUrl)
      this.toast.success({detail:"Foto actualizada",summary:'Foto de perfil actualizada correctamente',duration:3000});
    }
  }
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
  }
}


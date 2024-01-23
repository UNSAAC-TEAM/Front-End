import {Component, inject, OnInit} from '@angular/core'
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {  SafeHtml } from '@angular/platform-browser';

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
import {BlogApiService} from "../../services/blog.api-service";
import {CryptoData} from "../../services/CryptoJs/crypto-data";

interface BlogContent {
  label: string;
  imageUrl: string;
  title: string;
  description: string;
  content: string;
}

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent implements OnInit {
  token=""
  isBlogUploading=false
  uploadingText="PUBLICAR"
  imageSelected=false
  blogFormGroup  = new FormGroup({
    title: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
    category: new FormControl('',[Validators.required]),
  });
  blogContent?: BlogContent
  private subscription: Subscription
  imagePath = new BehaviorSubject('');
  @Input() set path(val: string) {
    this.imagePath.next(val);
  }
  get placeholder() {
    return 'https://github.com/UNSAAC-TEAM/img/blob/main/portada.jpg?raw=true';
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
  constructor(private crypto: CryptoData,private toast: NgToastService,private sessionStorageService: SessionStorageService,private storage: AngularFireStorage,public loginDataService: LoginDataService,
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
  isPreviewActive=false
  async uploadBlog() {
    this.modificarImagenes()
    if (this.blogFormGroup.valid && this.imageSelected && this.htmlContent.length>0) {
      try {
        if (this.imageSelected) {
          this.isBlogUploading=true
          this.uploadingText="PUBLICANDO"
          const filePath = "blogPicture/"+new Date().toISOString()+this.loginDataService.getUserId(this.token)+ ".png";
          const storageRef = this.storage.ref(filePath);
          const uploadTask = this.storage.upload(filePath, this.blobResponse);

          // Espera a que la tarea de carga se complete
          await uploadTask;

          // Luego obtén la URL de descarga
          const downloadUrl = await storageRef.getDownloadURL().toPromise();

          this.croppedImageURL.next(downloadUrl);

          const editorHtml: string = this.htmlContent;

          const structuredContent: BlogContent = {
            label: <string>this.blogFormGroup.get('category')?.value,
            imageUrl: downloadUrl,
            title: <string>this.blogFormGroup.get('title')?.value,
            description: <string>this.blogFormGroup.get('description')?.value,
            content: editorHtml,
          };

          const jsonStructuredContent = JSON.stringify(structuredContent);
          this.blogContent= JSON.parse(jsonStructuredContent);

          new BlogApiService().postBlog(this.token,this.loginDataService.getUserId(this.token),this.blogContent).then(response=>{
            this.clearBlogData()
            this.isBlogUploading=false
            this.uploadingText="PUBLICAR"
            this.toast.success({ detail: "Blog publicado", summary: 'Blog publicado correctamente', duration: 3000 });
            this.isPreviewActive=false
          }).catch(error=>{
            this.isBlogUploading=false
            this.uploadingText="PUBLICAR"
          })
        }
      } catch (error) {
        this.isBlogUploading=false
        this.uploadingText="PUBLICAR"
        this.toast.error({ detail: "Error al cargar la imagen", summary: 'Error', duration: 3000 });
      }

    }else {
      this.toast.error({ detail: "Error", summary: 'Se deben rellenar todos los campos', duration: 4000 });
    }
  }
  ngOnInit(): void {
    this.token=this.crypto.getDecryptObjectFromStorage().sessionToken
    if(this.loginDataService.userAccount.roll=="ADMIN"){

      console.log("permiso aceptado")
    }else {
      console.log("permiso denegado")
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

  preview() {
    this.modificarImagenes()
    this.isPreviewActive=!this.isPreviewActive
    if(this.blogContent!=null){
      this.newHtmlContent = this.blogContent.content;
    }
  }
  modificarImagenes(): void {

    // Expresión regular para encontrar etiquetas img sin width y height
    const regexSinDimensiones = /<img\s+src="([^"]+)"\s*(?:(?:(?:width|height)\s*=\s*"\d+%\s*")?\s*alt="[^"]*")?\s*\/?>/gi;


    this.htmlContent = this.htmlContent.replace(regexSinDimensiones, (match, src) => {
      // Agregar width="50%" por defecto si no tiene dimensiones
      return `<img src="${src}" width="99%">`;
    });

    // Eliminar alt en todas las etiquetas img
    this.htmlContent = this.htmlContent.replace(/<img\s+([^>]+)?alt="[^"]*"([^>]*)>/gi, '<img $1$2>');

    // Expresión regular para encontrar etiquetas img con width y height en píxeles
    const regexConDimensionesEnPixeles = /<img\s+src="([^"]+)"(?:\s+width="(\d+)"\s+height="(\d+)")?\s*\/?>/gi;

    this.htmlContent = this.htmlContent.replace(regexConDimensionesEnPixeles, (match, src, width, height) => {
      // Calcular porcentaje si las dimensiones están en píxeles
      let anchoPantalla = window.innerWidth;

      if (anchoPantalla >= 1650) {
        anchoPantalla = 1500;
      } else if (anchoPantalla >= 1450) {
        anchoPantalla = 1300;
      } else if (anchoPantalla >= 1250) {
        anchoPantalla = 1100;
      } else if (anchoPantalla >= 1050) {
        anchoPantalla = 900;
      } else if (anchoPantalla >= 850) {
        anchoPantalla = 700;
      } else if (anchoPantalla >= 650) {
        anchoPantalla = 600;
      } else if (anchoPantalla >= 550) {
        anchoPantalla = 400;
      }

      const porcentajeWidth = (parseInt(width) / anchoPantalla) * 100;
      // Modificar solo si las dimensiones son en píxeles
      return `<img src="${src}" width="${porcentajeWidth}%">`;
    });


  }


  clearBlogData():void{
    this.blogFormGroup.patchValue({
      title: null,
      description: null,
      category: null,
    });
    this.htmlContent=""
    this.croppedImage= new BehaviorSubject<any | undefined>(undefined);
    this.imageSelected=false
  }

}


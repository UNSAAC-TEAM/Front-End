import {Component, inject, OnInit} from '@angular/core'
import {finalize} from "rxjs/operators";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {getDownloadURL, ref, uploadBytes} from "@angular/fire/storage";
import firebase from "firebase/compat";
import storage = firebase.storage;

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
  imageChangedEvent: any = '';
  croppedImage: any = '';
  selectedFile: File | null = null; // Inicializa con un valor
  selectedPhotoFile: File | null = null; // Inicializa con un valor
  blogContent?: BlogContent
  constructor(private sanitizer: DomSanitizer,private storage: AngularFireStorage) { }
  htmlContent='';
  newHtmlContent=''
  firebaseVideoUrl = 'https://firebasestorage.googleapis.com/v0/b/agripure-678b4.appspot.com/o/Comp%202.mp4?alt=media&token=5d0a2c99-fdad-4d69-b3d0-59d297d5dee3';
  ngOnInit(): void {
  }
  uploadVideoService(file: File): Promise<string> {
    const filePath = `videos/${file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, file);

    return new Promise((resolve, reject) => {
      uploadTask.snapshotChanges().pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe((downloadURL) => {
            resolve(downloadURL);
          });
        })
      ).subscribe(
        null,
        (error) => reject(error)
      );
    });
  }
  uploadPhotoService(file: File): Promise<string> {
    const filePath = `photo/${file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, file);

    return new Promise((resolve, reject) => {
      uploadTask.snapshotChanges().pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe((downloadURL) => {
            resolve(downloadURL);
          });
        })
      ).subscribe(
        null,
        (error) => reject(error)
      );
    });
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }
  onPhotoFileSelected(event: any) {
    this.selectedPhotoFile = event.target.files[0] as File;
  }
  uploadVideo() {
    if (this.selectedFile) {
      this.uploadVideoService(this.selectedFile)
        .then((downloadURL) => {
          console.log('URL del video:', downloadURL);
          // Aquí puedes hacer algo con la URL del video, por ejemplo, guardarla en una base de datos.
        })
        .catch((error) => {
          console.error('Error al subir el video:', error);
        });
    } else {
      console.warn('No se ha seleccionado ningún video.');
    }
  }
  uploadPhoto() {
    if (this.selectedPhotoFile) {
      this.uploadPhotoService(this.selectedPhotoFile)
        .then((downloadURL) => {
          console.log('URL de la foto:', downloadURL);
          // Puedes hacer algo con la URL de la foto, por ejemplo, guardarla en una base de datos.
        })
        .catch((error) => {
          console.error('Error al subir la foto:', error);
        });
    } else {
      console.warn('No se ha seleccionado ninguna foto.');
    }
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
}


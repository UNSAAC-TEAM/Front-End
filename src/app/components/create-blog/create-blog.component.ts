import { Component, OnInit } from '@angular/core'
import {finalize} from "rxjs/operators";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})

export class CreateBlogComponent implements OnInit {
  selectedFile: File | null = null; // Inicializa con un valor

  constructor(private storage: AngularFireStorage) { }
  htmlContent='';
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
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
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
}

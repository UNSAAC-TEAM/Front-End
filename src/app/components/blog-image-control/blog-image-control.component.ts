import {Component, EventEmitter, inject, Input, NgZone, OnInit, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {CropperDialogComponent, CropperDialogResult,} from '../cropper-dialog/cropper-dialog.component';
import { filter } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subscription } from 'rxjs';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {LoginDataService} from "../../services/comunication/login/login-data.service";
import { jwtDecode } from "jwt-decode";
import {SessionStorageService} from "ngx-webstorage";
import {NgToastService} from "ng-angular-popup";
import {UserServices} from "../../services/user.api-service";
import {BlogCropperDialogComponent} from "../blog-cropper-dialog/blog-cropper-dialog.component";
@Component({
  selector: 'app-blog-image-control',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  template: `
    <div class="control-container" [style.width]="555 + 'px'">
        <div class="image-container">
          <img
            [src]="imageSource"
            [width]="555"
            [height]="315"
            class="mat-elevation-z5"
            [style.opacity]="uploading.getValue() ? 0.1 : 1" />
        </div>
        <div>
          <input
            #inputField
            hidden
            type="file"
            (change)="fileSelected($event)"
            (click)="inputField.value = ''"
          />
          <button mat-raised-button [disabled]="uploading.getValue()" (click)="inputField.click()">
            Elegir
          </button>
        </div>
    </div>
  `,
  styles: [
    `
      .control-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 16px;
        position: relative;
      }

      .image-container {
        border-radius: 5px;
        position: relative;
      }

      img {
        border-radius: inherit;
      }
    `,
  ],
})
export class BlogImageControlComponent{
  private subscription: Subscription
  imagePath = new BehaviorSubject('');
  @Input() set path(val: string) {
    this.imagePath.next(val);
  }
  get placeholder() {
    return 'https://placehold.co/555X315';
  }

  croppedImageURL = new BehaviorSubject<string | undefined>(undefined);

  get imageSource() {
    return this.croppedImageURL.value ?? this.placeholder;
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
          this.uploadImage(result.blob);//cuando se cierra ahi recien se puede subir la imagen
        });
    }
  }

  @Output() imageReady = new EventEmitter<string>();
  constructor(private toast: NgToastService,private sessionStorageService: SessionStorageService,private storage: AngularFireStorage,public loginDataService: LoginDataService)
  {
    this.subscription = this.croppedImageURL.subscribe(value => {
      if (value) {
        this.imageReady.emit(value);
      }
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  zone = inject(NgZone);

  async uploadImage(blob: Blob) {
    if (this.loginDataService.userAccount.sessionToken != null) {
      const decoded = jwtDecode(this.loginDataService.userAccount.sessionToken);
      console.log(decoded)
      let email=decoded.sub
      this.uploading.next(true);
      const filePath = "blogPicture/"+email+".png";
      const storageRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, blob);

      // Espera a que la tarea de carga se complete
      await uploadTask;

      // Luego obtén la URL de descarga
      const downloadUrl = await storageRef.getDownloadURL().toPromise();

      this.croppedImageURL.next(downloadUrl);
      this.toast.success({detail:"Foto actualizada",summary:'Foto de perfil actualizada correctamente',duration:3000});

    }

  }

}

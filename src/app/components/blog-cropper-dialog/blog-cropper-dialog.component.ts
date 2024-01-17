import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCroppedEvent, ImageCropperModule } from 'ngx-image-cropper';
import { BehaviorSubject } from 'rxjs';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

export type CropperDialogData = {
  image: File;
  width: number;
  height: number;
};

export type CropperDialogResult = {
  blob: Blob;
  imageUrl: string;
};
@Component({
  selector: 'app-blog-cropper-dialog',
  standalone: true,
  imports: [CommonModule, ImageCropperModule, MatButtonModule, MatDialogModule],
  template: `
    <div style="display: flex;justify-content: center">
      <div class="container">
        <h1 mat-dialog-title>Recorta tu imagen</h1>
        <div mat-dialog-content>
          <image-cropper
            [maintainAspectRatio]="true"
            [aspectRatio]="data.width / data.height"
            [resizeToHeight]="data.height"
            [resizeToWidth]="data.width"
            [onlyScaleDown]="true"
            [imageFile]="data.image"
            (imageCropped)="imageCropped($event)"
          ></image-cropper>
        </div>

        <div mat-dialog-actions>
          <button mat-button [mat-dialog-close]="false" style="color: white">Cancelar</button>
          <button mat-button [mat-dialog-close]="result.getValue()" style="color: white" cdkFocusInitial>
            Subir
          </button>
        </div>
      </div>
    </div>


  `,
  styles: [
    `
      .container{
        width: 450px;
        background-color: white;
        color: black;
        padding: 15px 20px;
        border-radius: 1rem;
        box-shadow: 0 10px 10px rgba(0, 0, 0, 0.34);
      }
      button{
        color: black;
        background-color: #9b192d;
      }
      @media (max-width: 650px) {
        .container{
          width: 350px;
          background-color: white;
          color: black;
          padding: 15px 20px;
          border-radius: 1rem;
          box-shadow: 0 10px 10px rgba(0, 0, 0, 0.34);
        }
      }
    `
  ],
})
export class BlogCropperDialogComponent{
  data: CropperDialogData = inject(MAT_DIALOG_DATA);

  result = new BehaviorSubject<CropperDialogResult | undefined>(undefined);

  imageCropped(event: ImageCroppedEvent) {
    const { blob, objectUrl } = event;
    if (blob && objectUrl) {
      this.result.next({ blob, imageUrl: objectUrl });
    }
  }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from "./components/footer/footer.component";


@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule
  ],
  exports:[FooterComponent, MatIconModule]
})
export class SharedModule { }

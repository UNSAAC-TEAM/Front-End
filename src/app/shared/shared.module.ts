import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { MatIconModule } from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from "@angular/material/button";
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from "@angular/material/list";
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { FooterComponent } from "./components/footer/footer.component";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatSelectModule} from "@angular/material/select";
import { CourseCardComponent } from './components/course-card/course-card.component';
import {MatCardModule} from "@angular/material/card";

@NgModule({
  declarations: [FooterComponent, CourseCardComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,

    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatSelectModule,

  ],
  exports:[
    RouterModule,
    FooterComponent,
    MatCardModule,
    CourseCardComponent,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatSelectModule,]
})
export class SharedModule { }

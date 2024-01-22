import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DetailCourseComponent} from "./pages/detail-course/detail-course.component";
import {DetailCourseRoutingModule} from "./detail-course-routing.module";
import {SharedModule} from "../../shared/shared.module";
import { DetailCourseCardComponent } from './components/detail-course-card/detail-course-card.component';
import { ModuleCardComponent } from './components/module-card/module-card.component';
import {MatCheckboxModule} from "@angular/material/checkbox";



@NgModule({
  declarations: [DetailCourseComponent, DetailCourseCardComponent, ModuleCardComponent],
  imports: [
    CommonModule,
    DetailCourseRoutingModule,
    SharedModule,
    MatCheckboxModule

  ]
})
export class DetailCourseModule { }

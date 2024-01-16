import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DetailCourseComponent} from "./pages/detail-course/detail-course.component";
import {DetailCourseRoutingModule} from "./detail-course-routing.module";
import {SharedModule} from "../../shared/shared.module";



@NgModule({
  declarations: [DetailCourseComponent],
  imports: [
    CommonModule,
    DetailCourseRoutingModule,
    SharedModule

  ]
})
export class DetailCourseModule { }

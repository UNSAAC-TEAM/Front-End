import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DetailCourseComponent} from "./pages/detail-course/detail-course.component";
import {DetailCourseRoutingModule} from "./detail-course-routing.module";
import {SharedModule} from "../../shared/shared.module";
import { DetailCourseCardComponent } from './components/detail-course-card/detail-course-card.component';



@NgModule({
  declarations: [DetailCourseComponent, DetailCourseCardComponent],
  imports: [
    CommonModule,
    DetailCourseRoutingModule,
    SharedModule

  ]
})
export class DetailCourseModule { }

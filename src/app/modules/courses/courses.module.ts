import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CoursesRoutingModule} from "./courses-routing.module";
import {SharedModule} from "../../shared/shared.module";
import {CoursesComponent} from "./pages/courses/courses.component";



@NgModule({
  declarations: [CoursesComponent],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule
  ]
})
export class CoursesModule { }

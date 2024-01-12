import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CoursesRoutingModule} from "./courses-routing.module";
import {SharedModule} from "../../shared/shared.module";
import {CoursesComponent} from "./pages/courses/courses.component";
import {MatCheckboxModule} from "@angular/material/checkbox";


@NgModule({
  declarations: [CoursesComponent],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    MatCheckboxModule,
    SharedModule
  ]
})
export class CoursesModule { }

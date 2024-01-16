import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CoursesRoutingModule} from "./courses-routing.module";
import {SharedModule} from "../../shared/shared.module";
import {CoursesComponent} from "./pages/courses/courses.component";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {TestService} from "../../services/test.service";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [CoursesComponent],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    MatCheckboxModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [TestService],
})
export class CoursesModule { }

import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {DetailCourseComponent} from "./pages/detail-course/detail-course.component";



const routes: Routes = [
  {
    path: '',
    component: DetailCourseComponent,
    //agregar rutas adicionales dentro de 'premium' si es necesario
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailCourseRoutingModule { }

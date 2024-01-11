import { NgModule } from '@angular/core';

import {RouterModule, Routes} from "@angular/router";
import {CoursesComponent} from "./pages/courses/courses.component";



const routes: Routes = [
  {
    path: '',
    component: CoursesComponent,
    //agregar rutas adicionales dentro de 'premium' si es necesario
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }

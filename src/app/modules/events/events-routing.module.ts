import { NgModule } from '@angular/core';

import {RouterModule, Routes} from "@angular/router";
import {EventsComponent} from "./pages/events/events.component";


const routes: Routes = [
  {
    path: '',
    component: EventsComponent,
    //agregar rutas adicionales dentro de 'premium' si es necesario
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }

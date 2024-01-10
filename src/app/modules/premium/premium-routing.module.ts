import { NgModule } from '@angular/core';
import {PremiumComponent} from "./pages/premium/premium.component";
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: PremiumComponent,
    //agregar rutas adicionales dentro de 'premium' si es necesario
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PremiumRoutingModule { }

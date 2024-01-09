import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PremiumComponent} from "./pages/premium/premium.component";
import { PremiumRoutingModule} from "./premium-routing.module";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    PremiumComponent
  ],
  imports: [
    CommonModule,
    PremiumRoutingModule,
    SharedModule,
  ]
})
export class PremiumModule { }

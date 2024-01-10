import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavbarComponent} from "./navbar.component";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../shared.module";

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ],
  exports:[NavbarComponent]
})
export class NavbarModule { }

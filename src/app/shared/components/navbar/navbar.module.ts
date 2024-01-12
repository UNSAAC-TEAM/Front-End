import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavbarComponent} from "./navbar.component";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../shared.module";
import {MatToolbarModule} from "@angular/material/toolbar";

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    SharedModule
  ],
  exports:[NavbarComponent]
})
export class NavbarModule { }

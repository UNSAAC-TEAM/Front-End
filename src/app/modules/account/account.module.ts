import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AccountRoutingModule} from "./account-routing.module";
import {AccountComponent} from "./pages/account/account.component";
import {CredentialsComponent} from "./components/credentials/credentials.component";
import {EditProfileComponent} from "./components/edit-profile/edit-profile.component";
import {MyCoursesComponent} from "./components/my-courses/my-courses.component";
import {PaymentsComponent} from "./components/payments/payments.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {SubscriptionComponent} from "./components/subscription/subscription.component";
import {SupportComponent} from "./components/support/support.component";
import {SharedModule} from "../../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {ImageControlComponent} from "../../components/image-control/image-control.component";



@NgModule({
  declarations: [AccountComponent,CredentialsComponent,EditProfileComponent,MyCoursesComponent,PaymentsComponent,ProfileComponent,SubscriptionComponent,SupportComponent],
    imports: [
        CommonModule,
        AccountRoutingModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatDatepickerModule,
        ImageControlComponent
    ]
})
export class AccountModule { }

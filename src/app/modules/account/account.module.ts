import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{CredentialsComponent} from "./components/credentials/credentials.component";
import {EditProfileComponent} from "./components/edit-profile/edit-profile.component";
import {MyCoursesComponent} from "./components/my-courses/my-courses.component";
import {PaymentsComponent} from "./components/payments/payments.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {SubscriptionComponent} from "./components/subscription/subscription.component";
import {SupportComponent} from "./components/support/support.component";
import {SharedModule} from "../../shared/shared.module";
import {AccountComponent} from "./pages/account/account.component";
import {AccountRoutingModule} from "./account-routing.module";


@NgModule({
  declarations: [
    AccountComponent,
    CredentialsComponent,
    EditProfileComponent,
    MyCoursesComponent,
    PaymentsComponent,
    ProfileComponent,
    SubscriptionComponent,
    SupportComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule
  ]
})
export class AccountModule { }

import { NgModule } from '@angular/core';

import {RouterModule, Routes} from "@angular/router";
import {AccountComponent} from "./pages/account/account.component";
import {SupportComponent} from "./components/support/support.component";
import {CredentialsComponent} from "./components/credentials/credentials.component";
import {SubscriptionComponent} from "./components/subscription/subscription.component";
import {MyCoursesComponent} from "./components/my-courses/my-courses.component";
import {PaymentsComponent} from "./components/payments/payments.component";
import {EditProfileComponent} from "./components/edit-profile/edit-profile.component";
import {ProfileComponent} from "./components/profile/profile.component";

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      { path: '', component: ProfileComponent },
      { path: 'edit-profile', component: EditProfileComponent },
      { path: 'payment', component: PaymentsComponent },
      { path: 'courses', component: MyCoursesComponent },
      { path: 'subscriptions', component: SubscriptionComponent },
      { path: 'credentials', component: CredentialsComponent },
      { path: 'support', component: SupportComponent },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }

import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AccountComponent} from "./pages/account/account.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {EditProfileComponent} from "./components/edit-profile/edit-profile.component";
import {PaymentsComponent} from "./components/payments/payments.component";
import {MyCoursesComponent} from "./components/my-courses/my-courses.component";
import {SubscriptionComponent} from "./components/subscription/subscription.component";
import {CredentialsComponent} from "./components/credentials/credentials.component";
import {SupportComponent} from "./components/support/support.component";

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    //agregar rutas adicionales dentro de 'premium' si es necesario
    children: [
      {path: '', component: ProfileComponent},
      {path: 'edit-profile', component: EditProfileComponent},
      {path: 'payment', component: PaymentsComponent},
      {path: 'courses', component: MyCoursesComponent},
      {path: 'subscriptions', component: SubscriptionComponent},
      {path: 'credentials', component: CredentialsComponent},
      {path: 'support', component: SupportComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {RoutesComponent} from "./components/routes/routes.component";
import {BlogsComponent} from "./components/blogs/blogs.component";
import {TeachersComponent} from "./components/teachers/teachers.component";
import {CreateBlogComponent} from "./components/create-blog/create-blog.component";
import {AccountComponent} from "./components/account/account.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {EditProfileComponent} from "./components/edit-profile/edit-profile.component";
import {PaymentsComponent} from "./components/payments/payments.component";
import {MyCoursesComponent} from "./components/my-courses/my-courses.component";
import {SubscriptionComponent} from "./components/subscription/subscription.component";
import {CredentialsComponent} from "./components/credentials/credentials.component";
import {SupportComponent} from "./components/support/support.component";

const routes: Routes = [
  {
    path: 'account', component: AccountComponent,
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
  {path: 'routes', component: RoutesComponent},
  {path: 'blogs', component: BlogsComponent},
  {path: 'teachers', component: TeachersComponent},
  {path: 'create-blog', component: CreateBlogComponent},
  {
    path: 'courses',
    loadChildren: () => import('./modules/courses/courses.module').then((m) => m.CoursesModule)
  },
  {
    path: 'events',
    loadChildren: () => import('./modules/events/events.module').then((m) => m.EventsModule)
  },
  {
    path: 'premium',
    loadChildren: () => import('./modules/premium/premium.module').then((m) => m.PremiumModule)
  },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

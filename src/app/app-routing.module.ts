import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {RoutesComponent} from "./components/routes/routes.component";
import {BlogsComponent} from "./components/blogs/blogs.component";
import {TeachersComponent} from "./components/teachers/teachers.component";
import {CreateBlogComponent} from "./components/create-blog/create-blog.component";
import {AccountComponent} from "./modules/account/pages/account/account.component";
import {ProfileComponent} from "./modules/account/components/profile/profile.component";
import {EditProfileComponent} from "./modules/account/components/edit-profile/edit-profile.component";
import {PaymentsComponent} from "./modules/account/components/payments/payments.component";
import {MyCoursesComponent} from "./modules/account/components/my-courses/my-courses.component";
import {SubscriptionComponent} from "./modules/account/components/subscription/subscription.component";
import {CredentialsComponent} from "./modules/account/components/credentials/credentials.component";
import {SupportComponent} from "./modules/account/components/support/support.component";
import {BlogComponent} from "./components/blog/blog.component";
import {CreateCourseComponent} from "./components/create-course/create-course.component";

const routes: Routes = [

  {
    path: 'account',
    loadChildren: () => import('./modules/account/account.module').then((m) => m.AccountModule)
  },
  {path: 'routes', component: RoutesComponent},
  { path: 'blogs/page/:pageNumber', component: BlogsComponent },
  { path: 'blogs', redirectTo: 'blogs/page/1', pathMatch: 'full' },
  {path: 'blog/:encryptedID', component: BlogComponent},
  {path: 'teachers', component: TeachersComponent},
  {path: 'create-blog', component: CreateBlogComponent},
  {path: 'create-course', component: CreateCourseComponent},
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

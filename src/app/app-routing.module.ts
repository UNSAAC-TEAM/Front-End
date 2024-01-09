import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CoursesComponent} from "./components/courses/courses.component";

import {RoutesComponent} from "./components/routes/routes.component";
import {BlogsComponent} from "./components/blogs/blogs.component";
import {TeachersComponent} from "./components/teachers/teachers.component";
import {EventsComponent} from "./components/events/events.component";
import {CreateBlogComponent} from "./components/create-blog/create-blog.component";

const routes: Routes = [
  {path: 'courses', component: CoursesComponent},
  {path: 'routes', component: RoutesComponent},
  {path: 'blogs', component: BlogsComponent},
  {path: 'teachers', component: TeachersComponent},
  {path: 'events', component: EventsComponent},
  {path: 'create-blog', component: CreateBlogComponent},
  {
    path: 'premium',
    loadChildren: () => import('./modules/premium/premium.module').then((m) => m.PremiumModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./modules/account/account.module').then((m) => m.AccountModule),
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

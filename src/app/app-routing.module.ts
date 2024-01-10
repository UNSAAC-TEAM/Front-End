import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CoursesComponent} from "./modules/courses/pages/courses/courses.component";

import {RoutesComponent} from "./components/routes/routes.component";
import {BlogsComponent} from "./components/blogs/blogs.component";
import {TeachersComponent} from "./components/teachers/teachers.component";
import {CreateBlogComponent} from "./components/create-blog/create-blog.component";

const routes: Routes = [
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

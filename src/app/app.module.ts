import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EditorModule } from '@tinymce/tinymce-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoursesComponent } from './components/courses/courses.component';
import { AccountComponent } from './components/account/account.component';
import {RouterModule} from "@angular/router";
import { NavbarComponent } from './components/navbar/navbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from "@angular/material/button";
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from "@angular/material/list";
import { SpecializationsComponent } from './components/specializations/specializations.component';
import { FormsModule } from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import { ProfileComponent } from './components/profile/profile.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { MyCoursesComponent } from './components/my-courses/my-courses.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { RoutesComponent } from './components/routes/routes.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { EventsComponent } from './components/events/events.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { SubscriptionComponent } from './components/subscription/subscription.component';
import { CredentialsComponent } from './components/credentials/credentials.component';
import { SupportComponent } from './components/support/support.component';
import { CreateBlogComponent } from './components/create-blog/create-blog.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideStorage,getStorage } from '@angular/fire/storage';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

import {PremiumModule} from "./modules/premium/premium.module";

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    AccountComponent,
    NavbarComponent,
    SpecializationsComponent,
    ProfileComponent,
    PaymentsComponent,
    MyCoursesComponent,
    EditProfileComponent,
    RoutesComponent,
    TeachersComponent,
    EventsComponent,
    BlogsComponent,
    SubscriptionComponent,
    CredentialsComponent,
    SupportComponent,
    CreateBlogComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        PremiumModule,
        BrowserAnimationsModule,
        EditorModule,
        RouterModule.forRoot([
            {path: 'courses', component: CoursesComponent},
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
          {path: 'events', component: EventsComponent},
          {path: 'premium', component: PremiumModule},
          {path: 'create-blog', component: CreateBlogComponent},

        ]),
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatSidenavModule,
        MatListModule,
        FormsModule,
        MatMenuModule,
        MatDividerModule,
        MatProgressSpinnerModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        MatTableModule,
        MatCardModule,
      provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideStorage(() => getStorage())
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

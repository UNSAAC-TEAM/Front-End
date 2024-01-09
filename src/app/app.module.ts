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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import { PremiumComponent } from './components/premium/premium.component';
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
import {MatDialogModule} from '@angular/material/dialog';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {FormControl, Validators} from '@angular/forms';
import { ForgotPasswordComponent } from './components/authentication/forgot-password/forgot-password.component';
import { NgToastModule } from 'ng-angular-popup';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome' // to be added


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
    PremiumComponent,
    BlogsComponent,
    SubscriptionComponent,
    CredentialsComponent,
    SupportComponent,
    CreateBlogComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
      {path: 'premium', component: PremiumComponent},
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
    MatDialogModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    NgToastModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EditorModule } from '@tinymce/tinymce-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SpecializationsComponent } from './components/specializations/specializations.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { CreateBlogComponent } from './components/create-blog/create-blog.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideStorage,getStorage } from '@angular/fire/storage';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {NavbarModule} from "./shared/components/navbar/navbar.module";
import {MyCoursesComponent} from "./components/my-courses/my-courses.component";
import {PaymentsComponent} from "./components/payments/payments.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {CredentialsComponent} from "./components/credentials/credentials.component";
import {SupportComponent} from "./components/support/support.component";
import {SubscriptionComponent} from "./components/subscription/subscription.component";
import {EditProfileComponent} from "./components/edit-profile/edit-profile.component";
import {AccountComponent} from "./components/account/account.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";

@NgModule({
  declarations: [
    AppComponent,
    SpecializationsComponent,
    TeachersComponent,
    BlogsComponent,
    CreateBlogComponent,
    AccountComponent,
    ProfileComponent,
    EditProfileComponent,
    PaymentsComponent,
    MyCoursesComponent,
    SubscriptionComponent,
    CredentialsComponent,
    SupportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavbarModule,
    BrowserAnimationsModule,
    EditorModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatListModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

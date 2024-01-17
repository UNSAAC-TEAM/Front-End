import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EditorModule } from '@tinymce/tinymce-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SpecializationsComponent } from './components/specializations/specializations.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import { ProfileComponent } from './modules/account/components/profile/profile.component';
import { PaymentsComponent } from './modules/account/components/payments/payments.component';
import { MyCoursesComponent } from './modules/account/components/my-courses/my-courses.component';
import { EditProfileComponent } from './modules/account/components/edit-profile/edit-profile.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { TeachersComponent } from './components/teachers/teachers.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { CreateBlogComponent } from './components/create-blog/create-blog.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideStorage,getStorage } from '@angular/fire/storage';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";

import {NavbarModule} from "./shared/components/navbar/navbar.module";

import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";

import {MatDialogModule} from '@angular/material/dialog';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { ForgotPasswordComponent } from './components/authentication/forgot-password/forgot-password.component';
import { NgToastModule } from 'ng-angular-popup';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome' // to be added
import { NgxWebstorageModule } from 'ngx-webstorage';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatGridListModule} from '@angular/material/grid-list';
import {NgxPaginationModule} from 'ngx-pagination';
import { BlogComponent } from './components/blog/blog.component';
import {BlogImageControlComponent} from "./components/blog-image-control/blog-image-control.component";
import { CreateCourseComponent } from './components/create-course/create-course.component';
@NgModule({
  declarations: [
    AppComponent,
    SpecializationsComponent,

    //falta modular estos componentes
    TeachersComponent,
    BlogsComponent,
    CreateBlogComponent,
    CreateBlogComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    BlogComponent,
    CreateCourseComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NavbarModule,
    AppRoutingModule,

    EditorModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatListModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),

    EditorModule,
    NgxWebstorageModule.forRoot(),
    MatGridListModule,
    ImageCropperModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    FormsModule,
    MatMenuModule,
    MatDividerModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    NgToastModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgxPaginationModule,
    BlogImageControlComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

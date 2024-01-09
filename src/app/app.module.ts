import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EditorModule } from '@tinymce/tinymce-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoursesComponent } from './components/courses/courses.component';

import { SpecializationsComponent } from './components/specializations/specializations.component';

import { TeachersComponent } from './components/teachers/teachers.component';
import { EventsComponent } from './components/events/events.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { CreateBlogComponent } from './components/create-blog/create-blog.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideStorage,getStorage } from '@angular/fire/storage';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";

import {SharedModule} from "./shared/shared.module";

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    SpecializationsComponent,
    TeachersComponent,
    EventsComponent,
    BlogsComponent,
    CreateBlogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    EditorModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

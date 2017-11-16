import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DetailsComponent } from './details/details.component';
import { NewsListComponent } from './news-list/news-list.component';
import {RouterModule} from "@angular/router";
import { AddPostComponent } from './add-post/add-post.component';
import {HttpModule} from "@angular/http";
import {DataService} from "./shared/data.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

const routes = [
  {path: '', redirectTo: 'news', pathMatch: 'full'},
  {path: 'news', component: NewsListComponent},
  {path: 'add', component: AddPostComponent},
  {path: 'details/:id', component: DetailsComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    DetailsComponent,
    NewsListComponent,
    AddPostComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }

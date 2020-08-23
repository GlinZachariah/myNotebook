import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from "./app-routing.module";
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxSummernoteModule } from "ngx-summernote";
import { HttpClientModule } from '@angular/common/http';
import { NotebookModule } from "./notebook/notebook.module";
import { EditorModule } from "./editor/editor.module";
import { ViewerModule } from "./viewer/viewer.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSummernoteModule,
    EditorModule,
    ViewerModule,
    NotebookModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

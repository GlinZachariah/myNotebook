import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from "./app-routing.module";
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http';
import { NotebookModule } from "./notebook/notebook.module";
import { NotebookService } from './services/notebook.service';
import { HeaderComponent } from './notebook/header/header.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    NotebookModule
  ],
  providers: [NotebookService],
  bootstrap: [AppComponent]
})
export class AppModule { }

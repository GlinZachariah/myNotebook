import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionComponent } from './section/section.component';
import { PageComponent } from './page/page.component';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { FormsModule } from '@angular/forms';
import { EditorComponent } from './editor/editor.component';
import { ViewerComponent } from './viewer/viewer.component';
import { NgxSummernoteModule } from "ngx-summernote";


@NgModule({
  declarations: [SectionComponent, PageComponent, HomeComponent, NotfoundComponent, EditorComponent, ViewerComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgxSummernoteModule
  ]
})
export class NotebookModule { }

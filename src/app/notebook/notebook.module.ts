import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionComponent } from './section/section.component';
import { PageComponent } from './page/page.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [SectionComponent, PageComponent, HomeComponent, HeaderComponent],
  imports: [
    CommonModule
  ]
})
export class NotebookModule { }

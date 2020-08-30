import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionComponent } from './section/section.component';
import { PageComponent } from './page/page.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [SectionComponent, PageComponent, HomeComponent, HeaderComponent, NotfoundComponent],
  imports: [
    CommonModule,
    FormsModule,
  ]
})
export class NotebookModule { }

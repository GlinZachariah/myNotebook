import { Component, OnInit } from '@angular/core';
import { NotebookService } from "../../services/notebook.service";
import { Notebook } from 'src/app/services/notebook.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  notebooksList;

  currentNotebook:Notebook;
  currentPage;
  
  constructor(private service:NotebookService) { 
    this.notebooksList=this.service.notebooks;
   }

  ngOnInit(): void {
  }

  addNewSection(section:HTMLInputElement){
    if(section.value.length > 0 && !section.validity.patternMismatch)
    this.service.notebooks.push(new Notebook(section.value));
    section.value='';
  }

  addNewPage(page:HTMLInputElement){
    if(page.value.length > 0 && !page.validity.patternMismatch)
    this.service.notebooks.forEach((note:Notebook)=>{
      if(this.currentNotebook.section == note.section){
        note.addPage(page.value);
      }
    });
    page.value='';
  }

  showNote(note:Notebook){
    this.currentNotebook = note;
    console.log(note);
  }

  showPage(page:string){
    this.currentPage = page;
    console.log(this.currentPage);
  }

}

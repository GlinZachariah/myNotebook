import { Component, OnInit } from '@angular/core';
import { NotebookService } from "../../services/notebook.service";
import { Notebook } from 'src/app/services/notebook.model';
import { Response } from "../../services/Response.model";
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
    this.service.getSectionDetails().subscribe((res:Response)=>{
      console.log(res);
      if(res.message == "ERROR")
        console.log(res);
      else if(res.message == "NOT EMPTY"){
        let filenames:string[] = res.payLoad;
        filenames.forEach((file)=>{
          this.service.notebooks.push(new Notebook(file));
        })
      }
    });
  }

  addNewSection(section:HTMLInputElement){
    if(section.value.length > 0 && !section.validity.patternMismatch)
      this.service.notebooks.push(new Notebook(section.value));
      this.service.addNewSection(section.value).subscribe((req)=>{
        console.log(req);

      })
      
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

  deleteSection(note:Notebook){
    this.service.deleteSection(note.section).subscribe((res:Response)=>{
      if(res.message == "ERROR")
        console.log(res)
      else
        var pos = this.service.notebooks.indexOf(note);
        this.service.notebooks.splice(pos,1);
    });
  }

  showPage(page:string){
    this.currentPage = page;
    console.log(this.currentPage);
  }

}

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
  constructor(private service:NotebookService) { 
    this.notebooksList=this.service.notebooks;
   }

  ngOnInit(): void {
  }

  addNewSection(sectionData:HTMLInputElement){
    if(sectionData.value.length > 0 && !sectionData.validity.patternMismatch)
    this.service.notebooks.push(new Notebook(sectionData.value));
    sectionData.value='';
  }

}

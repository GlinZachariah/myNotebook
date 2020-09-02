import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Notebook } from 'src/app/services/notebook.model';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {
  showDelete:boolean = false;
  showEdit:boolean =false;
  data:string;
  @Input() currentNote:Notebook;
  @Output() loadNote = new EventEmitter<Notebook>();
  @Output() deleteNote = new EventEmitter<Notebook>();
  @Output() updateNote = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  editSection(){
    this.showEdit =true;
    this.data = this.currentNote.section;
  }

  loadPage(){
    this.loadNote.emit(this.currentNote);
  }

  deleteSection(){
    this.deleteNote.emit(this.currentNote);
  }

  updateSection(sectionEdit : HTMLInputElement){
    if(this.data.trim().length > 0 && !sectionEdit.validity.patternMismatch){
      this.showEdit= false;
      this.updateNote.emit(this.currentNote.section+'<>'+this.data.trim());
    }
    
    
   
  }

}

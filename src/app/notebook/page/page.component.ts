import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  showDelete:boolean = false;
  showEdit:boolean =false;
  data:string;
  @Input("currentPage") currentPage:string;
  @Output("loadPage") loadPage = new EventEmitter<string>();
  @Output() removePage = new EventEmitter<string>();
  @Output() renamePage = new EventEmitter<string>();
  constructor() { }


  ngOnInit(): void {
  }

  loadContent(page:string){
    this.loadPage.emit(page);
  }

  editPage(){
    this.showEdit =true;
    this.data = this.currentPage;
  }

  updatePage(pageEdit:HTMLInputElement){
    if(this.data.trim().length > 0 && !pageEdit.validity.patternMismatch){
      this.showEdit= false;
      this.renamePage.emit(this.currentPage+'<>'+this.data.trim());
    }
  }

  deletePage(){
    this.removePage.emit(this.currentPage);
  }


}

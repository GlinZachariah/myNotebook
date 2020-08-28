import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  showDelete:boolean = false;
  @Input("currentPage") currentPage:string;
  @Output("loadPage") loadPage = new EventEmitter<string>();
  constructor() { }


  ngOnInit(): void {
  }

  loadContent(page:string){
    this.loadPage.emit(page);
  }

}

import { Injectable } from '@angular/core';
import { Notebook } from "../services/notebook.model";
import { HttpClient } from '@angular/common/http';
import { RequestModel } from "../services/request.model";

@Injectable({
  providedIn: 'root'
})
export class NotebookService {
  notebooks:Notebook[]=[];
  firstLoad:boolean = false;

  showViewer:boolean = true;
  constructor(private http: HttpClient) { }

  getPageContent(section,page){
    return this.http.get("/api/editor/getFile/"+section+"/"+page);
  }

  updatePageContent(section,page,content){
    return this.http.put("/api/editor/updateFile",new RequestModel("updatePageContent",{section:section,page:page,data:content}));
  }

  

  
}

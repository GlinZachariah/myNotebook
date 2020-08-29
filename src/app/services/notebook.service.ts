import { Injectable } from '@angular/core';
import { Notebook } from "../services/notebook.model";
import { HttpClient } from '@angular/common/http';
import { RequestModel } from "../services/request.model";

@Injectable({
  providedIn: 'root'
})
export class NotebookService {
  notebooks:Notebook[]=[];
  constructor(private http:HttpClient) { }

  addNewSection(value){
    return this.http.post("/api/section/addNewSection",new RequestModel("addNewSection",value));
  }

  getSectionDetails(){
    return this.http.get("/api/section/getSectionDetails");
  }

  deleteSection(value){
    return this.http.post("/api/section/deleteSection", new RequestModel("deleteSection",value));
  }
}

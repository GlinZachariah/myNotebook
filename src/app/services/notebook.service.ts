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
  constructor(private http:HttpClient) { }

  addNewSection(value){
    return this.http.post("/api/section/addNewSection",new RequestModel("addNewSection",value));
  }
        
  getSectionDetails(){
    return this.http.get("/api/section/getSectionDetails");
  }

  deleteSection(value){
    return this.http.delete("/api/section/deleteSection/"+value);
  }

  updateSection(oldValue,newValue){
    return this.http.put("/api/section/editSection",new RequestModel("editSection",{oldName:oldValue,newName:newValue}));
  }

  
}

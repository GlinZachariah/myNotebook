import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestModel } from './request.model';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

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

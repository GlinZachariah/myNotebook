import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestModel } from './request.model';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor(private http:HttpClient) { }

  createPage(section,page){
    return this.http.post("/api/page/addPage",new RequestModel("createPage",{sectionName:section,pageName:page}));
  }

  getPages(section){
    return this.http.get("/api/page/getPages/"+section);
  }

  deletePage(section,page){
    return this.http.delete("/api/page/deletePage/"+section+"/"+page);
  }

  editPage(section,oldName,newName){
    return this.http.put("/api/page/editPage",new RequestModel("editPage",{sectionName:section,oldName:oldName,newName:newName}));
  }


}

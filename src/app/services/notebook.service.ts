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
  constructor() { }

  

  

  
}

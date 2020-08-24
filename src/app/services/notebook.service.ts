import { Injectable } from '@angular/core';
import { Notebook } from "../services/notebook.model";

@Injectable({
  providedIn: 'root'
})
export class NotebookService {
  notebooks:Notebook[]=[];
  constructor() { }
}

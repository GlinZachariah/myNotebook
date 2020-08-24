import { Component, OnInit, Input } from '@angular/core';
import { Notebook } from 'src/app/services/notebook.model';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {
  showDelete:boolean = false;
  @Input() currentNote:Notebook;
  constructor() { }

  ngOnInit(): void {
  }

}

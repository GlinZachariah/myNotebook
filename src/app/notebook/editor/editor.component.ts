import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  height='800px';
  
  
  @Input() content;
  @Output() saveEvent = new EventEmitter<string>();
  
  config = {
    placeholder: '',
    tabsize: 2,
    height: '80vh',
    uploadImagePath: '/api/upload',
    toolbar: [
        ['misc', ['codeview', 'undo', 'redo']],
        ['style', ['bold', 'italic', 'underline', 'clear']],
        ['font', ['strikethrough', 'superscript', 'subscript']],
        ['fontsize', ['fontname', 'fontsize', 'color']],
        ['para', ['style', 'ul', 'ol', 'paragraph', 'height']],
        ['insert', ['table', 'picture', 'link', 'video', 'hr']]
    ],
    fontNames: ['Helvetica', 'Arial', 'Arial Black','Courier New', 'Roboto', 'Times']
  }
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  saveContent(){
    // this.content = this.sanitizer.bypassSecurityTrustHtml(this.content);
    // this.content = this.content.replace('&quot;','\'');
    let regex = /&quot;/g;
    this.content = this.content.replace(regex,'\'');
    console.log(this.content);
    this.saveEvent.emit(this.content);
  }

}

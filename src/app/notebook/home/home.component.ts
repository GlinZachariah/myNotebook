import { Component, OnInit } from '@angular/core';
import { NotebookService } from "../../services/notebook.service";
import { Notebook } from 'src/app/services/notebook.model';
import { Response } from "../../services/Response.model";
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  notebooksList;

  currentNotebook:Notebook;
  currentPage;
  
  constructor(private service:NotebookService,private router:Router,private route:ActivatedRoute) { 
    this.notebooksList=this.service.notebooks;
   }

  ngOnInit(): void {
    if(!this.service.firstLoad){
      this.service.getSectionDetails().subscribe((res:Response)=>{
        console.log(res);
        if(res.message == "ERROR")
          console.log(res);
        else if(res.message == "NOT EMPTY"){
          let filenames:string[] = res.payLoad;
          var sectionPresent = false;
          // console.log(this.route);
          filenames.forEach((file)=>{
            if(this.route.snapshot.params != undefined && this.route.snapshot.params.section == file){
              this.currentNotebook = new Notebook(file);
              this.service.notebooks.push(this.currentNotebook);
              sectionPresent =true;
            }else if(this.route.snapshot.params.section != file){
              this.service.notebooks.push(new Notebook(file));
            }
          })
          this.service.firstLoad = true;
          if(this.route.snapshot.params.section != undefined && !sectionPresent){
            console.log("Not valid page");
            this.router.navigate(["404"],{replaceUrl:true});
          }
        }
      });
    }else{
      if(this.route.snapshot.params != undefined){
         this.service.notebooks.forEach((note)=>{
          if(note.section == this.route.snapshot.params.section)
            this.currentNotebook = note;
        });
      }
    }

   
    
  }

  addNewSection(section:HTMLInputElement){
    section.value = section.value.trim();
    if(section.value.length > 0 && !section.validity.patternMismatch)
      var duplicate = 0;
      this.service.notebooks.forEach((note)=>{
        if(note.section == section.value){
          duplicate =1;
        }
      });
      if(duplicate == 0){
        this.service.notebooks.push(new Notebook(section.value));
        this.service.addNewSection(section.value).subscribe((req)=>{
          // console.log(req);
  
        });
      }
    section.value='';
  }

  addNewPage(page:HTMLInputElement){
    if(page.value.length > 0 && !page.validity.patternMismatch)
    this.service.notebooks.forEach((note:Notebook)=>{
      if(this.currentNotebook.section == note.section){
        note.addPage(page.value);
      }
    });
    page.value='';
  }

  showNote(note:Notebook){
    this.currentNotebook = note;

    this.router.navigate(['notebook',note.section]);
    console.log(note);
  }

  deleteSection(note:Notebook){
    this.service.deleteSection(note.section).subscribe((res:Response)=>{
      if(res.message == "ERROR")
        console.log(res)
      else
        var pos = this.service.notebooks.indexOf(note);
        this.service.notebooks.splice(pos,1);
        if(note == this.currentNotebook)
          this.router.navigate(['']);
    });
  }

  showPage(page:string){
    this.currentPage = page;
    console.log(this.currentPage);
  }

  updateNote(event:string){
    let names = event.split("<>");
    this.service.updateSection(names[0],names[1]).subscribe((res)=>{
      this.service.notebooks.forEach((note)=>{
        if(note.section == names[0]){
          note.section = names[1];
          // if(this.route.snapshot.params!= undefined && this.route.snapshot.params.section == names[0]){
          //   // console.log(this.route);
          //   // console.log(this.route.params.subscribe());
          //   // this.route.params.subscribe
          //   // this.router.navigate(['section',names[1]],{replaceUrl:true});
          // }
        }
          
      });
    })

  }

}

import { Component, OnInit } from '@angular/core';
import { NotebookService } from "../../services/notebook.service";
import { SectionService } from "../../services/section.service";
import { PageService } from "../../services/page.service";
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
  viewState;
  
  constructor(
    private service:NotebookService,
    private router:Router,
    private route:ActivatedRoute,
    private sectionService:SectionService,
    private pageService:PageService
    ) { 
    this.notebooksList=this.service.notebooks;
   }

  ngOnInit(): void {
    if(!this.service.firstLoad){
      this.sectionService.getSectionDetails().subscribe((res:Response)=>{
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
              this.showNote(this.currentNotebook);
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
            if(this.route.snapshot.params.page != undefined){
              this.currentPage = this.route.snapshot.params.page;
              this.viewState = this.service.showViewer;
            } 
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
        this.sectionService.addNewSection(section.value).subscribe((req)=>{
          // console.log(req);
  
        });
      }
    section.value='';
  }

  displaySection(){
    this.currentNotebook = null;
  }

  addNewPage(page:HTMLInputElement){
    if(page.value.length > 0 && !page.validity.patternMismatch)
    this.service.notebooks.forEach((note:Notebook)=>{
      if(this.currentNotebook.section == note.section){
        note.addPage(page.value);
        this.pageService.createPage(note.section,page.value).subscribe((res:Response)=>{
          if(res.message != "FILE CREATED")
            note.page.splice(note.page.length,1);
        });
      }
    });
    page.value='';
  }

  

  deleteSection(note:Notebook){
    this.sectionService.deleteSection(note.section).subscribe((res:Response)=>{
      if(res.message == "ERROR")
        console.log(res)
      else
        var pos = this.service.notebooks.indexOf(note);
        this.service.notebooks.splice(pos,1);
        if(note == this.currentNotebook)
          this.router.navigate(['']);
    });
  }

  

  updateNote(event:string){
    let names = event.split("<>");
    this.sectionService.updateSection(names[0],names[1]).subscribe((res)=>{
      this.service.notebooks.forEach((note)=>{
        if(note.section == names[0]){
          note.section = names[1];
          if(this.route.snapshot.params!= undefined && this.route.snapshot.params.section == names[0])
            this.showNote(note);
        }
          
      });
    })

  }

  showNote(note:Notebook){
    this.currentNotebook = note;
    this.pageService.getPages(note.section).subscribe((res:Response)=>{
        if(res.message == "NOT EMPTY"){
          this.currentNotebook.page = res.payLoad;
        }
        this.router.navigate(['notebook',note.section]);
    });
  }

  showPage(page:string){
    this.currentPage = page;
    this.router.navigate(['/notebook',this.currentNotebook.section,page]);
    
  }


  editPage(event:string){
    let names = event.split("<>");
    this.pageService.editPage(this.route.snapshot.params.section,names[0],names[1]).subscribe((res:Response)=>{
      this.currentNotebook.page.forEach((value,index)=>{
        if(value == names[0]){
          this.currentNotebook.page[index] = names[1];
        }
      });
    });

  }

  deletePage(event:string){
    this.pageService.deletePage(this.route.snapshot.params.section,event).subscribe((res:Response)=>{
      console.log(res);
      this.currentNotebook.page.forEach((value,index)=>{
        if(value == event){
          this.currentNotebook.page.splice(index,1);
        }
      })
    });
  }


  showEditor(){
    this.viewState = false;
    this.service.showViewer = false;
  }

  showViewer(){
    this.viewState = true;
    this.service.showViewer = true;
  }

}

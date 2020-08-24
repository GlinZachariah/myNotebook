export class Notebook{
    page:string[]

    constructor( public section:string ){}

    addPage(newPage){
        this.page.push(newPage);
    }

}
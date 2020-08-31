import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';

import { HomeComponent } from "./notebook/home/home.component";
import { NotfoundComponent } from './notebook/notfound/notfound.component';

const routes: Routes = [
    {
        path:"",
        component:HomeComponent
    },
    {
      path:"notebook/:section",
      component:HomeComponent
    },{
      path:"404",
      component:NotfoundComponent
    },{
      path:"**",
      component:NotfoundComponent
    }
];

const config: ExtraOptions = {
  enableTracing: true,
};

@NgModule({
  // imports: [RouterModule.forRoot(routes,config)],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
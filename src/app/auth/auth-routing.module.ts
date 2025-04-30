import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { ForgetComponent } from './Components/forget/forget.component';


const routes: Routes = [


  {path:'login',component:LoginComponent,title:'Login Page'},
  {path:'forget',component:ForgetComponent,title:'Forget Page'}
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

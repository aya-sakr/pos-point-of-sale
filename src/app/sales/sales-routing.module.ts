import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReturnComponent } from '../return/components/return/return.component';
import { SalesComponent } from './components/sales/sales.component';

const routes: Routes = [
  {path:'',component:SalesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }

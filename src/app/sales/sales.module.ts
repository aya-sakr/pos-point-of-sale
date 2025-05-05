import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatTableModule} from '@angular/material/table';

import { SalesRoutingModule } from './sales-routing.module';
import { SalesComponent } from './components/sales/sales.component';


@NgModule({
  declarations: [
    SalesComponent
  ],
  imports: [
    CommonModule,
    SalesRoutingModule,
    MatTableModule,
  ]
})
export class SalesModule { }

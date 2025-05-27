import { importProvidersFrom, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import {MatTableModule} from '@angular/material/table';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SalesRoutingModule } from './sales-routing.module';
import { SalesComponent } from './components/sales/sales.component';
import { ProductSalesFormComponent } from './components/product-sales-form/product-sales-form.component';
import { ProductSalesSummaryComponent } from './components/product-sales-summary/product-sales-summary.component';
import { ProductSalesListComponent } from './components/product-sales-list/product-sales-list.component'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';




@NgModule({
  declarations: [
    SalesComponent,
    
    ProductSalesFormComponent,
    ProductSalesSummaryComponent,
    ProductSalesListComponent
  ],
  imports: [
    CommonModule,
    SalesRoutingModule,
    MatTableModule,
    InputTextModule,
    RadioButtonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    TableModule,
    DropdownModule
  ]
})
export class SalesModule { }

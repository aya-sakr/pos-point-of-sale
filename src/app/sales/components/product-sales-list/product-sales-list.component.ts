import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-sales-list',
  templateUrl: './product-sales-list.component.html',
  styleUrls: ['./product-sales-list.component.scss'],
})
export class ProductSalesListComponent implements OnInit {
 
  @Input() tableData: any[] = []; 

  constructor(private router:Router) {}

  ngOnInit(): void {
  
    
    
    
   
    
  }
  editProduct(barcode:any) {
   localStorage.setItem('productEditBarcode',JSON.stringify(barcode))  
  }
  deletProduct(index: number) {
    console.log(this.tableData);
    this.tableData.splice(index,1)
    
    
    
  }

}

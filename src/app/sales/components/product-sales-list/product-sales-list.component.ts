import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-sales-list',
  templateUrl: './product-sales-list.component.html',
  styleUrls: ['./product-sales-list.component.scss'],
})
export class ProductSalesListComponent implements OnInit {
  @Input() tableData: any[] = [];
  totalPrice: any;
  searchText: any
  filterArray:any[]=[]

  constructor(private toaster:ToastrService) {}
  ngOnInit(): void {}
  deletProduct(index: number) {
    console.log(this.tableData);
    this.tableData.splice(index, 1);
    this.toaster.success('The product deleted ','success')

  }
  onProductSearch(event: any) {
    
   }
    
    
  
  onQuantityChange(event: any) {
    this.totalPrice = this.tableData[0].price * event;
  }
  decreaseQuantity() {
    if (this.tableData[0].quantity > 1) {
      this.tableData[0].quantity--;
      this.onQuantityChange(this.tableData[0].quantity);
    }
  }
  increaseQuantity() {
    this.tableData[0].quantity++;
    this.onQuantityChange(this.tableData[0].quantity);
  }
}

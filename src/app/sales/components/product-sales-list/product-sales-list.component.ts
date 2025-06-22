import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
 
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-sales-list',
  templateUrl: './product-sales-list.component.html',
  styleUrls: ['./product-sales-list.component.scss'],
})
export class ProductSalesListComponent implements OnInit,OnChanges {
  @Input() tableData: any[] = [];
  totalPrice: any;
  searchText: any;
  productPillForm!: FormGroup;

  constructor(private toaster: ToastrService, private fb: FormBuilder) {}

  ngOnInit() {
    this.initaitForm();
 
   
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tableData'] && this.tableData.length > 0) {
      console.log(this.tableData,'onchanges');
      this.sumTotals()
      
      
    }
  }
 
 
  deletProduct(index: number) {
    console.log(this.tableData);
    this.tableData.splice(index, 1);
    this.toaster.success('The product deleted ', 'success');
  }
  

  onQuantityChange(event: any, index: number) {
    this.tableData[index].quantity = event
   
    this.tableData[index].totalPrice = this.tableData[index].price * event
    this.sumTotals()
   

  }
  sumTotals() {
    console.log('Running sumTotals', this.tableData);

    const totalQuantity = this.tableData.reduce((sum, item) => sum + Number(item.quantity), 0)
    const totalPrice = this.tableData.reduce((sum, item) => sum + Number(item.totalPrice), 0);
    this.productPillForm.patchValue({
      sumTotalQuantity: totalQuantity,
      sumTotalPrice: totalPrice

    })

  }
  decreaseQuantity(index: number) {
    if (this.tableData[index].quantity > 1) {
      this.tableData[index].quantity--;
      this.onQuantityChange(this.tableData[index].quantity, index);
  
      
    }
  }
  increaseQuantity(index: number) {
    this.tableData[index].quantity++;
    this.onQuantityChange(this.tableData[index].quantity, index);
  
 
 
   
  }

  initaitForm() {
    this.productPillForm = this.fb.group({
      sumTotalQuantity: [0],
      sumTotalPrice: [0],
   

    });
  
   
 
  
  }
  
 

  submitPill() {
    console.log(this.productPillForm.value);
    
  }
  deletPill() { }

 }


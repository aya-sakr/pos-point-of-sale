import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-sales-summary',
  templateUrl: './product-sales-summary.component.html',
  styleUrls: ['./product-sales-summary.component.scss']
})
export class ProductSalesSummaryComponent implements OnInit {
  productSummaryForm!: FormGroup
  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {
    // this.initaitForm()
    // console.log(this.productSummaryForm);
    
  }
  initaitForm() {
    // this.productSummaryForm = this.fb.group({
    //   totalQuantity: [''],
    //   totalPrice:['']

    // })
  }
  submitPill() {
    // console.log(this.productSummaryForm.value);
    
  }

}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemsService } from 'src/app/items/services/items.service';

@Component({
  selector: 'app-product-sales-form',
  templateUrl: './product-sales-form.component.html',
  styleUrls: ['./product-sales-form.component.scss'],
})
export class ProductSalesFormComponent implements OnInit {
  @ViewChild('quantityInput') quantityInput!: ElementRef;
  productSalesForm!: FormGroup;
  barcode: string = '';
  cities: any;
  checkTotalPrice: any;
  selectedCity: any = '';
  allProducts: any[] = [];
  productName: string[] = [];
  selectedItem: any;
  constructor(private fb: FormBuilder, private itemsService: ItemsService) {}
  ngOnInit() {
    this.itemsService.getAllItems().subscribe((data: any) => {
      console.log(data);

      this.productName = data.map((item: any) => ({
        name: item.name,
        id: item.id,
      }));
    });

    this.initiatSalesForm();
  }
  initiatSalesForm() {
    this.productSalesForm = this.fb.group({
      priceType: ['retail', Validators.required],
      barcode: ['', Validators.required],
      productName: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
      totalPrice: ['', Validators.required],
    });

    this.productSalesForm
      .get('barcode')
      ?.valueChanges.subscribe((value: any) => {
        if (value) {
          // console.log(value)
          this.itemsService.getProductByBarcode(value).subscribe((res: any) => {
            if (res) {
              // console.log(res[0].name)

              this.productSalesForm.controls['productName'].setValue(
                res[0].name
              ),
                this.productSalesForm.controls['price'].setValue(res[0].retail),
                this.productSalesForm.controls[
                  'quantity'
                ].valueChanges.subscribe((res: any) => {
                  this.checkTotalPrice =
                    res * this.productSalesForm.value.price;
                  this.productSalesForm.controls['totalPrice'].setValue(
                    this.checkTotalPrice
                  );
                  // this.quantityInput.nativeElement.focus()
                });
            }
          });
        }
      });
  }

  submitData() {
    //   this.itemsService.getProductByBarcode(this.productSales.value.barcode).subscribe((res: any) => {
    //     this.productSales.controls['productName'] = res.name
    //     this.productSales.controls['price'] = res.retailssss
    //    })
  }
}

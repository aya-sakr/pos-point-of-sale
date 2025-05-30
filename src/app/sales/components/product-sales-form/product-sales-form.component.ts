import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { identity } from 'rxjs';

import { ItemsService } from 'src/app/items/services/items.service';

@Component({
  selector: 'app-product-sales-form',
  templateUrl: './product-sales-form.component.html',
  styleUrls: ['./product-sales-form.component.scss'],
})
export class ProductSalesFormComponent implements OnInit,OnChanges {
  @ViewChild('quantityInput') quantityInput!: ElementRef;
  productSalesForm!: FormGroup;
  barcode: string = '';
  cities: any;
  checkTotalPrice: any;
  selectedCity: any = '';
  allProducts: any[] = [];
  productName: string[] = [];
  selectedProduct: any;
  productList: any[] = [];
  query: any;
  selectedName: any;
  mode: boolean = true
  productEditBarcode:any
  @Output() sendForm = new EventEmitter<any>();
  constructor(private fb: FormBuilder, private itemsService: ItemsService) {}
  ngOnInit() {
    this.getProducts()
    this.initiatSalesForm();
   
  }
   ngOnChanges() {
    if (this.productEditBarcode) {
      this.mode =false
      this.editProduct()
    } else {
      this.mode =true
    }
    
  }

  getProducts() {
    this.itemsService.getAllItems().subscribe((data: any) => {
      this.allProducts = data;
    });

    
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
  search() {
    if (!this.selectedProduct) {
      this.productList = this.allProducts;
    } else {
      console.log(this.selectedProduct);
      this.productList = this.allProducts.filter((product: any) => {
        return product.name
          .toLowerCase()
          .includes(this.selectedProduct.toLowerCase());
      });
    }
  }
  onProductSelect(event: any) {
    const query = event.value;

    console.log(this.query);
    console.log(event.value,'value');
    
    this.productSalesForm.controls['price'].setValue(query.retail),
      this.productSalesForm.controls['productName'].setValue(query.name),
      this.productSalesForm.controls['barcode'].setValue(query.barcode);
    this.productSalesForm.controls['quantity'].valueChanges.subscribe((res) => {
      this.checkTotalPrice = res * this.productSalesForm.value.price;
      this.productSalesForm.controls['totalPrice'].setValue(
        this.checkTotalPrice
      );
    });
    // this.selectedName =null

    // this.itemsService.getProductByName(query.name).subscribe((response:any) => {
    //   // this.productSalesForm.controls['barcode'].setValue('12552')
    //   this.productSalesForm.controls['productName'].setValue(response[0].name)

    // })
  }
 
  editProduct() {
    this.mode = false
    this.editProductForm(this.productEditBarcode)
    
   
    
  }

  editProductForm(id: any) {
    this.itemsService.getProductByBarcode(id).subscribe((response: any) => {
      this.productSalesForm.controls['barcode'].setValue(response.barcode);
      this.productSalesForm.controls['price'].setValue(response.retail),
        this.productSalesForm.controls['productName'].setValue(response.name),
        this.productSalesForm.controls['quantity'].setValue(response.quantity)
        this.productSalesForm.controls['quantity'].setValue(response.totalPrice)
      
      
        

    })  
  }

  submitData() {
    if (this.mode) {
      this.sendForm.emit(this.productSalesForm.value);
      console.log(this.productSalesForm.value,'form value');
      
      this.productSalesForm.reset();
     
      
    }
    else {
      this.productEditBarcode = JSON.parse(localStorage.getItem('productEditBarcode') || 'null')
      console.log(this.productEditBarcode);
      this.productSalesForm.controls
      
      
    }
    
  }

 
}

import {
  Component,
  ElementRef,
  EventEmitter,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { ItemsService } from 'src/app/items/services/items.service';

@Component({
  selector: 'app-product-sales-form',
  templateUrl: './product-sales-form.component.html',
  styleUrls: ['./product-sales-form.component.scss'],
})
export class ProductSalesFormComponent implements OnInit {
  @ViewChild('quantityInput') quantityInput!: ElementRef;
  productSalesForm!: FormGroup;
  barcode: any;
  cities: any;
  checkTotalPrice: any;
  selectedCity: any = '';
  allProducts: any[] = [];
  productName: string[] = [];
  selectedProduct: any;
  productList: any[] = [];
  query: any;
  selectedName: any;
  mode: boolean = true;
  productEditBarcode: any;
  selectedPric: number = 0;
  productId!: string;
  @Output() sendForm = new EventEmitter<any>();
  constructor(
    private fb: FormBuilder,
    private itemsService: ItemsService,
    private toaster: ToastrService
  ) {
    this.productSalesForm = this.fb.group({
      barcode: ['', [Validators.required, Validators.pattern('[0-9]{6,}')]],
      productName: ['', Validators.required],
      priceType: ['retail', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
      totalPrice: ['', Validators.required],
      id: [''],
    });
  }
  ngOnInit() {
    this.getProducts();
    this.getProductByBarcode();
    // upate total price when Quantity change
    this.productSalesForm
      .get('quantity')
      ?.valueChanges.subscribe((qty: number) => {
        this.updateTotalPrice(qty);
      });

    // update price when radio button change
    this.productSalesForm
      .get('priceType')
      ?.valueChanges.subscribe((type: string) => {
        this.updatePrice(type);
      });
  }

  getProducts() {
    this.itemsService.getAllItems().subscribe((data: any) => {
      this.allProducts = data;
    });
  }

  getProductByBarcode() {
    this.productSalesForm
      .get('barcode')
      ?.valueChanges.subscribe((value: any) => {
        if (this.productSalesForm.get('barcode')?.valid) {
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
                });
            }
          });
        }
      });
  }

  searchByName() {
    if (!this.selectedProduct) {
      this.productList = this.allProducts;
      console.log(this.productList);
    } else {
      this.productList = this.allProducts.filter((product: any) => {
        return product.name
          .toLowerCase()
          .includes(this.selectedProduct.toLowerCase());
      });
    }
  }
  updateTotalPrice(quantity: number) {
    this.checkTotalPrice = quantity * this.selectedPric;
  }
  onProductSelect(event: any) {
    const query = event.value;

    this.itemsService
      .getProductByName(query.name)
      .subscribe((response: any) => {
        console.log(response);
        const product = response[0];

        if (product.barcode === '') {
          this.mode = false;
          this.updateTotalPrice(product.quantity);
        }
        this.productSalesForm.patchValue({
          barcode: product.barcode,
          productName: product.name,
          price: product.retail,
          priceType: 'retail',
          quantity: '',
        });
        this.selectedPric = product.retail;
        this.quantityInput.nativeElement.focus();
        this.productId = product.id;
      });
  }
  updatePrice(type: string) {
    this.itemsService
      .getProductByName(this.productSalesForm.value.productName)
      .subscribe((res: any) => {
        const product = res[0];
        if (type === 'retail') {
          this.selectedPric = product.retail;
          this.updateTotalPrice(product.quantity);
        } else if (type === 'wholesale') {
          this.selectedPric = product.wholesale;
          this.updateTotalPrice(product.quantity);
        }
        this.productSalesForm.patchValue({
          price: this.selectedPric,
        });
        // this.updateTotalPrice(this.productSalesForm.value.quantity);
      });
  }

  barcodeChange(event: any) {
    console.log(event);
  }
  submitData() {
    const product = this.productSalesForm.value;
    if (!this.mode) {
      console.log(this.productId);
      const newBarcode = this.productSalesForm.value.barcode;
      this.itemsService
        .updateBarcodeOnly(this.productId, newBarcode)
        .subscribe((res) => {
          this.toaster.success('The product Updated ', 'Success');
        });
    } else {
      this.itemsService.postSalesProduct(product).subscribe((res) => {
        console.log(res, 'productSales');
      });
    }
  }
}

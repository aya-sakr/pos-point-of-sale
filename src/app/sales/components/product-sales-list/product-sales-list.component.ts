import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SalesSharedService } from '../../Service/sales-shared.service';

@Component({
  selector: 'app-product-sales-list',
  templateUrl: './product-sales-list.component.html',
  styleUrls: ['./product-sales-list.component.scss'],
})
export class ProductSalesListComponent implements OnInit {
  productPillForm!: FormGroup;
  showTableMode: boolean = false;
  filterProduct: any[] = [];
  formData: any[] = [];
  totalPrice: any;
  searchText: any;
  data: any[] = [];

  constructor(
    private toaster: ToastrService,
    private fb: FormBuilder,
    private sharedSalesService: SalesSharedService
  ) {
    this.productPillForm = this.fb.group({
      sumTotalQuantity: [],
      sumTotalPrice: [],
    });
  }

  ngOnInit() {
    this.loadSharedData();
  }

  loadSharedData() {
    this.sharedSalesService.getFormData().subscribe((response) => {
      if (!response) return;

      // this.originalData = [...res]
      const newProducts = Array.isArray(response) ? response : [response];

      newProducts.forEach((product: any) => {
        const indexExist = this.formData.findIndex(
          (p) => p.barcode === product.barcode
        );

        if (indexExist === -1) {
          this.formData.push(product);
          this.data = this.formData;
          this.showTableMode = true;
          this.sumTotals();
        } else {
          this.formData[indexExist].quantity = Number(product.quantity) || 1;
          this.sumTotals();
        }
      });
    });
  }
  onSearch() {
    if (this.searchText && this.searchText.trim() !== '') {
      this.filterProduct = this.formData.filter((item: any) => {
        return item.productName
          .toLowerCase()
          .includes(this.searchText.toLowerCase());
      });
      this.formData = this.filterProduct;
    } else {
      this.formData = this.data;
    }
  }

  clearSearchText() {
    this.searchText = '';
    this.formData = this.data;
  }

  onQuantityChange(event: any, index: number) {
    this.formData[index].quantity = event;

    this.formData[index].totalPrice = this.formData[index].price * event;
    this.sumTotals();
  }
  decreaseQuantity(index: number) {
    if (this.formData[index].quantity > 1) {
      this.formData[index].quantity--;
      this.onQuantityChange(this.formData[index].quantity, index);
      this.sumTotals();
    }
  }
  increaseQuantity(index: number) {
    this.formData[index].quantity++;
    this.onQuantityChange(this.formData[index].quantity, index);
    this.sumTotals();
  }
  sumTotals() {
    const totalQuantity = this.formData.reduce(
      (acc, item) => acc + Number(item.quantity || 0),
      0
    );
    const totalPrice = this.formData.reduce(
      (acc, item) => acc + Number(item.totalPrice || 0),
      0
    );

    this.productPillForm.patchValue({
      sumTotalQuantity: totalQuantity,
      sumTotalPrice: totalPrice,
    });
  }
  deletProduct(index: number) {
    this.formData.splice(index, 1);
    this.toaster.success('The product deleted ', 'success');
  }

  submitPill() {
    console.log(this.productPillForm.value);
  }
  deletPill() {
    this.productPillForm.reset();
  }
}

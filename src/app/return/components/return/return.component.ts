import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ItemsService } from 'src/app/items/services/items.service';
import { Items } from 'src/app/Models/items';

@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.scss'],
})
export class ReturnComponent {
  productBarcode: string = '';
  returnProduct: Items[] = [];
  returnQuantity: number = 1;
  constructor(
    private itemService: ItemsService,
    private toaster: ToastrService
  ) {}

  getreturnProduct(barcode: string) {
    this.itemService.getProductByBarcode(barcode).subscribe((res: Items[]) => {
      this.returnProduct = res;
    });
  }
  returnItem() {
    const totalQuantity = this.returnProduct[0].quantity;
    const updateTotalQuantity = +totalQuantity + +this.returnQuantity;
    this.itemService
      .updateQuantity(this.returnProduct[0].id, updateTotalQuantity)
      .subscribe(() => {
        this.toaster.success(' Total Quantity upated', 'Success');
      });
  }
}

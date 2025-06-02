import { Component, ViewChild } from '@angular/core';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
})
export class SalesComponent {
  productListParent: any[] = [];
  recieveForm(data: any) {
    this.productListParent.push(data);
    console.log(this.productListParent);
  }
}

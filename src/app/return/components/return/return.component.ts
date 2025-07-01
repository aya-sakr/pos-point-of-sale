
import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { ItemsService } from 'src/app/items/services/items.service';
import { Items } from 'src/app/Models/items';

@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.scss']
})
export class ReturnComponent implements OnInit {
  productBarcode: string = ''
  returnProduct: Items[]=[]
  constructor(private itemService: ItemsService) {
  
    
  }
  ngOnInit(): void {
       
  }
  getreturnProduct(barcode: string) {
    this.itemService.getProductByBarcode(barcode).subscribe((res: Items[]) => {
      this.returnProduct = res
      console.log(this.returnProduct);
      

  
    
    
    })
    

   
      
  
  }
  

}

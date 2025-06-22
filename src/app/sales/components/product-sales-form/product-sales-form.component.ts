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


import { ItemsService } from 'src/app/items/services/items.service';

@Component({
  selector: 'app-product-sales-form',
  templateUrl: './product-sales-form.component.html',
  styleUrls: ['./product-sales-form.component.scss'],
})
export class ProductSalesFormComponent implements OnInit,OnChanges {
  @ViewChild('quantityInput') quantityInput!: ElementRef;
  productSalesForm!: FormGroup;
  barcode:any
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
    this.  getProductByBarcode()
   
  }
   ngOnChanges() {
    
    
  }

  getProducts() {
    this.itemsService.getAllItems().subscribe((data: any) => {
      this.allProducts = data;
    });

    
  }
  initiatSalesForm() {
    this.productSalesForm = this.fb.group({
      barcode: ['', [Validators.required,Validators.pattern('[0-9]{6,}')]],
      productName: ['', Validators.required],
      priceType: ['retail', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
      totalPrice: ['', Validators.required]
    });

     
   
  }
  getProductByBarcode() {
    this.productSalesForm.get('barcode')?.valueChanges.subscribe((value: any) => {
      if ( (this.productSalesForm.get('barcode')?.valid)) {
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
  onProductChange(event: any) {
    console.log(event);
    
    
  }
  search() {
    if (!this.selectedProduct) {
      this.productList = this.allProducts;
      console.log(this.productList);
      
    } else {


      this.productList = this.allProducts.filter((product: any) => {
        return product.name.toLowerCase().includes(this.selectedProduct.toLowerCase())
      });
    }
  }
  onProductSelect(event: any) {
    const query = event.value;

    console.log(this.query);
    console.log(event.value,'value');
    
    this.productSalesForm.controls['price'].setValue(query.retail),
    this.productSalesForm.controls['barcode'].setValue(query.barcode ),
      this.productSalesForm.controls['productName'].setValue(query.name),
    this.productSalesForm.controls['quantity'].valueChanges.subscribe((res) => {
      this.checkTotalPrice = res * this.productSalesForm.value.price;
      this.productSalesForm.controls['totalPrice'].setValue(
        this.checkTotalPrice
      );
    });
    // if (this.productSalesForm.get('barcode')?.valid) {
    //   this.productSalesForm.controls['barcode'].setValue(this.productSalesForm.controls['barcode'].valueChanges)
       
        
      
  
      
      
    // }
   

    // this.itemsService.getProductByName(query.name).subscribe((response: any) => {
    //   if (!query.barcode) {
    //     this.productSalesForm.controls['price'].setValue(response[0].retail),
    //       this.productSalesForm.controls['productName'].setValue(response[0].name)
    //       this.productSalesForm.controls['quantity'].valueChanges.subscribe((res) => {
    //          this.checkTotalPrice = res * this.productSalesForm.value.price;
    //          this.productSalesForm.controls['totalPrice'].setValue(
    //             this.checkTotalPrice
    //           );
    //       });
    //     this.barcodeChange(response[0].barcode)
         
       }
     

    

 

  barcodeChange(event: any) {
    console.log(event);
    
  
  }
  submitData() {

      this.sendForm.emit(this.productSalesForm.value);
      // console.log(this.productSalesForm.value, 'form value');
      // this.productSalesForm.get('barcode')?.valueChanges == this.productSalesForm.value.barcode
      // console.log(this.productSalesForm.value.barcode,'barcode');
    
       this.productSalesForm.reset();
     
      
  
   
  
    
  }

 
}

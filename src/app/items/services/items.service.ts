import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Items } from 'src/app/Models/items';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  apiUrl:string="http://localhost:3000/items"


  constructor(private http: HttpClient) {
   
  }

  getAllItems():Observable<Items[]> {
    return  this.http.get<Items[]>(`${this.apiUrl}`)

  }
  postnewUser(newItem: Items):Observable<Items[]> {
      return this.http.post<Items[]>(this.apiUrl, newItem);
  }
  
  getItemById(id: string):Observable<Items>
   {
    return this.http.get<Items>(`${this.apiUrl}/${id}`)
  }

  updateItem(id:string,updateItem:Items) :Observable<Items>{
    return this.http.put<Items>(`${this.apiUrl}/${id}`,updateItem)
  }

  deletItem(id: string):Observable<Items> {
    return this.http.delete<Items>(`http://localhost:3000/items/${id}`);
    
  }
  getProductByBarcode(barcode: string):any {
    const params = new HttpParams().set('barcode',barcode)
    return this.http.get(this.apiUrl,{params});
  }
 
  getProductByName(query: string) {
    const params = new HttpParams().set('name',query)
    return this.http.get(this.apiUrl,{params});
    
  }
  updateBarcodeOnly(id: string, barcode: any) {
    return this.http.patch(`${this.apiUrl}/${id}`, {
      barcode: barcode
    });
  } postSalesProduct(salesProduct: any) {
    return this.http.post(this.apiUrl,salesProduct)
    
  }
}



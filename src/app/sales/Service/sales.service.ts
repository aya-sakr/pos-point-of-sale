import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private http: HttpClient) {
    //    postSalesProduct(salesProduct:):Observable<Items[]> {
    //         return this.http.post<Items[]>(this.apiUrl, newItem);
    //     }
    //  }
  }
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Iusers } from 'src/app/Models/iusers';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiUrl:string="http://localhost:3000/users"
 
 
   constructor(private http:HttpClient) { 
    
   }
   getAllUsers():Observable<Iusers[]>{
     return this.http.get<Iusers[]>(this.apiUrl)
       
   }
   postnewUser(newUser:Iusers){
    return this.http.post<Iusers[]>(this.apiUrl,newUser)
   }
}

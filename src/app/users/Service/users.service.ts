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
   getUserById(id:string){
    return this.http.get(`${this.apiUrl}/${id}`)
   }
   postnewUser(newUser:Iusers){
    return this.http.post<Iusers[]>(this.apiUrl,newUser)
   }
   deletUser(id:any){
    return this.http.delete( `${this.apiUrl}/${id}`)
   }
   updateUsers(id:string,model:Iusers){
    return this.http.put(`${this.apiUrl}/${id}`,model);
    
   }
}

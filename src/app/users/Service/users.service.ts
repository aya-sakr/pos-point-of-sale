import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Iusers } from 'src/app/Models/iusers';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  apiUrl: string = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}
  getAllUsers(): Observable<Iusers[]> {
    return this.http.get<Iusers[]>(this.apiUrl);
  }
  postnewUser(newUser: Iusers) {
    return this.http.post<Iusers[]>(this.apiUrl, newUser);
  }
  deletUser(id: any) {
    return this.http.delete(`http://localhost:3000/users/${id}`);
  }

  getUserById(id: string): Observable<Iusers> {
    return this.http.get<Iusers>(`${this.apiUrl}/${id}`);
  }

  updateUsers(id: string, model: Iusers):Observable<Iusers>  {
    return this.http.put<Iusers>(`${this.apiUrl}/${id}`, model);
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Iusers } from 'src/app/Models/iusers';
@Injectable({
  providedIn: 'root'
})
export class SharedUserService {
  private newUserSubject = new BehaviorSubject<any[] >([])

  constructor() { }

  setNewUser(userData:any){
    const currentUsers:any = this.newUserSubject.getValue()
     return this.newUserSubject.next([...currentUsers,userData])
  }
  getNewUser(){
     return this.newUserSubject.asObservable()
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Iusers } from 'src/app/Models/iusers';
@Injectable({
  providedIn: 'root'
})
export class SharedUserService {
  private newUserSubject = new BehaviorSubject<Iusers|boolean| null >(null)

  constructor() { }

  setNewUser( users:Iusers){
    return this.newUserSubject.next(users)

  }
  getNewUser(){
    return this.newUserSubject.asObservable()
  }
  setMode(mode:boolean){
    return this.newUserSubject.next(mode)
  }
  getMode(){
    return this.newUserSubject.asObservable()
  }
  setEditUser(editUser:Iusers){
    this.newUserSubject.next(editUser)

  }
  getEditUser(){
    this.newUserSubject.asObservable()
  }
}

import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { UsersService } from '../../Service/users.service';
import { Iusers } from 'src/app/Models/iusers';
import { _MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddUsersComponent } from '../add-users/add-users.component';
import { SharedUserService } from '../../Service/shared-user.service';




@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],

})
export class UsersComponent  implements OnInit{
  
  
  allUsers:Iusers[]=[]
  constructor( private usersService:UsersService ,private dialog:MatDialog,public userSharedService:SharedUserService){}
 ngOnInit(){
 
    this.getUsers()
  
  
}

getUsers(){
  this.usersService.getAllUsers().subscribe((data:any)=>{
    this.allUsers = data

  })
}
 addNewUser(){
 this.dialog.open(AddUsersComponent,{
  disableClose:true
 })


  

}
handleUsers(updatUser:Iusers[]){
  this.allUsers= updatUser

}

}

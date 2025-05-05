import { Component, OnInit } from '@angular/core';

import { UsersService } from '../../Service/users.service';
import { Iusers } from 'src/app/Models/iusers';
import { _MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],

})
export class UsersComponent  implements OnInit{

  allUsers:any
  constructor( private usersService:UsersService){}
 ngOnInit(): void {
  this.getUsers()
  
}
getUsers(){
  this.usersService.getAllUsers().subscribe((data:any)=>{
    this.allUsers = data

  })
}

}

import { Component, OnInit } from '@angular/core';

import { UsersService } from '../../Service/users.service';
import { Iusers } from 'src/app/Models/iusers';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],

})
export class UsersComponent  implements OnInit{
  allUsers:Iusers[]=[]
  constructor( private usersService:UsersService){}
ngOnInit(): void {
  this.getUsers()
  
}
getUsers(){
  this.usersService.getAllUsers().subscribe((res:any)=>{
    this.allUsers =res

  })
}

}

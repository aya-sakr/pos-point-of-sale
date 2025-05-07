import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges,  OnInit,  Output,  ViewChild } from '@angular/core';
import { Iusers } from 'src/app/Models/iusers';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { UsersService } from 'src/app/users/Service/users.service';
import { ActivatedRoute } from '@angular/router';








@Component({
  selector: 'app-table-shared',
   standalone:true,
  templateUrl: './table-shared.component.html',
  styleUrls: ['./table-shared.component.scss'],
  imports:[CommonModule,MatTableModule,MatPaginatorModule],
 

  
})
export class TableSharedComponent implements OnChanges,OnInit {
  dataSource: any
  users:Iusers[]=[]
  @ViewChild(MatPaginator) Paginator!:MatPaginator
  @Input() userData?:Iusers[]
        displayedColumns: string[] = [ 'id','username', 'Password','action'];

  @Output() updateUsers = new EventEmitter<Iusers[]>()      
       
  constructor(private userService:UsersService){
   
  }
ngOnInit(): void {
  this.getAllUsers()
}

 




ngOnChanges() {
  this.dataSource = new MatTableDataSource<Iusers>(this.userData)
  this.dataSource.paginator = this.Paginator
  
  

}
editUser(){

}
getAllUsers(){
  this.userService.getAllUsers().subscribe((res)=>{
    this.users=res
    console.log(this.users)
  })
}
deletUser(index:any){
  let id = this.users[index].id
  this.users.splice(index,1)
  this.userService.deletUser(id).subscribe(()=>{
   
    alert ('user deleted') 
   
    this.updateUsers.emit(this.users)
  })

  
  
 
 

}

}
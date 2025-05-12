import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { Iusers } from 'src/app/Models/iusers';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { UsersService } from 'src/app/users/Service/users.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddUsersComponent } from 'src/app/users/components/add-users/add-users.component';
import { SharedUserService } from 'src/app/users/Service/shared-user.service';
@Component({
  selector: 'app-table-shared',
  standalone: true,
  templateUrl: './table-shared.component.html',
  styleUrls: ['./table-shared.component.scss'],
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatDialogModule],

})
export class TableSharedComponent implements OnChanges, OnInit {
  mode!: boolean
  dataSource: any
  users: Iusers[] = []
  @ViewChild(MatPaginator) Paginator!: MatPaginator
  @Input() userData?: Iusers[]
  displayedColumns: string[] = ['username', 'Password', 'action'];

  @Output() deleteUsers = new EventEmitter<Iusers>()
  @Output() modeOutPut = new EventEmitter<boolean>()

  constructor(private userService: UsersService, private dialog: MatDialog,private userSheredService:SharedUserService) {

  }
  ngOnInit(): void {

  }
  ngOnChanges() {
    this.dataSource = new MatTableDataSource<Iusers>(this.userData)
    this.dataSource.paginator = this.Paginator
  }
  onEditUser(id: string) {
  
   
     
     

    
   
  }
  deletUser(id: number) {
    this.userService.deletUser(id).subscribe((res: any) => {
      this.deleteUsers.emit(res)

      alert('user deleted')


    })






  }

}
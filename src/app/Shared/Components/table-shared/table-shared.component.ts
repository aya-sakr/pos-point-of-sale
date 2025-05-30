import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Iusers } from 'src/app/Models/iusers';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { UsersService } from 'src/app/users/Service/users.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-table-shared',
  standalone: true,
  templateUrl: './table-shared.component.html',
  styleUrls: ['./table-shared.component.scss'],
  imports: [CommonModule, MatTableModule, MatPaginatorModule,ToastrModule],
})
export class TableSharedComponent implements OnChanges, OnInit,AfterViewInit {
  @Output() deleteUsers = new EventEmitter<Iusers>();
  @Output() openDialog = new EventEmitter();
  @ViewChild(MatPaginator) Paginator!: MatPaginator;
  @Input() userData?: Iusers[];
  dataSource: any;

  users: Iusers[] = [];
  displayedColumns: string[] = ['username', 'Password', 'action'];


  constructor(private userService: UsersService,private toaster:ToastrService) {}


  ngOnInit(): void { }
 

  ngOnChanges() {
    if (this.userData) {
      this.dataSource= new MatTableDataSource<Iusers>(this.userData)
    }
    if (this.Paginator) {
      this.dataSource.paginator =this.openDialog
    }
    
  }
  ngAfterViewInit() {

      this.dataSource = new MatTableDataSource<Iusers>(this.userData);
      this.dataSource.paginator = this.Paginator;
      
    
    
    
  }
  editUser(userEditId:number) {
    this.openDialog.emit(userEditId)
  }

  deletUser(id: any) {
    this.userService.deletUser(id).subscribe((res: any) => {
      this.deleteUsers.emit(res);
     this.toaster.success('User Deleted','Success')
    });
  }
}

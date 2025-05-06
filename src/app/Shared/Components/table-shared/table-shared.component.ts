import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges,  OnInit,  ViewChild } from '@angular/core';
import { Iusers } from 'src/app/Models/iusers';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';








@Component({
  selector: 'app-table-shared',
   standalone:true,
  templateUrl: './table-shared.component.html',
  styleUrls: ['./table-shared.component.scss'],
  imports:[CommonModule,MatTableModule,MatPaginatorModule],
 

  
})
export class TableSharedComponent implements OnChanges {
  @ViewChild(MatPaginator) Paginator!:MatPaginator
  constructor(){}


 
@Input() userData?:Iusers[]
displayedColumns: string[] = ['id', 'username', 'Password'];
dataSource: any




ngOnChanges() {
  this.dataSource = new MatTableDataSource<Iusers>(this.userData)
  this.dataSource.paginator = this.Paginator
  
  

}

}
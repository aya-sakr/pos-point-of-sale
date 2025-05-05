import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges,  ViewChild } from '@angular/core';
import { Iusers } from 'src/app/Models/iusers';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';






@Component({
  selector: 'app-table-shared',
   standalone:true,
  templateUrl: './table-shared.component.html',
  styleUrls: ['./table-shared.component.scss'],
  imports:[CommonModule,MatTableModule,MatPaginatorModule],
 

  
})
export class TableSharedComponent implements OnChanges {
  @ViewChild (MatPaginator) paginator!: MatPaginator;
 
@Input() userData?:Iusers[]
displayedColumns: string[] = ['id', 'username', 'Password'];
dataSource: any


// ngAfterViewInit() {
 
  
// }


ngOnChanges() {
  this.dataSource = this.userData
  this.dataSource.paginator = this.paginator;
  

}

}
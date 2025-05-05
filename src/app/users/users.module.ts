import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './components/users/users.component';
import { RouterModule } from '@angular/router';
import { TableSharedComponent } from '../Shared/Components/table-shared/table-shared.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    UsersComponent,
    
   

  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    RouterModule,
    TableSharedComponent,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule
   
    
  ]
})
export class UsersModule { }

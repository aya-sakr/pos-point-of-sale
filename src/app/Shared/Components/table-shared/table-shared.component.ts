import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Iusers } from 'src/app/Models/iusers';



@Component({
  selector: 'app-table-shared',
   standalone:true,
  templateUrl: './table-shared.component.html',
  styleUrls: ['./table-shared.component.scss'],
  imports:[CommonModule]

  
})
export class TableSharedComponent {
@Input() userData?:Iusers[]

}
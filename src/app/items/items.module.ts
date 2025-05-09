import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemsRoutingModule } from './items-routing.module';
import { ItemsComponent } from './components/items/items.component';


@NgModule({
  declarations: [
    ItemsComponent
  ],
  imports: [
    CommonModule,
    ItemsRoutingModule
  ]
})
export class ItemsModule { }

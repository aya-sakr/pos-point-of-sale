import {
  AfterViewInit,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ItemsService } from '../../services/items.service';
import { Router } from '@angular/router';
import { SharedItemsService } from '../../services/shared-items.service';
import { Items } from 'src/app/Models/items';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss'],
})
export class ItemsListComponent implements OnInit {
  SearchMode: boolean = false;
  searchText: string = '';
  dataSource: any;
  allItems: Items[] = [];
  filteredArray: any;
  displayedColumns: string[] = [
    'barcode',
    'name',
    'purchase',
    'wholesale',
    'retail',
    'quantity',
    'action',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private itemService: ItemsService,
    private router: Router,
    private itemSharedService: SharedItemsService,
    protected toaster: ToastrService
  ) {}
  ngOnInit() {
    this.getItems();
    this.itemSharedService.getNewItem().subscribe((res: any) => {
      this.allItems.push(res);
      this.getItems();
    });
  }
  filterItems() {
    if (!this.searchText) {
      this.getItems();
    } else {
      this.filteredArray = this.allItems.filter((item) => {
        return item.name.toLowerCase().includes(this.searchText.toLowerCase());
      });
    }
  }

  searchItems() {
    if (this.allItems.length > 0) {
      this.SearchMode = true;
    } else {
      this.SearchMode = false;
    }
  }
  getItems() {
    this.itemService.getAllItems().subscribe((res) => {
      this.allItems = res;
      this.filteredArray = this.allItems;
      this.filteredArray.paginator = this.paginator;
      this.searchItems();
    });
  }
  editItem(id: string) {
    this.itemSharedService.setEditId(id);
    this.router.navigate(['/items/additems']);
  }

  deletItem(id: string, index: number) {
    this.itemService.deletItem(id).subscribe(() => {
      this.toaster.success('The Item Deleted', 'Success');
      this.allItems.splice(index, 1);
      this.getItems();
    });
  }

  addNewItems() {
    this.router.navigate(['/items/additems']);
  }
}

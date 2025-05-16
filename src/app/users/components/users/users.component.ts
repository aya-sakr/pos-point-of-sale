import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../../Service/users.service';
import { Iusers } from 'src/app/Models/iusers';
import { _MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddUsersComponent } from '../add-users/add-users.component';
import { SharedUserService } from '../../Service/shared-user.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  allUsers: Iusers[] = [];
  constructor(
    private usersService: UsersService,
    private dialog: MatDialog,
    public userSharedService: SharedUserService,

    
  ) {}
  ngOnInit() {
    this.getUsers();

    this.userSharedService.getNewUser().subscribe((res: any) => {
      if (res) {
        this.allUsers.push(res);
        this.getUsers();
      }
    });
  }

  getUsers() {
    this.usersService.getAllUsers().subscribe((data: any) => {
      this.allUsers = data;
    });
  }
  addNewUser() {
   
    this.dialog.open(AddUsersComponent, { 
      disableClose: true,
      autoFocus: false,
      data: { id: '' },
    });
  }
  editUser(userEditedId: string) {
    this.dialog
      .open(AddUsersComponent, {
        disableClose: true,
        autoFocus: false,
        data: { id: userEditedId },
      })
      .afterClosed()
      .subscribe((result) => {
        this.getUsers();
      });
  }
  deletUsers(updatUser: Iusers) {
    this.allUsers = this.allUsers.filter((data) => {
      data.id !== updatUser.id;
    });
    this.getUsers();
  }
}

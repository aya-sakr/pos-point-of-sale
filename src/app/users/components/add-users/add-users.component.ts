import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Iusers } from 'src/app/Models/iusers';
import { UsersService } from '../../Service/users.service';
import { MatDialogRef } from '@angular/material/dialog';
import { SharedUserService } from '../../Service/shared-user.service';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent implements OnInit {
  mode: boolean =true 
  allUsers: Iusers[] = []
  userForm!: FormGroup
  postnewUser: Iusers[] = []
  constructor(private fb: FormBuilder, private userService: UsersService, private dialogRef: MatDialogRef<AddUsersComponent>, private userSharedService: SharedUserService) {
  }
  ngOnInit(): void {
    this. initiatUserForm()
    this.editUser()
    this.userSharedService.getMode().subscribe((res:any)=>{
      this.mode = res
    
      
    })
    
   
 

  }
  initiatUserForm() {
    this.userForm = this.fb.group({
      userRole: ['', Validators.required],
      username: ['', [Validators.required, Validators.pattern('[A-Za-z]{3,}')]],
      password: ['', Validators.required]  })

  }
  submitUser() {
    let postnewUser = {
      username: this.userForm.value.username,
      password: this.userForm.value.password,

    }
    this.userService.postnewUser(postnewUser).subscribe((res: any) => {
      this.userSharedService.setNewUser(res)
      this.onClose()

    })

  }

  onClose() {
    this.dialogRef.close()
  }

  editUser(){
  //   this.userSharedService.getNewUser().subscribe((res:any)=>{
     
  //     this.userForm.setValue({
  //       userRole:'role',
  //       username:res.username,
  //       password:res.password
  //     })
    
  //  })
  }

}

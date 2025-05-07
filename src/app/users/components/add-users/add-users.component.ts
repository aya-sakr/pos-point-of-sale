import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Iusers } from 'src/app/Models/iusers';
import { UsersService } from '../../Service/users.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent implements OnInit{
  allUsers:Iusers[]=[]
  userForm!:FormGroup
  postnewUser:Iusers[]=[]
  constructor(private fb:FormBuilder,
              private userService:UsersService,
              private dialogRef:MatDialogRef<AddUsersComponent>){}
      
                
              
  ngOnInit(): void {
    this.addNewuser()
     this.getallUsers()
    
  }

  addNewuser(){
    this.userForm= this.fb.group({
    userRole:['',Validators.required],
      username: ['',[Validators.required,Validators.pattern('[A-Za-z]{3,}')]],
      password:['',Validators.required]

     
    })
     
  }
  getallUsers(){
    this.userService.getAllUsers().subscribe((res)=>{
      this.allUsers=res
    })


    
  }
  submitUser() {
    let postnewUser = {
      username: this.userForm.value.username,
      password: this.userForm.value.password
    }
    this.userService.postnewUser(postnewUser).subscribe((res:any)=>{ 
      this.allUsers.push(res)
      this.onClose()
    
    })
  
    
 

  }

  onClose(){
    this.dialogRef.close()
  }

}

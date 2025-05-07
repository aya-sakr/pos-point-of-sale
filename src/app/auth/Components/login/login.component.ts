import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { UsersService } from 'src/app/users/Service/users.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
loginForm!:FormGroup
allUsers:any[]=[]
  constructor(private fb:FormBuilder, private router:Router,private userService:UsersService){
    
  }
  ngOnInit(): void {
 
    this.userLogin()
    this.getAllUsers()
    
  }
  userLogin(){

    this.loginForm = this.fb.group({
      username:['',[Validators.required, Validators.pattern('[A-Za-z]{3,}')]],
      password:['',Validators.required]
    })
  }

  
  get userName() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }
  getAllUsers(){
    this.userService.getAllUsers().subscribe((res)=>{
      this.allUsers = res
      console.log(res)
    })
  }
  userData(){
     let userLogin  = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }
     
     
     
    this.userService.postnewUser(userLogin).subscribe((res=>{
      this.allUsers.push(res)
     
    }))
     
     this.router.navigate(['/users'])
  
  }

 
}

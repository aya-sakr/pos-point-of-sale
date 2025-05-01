import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
loginForm!:FormGroup
  constructor(private fb:FormBuilder, private router:Router){
    
  }
  ngOnInit(): void {
    this.userLogin()
    
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
  userData(){
    let userLogin  = this.loginForm.value 
    console.log(userLogin)
    this.router.navigate(['/users'])
   localStorage.setItem('userLogin',JSON.stringify(userLogin))
  }
}

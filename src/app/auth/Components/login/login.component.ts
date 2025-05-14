import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/users/Service/users.service';
import { SharedService } from '../../services/shared.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup
  allUsers: any[] = []
  constructor(private fb: FormBuilder
    , private router: Router,
     private userService: UsersService
     ,private sharedService:SharedService,
     private toaster:ToastrService)  {

  }
  ngOnInit(): void {

    this.userLogin()


  }
  userLogin() {

    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern('[A-Za-z]{3,}')]],
      password: ['', Validators.required]
    })
  }


  get userName() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }

  userData() {
    let userLogin = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }

    this.sharedService.setUserName(userLogin.username)

    this.userService.postnewUser(this.loginForm.value).subscribe(() => {
      this.toaster.success('Login Successful','Success')



    })

    this.router.navigate(['/users'])

  }


}

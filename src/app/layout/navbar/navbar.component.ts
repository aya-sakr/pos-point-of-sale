import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  dropdownOpen:boolean=false
  dateNow
  constructor(){
    this.dateNow = new Date()

  }
 
  toggleDropdown(){
    this.dropdownOpen= ! this.dropdownOpen
    
  }
  

}

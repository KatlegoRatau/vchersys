import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userInfo: any;
  date:any;
  constructor(private router: Router) { 

    this.date =new Date();
  }

  ngOnInit() {

    this.userInfo = localStorage.getItem("user");
    this.userInfo = JSON.parse(this.userInfo); 
      
  }
  onLogout()
  {
    localStorage.removeItem("user");
    localStorage.removeItem("control");
    this.router.navigate(['/logmain']);

  }

}

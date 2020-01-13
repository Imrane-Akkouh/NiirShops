import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { ShopsService } from 'src/app/services/shops.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(
    private usersService: UsersService, 
    private shopsService: ShopsService, 
    private router: Router) { }

  ngOnInit() {

  }

}

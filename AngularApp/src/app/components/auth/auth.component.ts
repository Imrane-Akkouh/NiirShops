import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  username: string = "";
  password: string = "";
  constructor(private userService: UsersService, private router: Router) { }

  ngOnInit() {
    if(this.userService.isAuthenticated()){
      this.router.navigate(['/shops']);
    }
  }

  signUp(){
    this.userService.signUpUser(this.username, this.password);
  }

  signIn(){
    this.userService.signInUser(this.username, this.password);
    this.username = "";
    this.password = "";
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { Observable } from 'rxjs/Observable';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  currentUser:User = null;

  constructor(private http: HttpClient, private router: Router) { }

  getCurrentUser(){
    return this.currentUser;
  }

  signInUser(username,password){
    this.http.get('/users/login',{params:{"username": username, "password": password}})
    .subscribe(user=>{
      if(user){
        this.currentUser = user as User;
        this.router.navigate(['/shops']);
      }else{
        this.router.navigate(['/']);
      }
    });
  }

  signUpUser(username, password){
    this.http.post('/users',{params:{
      username: username,
      password: password
    }}).subscribe((user)=>{
      this.currentUser = user as User;
      this.router.navigate(['/shops']);
    });
  }

  isAuthenticated(){
    return this.currentUser? true : false;
  }
}

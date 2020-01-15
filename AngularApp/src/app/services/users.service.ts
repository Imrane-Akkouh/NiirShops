import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { Observable } from 'rxjs/Observable';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl:string = "http://localhost:3000/";
  currentUser:User = null;

  constructor(private http: HttpClient, private router: Router) { }

  getCurrentUser(){
    return this.currentUser;
  }

  signInUser(username,password){
    this.http.get(this.baseUrl+'users/login',{params:{"username": username, "password": password}})
    .subscribe(user=>{
      if(user){
        this.currentUser = user[0] as User;
        this.router.navigate(['/shops']);
      }else{
        this.router.navigate(['/']);
      }
    });
  }

  signUpUser(username, password){
    this.http.post(this.baseUrl+'users',{"username": username, "password": password})
    .subscribe((user)=>{
      this.currentUser = user as User;
      this.router.navigate(['/shops']);
    });
  }

  isAuthenticated(){
    return (this.currentUser!=null ? true : false);
  }
  
  addPreferredShop(shopId){
    this.currentUser.preferredShops.push(shopId);
    console.log(this.currentUser);
    return this.http.put(this.baseUrl+'users/'+this.currentUser.username,{"user":this.currentUser});
  }

  getCurrentLocalisation(){
    return this.http.get(this.baseUrl + 'api/localisation');
  }
}

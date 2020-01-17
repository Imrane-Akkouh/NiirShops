import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl:string = "http://localhost:3000/";

  constructor(private http: HttpClient, private router: Router) { }

  getCurrentUser(){
    return this.http.get(this.baseUrl + 'users/current_user').toPromise().then(user=>{
      return (user as User);
    });
  }

  signInUser(username,password){
    this.http.get(this.baseUrl+'users/login',{params:{"username": username, "password": password}})
    .subscribe(user=>{
      if(user){
        this.router.navigate(['/shops']);
      }else{
        this.router.navigate(['/']);
      }
    });
  }

  signUpUser(username, password){
    this.http.post(this.baseUrl+'users',{"username": username, "password": password})
    .subscribe((user)=>{
      this.router.navigate(['/shops']);
    });
  }

  logout(){
    this.http.get(this.baseUrl + 'users/logout').toPromise().then(()=>{
      this.router.navigate(['/']);
    });
  }

  isAuthenticated(){
    return this.getCurrentUser().then(user=>{
      return (user!=null ? true : false);
    })
  }
  
  addPreferredShop(shopId){
    return this.http.put(this.baseUrl+'users/current_user',{"shopId":shopId});
  }

  removePreferredShop(shopId){
    return this.http.put(this.baseUrl+'users/current_user',{"shopId":shopId});
  }

  getCurrentLocalisation(){
    return this.http.get(this.baseUrl + 'api/localisation');
  }

}

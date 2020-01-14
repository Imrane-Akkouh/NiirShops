import { Injectable } from '@angular/core';

import { Shop } from '../models/shop.model';
import { HttpClient } from '@angular/common/http';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class ShopsService {
  baseUrl:string = "http://localhost:3000/";

  constructor(private http: HttpClient, private usersService: UsersService) { }

  getNearbyShops(){
    return this.http.get(this.baseUrl + 'shops');
  }

  getPreferredShop(shopId){
    return this.http.get(this.baseUrl + 'shops/' + shopId,{params:{"_id": shopId}});
  }

}

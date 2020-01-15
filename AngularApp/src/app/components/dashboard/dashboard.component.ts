import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { ShopsService } from 'src/app/services/shops.service';
import { Shop } from "../../models/shop.model";
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  preferredShops:Shop[] = [];
  nearbyShops:Shop[] = [];
  currentPage: string = "shops";
  localisation:{latitude:number,longitude:number};
  currentLocalisation = {latitude:0, longitude:0};
  constructor(
    private usersService: UsersService, 
    private shopsService: ShopsService, 
    private router: Router) { }

  ngOnInit() {

    //fetching preferred Shops
    this.usersService.currentUser.preferredShops.forEach(shopId=>{
        this.shopsService.getPreferredShop(shopId).subscribe((shop)=>{
        this.preferredShops.push(shop as Shop);
        console.log((shop as Shop).imageUrl);
      });
    })
    
    //fetching Nearby Shops
    this.shopsService.getNearbyShops().subscribe((shops)=>{
      (shops as Shop[]).forEach(shop=>{
        if(this.usersService.currentUser.preferredShops.indexOf(shop._id)==(-1)){
          this.nearbyShops.push(shop);
        }
      })
    });

    //getting current localisation using ipapi.co to dynamically calculate distances.
    this.usersService.getCurrentLocalisation().subscribe(loc=>{//real localisation unless using a vpn or proxy
      let local = Object.assign(loc,this.localisation); //Transfrom the neat Object to coordinates: lat/lon
      this.currentLocalisation.latitude = local.latitude;
      this.currentLocalisation.longitude = local.longitude;
      console.log(this.currentLocalisation);
      this.nearbyShops.sort(this.sortShops.bind(this));
    })
  }

  goToPreferredShops(){
    this.currentPage = this.router.getCurrentNavigation().extractedUrl.toString().split('/').pop();
  }
  goToNearbyShops(){
    this.currentPage = this.router.getCurrentNavigation().extractedUrl.toString().split('/').pop();
  }


  //function that sorts the shops array by longitude and latitude
  sortShops(shop1, shop2){

    //function that calculates distances using longitude and latitude (a real pain in the a** calculations)
    function calcDistanceWithLatLon(lat1,lon1,lat2,lon2) {
      let R = 6371; // km (change this constant to get miles)
      let dLat = (lat2-lat1) * Math.PI / 180;
      let dLon = (lon2-lon1) * Math.PI / 180;
      let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat2 * Math.PI / 180 ) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      let d = R * c;
      if (d>1) return Math.round(d)+"km";
      else if (d<=1) return Math.round(d*1000)+"m";
      return d;
    }

    if(calcDistanceWithLatLon(shop1.latitude,shop1.longitude,
      this.currentLocalisation.latitude,this.currentLocalisation.longitude)<
      calcDistanceWithLatLon(shop2.latitude,shop2.longitude,
      this.currentLocalisation.latitude,this.currentLocalisation.longitude)){
        return -1;
    }
    if(calcDistanceWithLatLon(shop1.latitude,shop1.longitude,
      this.currentLocalisation.latitude,this.currentLocalisation.longitude)>
      calcDistanceWithLatLon(shop2.latitude,shop2.longitude,
      this.currentLocalisation.latitude,this.currentLocalisation.longitude)){
        return 1;
    }
    return 0;
  }


  dislikeShop(shopId){

  }

  likeShop(shopId){
    let likedshop = this.nearbyShops.find(shop=>shop._id == shopId);
    let indexOfLikedShop = this.nearbyShops.indexOf(likedshop);
    this.preferredShops.push(this.nearbyShops.splice(indexOfLikedShop,1)[0]);
    this.usersService.addPreferredShop(shopId).subscribe();
  }

  removeFromPreferred(shopId){

  }

}

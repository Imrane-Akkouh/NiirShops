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
  currentPage: string = "shops"; //variable to check if user wants to show nearby or preferred shops
  localisation:{latitude:number,longitude:number}; //just a custom old javascript constructor
  currentLocalisation = {latitude:0, longitude:0}; //this is the user location lat and lon
  
  constructor(
    private usersService: UsersService, 
    private shopsService: ShopsService, 
    private router: Router) { }

  ngOnInit() {
    this.router.navigate(['/shops']);
    this.usersService.getCurrentUser().then(user=>{
        //fetching preferred Shops
        user.preferredShops.forEach(shopId=>{
          this.shopsService.getPreferredShop(shopId).subscribe((shop)=>{
            this.preferredShops.push(shop as Shop);
          });
        })
      
        //fetching Nearby Shops
        this.shopsService.getNearbyShops().subscribe((shops)=>{
          (shops as Shop[]).forEach(shop=>{
            if(user.preferredShops.indexOf(shop._id)==(-1)){
              this.nearbyShops.push(shop);
            }
          })
        });
        //getting current localisation using ipapi.co to dynamically calculate distances.
        this.usersService.getCurrentLocalisation().subscribe(loc=>{//real localisation unless using a vpn or proxy
          let local = Object.assign(loc,this.localisation); //Transfrom the neat Object to coordinates: lat/lon
          this.currentLocalisation.latitude = local.latitude;
          this.currentLocalisation.longitude = local.longitude;
          this.nearbyShops.sort(this.sortShops.bind(this));//here we use the custom made sorting function
          this.preferredShops.sort(this.sortShops.bind(this));//same thing here
        })
      })
    
  }

  goToPreferredShops(){
    //here we extract the last part of the url "pref" to show preferred shops
    let page = this.router.getCurrentNavigation().extractedUrl.toString().split('/').pop();
    if(page=='pref'){
      this.currentPage = page;
    }
  }
  goToNearbyShops(){
    //here we extract the last part of the url "shops" to show nearby shops
    let page = this.router.getCurrentNavigation().extractedUrl.toString().split('/').pop();
    if(page !='pref'){
      this.currentPage = page;
    }
  }


  //function that sorts the shops array by longitude and latitude using the calcDistanceWithLatLon method
  //we are going to pass this function as a custom sorting algorithm to the sort method of JS
  //see the constructor
  sortShops(shop1, shop2){
    let distanceToShop1 = this.calcDistanceWithLatLon(
      shop1.latitude,shop1.longitude,this.currentLocalisation.latitude,this.currentLocalisation.longitude
      )
    let distanceToShop2 = this.calcDistanceWithLatLon(
      shop2.latitude,shop2.longitude,this.currentLocalisation.latitude,this.currentLocalisation.longitude
      ) 
    if(distanceToShop1 < distanceToShop2){
        return -1;
    }
    if(distanceToShop1 > distanceToShop2){
        return 1;
    }
    return 0;
  }

  //function that calculates distances using longitude and latitude (a real pain in the a** calculations)
  calcDistanceWithLatLon(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = (lat2-lat1)* (Math.PI/180);
    var dLon = (lon2-lon1)* (Math.PI/180); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos((lat1)* (Math.PI/180)) * Math.cos((lat2)* (Math.PI/180)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }


  dislikeShop(shopId){
    let dislikedShop = this.nearbyShops.find(shop=>shop._id == shopId);
    let indexOfDislikedShop = this.nearbyShops.indexOf(dislikedShop);
    let tempShopHolder = this.nearbyShops.splice(indexOfDislikedShop,1)[0];
    setTimeout(()=>{
      this.nearbyShops.push(tempShopHolder);
      this.nearbyShops.sort(this.sortShops.bind(this));
    }, 10000);
  }

  likeShop(shopId){
    this.moveShopFromArrayToOther(this.nearbyShops, this.preferredShops, shopId);
    this.usersService.addPreferredShop(shopId).subscribe();
  }

  removeFromPreferred(shopId){
    this.moveShopFromArrayToOther(this.preferredShops, this.nearbyShops, shopId);
    this.usersService.removePreferredShop(shopId).subscribe();
  }

  moveShopFromArrayToOther(source, target, shopId){
    let shopInstance = source.find(shop=>shop._id == shopId);
    let indexOfShopInstance = source.indexOf(shopInstance);
    target.push(source.splice(indexOfShopInstance,1)[0]);
    target.sort(this.sortShops.bind(this));
  }

  logout(){
    this.usersService.logout();
  }

}

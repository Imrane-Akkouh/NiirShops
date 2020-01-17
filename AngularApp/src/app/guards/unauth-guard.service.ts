import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UnAuthGuard implements CanActivate{

  constructor(private userService: UsersService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.userService.isAuthenticated().then(authorized=>{
      if(!authorized){
        return true;
      }else{
        this.router.navigate(['/shops']);
        return false;
      };
    })
  }
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthorizationGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredRole: string = route.data['role'];

    if (this.authService.roles.includes(requiredRole)) {
      return true;
    }
    this.router.navigateByUrl('/admin/not-authorized');
    return false;
  }
}
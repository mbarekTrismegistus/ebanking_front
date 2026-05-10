import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html'
})
export class NavComponent {
  constructor(public authService: AuthService, private router: Router) {}

  handleLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
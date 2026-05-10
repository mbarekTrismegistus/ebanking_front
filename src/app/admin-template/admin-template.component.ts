import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-admin-template',
  standalone: true,
  imports: [NavComponent, RouterOutlet],
  template: `
    <app-nav-bar />
    <div class="container mt-4">
      <router-outlet />
    </div>
  `
})
export class AdminTemplateComponent {}
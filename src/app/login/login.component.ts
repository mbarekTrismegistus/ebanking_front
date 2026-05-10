import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm!: FormGroup;
  errorMessage!: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: this.fb.control(''),
      password: this.fb.control('')
    });
  }

  handleLogin() {
    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe({
      next: (data: any) => {
        this.authService.loadProfile(data);
        this.router.navigateByUrl('/admin/customers');
      },
      error: (err: any) => {
        this.errorMessage = 'Invalid username or password';
      }
    });
  }

}

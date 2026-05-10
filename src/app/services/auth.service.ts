import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthService {

  isAuthenticated: boolean = false;
  accessToken!: string;
  username!: string;
  roles!: string;

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password);

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    return this.http.post('http://localhost:8080/auth/login', params, options);
  }

  loadProfile(data: any) {
    this.accessToken = data['access-token'];
    this.isAuthenticated = true;

    const decoded: any = jwtDecode(this.accessToken);
    this.username = decoded.sub;
    this.roles = decoded.scope;

    window.localStorage.setItem('jwt-token', this.accessToken);
  }

  loadJwtTokenFromLocalStorage() {
    const token = window.localStorage.getItem('jwt-token');
    if (token) {
      this.loadProfile({ 'access-token': token });
    }
  }

  logout() {
    this.isAuthenticated = false;
    this.accessToken = '';
    this.username = '';
    this.roles = '';
    window.localStorage.removeItem('jwt-token');
  }
}
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';
import { Credenciais } from '../models/credenciais';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private jwtService = new JwtHelperService();

  authenticate(creds: Credenciais) {
    return this.http.post(`${API_CONFIG.baseUrl}/login`, creds, {
      observe: 'response',
      responseType: 'text'
    });
  }

  successfulLogin(authToken: string) {
    const token = authToken.startsWith('Bearer ') ? authToken.substring(7) : authToken;
    localStorage.setItem('token', token);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        return !this.jwtService.isTokenExpired(token);
      } catch (e) {
        return false;
      }
    }
    return false;
  }

  logout() {
    localStorage.removeItem('token');
  }
}
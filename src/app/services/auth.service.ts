import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuario = {
    name: 'admin',
    password: '1234'
  };

  constructor() { }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  login(name: string, password: string): boolean {
    if (name === this.usuario.name && password === this.usuario.password) {
      localStorage.setItem('authToken', 'your-token');
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }
}

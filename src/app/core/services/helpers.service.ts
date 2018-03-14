import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class HelpersService {

  constructor(private router: Router) { }

  parseToken(response: any)
  {
    const token = response.token;
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return {token: token, decodedToken:JSON.parse(window.atob(base64))};
  }

  getToken()
  {
    return localStorage.getItem('token');
  }

  navigate(link: Array<any>)
  {
    return this.router.navigate(link);
  }
}

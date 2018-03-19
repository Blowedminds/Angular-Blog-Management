import { Component, OnInit } from '@angular/core';
import { NgForm }                   from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';

import { HelpersService, CacheService } from '../../imports';
import { AuthRequestService } from '../../services/auth-request.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  error: boolean = false;

  errorText: string = "Kullanıcı adı veya şifre yanlış";

  subs = new Subscription()

  constructor(
    private authRequestService: AuthRequestService,
    private helpersService: HelpersService,
    private cacheService: CacheService
  ) { }

  ngOnInit() {
    let rq1 = this.authRequestService.checkAuthenticated().subscribe( response => response ? this.helpersService.navigate(['/']) : null);

    this.subs.add(rq1);
  }

  ngOnDestroy()
  {
    this.subs.unsubscribe()
  }

  login(f: NgForm)
  {
    this.error = false

    let rq1 = this.authRequestService.login({
      email: f.value.email,
      password: f.value.password
    })
    .map(response => this.helpersService.parseToken(response))
    .do(response => {

      localStorage.setItem('token', response.token);

      return response;
    })
    .catch(error => this.loginErrorHandler(error))
    .subscribe((response) => {

      // this.cacheService.updateUser();
      // this.cacheService.updateMenus();
      // this.cacheService.updateLanguages();
      // this.cacheService.updateCategories();

      this.helpersService.navigate(['/articles']);
    });

    this.subs.add(rq1)
  }

  private loginErrorHandler(error: any, router: any = null): Promise<any>
  {
    let jsError = error.error

    console.log(error)

    switch(error.status){
      case 401:
        switch(jsError.error){
          case 'Invalid Credentials':
            this.error = true;
            break;
        }

    }

    return Promise.reject(error.message || error);
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Subscription } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { HelpersService, CacheService } from '../../imports';
import { AuthRequestService } from '../../services/auth-request.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit, OnDestroy {

  error = false;

  errorText = 'Kullanıcı adı veya şifre yanlış';

  subs = new Subscription();

  constructor(
    private authRequestService: AuthRequestService,
    private helpersService: HelpersService,
    private cacheService: CacheService
  ) { }

  ngOnInit() {
    const rq1 = this.authRequestService.checkAuthenticated().subscribe( response => response ? this.helpersService.navigate(['/']) : null);

    this.subs.add(rq1);
  }

  ngOnDestroy()
  {
    this.subs.unsubscribe();
  }

  login(f: NgForm)
  {
    this.error = false;

    const rq1 = this.authRequestService.login({
      email: f.value.email,
      password: f.value.password
    })
    .pipe(
      map(response => this.helpersService.parseToken(response)),
      tap(response => {

        localStorage.setItem('token', response.token);

        return response;
      }),
      catchError( error => this.loginErrorHandler(error))
    )
    .subscribe((response) => {

      this.helpersService.navigate(['/articles']);
    });

    this.subs.add(rq1);
  }

  private loginErrorHandler(error: any, router: any = null): Promise<any>
  {
    const jsError = error.error;

    console.log(error);

    switch (error.status) {
      case 401:
        switch (jsError.error) {
          case 'Invalid Credentials':
            this.error = true;
            break;
        }

    }

    return Promise.reject(error.message || error);
  }

}

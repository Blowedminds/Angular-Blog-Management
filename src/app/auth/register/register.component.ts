import { Component, OnInit } from '@angular/core';
import { NgForm }                   from '@angular/forms';

import { AuthRequestService }     from '../../request-services/auth-request.service'
import { ApiService }             from '../../api.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  constructor(
    private authService: AuthRequestService,
    private api: ApiService
  ) { }

  error: boolean = false;

  errorText: string;

  ngOnInit() {

    let rq1 = this.authService.checkAuthenticated().subscribe(response => {
      rq1.unsubscribe()
      rq1 = null
    })
  }

  register(f: NgForm)
  {
    let rq2 = this.authService.register({
      name: f.value.name,
      email: f.value.email,
      password: f.value.password,
      password_confirmation: f.value.password_confirmation
    })
    .map(response => this.api.parseToken(response))
    .do(response => {
      localStorage.setItem('token', response.token);
      this.api.navigate(['/management']);
    })
    .catch(error => this.registerErrorHandle(error))
    .subscribe(response => {
      rq2.unsubscribe()
      rq2 = null
    })
  }

  private registerErrorHandle(error: any, route: any = null): Promise<any>
  {
    let jsError = error.error

    switch(error.status){
      case 422:
        this.error = true;

        for(const one of Object.keys(jsError)){

          this.errorText = jsError[one][0]
          break
        }
        break
    }

    return Promise.reject(error.message || error)
  }
}

import { Injectable } from '@angular/core';
import { HttpHeaders }    from '@angular/common/http';

import { ApiService } from '../api.service'

declare var swal: any;

@Injectable()
export class MainRequestService {

  constructor(
    private api: ApiService,
  ) { }

  public mainDomain: string = "http://localhost:8000/";

  public apiDomain: string = "editor/";

  public headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  });


  public handleError(error: any, router: any = null): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only

    let jsError =  error

    switch (error.status){
      case 202:

        break;
      case 404:

        break;
      case 401:
        switch (jsError.statusText){
          case 'token_expired':
            this.api.navigate(['auth/login']);
            break;
          case 'token_invalid':
            this.api.navigate(['auth/login']);
            break;
          case 'token_not_provided':
            this.api.navigate(['auth/login']);
            break;
          case 'Unauthorized':
            this.api.navigate(['auth/login']);
            break;
        }
        break;
      case 421:
        if(jsError.pop_up){

          swal({
            title: jsError.header,
            text: jsError.message,
            type: jsError.state,
            timer: 2000
          }).then(() => {

            this.api.navigate([jsError.link])
          }, (dismiss) => {

            this.api.navigate([jsError.link])
          })
        }else this.api.navigate([jsError.link])
        break;
      case 422:
      break;
    }
    return Promise.reject(error.message || error);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, BehaviorSubject }     from 'rxjs';
import 'rxjs/Rx';

import { MainRequestService }   from '../../request-services/main-request.service'
import { ApiService } from '../../api.service'

@Injectable()
export class UserService {

  public user = new BehaviorSubject<any>(0)

  public userObs = this.user.asObservable()

  private headers = this.main.headers

  private API_URL = this.main.mainDomain + this.main.apiDomain + "user/"

  constructor(
    private main: MainRequestService,
    private http: HttpClient,
    private api: ApiService
  )
  {
    let rq1 = this.getUser().subscribe(response => {
      this.updateUser(response)
      rq1.unsubscribe()
      rq1 = null
    })
  }

  getUser(): Observable<any>
  {
    const url = this.API_URL + "info?token=" + this.api.getToken()

    return this.http
                    .get(url, {headers :this.headers})
                  //  .map(response => response)
                    .catch(error => this.main.handleError(error))
  }

  updateUser(data: any)
  {
    this.user.next(data)
  }

  deleteUser()
  {
    this.user.next(null)
  }

}

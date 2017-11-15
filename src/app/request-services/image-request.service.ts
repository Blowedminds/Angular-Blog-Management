import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpRequest } from '@angular/common/http';

import { Observable }     from 'rxjs';

import { MainRequestService }   from './main-request.service'
import { ApiService }           from '../api.service'

@Injectable()
export class ImageRequestService {

  constructor(
    private http: HttpClient,
    private main: MainRequestService,
    private api: ApiService
  ) { }

  private headers = this.main.headers

  public API_URL: string = this.main.mainDomain + "image/"

  public IMAGE_URL: string = "image/"

  public THUMB_URL: string = "thumb/"

  postImage(data:any, file: any): Observable<any>
  {
    const url = this.API_URL + "image?token=" + this.api.getToken()

    let formData = new FormData()

    formData.append('file', file)
    formData.append('name', data.name)
    formData.append('public', data.public)
    formData.append('alt', data.alt)

    const req = new HttpRequest('POST', url, formData, {
      reportProgress: true,
      headers: new HttpHeaders({ "enctype": "multipart/form-data", 'X-Requested-With': 'XMLHttpRequest'})
    })

    return this.http.request(req).catch(error => this.main.handleError(error))
  }

  getImages(): Observable<any>
  {
    const url = this.API_URL + "images?token=" + this.api.getToken()

    return this.http
                    .get(url, { headers: this.headers })
                    .catch(error => this.main.handleError(error))
  }

  getEdit(image: string): Observable<any>
  {
    const url = this.API_URL + "edit/" + image + "?token=" + this.api.getToken()

    return this.http
                    .get(url, { headers: this.headers})
                    .catch(error => this.main.handleError(error))
  }

  putEdit(data: any): Observable<any>
  {
    const url = this.API_URL + "edit/" + data.u_id + "?token=" + this.api.getToken()

    return this.http
                    .put(url, JSON.stringify(data), { headers: this.headers })
                    .catch(error => this.main.handleError(error))
  }

  deleteImage(u_id: string): Observable<any>
  {
    const url = this.API_URL + "image/" + u_id + "?token=" + this.api.getToken()

    return this.http
                    .delete(url, { headers: this.headers})
                    .catch(error => this.main.handleError(error))
  }

}

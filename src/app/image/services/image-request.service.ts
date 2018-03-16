import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpRequest } from '@angular/common/http';

import { Observable }     from 'rxjs';

import { MainRequestService, HelpersService, RoutingListService }   from '../imports'

@Injectable()
export class ImageRequestService extends MainRequestService{

  constructor(
    http: HttpClient,
    helpersService: HelpersService,
    routingListService: RoutingListService
  )
  {
    super(http, helpersService, routingListService);
  }

  postImage(data:any, file: any): Observable<any>
  {
    const url = this.makeUrl('image.image','?token=' + this.helpersService.getToken());

    let formData = new FormData()

    formData.append('file', file)
    for(let prop in data)
      formData.append(prop, data[prop])

    const req = new HttpRequest('POST', url, formData, {
      reportProgress: true,
      headers: new HttpHeaders({ "enctype": "multipart/form-data", 'X-Requested-With': 'XMLHttpRequest'})
    })

    return this.http.request(req).catch(error => this.handleError(error))
  }

  getImages(): Observable<any>
  {
    const url = this.makeUrl('image.images');

    return this.http
                    .get(url, this.options)
                    .catch(error => this.handleError(error))
  }

  getEdit(image: string): Observable<any>
  {
    const url = this.makeUrl('image.edit', image);

    return this.http
                    .get(url, this.options)
                    .catch(error => this.handleError(error))
  }

  putEdit(data: any): Observable<any>
  {
    const url = this.makeUrl('image.edit', data.u_id);

    return this.http
                    .put(url, JSON.stringify(data), this.options)
                    .catch(error => this.handleError(error))
  }

  deleteImage(u_id: string): Observable<any>
  {
    const url = this.makeUrl('image.image', u_id);

    return this.http
                    .delete(url, this.options)
                    .catch(error => this.handleError(error))
  }
}

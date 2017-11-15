import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject }     from 'rxjs';

import { UserRequestService } from '../request-services/user-request.service'

@Injectable()
export class GlobalDataService {

  _languages = new BehaviorSubject<any>(0)

  languagesObs = this._languages.asObservable()

  _categories = new BehaviorSubject<any>(0)

  categoriesObs = this._categories.asObservable()

  constructor(
    private userRequestService: UserRequestService
  ) {
    userRequestService.getGlobalData().subscribe(response => {
      this.languages = response.languages
      this.categories = response.categories
    })
   }

  get languages()
  {
    return this.languagesObs
  }

  set languages(data: any)
  {
    this._languages.next(data)
  }

  get categories()
  {
    return this.categoriesObs
  }

  set categories(data: any)
  {
    this._categories.next(data)
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable }     from 'rxjs';

interface Routes {
  url: string;

}

@Injectable()
export class RoutingListService {
// { [key: string]: { [key: string]: Routes } }
  routes: any = {

    auth: {
      url: 'auth/',
      'register': {
        url: 'register/'
      },
      'is-authenticated': {
        url: 'is-authenticated/'
      },
      'login': {
        url: 'login/'
      },
      'logout': {
        url: 'logout/'
      }
    },
    article: {
      url: '',
      'article': {
        url: 'article/',
        'content': {
          url: 'content/'
        }
      },
      'articles': {
        url: 'articles/'
      },
      'trash': {
        url: 'trash/'
      },
      'restore': {
        url: 'restore/'
      },
      'force-delete': {
        url: 'force-delete'
      },
      'permission': {
        url: 'permission'
      }
    },
    admin: {

    },
    image: {

    }
  };

  constructor() { }

  getUrl(key: string): string
  {
    let parsedKey = this.parseKey(key);

    let route = this.routes;

    let url: string = '';

    for(let i = 0; i < parsedKey.length; i++) {

      url += route[parsedKey[i]].url;

      route = route[parsedKey[i]];
    }

    return url;
  }

  private parseKey(key: string): Array<any>
  {
    let parsedKey = [];

    for(let i = 0; i < key.length; i++) {

      let index = key.indexOf('.');

      if(index === -1) {

        parsedKey.push(key);

        break;
      }
      else if(index != 0) {

        parsedKey.push(key.slice(0, index));
      }

      key = key.slice(index + 1);
    }

    return parsedKey;
  }
}

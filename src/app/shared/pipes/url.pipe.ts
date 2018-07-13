import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'url'
})
export class UrlPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    // let url = '';
    // if (typeof requestService !== 'undefined') {
    //     url = requestService.makeUrl('image.' + (arg || 'image'));
    // } else {
    //   url = environment.apiUrl;
    // }
    return `${(args || '') + value}`;
    }

}

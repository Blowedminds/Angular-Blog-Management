import { Pipe, PipeTransform } from '@angular/core';

import { environment } from '../../../environments/environment';

@Pipe({
  name: 'environmentUrl'
})
export class EnvironmentUrlPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return `${environment.apiUrl}images/${args || ''}/${value}`;
  }
}

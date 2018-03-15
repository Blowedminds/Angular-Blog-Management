import { Component, OnInit } from '@angular/core';

import { MainNavigationComponent, MainRequestService, CacheService } from '../../imports';

@ExtendedComponent({
  selector: 'app-navigation',
  // templateUrl: './navigation.component.html',
  // styleUrls: ['./navigation.component.sass']
})
export class NavigationComponent extends MainNavigationComponent {

  constructor(
    private mainRequestService: MainRequestService,
    private cacheService: CacheService
  )
  {
    super();
  }

  ngOnInit() {

    this.cacheService.get('menus', this.mainRequestService.makeGetRequest('user.menus'))
                      .subscribe(response => this.menus = response);

    this.cacheService.get('user', this.mainRequestService.makeGetRequest('user.info'))
                      .subscribe(response => this.user = response);
  }

}

export function ExtendedComponent(extendedConfig: Component = {}) {
    return function (target: Function) {
        const ANNOTATIONS = '__annotations__';
        const PARAMETERS = '__paramaters__';
        const PROP_METADATA = '__prop__metadata__';

        const annotations = target[ANNOTATIONS] || [];
        const parameters = target[PARAMETERS] || [];
        const propMetadata = target[PROP_METADATA] || [];

        if (annotations.length > 0) {
            const parentAnnotations = Object.assign({}, annotations[0]);

            Object.keys(parentAnnotations).forEach(key => {
                if (parentAnnotations.hasOwnProperty(key)) {

                    if (!extendedConfig.hasOwnProperty(key)) {
                        extendedConfig[key] = parentAnnotations[key];
                        // annotations[0][key] = '';
                    }
                    // else {
                    //     if (extendedConfig[key] === parentAnnotations[key]){
                    //          annotations[0][key] = '';
                    //     }
                    // }
                }
            });
        }

        // console.log(target['__annotations__'][0]);
        return Component(extendedConfig)(target);
    };
}

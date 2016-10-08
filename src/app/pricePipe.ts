import { Pipe, PipeTransform } from '@angular/core';

// Tell Angular2 we're creating a Pipe with TypeScript decorators
@Pipe({
  name: 'PricePipe'
})
export class PricePipe implements PipeTransform {

  // Transform is the new "return function(value, args)" in Angular 1.x
  transform(value:any[], args?:any) {
    // ES6 array destructuring
    let [minPrice] = args;
    return value.filter(product => {
      return product.price >= +minPrice;
    });
  }

}
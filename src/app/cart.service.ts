import { Component, OnInit, Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { User } from './user';
import { Product } from './product';
import { Cart } from './cart';

@Injectable()
export class CartService {
    private _url = "http://localhost:5000/carts";

    constructor(private http: Http) { }

    getcartItems(): Promise<Cart[]> {
        return this.http.get(this._url)
            .toPromise()
            .then(resp => resp.json() as Cart[])
            .catch(this.handleError);
    }

    getCartFromUser(userId: string): Promise<Cart[]> {
        
       return this.getcartItems().then((cartItems => {
            var shoppingCart = new Array<Cart>();
            shoppingCart = cartItems.filter(cartItem => cartItem.userId == userId);
            return shoppingCart;
        }))

    }

    addToCart(cartItem: any)
    {
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        cartItem = JSON.stringify(cartItem);

        return this.http.post(this._url, cartItem, options)
            .toPromise()
            .then(resp => resp.json())
            .catch(this.handleError);
    }

    deleteItemFromCart(cartId: number) {
        return this.http.delete(this._url + "/" + cartId)
            .toPromise()
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
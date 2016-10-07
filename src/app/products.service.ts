import { Component, OnInit, Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Product } from './product';

@Injectable()
export class ProductService {
    private _url = "http://localhost:5000/products";

    constructor(private http: Http) { }

    getProducts(): Promise<Product[]> {
        return this.http.get(this._url)
            .toPromise()
            .then(resp => resp.json() as Product[])
            .catch(this.handleError);
    }

    getProduct(productId: string): Promise<Product> {
        return this.getProducts().then((products => {
            var product = products.find(product => product.id == productId);
            return product;
        }))
    }

    editProduct(product: any, productId: string): Promise<Product> {
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        product = JSON.stringify(product);
        return this.http.put(this._url + "/" + productId, product, options)
            .toPromise()
            .then(() => product)
            .catch(this.handleError);
    }

    addProduct(product: any) {
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers });
        product = JSON.stringify(product);
        return this.http.post(this._url, product, options)
            .toPromise()
            .then(resp => resp.json())
            .catch(this.handleError);
    }

    deleteProduct(productId: string) {
        return this.http.delete(this._url + "/" + productId)
            .toPromise()
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
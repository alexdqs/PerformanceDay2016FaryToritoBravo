import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ProductService} from './products.service';
import { Product } from './product';
import {CartService} from './cart.service';
import { Cart } from './cart';

@Component({
    selector: 'home',
    template: `
        <h1>Amazonfail</h1>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Add to Cart</th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="let product of products">
                        <td>{{ product.name }}</td>
                        <td>{{ product.description }}</td>
                        <td>{{ product.category }}</td>
                        <td>{{ product.price }}</td>
                        <td><img class="media-object img-circle" src="http://lorempixel.com/80/80/technics?random={{ product.price }}" alt="..."></td>
                        <td>
                        <a (click)="addToCart(product)"><i class="glyphicon glyphicon-plus-sign"></i> </a>
                        </td>
                    </tr>
                </tbody>
            </table>
    `,
    styles: [`
            .clickable{
                cursor:pointer;
            }
        `],
    providers: [ProductService, CartService]
})

export class HomeComponent implements OnInit { 

    products: Product[];
    error: any;

    constructor(private _serviceProduct: ProductService, private _serviceCart: CartService, private router: Router) { }
    ngOnInit() {
        this._serviceProduct.getProductsMin()
            .then(products => this.products = products)
            .catch(error => this.error = error);
    }

    addToCart(product: Product) {
    this._serviceCart.addToCart(product.id)
            .catch(error => this.error = error);
    }
}
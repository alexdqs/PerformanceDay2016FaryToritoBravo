import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from './users.service';
import { User } from './user';
import {ProductService} from './products.service';
import { Product } from './product';
import {CartService} from './cart.service';
import { Cart } from './cart';

@Component({
    selector: 'shopping-cart',
    template: `
        <h1>Your shopping cart<i class="glyphicon glyphicon-shopping-cart"></i></h1>        
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Quantity</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="let product of products">
                    <td>{{ product.id }}</td>
                    <td>{{ product.name }}</td>
                    <td>{{ product.quantity }}</td>
                    <td>{{ product.price }}</td>
                    <td>
                       <a (click)="editCart(product)"><i class="glyphicon glyphicon-edit"></i> </a>
                    </td>
                    <td>
                        <i class="glyphicon glyphicon-remove clickable" (click)="deleteCart(product)" ></i>
                    </td>
                </tr>
            </tbody>
        </table>
        <div>
            <a routerLink="/shopping-cart/buy" class="btn btn-primary">Buy</a>
            <a routerLink="/shopping-cart/cancel" class="btn btn-primary">cancel</a>
        </div>
    `,
    styles: [`
            .clickable{
                cursor:pointer;
            }
        `],
    providers: [UserService]
})


export class CartComponent implements OnInit {
    cartItems: Cart[];
    products: Product[];
    user: User;
    error: any;

    constructor(private _service: CartService,  private router: Router) { }

    ngOnInit() {
        this._service.getcartItems()
            .then(cartItems => this.cartItems = cartItems)
            .catch(error => this.error = error);
    }

    addToCart(product: Product, quantity: number ) {
        var cartItem = new Cart();
        product.quantity = quantity;
        cartItem.productId = product.id;
        cartItem.quantity = quantity;
        cartItem.userId = "";
        this.cartItems.fill(cartItem);
        this._service.addToCart(cartItem);
    }

    addToUserCart(user: User, product: Product, quantity: number ) {
        var cartItem = new Cart();
        product.quantity = quantity;
        cartItem.productId = product.id;
        cartItem.quantity = quantity;
        cartItem.userId = user.id;
        this.cartItems.fill(cartItem);
        this._service.addToCart(cartItem);
    }

    removeItemFromCart(cartItem: Cart)
    {
        confirm('Are you sure to delete this item from the cart?');
        this._service.deleteItemFromCart(cartItem.id).then(res => {
            this.cartItems = this.cartItems.filter(h => h !== cartItem)
        }).catch(error => this.error = error);
    }

}
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';

import { Validators } from '@angular/forms';
import {Cart} from './cart';
import {CartService} from './cart.service';
import {User} from './user';
import {UserService} from './users.service';
import {Product} from './product';
import {ProductService} from './products.service';

@Component({
    templateUrl: 'cart-form.component.html',
    selector: 'shopping-cart-form',
    providers: [CartService]
})
export class CartFormComponent implements OnInit {
    form: any;
    title: string;
    user = new User();
    cartItem = new Cart();
    cartItems: Cart[];
    id: number;

    constructor(private _activatedRoute: ActivatedRoute, private _router: Router, private _cartService: CartService) { }

    ngOnInit() {
        this._activatedRoute.params.forEach((params: Params) => {
            if (params['id'] !== undefined) {
                this.id = +params['id'];
            }
        });

        this.title = this.user.name ? "Confirm" : "Login"; 
        if (!this.id) {
            return;
        }
        this._cartService.getCartFromUser(this.user.id.toString())
        .then(items => {
            this.cartItems = items;
            if(! (items.length > 0)) {
                this._router.navigate(['/not-found']);
            }
        });
    }

    save() {
        this._cartService.addToCart(this.cartItem)
        .then(x => {
            this._router.navigate(['/carts']);
        });              
    }
}
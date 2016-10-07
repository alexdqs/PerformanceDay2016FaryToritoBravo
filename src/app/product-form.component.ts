import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';

import { Validators } from '@angular/forms';
import {Product} from './product';
import {ProductService} from './products.service';

@Component({
    templateUrl: 'product-form.component.html',
    selector: 'product-form',
    providers: [ProductService]
})
export class ProductFormComponent implements OnInit {
    form: any;
    title: string;
    product = new Product();
    id: number;

    constructor(private _activatedRoute: ActivatedRoute, private _router: Router, private _productService: ProductService) { }

    ngOnInit() {
        this._activatedRoute.params.forEach((params: Params) => {
            if (params['id'] !== undefined) {
                this.id = +params['id'];
            }
        });
        this.title = this.id ? "Edit Product" : "Add Product";
        if (!this.id) {
            return;
        }
        this._productService.getProduct(this.id.toString())
            .then(product => {
                this.product = product;
                if (product === undefined) {
                    this._router.navigate(['/not-found']);
                }
            });

    }

    save() {
        if (this.id) {
            this._productService.editProduct(this.product, this.id.toString())
                .then(x => {
                    this._router.navigate(['/products']);
                });
        } else {
            this._productService.addProduct(this.product)
                .then(x => {
                    this._router.navigate(['/products']);
                });
        }
    }
}
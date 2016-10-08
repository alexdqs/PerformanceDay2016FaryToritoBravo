import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ProductService} from './products.service';
import { Product } from './product';

@Component({
    selector: 'home',
    template: `
        <h1>Amazonfail</h1>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="let product of products">
                        <td>{{ product.name }}</td>
                        <td>{{ product.description }}</td>
                        <td>{{ product.price }}</td>
                        <td>{{ product.category }}</td>
                    </tr>
                </tbody>
            </table>
    `,
    styles: [`
            .clickable{
                cursor:pointer;
            }
        `],
    providers: [ProductService]
})

export class HomeComponent implements OnInit { 

    products: Product[];
    error: any;

    constructor(private _service: ProductService,  private router: Router) { }
    ngOnInit() {
        this._service.getProducts()
            .then(products => this.products = products)
            .catch(error => this.error = error);
    }


}
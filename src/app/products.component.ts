import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ProductService} from './products.service';
import { Product } from './product';

@Component({
    selector: 'products',
    template: `
        <h1>Products</h1>
        <a routerLink="/products/new" class="btn btn-primary">Add Product</a>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="let product of products">
                    <td><img height=80 width=80 *ngIf="product.image" src="{{ product.image }}" alt="...">
                        <img class="media-object img-circle" *ngIf="product.image == null" src="http://lorempixel.com/80/80/technics?random={{ product.price }}" alt="..."></td>
                    <td>{{ product.name }}</td>
                    <td>{{ product.description }}</td>
                    <td>{{ product.category }}</td>
                    <td>{{ product.price }}</td>
                    <td>
                       <a (click)="editProduct(product)"><i class="glyphicon glyphicon-edit"></i> </a>
                    </td>
                    <td>
                        <i class="glyphicon glyphicon-remove clickable" (click)="deleteProduct(product)" ></i>
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
    providers: [ProductService]
})


export class ProductsComponent implements OnInit {
    products: Product[];
    error: any;

    constructor(private _service: ProductService,  private router: Router) { }

    ngOnInit() {
        this._service.getProducts()
            .then(products => this.products = products)
            .catch(error => this.error = error);
    }

    editProduct(product: Product) {
        this.router.navigate(['/products', product.id]);
    }

    deleteProduct(product: Product) {
        confirm('Are you sure to delete the Product :' + product.name + " ?");

        this._service.deleteProduct(product.id)
            .then(res => {
                this.products = this.products.filter(h => h !== product);
            })
            .catch(error => this.error = error);
    }

}
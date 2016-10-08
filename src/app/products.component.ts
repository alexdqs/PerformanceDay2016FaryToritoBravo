import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from './products.service';
import { Product } from './product';
import { PricePipe } from './pricePipe';

@Component({
    selector: 'products',
    template: `
        <h1>Products</h1>
        <a routerLink="/products/new" class="btn btn-primary">Add Product</a>
        <div width=300>  
            <p>
            0€
                <input type="range" min="0" max="2000" [(ngModel)]="sliderValue" />
            2000€
            </p>
            <span>Filtered price: {{ sliderValue }}€</span>
        </div> 
        <div id="loginSection">
            <div>
                <div class="loginText">User</div>
                <div class="loginField"><input id="userField"></div>
            </div>
            <div class="clearFix"></div>
            <div>
                <div class="loginText">Password</div>
                <div class="loginFiled"><input id="passwordField" class="userField" type="password"></div>
            </div>
            <div class="clearFix"></div>
            <button id="loginButton" class="LoginButton" onclick="javascript:Login();"   >Login</button>
        </div>
        <div id="productsSection"> 
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
                <tr *ngFor="let product of (products | PricePipe:sliderValue)">
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
        </div>
    
    `,
    styles: [`
            .clickable{
                cursor:pointer;
            }
        `],
    providers: [ProductService]
})


export class ProductsComponent implements OnInit {
    products: Product[] = [];
    error: any;
    sliderValue:number = 20;

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
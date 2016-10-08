import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import './rxjs-extensions';
import { AppComponent } from './app.component';
import { routing, routedComponents } from './app.routing';
import { NavBarComponent } from './navbar.component';
import { HomeComponent } from './home.component';
import { UsersComponent } from './users.component';
import { UserService } from './users.service';
import { UserFormComponent } from './user-form.component';
import { ProductsComponent } from './products.component';
import { ProductService } from './products.service';
import { ProductFormComponent } from './product-form.component';
import { NotFoundComponent } from './not-found.component';
import { SpinnerComponent } from './spinner.component';
import { PostsComponent } from './posts.component';
import { PricePipe } from './pricePipe';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpModule
  ],
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    UsersComponent,
    UserFormComponent,
    ProductsComponent,
    ProductFormComponent,
    NotFoundComponent,
    PostsComponent,
    SpinnerComponent,
    routedComponents,
    PricePipe
  ],
  providers: [
    UserService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

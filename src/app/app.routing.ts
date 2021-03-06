import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { UsersComponent } from './users.component';
import { UserFormComponent } from './user-form.component';
import { NotFoundComponent } from './not-found.component';
import { PostsComponent } from './posts.component';
import { ProductsComponent } from './products.component';
import { ProductFormComponent } from './product-form.component';
import { CartComponent } from './cart.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'users/new',
    component: UserFormComponent
  },
  {
    path: 'users/:id',
    component: UserFormComponent
  },
  {
    path: 'posts',
    component: PostsComponent
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'products/new',
    component: ProductFormComponent
  },
  {
    path: 'products/:id',
    component: ProductFormComponent
  },

  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  }
  , { path: '**', component: NotFoundComponent }
];

export const routing = RouterModule.forRoot(appRoutes);

export const routedComponents = [HomeComponent, UserFormComponent, NotFoundComponent, PostsComponent, ProductFormComponent, CartComponent];

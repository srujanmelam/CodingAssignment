import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  updateCartItem(product: Product, quantity: number): void {
    const cartItem = this.cart.find((item) => item.id === product.id);

    if (cartItem) {
      // Update the quantity of the cart item
      cartItem.quantity = quantity;
      this.cartSubject.next(this.cart);
    }
  }

  private productsUrl = 'assets/products.json'; // Adjust the URL to your JSON file
  private cart: Product[] = [];
  private cartSubject = new BehaviorSubject<Product[]>(this.cart);

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
  }

  addToCart(product: Product): void {
    if(!this.cart.includes(product)){
      this.cart.push(product);
    }
    else{
      let f = this.cart.indexOf(product);
      this.cart[f].quantity += 1;
      alert("already exists: "+this.cart[f].quantity);
    }
    //this.cart.push(product);
    this.cartSubject.next(this.cart);
    
  }

  removeFromCart(product: Product): void {
    const index = this.cart.indexOf(product);
    if (index !== -1) {
      this.cart.splice(index, 1);
      this.cartSubject.next(this.cart);
    }
  }

  getCart(): Observable<Product[]> {
    return this.cartSubject.asObservable();
  }

  clearCart(): void {
    this.cart = [];
    this.cartSubject.next(this.cart);
  }
}

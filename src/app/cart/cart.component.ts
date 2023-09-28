// src/app/cart/cart.component.ts

import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: { product: Product; quantity: number }[] = [];

  constructor(private productService: ProductService,private router:Router) {}

  ngOnInit(): void {
    this.productService.getCart().subscribe((cart) => {
      // Create cart items with quantity from the cart
      this.cartItems = cart.map((product) => ({ product, quantity: product.quantity }));
    });
  }

  updateCartItem(index: number): void {
    if (index >= 0 && index < this.cartItems.length) {
      const item = this.cartItems[index];
      if (item.quantity < 1) {
        // Remove item if quantity is less than 1
        this.removeCartItem(index);
      } else {
        // Update cart item quantity
        this.productService.updateCartItem(item.product, item.quantity);
      }
    }
  }

  removeCartItem(index: number): void {
    if (index >= 0 && index < this.cartItems.length) {
      const item = this.cartItems[index];
      this.productService.removeFromCart(item.product);
      this.cartItems.splice(index, 1);
    }
  }

  calculateTotal(): number {
    return this.cartItems.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  }

  checkout(): void {
    // Implement your checkout logic here
    // Clear the cart and display a thank you message, for example
    if(this.cartItems.length != 0){
      this.productService.clearCart();
      alert('Thank you for your purchase!');
    }
    else{
      alert('Oh! your cart is empty!');
    }
   
  }
  openProdDetail(){
    this.router.navigateByUrl('/products');
  }
}

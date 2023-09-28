// src/app/product-detail/product-detail.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined ;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const productId = +params['id']; // Extract the product ID from route parameters
      this.productService.getProducts().subscribe((products) => {
        // Find the product with the matching ID
        this.product = products.find((p) => p.id === productId);
      });
    });
  }

  addToCart(product: Product | any): void {
    alert("added");
    this.productService.addToCart(product);
    this.router.navigateByUrl('/cart');
  }
}

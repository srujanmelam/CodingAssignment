import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  selectedCategory: string = '';
  selectedSortOrder: string = 'asc';
  filteredProducts: Product[] | undefined;
  //filteredProducts: Product[] | undefined;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
      this.applyFiltersAndSorting();
    });
  }

  addToCart(product: Product): void {
    alert(product.name+"successfully added!");
    this.productService.addToCart(product);
  }
  openCart(a: string,i:number){
    if(i == 0)
      this.router.navigate([a]);
    else
      this.router.navigate([`/products/${i}`]);
  }
  applyFiltersAndSorting(): void {
    // Filter products by category
    let filteredProducts = this.products;
    if (this.selectedCategory) {
      filteredProducts = this.products.filter(
        (product) => product.category === this.selectedCategory
      );
    }

    // Sort products by price
    filteredProducts.sort((a, b) => {
      const priceA = a.price;
      const priceB = b.price;
      return this.selectedSortOrder === 'asc'
        ? priceA - priceB
        : priceB - priceA;
    });

    this.filteredProducts = filteredProducts;
  }
}

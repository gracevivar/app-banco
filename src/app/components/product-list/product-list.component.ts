import { Component, ViewEncapsulation } from '@angular/core';
import { Product } from '../../interfaces/products';
import { ProductsService } from '../../services/products.service';
import {CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf, CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ProductListComponent {
  listProducts: Product[] = [];
  filterProducts: Product[] = [];
  itemsPerPage: number = 5;
  searchProduct: string = '';
  selectedDropdown: string | null = null;
  constructor(
    private serviceProduct : ProductsService,
    private router : Router
  ){}
  getListProducts(){
    this.serviceProduct.getListProducts().subscribe((response : any)=>{
      this.listProducts = response.data;
      this.filterProducts = this.listProducts;
    }, (error)=>{
      console.error('Error al obtener lista de productos', error);
    })
  }
  searchProducts(){
    this.filterProducts = this.listProducts.filter(product =>
      product.name.toLowerCase().includes(this.searchProduct.toLowerCase()) ||
      product.description.toLowerCase().includes(this.searchProduct.toLowerCase())
    );
  }
  ngOnInit(){
    this.getListProducts();
  }
  addProduct() {
    this.router.navigate(['/agregar']);
  }
  toggleDropdown(productId: string) {
    this.selectedDropdown = this.selectedDropdown === productId ? null : productId;
  }
  editProduct(productId: string) {
    this.router.navigate(['/editar', productId]);
  }
}

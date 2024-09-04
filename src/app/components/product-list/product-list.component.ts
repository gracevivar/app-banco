import { Component, ViewEncapsulation } from '@angular/core';
import { Product } from '../../interfaces/products';
import { ProductsService } from '../../services/products.service';
import {NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ProductListComponent {
  listProducts: Product[] = [];
  filterProducts: Product[] = [];
  itemsPerPage: number = 5;
  searchProduct: string = '';
  constructor(
    private serviceProduct : ProductsService
  ){}
  getListProducts(){
    this.serviceProduct.getListProducts().subscribe((data : any)=>{
      // this.listProducts = data;
      // this.filterProducts = this.listProducts;
      console.log(data)
    }, (error)=>{
      console.error('Error al obtenebbr lista de productos', error);
    })
    // this.serviceProduct.getListProducts().subscribe({
    //   next: (v) => console.log(v),
    //   error: (e) => console.error(e),
    //   complete: (data) => console.info('complete')
    // }
  // )
  }
  ngOnInit(){
    this.getListProducts();
  }
}

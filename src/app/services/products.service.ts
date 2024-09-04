import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private url = 'http://localhost:3002';
  private apiUrl = '/bp/products';

  constructor(private http: HttpClient) { }
  getListProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.apiUrl}`);
    // return this.http.get(`${this.url}${this.apiUrl}`, {responseType: 'text'})
  }
  createProduct(form: Product):Observable<Product>{
    return this.http.post<Product>(`${this.apiUrl}`, form);
  }
  updateProduct(form: Product, idProduct: string):Observable<Product>{
    return this.http.put<Product>(`${this.apiUrl}/${idProduct}`, form);
  }
}

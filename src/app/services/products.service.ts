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
  private headers = { 'Content-Type': 'application/json' };
  constructor(private http: HttpClient) { }
  getListProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.apiUrl}`);
  }
  checkIdProduct(idProduct:string): Observable<{exists: boolean}>{
    return this.http.get<{exists: boolean}>(`${this.apiUrl}/verification/${idProduct}`);
  }
  createProduct(form:any):Observable<{}>{
    return this.http.post<{}>(`${this.apiUrl}`, form, {headers: this.headers });
  }
  updateProduct(form: Product, idProduct: string):Observable<Product>{
    return this.http.put<Product>(`${this.apiUrl}/${idProduct}`, form);
  }
  getProducyById(idProduct:string): Observable<Product>{
    return this.http.get<Product>(`${this.apiUrl}/${idProduct}`);
  }
}

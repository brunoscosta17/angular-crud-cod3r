import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from './product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseURL = 'http://localhost:3001/products';

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) { }

  showMessage(msg: string, color?: string): void {
     this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: color 
    });
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseURL, product);
  }

  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseURL);
  }

  readById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseURL}/${id}`);
  }

  update(product: Product):Observable<Product> {
    return this.http.put<Product>(`${this.baseURL}/${product.id}`, product);
  }

}

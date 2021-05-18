import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { ProductService } from '../product.service';
import { Product } from './../product.model';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Product>;

  products: Product[] = [];

  displayedColumns = ['id', 'name', 'price'];

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productService
      .read()
      .subscribe(products => this.products = products);
  }

  ngAfterViewInit(): void {  
  }

}

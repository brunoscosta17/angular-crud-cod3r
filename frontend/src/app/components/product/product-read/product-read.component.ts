import { Component, OnInit, AfterViewInit, ViewChild, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';

import { ProductService } from '../product.service';
import { Product } from './../product.model';
import { ProductReadDataSource } from './product-read-datasource';
import { DialogConfirmComponent } from 'src/app/shared/components/dialog-confirm/dialog-confirm.component';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnChanges, OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Product>;
  dataSource: ProductReadDataSource;

  products: Product[] = [];

  displayedColumns = ['id', 'name', 'price', 'actions'];

  constructor(
    private productService: ProductService,
    private dialog: MatDialog
  ) {
    this.dataSource = new ProductReadDataSource();
  }

  ngOnChanges(change: SimpleChanges) {
      this.productService
        .read()
        .subscribe(products => this.dataSource.data = products);
  }

  ngOnInit(): void {
    this.getproducts();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  getproducts() {
    this.productService
      .read()
      .subscribe(products => {
        this.dataSource.data = products;
        console.log('get products');
      });
  }

  delete(id: number) {
    console.log(id);
    const dialogRef = this.dialog.open(DialogConfirmComponent);
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result === 'true') {
          this.productService.delete(id)
            .subscribe((response) => {
              this.getproducts();
              this.productService.showMessage('Produto removido com sucesso!', 'success');
            });
        }
      });
  }

}

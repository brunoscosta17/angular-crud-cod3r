import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  product: Product = {
    id: 0,
    name: '',
    price: 0
  }

  constructor(
    private productService: ProductService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  createProduct(): void {
    this.productService.create(this.product)
      .subscribe((response) => {
        this.productService.showMessage('Produto criado com sucesso!', 'success');
        this.router.navigate(['/products']);
      });
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }

}

import { Component, OnInit } from '@angular/core';
import { Product } from '../Product';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  formGroupProduct: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private service: ProductService
  ) {
    this.formGroupProduct = formBuilder.group({
      id: [''],
      name: [''],
      description: [''],
      price: [''],
      quantity: [''],
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  save() {
    this.service.save(this.formGroupProduct.value).subscribe({
      next: (data) => this.products.push(data),
    });
  }

  loadProducts() {
    this.service.getProducts().subscribe({
      next: (data) => (this.products = data),
    });
  }
}

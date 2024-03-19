import { Component } from '@angular/core';
import { Product } from '../Product';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  products: Product[] = [];

  formGroupProduct: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.formGroupProduct = formBuilder.group({
      id: [''],
      name: [''],
      description: [''],
      price: [''],
      quantity: [''],
    });
  }

  save() {
    this.products.push(this.formGroupProduct.value);
  }
}

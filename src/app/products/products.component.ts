import { Component, OnInit } from '@angular/core';
import { Product } from '../Product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  formGroupProduct: FormGroup;

  isEditing = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private service: ProductService
  ) {
    this.formGroupProduct = formBuilder.group({
      id: [''],
      name: ['', [Validators.minLength(3), Validators.required]],
      description: ['', [Validators.minLength(15), Validators.required]],
      price: ['', [Validators.min(0), Validators.required]],
      quantity: ['', [Validators.min(0), Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  save() {
    this.submitted = true;
    if (this.formGroupProduct.valid) {
      if (this.isEditing) {
        this.service.update(this.formGroupProduct.value).subscribe({
          next: () => {
            this.loadProducts();
            this.isEditing = false;
            this.submitted = false;
          },
        });
      } else {
        this.service.save(this.formGroupProduct.value).subscribe({
          next: (data) => {
            this.products.push(data);
            this.submitted = false;
          },
        });
      }
      this.formGroupProduct.reset();
    }
  }

  loadProducts() {
    this.service.getProducts().subscribe({
      next: (data) => (this.products = data),
    });
  }

  delete(product: Product) {
    this.service.delete(product).subscribe({
      next: () => this.loadProducts(),
    });
  }

  edit(product: Product) {
    this.formGroupProduct.setValue(product);
    this.isEditing = true;
  }

  get name(): any {
    return this.formGroupProduct.get('name');
  }

  get description(): any {
    return this.formGroupProduct.get('description');
  }

  get price(): any {
    return this.formGroupProduct.get('price');
  }

  get quantity(): any {
    return this.formGroupProduct.get('quantity');
  }
}

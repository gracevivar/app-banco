import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { formatDate, NgClass, NgIf } from '@angular/common';
import { map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, NgClass],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
  providers:[ ProductsService]
})
export class ProductFormComponent {
  productForm: FormGroup;
  currentDate= '';
  submitted: boolean = false;
  constructor(
    private fb: FormBuilder,
    private productService: ProductsService
  ) {
    this.productForm = this.fb.group({
      id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)], [this.validateIdProduct.bind(this)]],
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: ['', Validators.required],
      date_release: ['', [Validators.required],[this.validateDate.bind(this)]],
      date_revision: [{ value: this.currentDate, disabled: true }, Validators.required]
    });
  }
  validateIdProduct(control: AbstractControl): Observable<{ [key: string]: boolean } | null>{
    return this.productService.checkIdProduct(control.value).pipe(
      map(idExists => {
        return idExists ? { idTaken: true } : null; // Devuelve { idTaken: true } si el ID ya existe
      })
    );
  }
  validateDate(control: AbstractControl): Observable<ValidationErrors | null> {
    const [year, month, day] = control.value.split('-').map(Number);
    const releaseDate = new Date(year, month - 1, day);
    let currentDate = new Date(new Date().getFullYear(),new Date().getMonth(), new Date().getDate());
    return of(releaseDate < currentDate ? { minDate: true } : null);
  }
  changeDateRevision(dateSelect: string){
    if (dateSelect) {
      const [year, month, day] = dateSelect.split('-').map(Number);
      const releaseDate = new Date(year, month - 1, day);
      releaseDate.setFullYear(releaseDate.getFullYear() + 1);
      this.currentDate = formatDate(releaseDate, 'yyyy-MM-dd', 'en-US');
    } else {
      this.currentDate = '';
    }
  }
  saveProduct(){
    this.submitted = true;
    const formData = this.productForm.getRawValue();
    formData.date_revision = this.currentDate;
    if (this.productForm.valid) {
      this.productService.createProduct(formData).subscribe(() => {
        alert('Producto agregado exitosamente');
        this.productForm.reset();
      },(error)=>{
        console.error('Error al guardar producto', error);
      });
    }
  }
  onReset() {
    this.productForm.reset();
  }
}

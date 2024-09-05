import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { formatDate, NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-product-form-edit',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, NgClass],
  templateUrl: './product-form-edit.component.html',
  styleUrl: './product-form-edit.component.css',
  providers:[ ProductsService]
})
export class ProductFormEditComponent {
  productForm!: FormGroup;
  currentDate= '';
  submitted: boolean = false;
  productId: string;
  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ){
    this.productId = this.route.snapshot.paramMap.get('id')!;
  }
  ngOnInit(): void {

    this.productForm = this.fb.group({
      id: [{ value: this.productId, disabled: true }, [Validators.required, Validators.minLength(3), Validators.maxLength(10)], [this.validateIdProduct.bind(this)]],
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: ['', Validators.required],
      date_release: ['', [Validators.required],[this.validateDate.bind(this)]],
      date_revision: [{ value: this.currentDate, disabled: true }, Validators.required]
    });
    this.productService.getProducyById(this.productId).subscribe(product => {
      this.productForm.patchValue(product);
      const dataForm = this.productForm.getRawValue();
      this.currentDate= dataForm.date_revision;
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
  saveUpdateProduct(){
    this.submitted = true;
    const formData = this.productForm.getRawValue();
    formData.date_revision = this.currentDate;
    if (this.productForm.valid) {
      this.productService.updateProduct(formData, this.productId).subscribe(() => {
        alert('Producto editado exitosamente');
        this.router.navigate(['/']);
      },(error)=>{
        console.error('Error al editar producto', error);
      });
    }
  }
  onReset() {
    this.productForm.reset();
    this.productForm.patchValue({ id: this.productId });
  }
}

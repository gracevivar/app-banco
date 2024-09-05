import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFormEditComponent } from './product-form-edit.component';

describe('ProductFormEditComponent', () => {
  let component: ProductFormEditComponent;
  let fixture: ComponentFixture<ProductFormEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductFormEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductFormEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

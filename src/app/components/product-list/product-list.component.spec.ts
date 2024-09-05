import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProductsService } from '../../services/products.service';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productService: ProductsService;

  const mockProductService = {
    getListProducts: jest.fn().mockReturnValue(of([]))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClient,  // Asegúrate de importar HttpClientModule si el componente lo necesita
        ProductListComponent  // Importa el componente independiente aquí
      ],
      providers: [
        { provide: ProductsService, useValue: mockProductService }
      ]
    }).compileComponents();

    productService = TestBed.inject(ProductsService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('true', () =>{
    expect(true).toBeTruthy();
  })
});

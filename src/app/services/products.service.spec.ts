import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

const productListMoc = {
    "data": [
      {
        "id": "dos",
        "name": "Nombre producto",
        "description": "Descripción producto",
        "logo": "assets-1.png",
        "date_release": "2025-01-01",
        "date_revision": "2025-01-01"
      },
      {
        "id": "uno",
        "name": "Tarjeta Crédito",
        "description": "Tarjeta Crédito",
        "logo": "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
        "date_release": "2024-09-05",
        "date_revision": "2025-01-01"
      },
      {
        "id": "tres",
        "name": "Nombre producto",
        "description": "Descripción producto",
        "logo": "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
        "date_release": "2025-01-01",
        "date_revision": "2025-01-01"
      },
      {
        "id": "cuatro",
        "name": "Tarjeta Crédito",
        "description": "Tarjeta Crédito",
        "logo": "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
        "date_release": "2024-09-05",
        "date_revision": "2025-09-05"
      }
    ]
  }
const httClientMock = {
  get: jest.fn(),
  post: jest.fn()
}

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(() => {
    jest.setTimeout(60000);
    TestBed.configureTestingModule({
      providers: [ProductsService, { provide: HttpClient, useValue: httClientMock }]

    });
    service = TestBed.inject(ProductsService);
    httClientMock.get.mockReturnValue(productListMoc);
  });

  it('getListProducts return been called', () => {
    service.getListProducts();
    expect(httClientMock.get).toHaveBeenCalled();
  });
  it('getListProducts return ProductList', (done) => {
    httClientMock.get.mockReturnValue(of(productListMoc.data));
    service.getListProducts().subscribe(res => {
      expect(res.length).toBe(4);
      expect(res[0].name).toBe('Nombre producto');
      done();
    })
  });

  it('getProduct should return getProducyById', (done) => {
    httClientMock.get.mockReturnValue(of(productListMoc.data[0]));
    const idSelect = 'dos';
    service.getProducyById(idSelect).subscribe(res => {
      expect(res.name).toBe('Nombre producto');
      done();
    });
  });

  it('getProduct should return checkIdProduct', (done) => {
    httClientMock.get.mockReturnValue(of(true));
    const idSelect = 'dos';
    service.checkIdProduct(idSelect).subscribe(res => {
      expect(res).toBe(true);
      done();
    });
  });
  it('should send a POST request to add a product', () => {
    const product = {
      "id": "ocho",
      "name": "Nombre producto",
      "description": "Descripción producto",
      "logo": "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
      "date_release": "2024-09-05",
      "date_revision": "2025-09-05"
    }
    service.createProduct(product);
    expect(httClientMock.get).toHaveBeenCalled();
  });



});

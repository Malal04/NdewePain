import { TestBed } from '@angular/core/testing';

import { IngredientOrderService } from './ingredient-order.service';

describe('IngredientOrderService', () => {
  let service: IngredientOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngredientOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

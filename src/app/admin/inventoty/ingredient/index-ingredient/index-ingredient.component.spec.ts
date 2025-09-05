import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexIngredientComponent } from './index-ingredient.component';

describe('IndexIngredientComponent', () => {
  let component: IndexIngredientComponent;
  let fixture: ComponentFixture<IndexIngredientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexIngredientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

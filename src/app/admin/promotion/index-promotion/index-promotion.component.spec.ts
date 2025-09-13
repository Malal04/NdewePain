import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexPromotionComponent } from './index-promotion.component';

describe('IndexPromotionComponent', () => {
  let component: IndexPromotionComponent;
  let fixture: ComponentFixture<IndexPromotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexPromotionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

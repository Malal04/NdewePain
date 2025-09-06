import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveStockComponent } from './move-stock.component';

describe('MoveStockComponent', () => {
  let component: MoveStockComponent;
  let fixture: ComponentFixture<MoveStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoveStockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoveStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

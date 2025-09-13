import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexOrdreComponent } from './index-ordre.component';

describe('IndexOrdreComponent', () => {
  let component: IndexOrdreComponent;
  let fixture: ComponentFixture<IndexOrdreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexOrdreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexOrdreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

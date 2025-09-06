import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexCommandeComponent } from './index-commande.component';

describe('IndexCommandeComponent', () => {
  let component: IndexCommandeComponent;
  let fixture: ComponentFixture<IndexCommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexCommandeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

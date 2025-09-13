import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesEmployerComponent } from './mes-employer.component';

describe('MesEmployerComponent', () => {
  let component: MesEmployerComponent;
  let fixture: ComponentFixture<MesEmployerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesEmployerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesEmployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

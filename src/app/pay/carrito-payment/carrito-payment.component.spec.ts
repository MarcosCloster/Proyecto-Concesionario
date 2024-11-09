import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarritoPaymentComponent } from './carrito-payment.component';

describe('CarritoPaymentComponent', () => {
  let component: CarritoPaymentComponent;
  let fixture: ComponentFixture<CarritoPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarritoPaymentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarritoPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

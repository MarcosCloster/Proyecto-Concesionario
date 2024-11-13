import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarritoPaymentPageComponent } from './carrito-payment-page.component';

describe('CarritoPaymentPageComponent', () => {
  let component: CarritoPaymentPageComponent;
  let fixture: ComponentFixture<CarritoPaymentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarritoPaymentPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarritoPaymentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

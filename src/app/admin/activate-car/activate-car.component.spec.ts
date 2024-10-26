import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateCarComponent } from './activate-car.component';

describe('ActivateCarComponent', () => {
  let component: ActivateCarComponent;
  let fixture: ComponentFixture<ActivateCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivateCarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivateCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

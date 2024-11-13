import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateCarPageComponent } from './activate-car-page.component';

describe('ActivateCarPageComponent', () => {
  let component: ActivateCarPageComponent;
  let fixture: ComponentFixture<ActivateCarPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivateCarPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivateCarPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

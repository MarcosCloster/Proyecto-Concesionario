import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltradoPageComponent } from './filtrado-page.component';

describe('FiltradoPageComponent', () => {
  let component: FiltradoPageComponent;
  let fixture: ComponentFixture<FiltradoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltradoPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltradoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

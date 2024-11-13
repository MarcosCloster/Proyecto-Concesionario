import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromUpdatePageComponent } from './from-update-page.component';

describe('FromUpdatePageComponent', () => {
  let component: FromUpdatePageComponent;
  let fixture: ComponentFixture<FromUpdatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FromUpdatePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FromUpdatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

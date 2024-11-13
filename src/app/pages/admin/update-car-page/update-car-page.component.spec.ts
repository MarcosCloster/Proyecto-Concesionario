import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCarPageComponent } from './update-car-page.component';

describe('UpdateCarPageComponent', () => {
  let component: UpdateCarPageComponent;
  let fixture: ComponentFixture<UpdateCarPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateCarPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCarPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

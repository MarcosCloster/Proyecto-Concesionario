import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCarPageComponent } from './delete-car-page.component';

describe('DeleteCarPageComponent', () => {
  let component: DeleteCarPageComponent;
  let fixture: ComponentFixture<DeleteCarPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteCarPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteCarPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

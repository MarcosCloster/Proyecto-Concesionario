import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailsPageComponent } from './view-details-page.component';

describe('ViewDetailsPageComponent', () => {
  let component: ViewDetailsPageComponent;
  let fixture: ComponentFixture<ViewDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewDetailsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

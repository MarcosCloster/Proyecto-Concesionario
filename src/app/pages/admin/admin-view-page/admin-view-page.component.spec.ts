import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewPageComponent } from './admin-view-page.component';

describe('AdminViewPageComponent', () => {
  let component: AdminViewPageComponent;
  let fixture: ComponentFixture<AdminViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminViewPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

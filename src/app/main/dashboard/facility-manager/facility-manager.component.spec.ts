import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityManagerComponent } from './facility-manager.component';

describe('FacilityManagerComponent', () => {
  let component: FacilityManagerComponent;
  let fixture: ComponentFixture<FacilityManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacilityManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilityManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

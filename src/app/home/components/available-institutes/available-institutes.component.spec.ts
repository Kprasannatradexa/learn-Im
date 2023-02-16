import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableInstitutesComponent } from './available-institutes.component';

describe('AvailableInstitutesComponent', () => {
  let component: AvailableInstitutesComponent;
  let fixture: ComponentFixture<AvailableInstitutesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailableInstitutesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableInstitutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

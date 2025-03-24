import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProficiencyComponent } from './proficiency.component';

describe('ProyectsComponent', () => {
  let component: ProficiencyComponent;
  let fixture: ComponentFixture<ProficiencyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProficiencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProficiencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

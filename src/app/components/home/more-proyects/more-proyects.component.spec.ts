import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MoreProyectsComponent } from './more-proyects.component';

describe('MoreProyectsComponent', () => {
  let component: MoreProyectsComponent;
  let fixture: ComponentFixture<MoreProyectsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreProyectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreProyectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

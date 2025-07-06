import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { SplashScreenComponent } from './splash-screen.component';

describe('SplashScreenComponent', () => {
  let component: SplashScreenComponent;
  let fixture: ComponentFixture<SplashScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SplashScreenComponent],
      imports: [TranslateModule.forRoot()]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SplashScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
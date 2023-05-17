import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoSubdomainsComponent } from './two-subdomains.component';

describe('TwoSubdomainsComponent', () => {
  let component: TwoSubdomainsComponent;
  let fixture: ComponentFixture<TwoSubdomainsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TwoSubdomainsComponent]
    });
    fixture = TestBed.createComponent(TwoSubdomainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

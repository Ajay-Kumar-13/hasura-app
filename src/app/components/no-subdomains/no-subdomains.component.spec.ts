import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoSubdomainsComponent } from './no-subdomains.component';

describe('NoSubdomainsComponent', () => {
  let component: NoSubdomainsComponent;
  let fixture: ComponentFixture<NoSubdomainsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoSubdomainsComponent]
    });
    fixture = TestBed.createComponent(NoSubdomainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

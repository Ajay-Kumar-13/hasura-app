import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubDomainsComponent } from './sub-domains.component';

describe('SubDomainsComponent', () => {
  let component: SubDomainsComponent;
  let fixture: ComponentFixture<SubDomainsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubDomainsComponent]
    });
    fixture = TestBed.createComponent(SubDomainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarOnlyLogoComponent } from './navbar-only-logo.component';

describe('NavbarOnlyLogoComponent', () => {
  let component: NavbarOnlyLogoComponent;
  let fixture: ComponentFixture<NavbarOnlyLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarOnlyLogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarOnlyLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

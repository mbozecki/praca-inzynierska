import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartSingleItemComponent } from './cart-single-item.component';

describe('CartSingleItemComponent', () => {
  let component: CartSingleItemComponent;
  let fixture: ComponentFixture<CartSingleItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartSingleItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartSingleItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

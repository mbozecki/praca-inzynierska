import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedPlayerComponent } from './fixed-player.component';

describe('FixedPlayerComponent', () => {
  let component: FixedPlayerComponent;
  let fixture: ComponentFixture<FixedPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FixedPlayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

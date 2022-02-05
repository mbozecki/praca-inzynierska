import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeatSingleItemComponent } from './beat-single-item.component';

describe('BeatSingleItemComponent', () => {
  let component: BeatSingleItemComponent;
  let fixture: ComponentFixture<BeatSingleItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeatSingleItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeatSingleItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

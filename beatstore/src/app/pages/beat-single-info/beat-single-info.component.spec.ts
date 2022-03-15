import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeatSingleInfoComponent } from './beat-single-info.component';

describe('BeatSingleInfoComponent', () => {
  let component: BeatSingleInfoComponent;
  let fixture: ComponentFixture<BeatSingleInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeatSingleInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeatSingleInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

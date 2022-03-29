import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeatSingleDownloadableComponent } from './beat-single-downloadable.component';

describe('BeatSingleDownloadableComponent', () => {
  let component: BeatSingleDownloadableComponent;
  let fixture: ComponentFixture<BeatSingleDownloadableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeatSingleDownloadableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeatSingleDownloadableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

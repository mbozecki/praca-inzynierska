import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicBottomBarComponent } from './music-bottom-bar.component';

describe('MusicBottomBarComponent', () => {
  let component: MusicBottomBarComponent;
  let fixture: ComponentFixture<MusicBottomBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MusicBottomBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicBottomBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
